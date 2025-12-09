import { MessageSquare, FileText, Hammer, CheckCircle, DollarSign, Clock, Shield } from 'lucide-react';
import Button from '../components/Button';

interface ProcessProps {
  onNavigate: (page: string) => void;
}

export default function Process({ onNavigate }: ProcessProps) {
  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: 'Initial Consultation',
      description:
        'We start with a comprehensive consultation to understand your vision, requirements, and budget. Our team visits your site, assesses the scope of work, and provides expert advice on the best approach for your project.',
      timeline: '1-2 weeks',
      includes: [
        'Free initial site visit',
        'Detailed project discussion',
        'Feasibility assessment',
        'Budget estimation',
        'Timeline projection',
      ],
    },
    {
      number: '02',
      icon: FileText,
      title: 'Design & Planning',
      description:
        'Our team handles all design work, planning permissions, and building regulations. We coordinate with architects and structural engineers to ensure every detail is planned to perfection before work begins.',
      timeline: '4-12 weeks',
      includes: [
        'Architectural design coordination',
        'Planning permission applications',
        'Building regulations approval',
        'Structural calculations',
        'Detailed cost breakdown',
      ],
    },
    {
      number: '03',
      icon: Hammer,
      title: 'Construction',
      description:
        'With everything approved, our skilled team begins work. You will have a dedicated project manager as your single point of contact, providing regular updates and ensuring the build stays on schedule and within budget.',
      timeline: 'Project dependent',
      includes: [
        'Dedicated project manager',
        'Weekly progress updates',
        'Quality materials',
        'Skilled tradespeople',
        'Site management',
      ],
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Handover & Aftercare',
      description:
        'Once complete, we conduct thorough final inspections and address any snagging. You receive all necessary documentation, warranties, and guarantees. Our relationship does not end at handover—we are here for ongoing support.',
      timeline: '1-2 weeks',
      includes: [
        'Final inspections',
        'Snagging resolution',
        'Certification and warranties',
        'Thorough site cleanup',
        'Ongoing support',
      ],
    },
  ];

  const promises = [
    {
      icon: DollarSign,
      title: 'Fixed Pricing',
      description: 'No hidden costs. Your quote is your final price, with any variations agreed in advance.',
    },
    {
      icon: Clock,
      title: 'Clear Timelines',
      description: 'Realistic schedules with regular progress updates to keep you informed every step of the way.',
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'All work is guaranteed and compliant with UK building regulations.',
    },
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
          <h1 className="mb-6">From Vision to Reality: The Evason Way</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            A transparent, client-focused process that delivers exceptional results
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-700 leading-relaxed">
              At Evason Building, we believe the construction process should be transparent,
              stress-free, and collaborative. Our proven four-step approach ensures your project is
              delivered on time, on budget, and to the highest standard.
            </p>
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-12 items-start`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-copper text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center">
                        <Icon className="w-8 h-8 text-copper" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-semibold mb-4 text-charcoal">{step.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">{step.description}</p>
                    <div className="inline-block px-4 py-2 bg-forest text-white rounded-full text-sm font-medium mb-6">
                      Timeline: {step.timeline}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-charcoal">What's Included:</h3>
                      <ul className="space-y-2">
                        {step.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-copper mt-1">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="h-96 rounded-lg shadow-medium"
                      style={{
                        backgroundImage: `url(https://images.pexels.com/photos/${
                          [416405, 1396122, 1109541, 1396132][index]
                        }/pexels-photo-${
                          [416405, 1396122, 1109541, 1396132][index]
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
          <h2 className="text-center mb-4">Our Transparency Promise</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Three core commitments that define how we work with every client
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {promises.map((promise, index) => {
              const Icon = promise.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-soft text-center">
                  <div className="w-16 h-16 rounded-full bg-copper text-white flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-charcoal">{promise.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{promise.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-copper text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Let's Get Started</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to begin your project? Contact us today for a free consultation and discover how
            straightforward construction can be.
          </p>
          <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
            Book Your Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}
