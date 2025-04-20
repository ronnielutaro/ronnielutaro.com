import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Carousel from '@/components/mdx-carousel';
import CustomImage from '@/components/custom-image';
import rehypeExternalLinks from 'rehype-external-links';

const contentPath = path.join(process.cwd(), 'projects');

export function getAvailableProjects(): string[] {
    try {
        const files = fs.readdirSync(contentPath).filter(file => path.extname(file) === '.mdx');
        return files.map(file => file.replace(/\.mdx$/, ''));
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    const availableProjects = getAvailableProjects();

    if (!availableProjects.includes(slug))
        return undefined;
        
    // Read the file
    const rawMDX = fs.readFileSync(path.join(contentPath, `${slug}.mdx`), 'utf8');

    const { frontmatter, content } = await compileMDX<ProjectMetadata>({
        source: rawMDX,
        components: {
            Carousel,
            CustomImage,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                format: 'mdx',
                rehypePlugins: [
                    [rehypeExternalLinks, {
                        rel: ['nofollow'],
                        target: '_blank',
                    }]
                ]
            }
        }
    });
    frontmatter.slug = slug;

    const project: Project = {
        metadata: frontmatter,
        content,
    };

    return project;
}

export async function getProjectMetadataBySlug(
    slug: string,
): Promise<ProjectMetadata | undefined> {
    try {
        const filePath = path.join(contentPath, `${slug}.mdx`);
        const rawMDX = fs.readFileSync(filePath, 'utf-8');

        const { frontmatter } = await compileMDX<ProjectMetadata>({
            source: rawMDX,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    format: "mdx",
                },
            },
        });

        frontmatter.slug = slug;

        return frontmatter;
    } catch (error) {
        console.error(`Error reading project metadata ${slug}:`, error);
        return undefined;
    }
}

export async function getAllProjectsMetadata(): Promise<ProjectMetadata[]> {
    const availableProjects = getAvailableProjects();
    const projects: ProjectMetadata[] = [];
    
    for (const slug of availableProjects) {
        // Read the file
        const rawMDX = fs.readFileSync(path.join(contentPath, `${slug}.mdx`), 'utf8');

        const { frontmatter } = await compileMDX<ProjectMetadata>({
            source: rawMDX,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    format: 'mdx',
                }
            }
        });
        frontmatter.slug = slug;

        projects.push(frontmatter);
    }

    return projects;
}

export async function getLocalImage(imagePath: string): Promise<string> {
    try {
        // Remove leading slash if present
        const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        // Construct path relative to public directory
        const fullPath = path.join(process.cwd(), 'public', cleanPath);
        const imageBuffer = fs.readFileSync(fullPath);
        return imageBuffer.toString('base64');
    } catch (error) {
        console.error(`Error reading image ${imagePath}:`, error);
        throw new Error(`Error reading image ${imagePath}`);
    }
}
