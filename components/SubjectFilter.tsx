"use client";
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";
    const isInitialMount = useRef(true);
    const lastSubjectRef = useRef(query || "all");

    const [subject, setSubject] = useState(() => query || "all");

    // Sync from URL only when it changes externally
    useEffect(() => {
        const currentSubject = query || "all";
        if (currentSubject !== lastSubjectRef.current) {
            setSubject(currentSubject);
            lastSubjectRef.current = currentSubject;
        }
    }, [query]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Don't push if the subject matches what's already in the URL
        const currentSubject = searchParams.get("subject") || "all";
        if (subject === currentSubject) {
            return;
        }
        
        const timeoutId = setTimeout(() => {
            // Double-check before pushing
            const currentSubjectAfterDelay = searchParams.get("subject") || "all";
            if (subject === currentSubjectAfterDelay) {
                return;
            }

            let newUrl = "";
            if (subject === "all") {
                newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["subject"],
                });
            } else {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "subject",
                    value: subject,
                });
            }
            router.push(newUrl, { scroll: false });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [router, subject]);

    const handleValueChange = useCallback((value: string) => {
        setSubject(value);
    }, []);

    const subjectItems = useMemo(() => {
        return subjects.map((subject) => (
            <SelectItem key={subject} value={subject} className="capitalize">
                {subject}
            </SelectItem>
        ));
    }, []);

    return (
        <Select onValueChange={handleValueChange} value={subject}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="All Disciplines" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjectItems}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;