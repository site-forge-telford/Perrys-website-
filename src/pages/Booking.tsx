import { useState } from 'react';
import { Calendar, MapPin, Wrench, Mail, Phone, User, CheckCircle2 } from 'lucide-react';
import { supabase, type Booking as BookingType } from '../lib/supabase';
import Button from '../components/Button';

const serviceTypes = [
  'Extension',
  'Kitchen Renovation',
  'Bathroom Renovation',
  'Garage Conversion',
  'Loft Conversion',
  'Landscaping',
  'General Refurbishment',
  'New Build',
  'Other',
];

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'either', label: 'Either' },
];

export default function Booking() {
  const [formData, setFormData] = useState<Partial<BookingType>>({
    name: '',
    email: '',
    mobile: '',
    address: '',
    service_type: '',
    preferred_contact: 'either',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const { error: submitError } = await supabase.from('bookings').insert([
      {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        service_type: formData.service_type,
        preferred_contact: formData.preferred_contact,
        notes: formData.notes,
      },
    ]);

    setIsSubmitting(false);

    if (submitError) {
      setError('Failed to submit booking. Please try again.');
      console.error(submitError);
    } else {
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        address: '',
        service_type: '',
        preferred_contact: 'either',
        notes: '',
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
                Book a Consultation
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get started on your project today. Fill out the form below and we'll get back to
                you within 24 hours to discuss your requirements.
              </p>
            </div>

            {isSuccess && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Booking Submitted!</h3>
                  <p className="text-green-700">
                    Thank you for your interest. We'll contact you within 24 hours to discuss your
                    project.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-medium p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-semibold text-charcoal mb-2">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all"
                        placeholder="07470 288090"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-charcoal mb-2">
                    Service Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all"
                      placeholder="123 Main Street, City, Postcode"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service_type" className="block text-sm font-semibold text-charcoal mb-2">
                    Type of Service *
                  </label>
                  <div className="relative">
                    <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="service_type"
                      name="service_type"
                      required
                      value={formData.service_type}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all appearance-none bg-white"
                    >
                      <option value="">Select a service...</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">
                    Preferred Contact Method *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {contactMethods.map((method) => (
                      <label
                        key={method.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="preferred_contact"
                          value={method.value}
                          checked={formData.preferred_contact === method.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-copper focus:ring-copper"
                        />
                        <span className="text-gray-700">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-charcoal mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your project requirements..."
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Calendar className="w-5 h-5 animate-pulse" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Submit Booking Request
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to be contacted by Evason Building Contractors
                  regarding your project inquiry.
                </p>
              </form>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Phone className="w-8 h-8 text-copper mx-auto mb-3" />
                <h3 className="font-semibold text-charcoal mb-2">Call Us</h3>
                <a href="tel:07470288090" className="text-copper hover:underline">
                  07470 288090
                </a>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Mail className="w-8 h-8 text-copper mx-auto mb-3" />
                <h3 className="font-semibold text-charcoal mb-2">Email Us</h3>
                <a href="mailto:evasonrenovations@gmail.com" className="text-copper hover:underline">
                  evasonrenovations@gmail.com
                </a>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Calendar className="w-8 h-8 text-copper mx-auto mb-3" />
                <h3 className="font-semibold text-charcoal mb-2">Response Time</h3>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
