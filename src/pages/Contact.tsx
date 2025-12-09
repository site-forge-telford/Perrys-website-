import { useEffect, useState } from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { supabase, type JobProgress } from '../lib/supabase';
import JobProgressBar from '../components/JobProgressBar';

export default function Contact() {
  const [jobs, setJobs] = useState<JobProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setIsLoading(true);
    // Load only enabled jobs, ordered by display_order
    const { data } = await supabase
      .from('job_progress')
      .select('*')
      .eq('is_enabled', true)
      .order('display_order', { ascending: true });

    if (data) {
      setJobs(data);
    }
    setIsLoading(false);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center pt-32"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-charcoal/70"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="mb-6">Progress Report</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Here you can see the live progress of my current projects
          </p>
        </div>
      </section>

      {/* Job Progress Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <TrendingUp className="w-8 h-8 text-copper" />
              <h2 className="mb-0">Current Jobs in Progress</h2>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-copper border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading job progress...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 bg-cream rounded-lg">
                <p className="text-xl text-gray-600">No active jobs at the moment</p>
                <p className="text-gray-500 mt-2">Check back soon for updates on our latest projects</p>
              </div>
            ) : (
              <div className="space-y-8">
                {jobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="bg-gradient-to-br from-cream to-white p-8 rounded-xl shadow-medium border-2 border-gray-200 hover:border-copper transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Job Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-charcoal mb-1">
                            {job.job_name}
                          </h3>
                          {job.customer_info && (
                            <p className="text-lg text-gray-600">{job.customer_info}</p>
                          )}
                        </div>
                        <div className="bg-copper text-white px-4 py-2 rounded-lg font-bold text-xl whitespace-nowrap">
                          {job.progress_percentage}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar with Logo */}
                    <div className="mb-6">
                      <JobProgressBar percentage={job.progress_percentage} />
                    </div>

                    {/* Job Description */}
                    {job.description && (
                      <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                      </div>
                    )}

                    {/* Last Updated */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Last updated: {formatDate(job.last_updated)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4 text-charcoal">
              Transparency in Every Project
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in keeping our clients informed every step of the way. This page is updated
              regularly to reflect the current status of our active projects, demonstrating our
              commitment to transparency and quality workmanship.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
