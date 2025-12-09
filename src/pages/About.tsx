import { Shield, Award, Users, Target } from 'lucide-react';
import Button from '../components/Button';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description:
        'Honest communication, transparent pricing, and unwavering commitment to our promises.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description:
        'Uncompromising quality standards that exceed industry expectations on every project.',
    },
    {
      icon: Users,
      title: 'Partnership',
      description:
        'Building long-term relationships through collaboration, respect, and shared success.',
    },
    {
      icon: Target,
      title: 'Precision',
      description:
        'Meticulous attention to detail from initial consultation through final handover.',
    },
  ];

  const credentials = [
    'Fully insured and certified',
    'Compliant with all UK building regulations',
    'Members of trusted trade associations',
    'All work guaranteed',
    'Over a decade of industry experience',
    'Qualified, experienced tradespeople',
  ];

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
          <h1 className="mb-6">Building Homes. Building Trust. Building Futures.</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Over a decade of excellence in construction and renovation
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Evason Building was founded on a simple principle: construction should be a
                partnership, not a battle. For over ten years, we've worked with homeowners and
                businesses across the region to deliver projects that exceed expectations.
              </p>
              <p>
                We don't just build structures. We build relationships. Every client is treated
                with the respect, honesty, and professionalism they deserve. Every project is
                approached with the same commitment to quality, whether it's a small renovation or a
                full new build.
              </p>
              <p>
                Our reputation is built on craftsmanship, integrity, and results. We're proud of the
                work we do, and even prouder of the clients who trust us to deliver it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-4">Our Values</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            The principles that guide every decision we make and every project we deliver
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-copper text-white flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-charcoal">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8">Meet the Team</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                At Evason Building, experience and expertise run through every level of the team.
                Our tradespeople are fully qualified, our project managers are meticulous, and our
                commitment to excellence is absolute.
              </p>
              <p>
                From site managers to skilled labourers, every person on site is dedicated to
                delivering outstanding work. We invest in continuous training and development to
                ensure our team remains at the forefront of modern construction techniques and
                standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8">Our Approach</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                We believe great construction starts with great communication. From the first
                consultation to final handover, we keep you informed every step of the way. Our
                process is transparent, our pricing is fixed, and our standards are uncompromising.
              </p>
              <p className="font-semibold text-charcoal text-xl">
                We don't cut corners. We don't make excuses. We build to last.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-16">Credentials & Accreditations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {credentials.map((credential, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">{credential}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-copper text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="mb-6">See What We've Built</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our portfolio of completed projects and discover the quality and craftsmanship
            that defines Evason Building.
          </p>
          <Button variant="outline" size="lg" onClick={() => onNavigate('projects')}>
            View Our Portfolio
          </Button>
        </div>
      </section>
    </div>
  );
}
