import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'

// This tells Next.js which slugs exist so it can pre-build all post pages
export async function generateStaticParams() {
    const slugs = getAllPostSlugs()
    return slugs.map((s) => ({ slug: s.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <p className="text-sm text-gray-400 mb-2">{post.date}</p>
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
            {/* dangerouslySetInnerHTML renders the HTML that remark generated from your Markdown */}
            <article dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </main>
    )
}