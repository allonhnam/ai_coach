'use client';

import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Coach Library', href: '/companions' },
    { label: 'My Journey', href: 'my-journey' },
]

const NavItems = () => {
    const pathname = usePathname();

    return (
        <nav className='flex items-center gap-6'>
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        'text-sm font-medium text-muted-foreground hover:text-primary transition-colors',
                        pathname == href && 'text-primary font-semibold'
                    )}
                >
                    {label}
                </Link>
            ))}

        </nav>
    )
}

export default NavItems