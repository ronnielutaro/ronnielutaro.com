import React from 'react';
import { createProjectsLoader } from '@/lib/content-loader';

const tagColors: Record<string, string> = {
  'Product': 'bg-blue-500/20 text-blue-300',
  'SaaS': 'bg-green-500/20 text-green-300',
  'Marketing Tech': 'bg-purple-500/20 text-purple-300',
  'Product Management': 'bg-yellow-500/20 text-yellow-300',
  'Customer Discovery': 'bg-red-500/20 text-red-300',
  'Startups': 'bg-blue-500/20 text-blue-300',
};

async function getProjects() {
  const projectsLoader = createProjectsLoader();
  const projects = await projectsLoader.getAllContent();
  return projects.slice(0, 2); // Show only first 2 projects on homepage
}

export async function FeaturedWork() {
  const projects = await getProjects();

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-bold text-center mb-2 text-white text-3xl md:text-4xl">Featured Work</h2>
        <p className="text-center mb-8 text-white/80">Projects I&apos;m proud of</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.meta.slug} className="bg-gradient-to-br from-blue-500/10 to-indigo-700/10 rounded-2xl p-6 backdrop-blur-lg border border-blue-400/20 shadow-lg">
              <h3 className="font-semibold text-xl text-white mb-2">{project.meta.title}</h3>
              <p className="text-white/70 mb-3">{project.meta.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {project.meta.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tagColors[tag] || 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}