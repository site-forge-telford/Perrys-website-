import { useState, useEffect } from 'react';
import {
  Shield,
  Inbox,
  CheckCircle2,
  Archive,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  AlertCircle,
  TrendingUp,
  Plus,
  Edit2,
  Save,
  X,
  Power,
  PowerOff,
} from 'lucide-react';
import { supabase, type Booking, type JobProgress } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

type TabType = 'new' | 'read' | 'archived' | 'jobs';

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('new');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Job Progress State - Admin feature for managing job progress
  const [jobs, setJobs] = useState<JobProgress[]>([]);
  const [editingJob, setEditingJob] = useState<JobProgress | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [newJob, setNewJob] = useState({
    job_name: '',
    customer_info: '',
    progress_percentage: 0,
    description: '',
    display_order: 0,
    is_enabled: true,
  });

  useEffect(() => {
    if (!user) {
      onNavigate('admin-login');
      return;
    }
    if (activeTab === 'jobs') {
      fetchJobs();
    } else {
      fetchBookings();
    }
  }, [activeTab, user]);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');

    let query = supabase
      .from('bookings')
      .select('*')
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });

    if (activeTab === 'new') {
      query = query.eq('is_read', false).eq('is_archived', false);
    } else if (activeTab === 'read') {
      query = query.eq('is_read', true).eq('is_archived', false);
    } else if (activeTab === 'archived') {
      query = query.eq('is_archived', true);
    }

    const { data, error: fetchError } = await query;

    if (fetchError) {
      setError('Failed to fetch bookings');
      console.error(fetchError);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ is_read: true })
      .eq('id', id);

    if (!error) {
      fetchBookings();
    }
  };

  const archiveBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ is_archived: true })
      .eq('id', id);

    if (!error) {
      fetchBookings();
    }
  };

  const unarchiveBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ is_archived: false })
      .eq('id', id);

    if (!error) {
      fetchBookings();
    }
  };

  const deleteBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ is_deleted: true, deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      fetchBookings();
    }
  };

  // Job Progress Management Functions - Admin controls for job progress
  const fetchJobs = async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('job_progress')
      .select('*')
      .order('display_order', { ascending: true });

    if (fetchError) {
      setError('Failed to fetch jobs');
      console.error(fetchError);
    } else {
      setJobs(data || []);
    }

    setLoading(false);
  };

  const createJob = async () => {
    const { error } = await supabase
      .from('job_progress')
      .insert([{ ...newJob, last_updated: new Date().toISOString() }]);

    if (!error) {
      setIsCreatingJob(false);
      setNewJob({
        job_name: '',
        customer_info: '',
        progress_percentage: 0,
        description: '',
        display_order: 0,
        is_enabled: true,
      });
      fetchJobs();
    }
  };

  const updateJob = async (job: JobProgress) => {
    const { error } = await supabase
      .from('job_progress')
      .update({ ...job, last_updated: new Date().toISOString() })
      .eq('id', job.id);

    if (!error) {
      setEditingJob(null);
      fetchJobs();
    }
  };

  const toggleJobEnabled = async (id: string, currentState: boolean) => {
    const { error } = await supabase
      .from('job_progress')
      .update({ is_enabled: !currentState, last_updated: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      fetchJobs();
    }
  };

  const deleteJob = async (id: string) => {
    const { error } = await supabase
      .from('job_progress')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchJobs();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  const tabs = [
    { id: 'new' as TabType, label: 'New', icon: Inbox, count: bookings.length },
    { id: 'read' as TabType, label: 'Read', icon: CheckCircle2 },
    { id: 'archived' as TabType, label: 'Archived', icon: Archive },
    { id: 'jobs' as TabType, label: 'Job Progress', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-charcoal text-white shadow-lg">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-copper" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-300 text-sm">Manage bookings and inquiries</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('recycle-bin')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Recycle Bin
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-copper hover:bg-copper/90 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-copper text-copper'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                    {tab.id === 'new' && activeTab === 'new' && bookings.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-copper text-white text-xs rounded-full">
                        {bookings.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {activeTab === 'jobs' ? (
          // Job Progress Management UI - Admin interface for managing job progress
          <div>
            <div className="mb-6">
              <button
                onClick={() => setIsCreatingJob(true)}
                className="flex items-center gap-2 px-6 py-3 bg-copper text-white rounded-lg hover:bg-copper/90 transition-colors font-semibold"
              >
                <Plus className="w-5 h-5" />
                Add New Job
              </button>
            </div>

            {isCreatingJob && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-copper">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-charcoal">Create New Job</h3>
                  <button
                    onClick={() => setIsCreatingJob(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Name *
                    </label>
                    <input
                      type="text"
                      value={newJob.job_name}
                      onChange={(e) => setNewJob({ ...newJob, job_name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                      placeholder="e.g., Full House Repaint"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Customer Info
                    </label>
                    <input
                      type="text"
                      value={newJob.customer_info}
                      onChange={(e) => setNewJob({ ...newJob, customer_info: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                      placeholder="e.g., Smith Family - Hertfordshire"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Progress Percentage (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newJob.progress_percentage}
                      onChange={(e) =>
                        setNewJob({ ...newJob, progress_percentage: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                      rows={3}
                      placeholder="e.g., Walls complete, woodwork in progress"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={newJob.display_order}
                      onChange={(e) =>
                        setNewJob({ ...newJob, display_order: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newJob.is_enabled}
                      onChange={(e) => setNewJob({ ...newJob, is_enabled: e.target.checked })}
                      className="w-5 h-5 text-copper"
                    />
                    <label className="text-sm font-semibold text-gray-700">
                      Enable this job (show on public page)
                    </label>
                  </div>
                  <button
                    onClick={createJob}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <Save className="w-5 h-5" />
                    Create Job
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-copper border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
                <p className="text-gray-500">Create your first job to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className={`bg-white rounded-lg shadow-md p-6 ${
                      !job.is_enabled ? 'opacity-60' : ''
                    }`}
                  >
                    {editingJob?.id === job.id ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-charcoal">Edit Job</h3>
                          <button
                            onClick={() => setEditingJob(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Job Name *
                          </label>
                          <input
                            type="text"
                            value={editingJob.job_name}
                            onChange={(e) =>
                              setEditingJob({ ...editingJob, job_name: e.target.value })
                            }
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Customer Info
                          </label>
                          <input
                            type="text"
                            value={editingJob.customer_info}
                            onChange={(e) =>
                              setEditingJob({ ...editingJob, customer_info: e.target.value })
                            }
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Progress Percentage (0-100)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={editingJob.progress_percentage}
                            onChange={(e) =>
                              setEditingJob({
                                ...editingJob,
                                progress_percentage: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={editingJob.description}
                            onChange={(e) =>
                              setEditingJob({ ...editingJob, description: e.target.value })
                            }
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Display Order
                          </label>
                          <input
                            type="number"
                            value={editingJob.display_order}
                            onChange={(e) =>
                              setEditingJob({
                                ...editingJob,
                                display_order: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-copper focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={editingJob.is_enabled}
                            onChange={(e) =>
                              setEditingJob({ ...editingJob, is_enabled: e.target.checked })
                            }
                            className="w-5 h-5 text-copper"
                          />
                          <label className="text-sm font-semibold text-gray-700">
                            Enable this job (show on public page)
                          </label>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateJob(editingJob)}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                          >
                            <Save className="w-5 h-5" />
                            Save Changes
                          </button>
                          <button
                            onClick={() => setEditingJob(null)}
                            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-charcoal">{job.job_name}</h3>
                              {!job.is_enabled && (
                                <span className="px-2 py-1 bg-gray-400 text-white text-xs font-semibold rounded">
                                  DISABLED
                                </span>
                              )}
                            </div>
                            {job.customer_info && (
                              <p className="text-gray-600 mb-2">{job.customer_info}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Progress: {job.progress_percentage}%</span>
                              <span>Order: {job.display_order}</span>
                              <span>
                                Updated: {new Date(job.last_updated).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {job.description && (
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-700">{job.description}</p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setEditingJob(job)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => toggleJobEnabled(job.id, job.is_enabled)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              job.is_enabled
                                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {job.is_enabled ? (
                              <>
                                <PowerOff className="w-4 h-4" />
                                Disable
                              </>
                            ) : (
                              <>
                                <Power className="w-4 h-4" />
                                Enable
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  'Are you sure you want to delete this job? This action cannot be undone.'
                                )
                              ) {
                                deleteJob(job.id);
                              }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-copper border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings found</h3>
            <p className="text-gray-500">
              {activeTab === 'new' && 'New booking requests will appear here'}
              {activeTab === 'read' && 'Bookings you have viewed will appear here'}
              {activeTab === 'archived' && 'Archived bookings will appear here'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-charcoal">{booking.name}</h3>
                      {!booking.is_read && activeTab === 'new' && (
                        <span className="px-2 py-1 bg-copper text-white text-xs font-semibold rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-copper" />
                        <a href={`mailto:${booking.email}`} className="hover:text-copper transition-colors">
                          {booking.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-copper" />
                        <a href={`tel:${booking.mobile}`} className="hover:text-copper transition-colors">
                          {booking.mobile}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-copper" />
                        <span>{booking.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-copper" />
                        <span>{new Date(booking.created_at!).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Service Type</p>
                      <p className="text-gray-900">{booking.service_type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Preferred Contact</p>
                      <p className="text-gray-900 capitalize">{booking.preferred_contact}</p>
                    </div>
                  </div>
                  {booking.notes && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Additional Notes</p>
                      <p className="text-gray-900">{booking.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {!booking.is_read && activeTab === 'new' && (
                    <button
                      onClick={() => markAsRead(booking.id!)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Mark as Read
                    </button>
                  )}
                  {!booking.is_archived && (
                    <button
                      onClick={() => archiveBooking(booking.id!)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Archive className="w-4 h-4" />
                      Archive
                    </button>
                  )}
                  {booking.is_archived && (
                    <button
                      onClick={() => unarchiveBooking(booking.id!)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Inbox className="w-4 h-4" />
                      Unarchive
                    </button>
                  )}
                  <button
                    onClick={() => deleteBooking(booking.id!)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
