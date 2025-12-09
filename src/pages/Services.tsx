import {
  Building2,
  Home as HomeIcon,
  Wrench,
  Ruler,
  Paintbrush,
  ClipboardCheck,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/Button';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const services = [
    {
      icon: Building2,
      title: 'Extensions & Additions',
      description:
        'Expand your home with beautifully designed extensions that blend seamlessly with your existing structure. From single-storey additions to multi-level expansions, we handle everything: design, planning permissions, structural work, and finishing trades.',
      features: [
        'Single and multi-storey extensions',
        'Rear, side, and wrap-around extensions',
        'Planning permission support',
        'Structural engineering coordination',
        'Premium finishing and materials',
      ],
    },
    {
      icon: Wrench,
      title: 'Conversions & Renovations',
      description:
        'Unlock the potential of your property. We specialise in loft conversions, garage transformations, and full-home renovations that modernise and enhance your living space. Our team manages every aspect, ensuring compliance, quality, and a finish that exceeds expectations.',
      features: [
        'Loft conversions with ensuite options',
        'Garage and outbuilding conversions',
        'Full property renovations',
        'Period property restoration',
        'Modern updates to dated spaces',
      ],
    },
    {
      icon: HomeIcon,
      title: 'New Builds',
      description:
        'Building a home from the ground up requires expertise, coordination, and unwavering attention to detail. Evason Building manages the entire process, from foundation work to final fixtures, delivering homes that are as robust as they are beautiful.',
      features: [
        'Custom new build homes',
        'Site preparation and groundwork',
        'Full project management',
        'Architectural collaboration',
        'Quality materials and craftsmanship',
      ],
    },
    {
      icon: Paintbrush,
      title: 'Kitchens & Bathrooms',
      description:
        'Your kitchen and bathroom should be more than functional—they should be exceptional. We design and build bespoke spaces that combine aesthetics with practicality, using premium materials and expert craftsmanship.',
      features: [
        'Bespoke kitchen design and installation',
        'Luxury bathroom suites',
        'High-end fixtures and fittings',
        'Tiling and waterproofing',
        'Electrical and plumbing integration',
      ],
    },
    {
      icon: Ruler,
      title: 'Structural Alterations',
      description:
        'Removing walls, installing beams, and reconfiguring layouts require certified structural knowledge. Our team handles all structural work with precision, ensuring your project is safe, compliant, and built to last.',
      features: [
        'Load-bearing wall removal',
        'Steel beam installation',
        'Structural calculations and certification',
        'Building control approval',
        'Safe and compliant execution',
      ],
    },
    {
      icon: ClipboardCheck,
      title: 'Full Project Management',
      description:
        'From concept to completion, we manage every element of your build. One point of contact, complete accountability, and a finish that reflects our commitment to excellence.',
      features: [
        'End-to-end project coordination',
        'Budget management and control',
        'Timeline planning and delivery',
        'Subcontractor management',
        'Regular progress updates',
      ],
    },
  ];

  const whyChoose = [
    'Fixed pricing with no hidden costs',
    'Transparent timelines and regular updates',
    'Qualified, experienced tradespeople',
    'Comprehensive guarantees on all work',
    'Full insurance and compliance',
    'Dedicated project manager for every build',
  ];

  return (
    <div className="min-h-screen">
      <section
        className="relative h-[60vh] flex items-center justify-center pt-32"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-charcoal/70"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="mb-6">Comprehensive Building Services for Modern Living</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Full-spectrum construction and renovation services, delivered to the highest standard
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-700 leading-relaxed">
              Evason Building provides a full spectrum of construction and renovation services,
              tailored to your needs and delivered to the highest standard. Whether you're adding
              space, transforming interiors, or building from scratch, we bring precision, skill,
              and care to every project.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-full bg-copper text-white flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-semibold mb-4 text-charcoal">{service.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <div
                      className="h-96 rounded-lg shadow-medium"
                      style={{
                        backgroundImage: `url(https://images.pexels.com/photos/${
                          [1396122, 1648771, 186077, 2724748, 1396132, 416405][index]
                        }/pexels-photo-${
                          [1396122, 1648771, 186077, 2724748, 1396132, 416405][index]
                        }.jpeg?auto=compress&cs=tinysrgb&w=800)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-16">Why Choose Evason for Your Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChoose.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-soft">
                <CheckCircle2 className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-copper text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Ready to Discuss Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's talk about your vision. Whether it's an extension, renovation, or new build,
            we're here to help bring it to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
              Get in Touch
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('projects')}
              className="bg-white text-charcoal hover:bg-gray-100"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
