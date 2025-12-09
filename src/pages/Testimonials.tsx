import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase, type Testimonial } from '../lib/supabase';
import Button from '../components/Button';

interface TestimonialsProps {
  onNavigate: (page: string) => void;
}

export default function Testimonials({ onNavigate }: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setTestimonials(data);
  }

  return (
    <div className="min-h-screen">
      <section
        className="relative h-[60vh] flex items-center justify-center pt-32"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-charcoal/70"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="mb-6">What Our Clients Say</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Real feedback from real projects across the West Midlands covering Birmingham, Telford and Wrekin, Cheshire, and more
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-700 leading-relaxed">
              Our reputation is built on the quality of our work and the satisfaction of our clients.
              Read what they have to say about working with Evason Building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-cream p-8 rounded-lg shadow-soft hover:shadow-medium transition-all"
              >
                <Quote className="w-10 h-10 text-copper mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-copper text-copper" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-300 pt-4">
                  <p className="font-semibold text-charcoal text-lg">{testimonial.client_name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-sm text-copper font-medium mt-2">{testimonial.project_type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-medium text-center">
            <h2 className="mb-6">Client Satisfaction is Our Priority</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Every project is an opportunity to exceed expectations. We don't just build structures—we
              build lasting relationships based on trust, quality, and results. Our clients come back
              to us time and time again, and they recommend us to their friends and family.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-5xl font-bold text-copper mb-2">10+</div>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-copper mb-2">100%</div>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-copper mb-2">5★</div>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-copper text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Join Our Happy Clients</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the Evason Building difference. Get in touch today to discuss your project.
          </p>
          <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
            Start Your Project
          </Button>
        </div>
      </section>
    </div>
  );
}
