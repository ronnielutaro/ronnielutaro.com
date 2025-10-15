import { ContentLoader, createProjectsLoader } from '../src/lib/content-loader';

describe('ContentLoader', () => {
  describe('Project Content', () => {
    let projectsLoader: ContentLoader;

    beforeEach(() => {
      projectsLoader = createProjectsLoader();
    });

    it('loads all project content with correct metadata', async () => {
      const content = await projectsLoader.getAllContent();
      expect(content).toHaveLength(3);
      
      // Check that we have our expected projects
      const titles = content.map(project => project.meta.title);
      expect(titles).toContain('Rocketize');
      expect(titles).toContain('StartHub');
      expect(titles).toContain('AGRILogistics Mobile & Web Platforms');
    });

    it('gets project by slug', async () => {
      const content = await projectsLoader.getContentBySlug('rocketize');
      expect(content).toBeTruthy();
      expect(content?.meta.title).toBe('Rocketize');
    });

    it('returns null for non-existent slug', async () => {
      const content = await projectsLoader.getContentBySlug('non-existent');
      expect(content).toBeNull();
    });

    it('gets all project slugs', () => {
      const slugs = projectsLoader.getAllSlugs();
      expect(slugs).toContain('rocketize');
      expect(slugs).toContain('starthub');
      expect(slugs).toContain('agrilogistics');
      expect(slugs).toHaveLength(3);
    });

    it('filters featured projects correctly', async () => {
      const content = await projectsLoader.getAllContent();
      const featuredProjects = content.filter(p => p.meta.featured === true);
      
      expect(featuredProjects.length).toBeGreaterThan(0);
      expect(featuredProjects.length).toBeLessThanOrEqual(2);
      
      // Check that featured projects have the featured flag
      featuredProjects.forEach(project => {
        expect(project.meta.featured).toBe(true);
      });
    });
  });
});
