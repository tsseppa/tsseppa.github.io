'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className= "sticky top-0 z-50 bg-white border-b border-blue-500">
            <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="font-semibold text-blue-400 text-lg">
                    Tsseppa
                </Link>
                <div className="flex gap-6">
                    {[
                        { label: 'Home', href: '/' },
                        { label: 'About', href: '/about' },
                        { label: 'Blog', href: '/blog' },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={pathname === link.href ? 'font-semibold text-blue-400' : 'text-gray-500 hover:text-blue-400'}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}