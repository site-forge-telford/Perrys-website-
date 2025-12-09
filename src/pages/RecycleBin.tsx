import { useState, useEffect } from 'react';
import {
  Trash2,
  RotateCcw,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  Shield,
  ArrowLeft,
} from 'lucide-react';
import { supabase, type Booking } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface RecycleBinProps {
  onNavigate: (page: string) => void;
}

export default function RecycleBin({ onNavigate }: RecycleBinProps) {
  const { user } = useAuth();
  const [deletedBookings, setDeletedBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOperating, setIsOperating] = useState(false);

  useEffect(() => {
    if (!user && !isOperating) {
      onNavigate('admin-login');
      return;
    }
    if (user && !isOperating) {
      fetchDeletedBookings();
    }
  }, [user]);

  const fetchDeletedBookings = async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('is_deleted', true)
      .order('deleted_at', { ascending: false });

    if (fetchError) {
      setError('Failed to fetch deleted bookings');
      console.error(fetchError);
    } else {
      setDeletedBookings(data || []);
    }

    setLoading(false);
  };

  const restoreBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ is_deleted: false, deleted_at: null })
      .eq('id', id);

    if (!error) {
      fetchDeletedBookings();
    }
  };

  const permanentlyDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this booking? This action cannot be undone.')) {
      return;
    }

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchDeletedBookings();
    }
  };

  const emptyRecycleBin = async () => {
    if (!confirm('Are you sure you want to permanently delete all bookings in the recycle bin? This action cannot be undone.')) {
      return;
    }

    setIsOperating(true);
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('is_deleted', true);

    if (!error) {
      setDeletedBookings([]);
    }
    setIsOperating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-charcoal text-white shadow-lg">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trash2 className="w-8 h-8 text-copper" />
              <div>
                <h1 className="text-2xl font-bold">Recycle Bin</h1>
                <p className="text-gray-300 text-sm">Recover or permanently delete bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              {deletedBookings.length > 0 && (
                <button
                  onClick={emptyRecycleBin}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Empty Recycle Bin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-copper border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading deleted bookings...</p>
          </div>
        ) : deletedBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Trash2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Recycle bin is empty</h3>
            <p className="text-gray-500">Deleted bookings will appear here and can be restored within 30 days</p>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-amber-800 font-medium">Deleted bookings ({deletedBookings.length})</p>
                <p className="text-amber-700 text-sm mt-1">
                  These bookings can be restored or permanently deleted. Permanently deleted bookings cannot be recovered.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {deletedBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-charcoal">{booking.name}</h3>
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          DELETED
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-copper" />
                          <span>{booking.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-copper" />
                          <span>{booking.mobile}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-copper" />
                          <span>{booking.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-copper" />
                          <span>
                            Deleted: {booking.deleted_at ? new Date(booking.deleted_at).toLocaleDateString() : 'Unknown'}
                          </span>
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
                    <button
                      onClick={() => restoreBooking(booking.id!)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restore
                    </button>
                    <button
                      onClick={() => permanentlyDelete(booking.id!)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Delete Permanently
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
