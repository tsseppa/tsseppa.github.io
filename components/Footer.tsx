import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-blue-100 mt-auto">
            <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Touko Seppä
                </p>
                <div className="flex gap-4">
                    <Link href="https://github.com/tsseppa" target="_blank" className="text-gray-400 hover:text-blue-500">
                        <Github size={18} />
                    </Link>
                </div>
            </div>
        </footer>
    )
}