import { useEffect, useState } from 'react';
import {
  Building2,
  Home as HomeIcon,
  Wrench,
  Ruler,
  Paintbrush,
  ClipboardCheck,
  Star,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Shield,
  Award,
} from 'lucide-react';
import { supabase, type Project, type Testimonial } from '../lib/supabase';
import Button from '../components/Button';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (featuredProjects.length > 0) {
      const interval = setInterval(() => {
        setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredProjects]);

  async function loadData() {
    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('completed_date', { ascending: false })
      .limit(3);

    const { data: testimonials } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .limit(3);

    if (projects) setFeaturedProjects(projects);
    if (testimonials) setFeaturedTestimonials(testimonials);
  }

  const services = [
    {
      icon: Building2,
      title: 'Extensions & Additions',
      description: 'Expand your living space with intelligent design and flawless execution.',
    },
    {
      icon: Wrench,
      title: 'Conversions & Renovations',
      description: 'Breathe new life into existing structures with expert transformations.',
    },
    {
      icon: HomeIcon,
      title: 'New Builds',
      description: 'From foundation to finish, we build homes designed to last.',
    },
    {
      icon: Paintbrush,
      title: 'Kitchens & Bathrooms',
      description: 'Luxury spaces engineered for modern living.',
    },
    {
      icon: Ruler,
      title: 'Structural Alterations',
      description: 'Safe, compliant structural work by certified professionals.',
    },
    {
      icon: ClipboardCheck,
      title: 'Full Project Management',
      description: 'One point of contact, full accountability, no surprises.',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We listen, assess, and advise on the best approach for your project.',
    },
    {
      number: '02',
      title: 'Design & Planning',
      description: 'Our team handles architectural input, planning permissions, and compliance.',
    },
    {
      number: '03',
      title: 'Build',
      description: 'Transparent timelines, regular updates, and meticulous site management.',
    },
    {
      number: '04',
      title: 'Handover',
      description: 'Final inspections, snagging, and a guarantee you can rely on.',
    },
  ];

  const whyEvason = [
    {
      title: 'Uncompromising Quality',
      description: 'Every project is built to the highest standard, every time.',
    },
    {
      title: 'Total Transparency',
      description: 'Fixed pricing, clear timelines, no hidden costs.',
    },
    {
      title: 'Expert Team',
      description: 'Qualified tradespeople with decades of combined experience.',
    },
    {
      title: 'Client-First Approach',
      description: 'Your vision, our expertise, one shared goal.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-taupe to-charcoal"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1920)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Building Excellence
            <br />
            Across Every Project
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200 animate-slide-up">
            As a family-run contractor, Evason Building provides complete renovation and building solutions from start to finish. We combine expert tradespeople, seamless project management, and honest service to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" onClick={() => onNavigate('contact')}>
              Start Your Project
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('projects')}>
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-charcoal leading-relaxed">
            For over a decade, Evason Building has been the trusted name for clients seeking
            quality, transparency, and results. Whether you're extending your family home,
            transforming a tired space, or embarking on a new build, we deliver work that stands
            the test of time.
          </p>
          <Button className="mt-8" onClick={() => onNavigate('booking')}>
            Book a Free Consultation
          </Button>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-4">
              <Shield className="w-12 h-12 text-copper" />
              <div className="text-left">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Trusted & Verified</p>
                <p className="text-lg font-bold text-charcoal">Fully Insured</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Award className="w-12 h-12 text-copper" />
              <div className="text-left">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Quality Assured</p>
                <p className="text-lg font-bold text-charcoal">10+ Years Experience</p>
              </div>
            </div>
            <a
              href="https://www.checkatrade.com/trades/evasonbuildingcontractorltd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-copper hover:bg-copper/90 rounded-lg transition-all duration-300 hover:shadow-medium text-white font-semibold"
            >
              <ExternalLink className="w-5 h-5" />
              View us on Checkatrade
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-lg border-2 border-gray-200 hover:border-copper hover:shadow-medium transition-all duration-300 group"
                >
                  <Icon className="w-12 h-12 text-copper mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-3 text-charcoal">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button variant="secondary" onClick={() => onNavigate('services')}>
              Learn More About Our Services
            </Button>
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="py-24 bg-charcoal text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-center mb-16">Featured Projects</h2>
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-hard">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentProjectIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <span className="inline-block px-4 py-2 bg-copper text-white text-sm font-medium rounded-full mb-4">
                      {project.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h3>
                    <p className="text-lg text-gray-200 mb-2">{project.location}</p>
                    <p className="text-gray-300 max-w-2xl">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 mt-8">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentProjectIndex ? 'bg-copper w-8' : 'bg-gray-500'
                  }`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button onClick={() => onNavigate('projects')}>
                View All Projects <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-4">How We Work</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Our transparent, client-focused process ensures your project is delivered on time, on
            budget, and to the highest standard.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full bg-copper text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-charcoal">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="secondary" onClick={() => onNavigate('process')}>
              Learn More About Our Process
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-16">Why Choose Evason</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyEvason.map((item, index) => (
              <div key={index} className="text-center">
                <CheckCircle2 className="w-12 h-12 text-forest mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-charcoal">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredTestimonials.length > 0 && (
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-center mb-16">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-soft">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-copper text-copper" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-charcoal">{testimonial.client_name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <p className="text-sm text-copper mt-1">{testimonial.project_type}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="secondary" onClick={() => onNavigate('testimonials')}>
                Read More Reviews
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-copper text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Ready to Start Your Build?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're planning an extension, renovation, or new build, Evason Building brings
            expertise and excellence to every project. Let's discuss your vision.
          </p>
          <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
            Get in Touch Today
          </Button>
        </div>
      </section>
    </div>
  );
}
