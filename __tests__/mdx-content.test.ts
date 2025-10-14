import { ContentLoader, createBlogLoader, createProjectsLoader } from '../src/lib/content-loader';

describe('ContentLoader', () => {
  describe('Blog Content', () => {
    let blogLoader: ContentLoader;

    beforeEach(() => {
      blogLoader = createBlogLoader();
    });

    it('loads all blog content with correct metadata', async () => {
      const content = await blogLoader.getAllContent();
      expect(content).toHaveLength(3);
      
      // Check that we have our expected posts
      const titles = content.map(post => post.meta.title);
      expect(titles).toContain('Building Products Users Love: Lessons from StartHub');
      expect(titles).toContain('The Art of Design Systems: Creating Consistency at Scale');
      expect(titles).toContain('Scaling Infrastructure: When to Optimize and When to Rebuild');
    });

    it('gets content by slug', async () => {
      const content = await blogLoader.getContentBySlug('first-post');
      expect(content).toBeTruthy();
      expect(content?.meta.title).toBe('Building Products Users Love: Lessons from StartHub');
    });

    it('returns null for non-existent slug', async () => {
      const content = await blogLoader.getContentBySlug('non-existent');
      expect(content).toBeNull();
    });

    it('gets all slugs', () => {
      const slugs = blogLoader.getAllSlugs();
      expect(slugs).toContain('first-post');
      expect(slugs).toContain('design-systems');
      expect(slugs).toContain('scaling-infrastructure');
      expect(slugs).toHaveLength(3);
    });
  });

  describe('Project Content', () => {
    let projectsLoader: ContentLoader;

    beforeEach(() => {
      projectsLoader = createProjectsLoader();
    });

    it('loads all project content with correct metadata', async () => {
      const content = await projectsLoader.getAllContent();
      expect(content).toHaveLength(2);
      
      // Check that we have our expected projects
      const titles = content.map(project => project.meta.title);
      expect(titles).toContain('Rocketize');
      expect(titles).toContain('StartHub');
    });

    it('gets project by slug', async () => {
      const content = await projectsLoader.getContentBySlug('rocketize');
      expect(content).toBeTruthy();
      expect(content?.meta.title).toBe('Rocketize');
    });
  });
});
