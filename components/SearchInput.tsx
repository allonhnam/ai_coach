'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState, useCallback, useRef} from "react";
import Image from "next/image";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';
    const isInitialMount = useRef(true);
    const lastQueryRef = useRef(query);

    const [searchQuery, setSearchQuery] = useState(query);

    // Only sync from URL on mount or when URL actually changes externally
    useEffect(() => {
        if (query !== lastQueryRef.current) {
            setSearchQuery(query);
            lastQueryRef.current = query;
        }
    }, [query]);

    useEffect(() => {
        // Skip on initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Don't push if the query matches what's already in the URL
        const currentTopic = searchParams.get('topic') || '';
        if (searchQuery === currentTopic) {
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            const currentTopicAfterDelay = searchParams.get('topic') || '';
            
            // Double-check before pushing to avoid unnecessary navigation
            if (searchQuery === currentTopicAfterDelay) {
                return;
            }

            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if(pathname === '/companions' && currentTopicAfterDelay) {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)
        
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, router, pathname]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    return (
        <div className="relative border border-border rounded-lg items-center flex gap-2 px-2 py-1 h-fit bg-input">
            <Image src="/icons/search.svg" alt="search" width={15} height={15} />
            <input
                placeholder="Search your sentinels or topics..."
                className="outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={handleChange}
            />
        </div>
    )
}
export default SearchInput
