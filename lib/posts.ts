import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// This points to the /posts folder at the root of your project
const postsDirectory = path.join(process.cwd(), 'posts')

// Type for post metadata (frontmatter)
export type PostMeta = {
    slug: string
    title: string
    date: string
    description: string
}

// Type for a full post including the rendered HTML content
export type Post = PostMeta & {
    contentHtml: string
}

// Returns metadata for ALL posts, sorted newest first
// Used by the blog list page
export function getAllPosts(): PostMeta[] {
    const fileNames = fs.readdirSync(postsDirectory)

    const posts = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '') // e.g. "my-first-post"
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data } = matter(fileContents) // parse frontmatter only

            return {
                slug,
                title: data.title,
                date: data.date,
                description: data.description,
            }
        })

    // Sort by date, newest first
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Returns all slugs — needed by Next.js to know which pages to generate
// Used by the [slug] page
export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => ({
            slug: fileName.replace(/\.md$/, ''),
        }))
}

// Returns a single full post with rendered HTML content
// Used by the individual post page
export async function getPostBySlug(slug: string): Promise<Post> {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents) // parse frontmatter AND content

    // Convert Markdown to HTML
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        contentHtml,
    }
}