import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Blog() {
    const posts = getAllPosts()

    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <ul className="flex flex-col gap-8">
                {posts.map((post) => (
                    <li key={post.slug} className="border-b border-gray-200 pb-8">
                        <Link href={`/blog/${post.slug}`} className="group">
                            <p className="text-sm text-gray-400 mb-1">{post.date}</p>
                            <h2 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="mt-2 text-gray-600">{post.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}