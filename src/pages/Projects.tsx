import { useEffect, useState } from 'react';
import { MapPin, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Project } from '../lib/supabase';
import Button from '../components/Button';

interface ProjectsProps {
  onNavigate: (page: string) => void;
}

export default function Projects({ onNavigate }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['All', 'Extension', 'Renovation', 'Conversion', 'Kitchen', 'Bathroom', 'Landscaping'];

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  async function loadProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('completed_date', { ascending: false });

    if (data) {
      setProjects(data);
      setFilteredProjects(data);
    }
  }

  return (
    <div className="min-h-screen">
      <section
        className="relative h-[60vh] flex items-center justify-center pt-32"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-charcoal/70"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="mb-6">Craftsmanship You Can See</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Explore our portfolio of exceptional construction and renovation projects
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-copper text-white shadow-medium'
                    : 'bg-cream text-charcoal hover:bg-taupe hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-80 rounded-lg overflow-hidden shadow-soft group-hover:shadow-hard transition-all">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-copper text-sm font-medium rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.completed_date).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => {
            setSelectedProject(null);
            setCurrentImageIndex(0);
          }}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96">
              {(() => {
                const images = selectedProject.images && Array.isArray(selectedProject.images) && selectedProject.images.length > 0
                  ? selectedProject.images
                  : [selectedProject.image_url];

                return (
                  <>
                    <img
                      src={images[currentImageIndex]}
                      alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? images.length - 1 : prev - 1
                            );
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-medium hover:bg-white transition-all"
                        >
                          <ChevronLeft className="w-6 h-6 text-charcoal" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              prev === images.length - 1 ? 0 : prev + 1
                            );
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-medium hover:bg-white transition-all"
                        >
                          <ChevronRight className="w-6 h-6 text-charcoal" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? 'bg-white w-8'
                                  : 'bg-white/50 hover:bg-white/75'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}

              <button
                onClick={() => {
                  setSelectedProject(null);
                  setCurrentImageIndex(0);
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-medium hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-copper text-white text-sm font-medium rounded-full">
                  {selectedProject.category}
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {selectedProject.location}
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedProject.completed_date).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-charcoal">{selectedProject.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{selectedProject.description}</p>

              {selectedProject.challenge && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-charcoal">Challenge</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.challenge}</p>
                </div>
              )}

              {selectedProject.solution && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-charcoal">Solution</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.solution}</p>
                </div>
              )}

              {selectedProject.result && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-charcoal">Result</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.result}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="py-24 bg-copper text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Start Your Transformation</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to create something exceptional? Let's discuss your project and bring your vision
            to life.
          </p>
          <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
            Get a Quote for Your Project
          </Button>
        </div>
      </section>
    </div>
  );
}
