'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch — only render toggle after mount
    useEffect(() => {setMounted(true)}, [])

    return (
        <nav className= "sticky top-0 z-50 bg-white border-b border-blue-100">
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

                {mounted && (
                    <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    aria-label="Toggle theme"
                    className="text-gray-500 hover:text-blue-400 transition-colors"
                    >
                    {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                )}
                </div>
            </div>
        </nav>
    )
}