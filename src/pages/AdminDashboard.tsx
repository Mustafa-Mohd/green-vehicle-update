import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { StallBooking, ContactMessage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, Clock, LayoutDashboard, IndianRupee, Users, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<StallBooking[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Stats
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, curr) => {
      const rate = curr.booth_type === 'shell_space' ? 12000 : 10000;
      return acc + (rate * (curr.space_requirement || 0));
    }, 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const unreadMessages = messages.filter(m => m.status === 'pending').length;

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      fetchData();
    } catch (error) {
      console.error('Error checking auth:', error);
      navigate('/login');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('stall_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      const { data: messagesData, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('stall_bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      toast.success(`Booking ${status}`);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update status');
    }
  };

  const updateMessageStatus = async (id: string, status: 'read' | 'responded') => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      toast.success(`Message marked as ${status}`);
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://greenvehicleexpo.com/wp-content/uploads/2019/05/Green-Vehicle-Expo-2026-logo-with-date.png"
              alt="Green Vehicle Expo"
              className="h-8 object-contain"
            />
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <span className="font-semibold text-gray-600 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Admin Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">Welcome, Admin</span>
            <Button onClick={() => navigate('/')} variant="outline" size="sm" className="border-teal text-teal hover:bg-teal/5">
              Exit to Website
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-l-4 border-l-teal shadow-md">
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue (Confirmed)</CardDescription>
                <CardTitle className="text-2xl font-bold flex items-center text-teal">
                  <IndianRupee className="w-5 h-5 mr-1" /> {totalRevenue.toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">+ from {bookings.filter(b => b.status === 'confirmed').length} bookings</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-l-4 border-l-orange-500 shadow-md">
              <CardHeader className="pb-2">
                <CardDescription>Pending Requests</CardDescription>
                <CardTitle className="text-2xl font-bold flex items-center text-orange-600">
                  <Clock className="w-5 h-5 mr-2" /> {pendingBookings}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Stall booking requests</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-l-4 border-l-blue-500 shadow-md">
              <CardHeader className="pb-2">
                <CardDescription>Unread Messages</CardDescription>
                <CardTitle className="text-2xl font-bold flex items-center text-blue-600">
                  <MessageSquare className="w-5 h-5 mr-2" /> {unreadMessages}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Needs response</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-white border p-1 rounded-xl w-full md:w-auto inline-flex h-auto">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-teal data-[state=active]:text-white py-2 px-6 rounded-lg text-sm font-medium">
              Stall Bookings
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-teal data-[state=active]:text-white py-2 px-6 rounded-lg text-sm font-medium">
              Contact Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="border-none shadow-sm bg-transparent">
              <div className="grid gap-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                    <p className="text-muted-foreground">No bookings found.</p>
                  </div>
                ) : (
                  bookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden border-none shadow hover:shadow-md transition-shadow">
                        <div className={`h-1.5 w-full ${booking.status === 'confirmed' ? 'bg-green-500' :
                            booking.status === 'cancelled' ? 'bg-red-500' : 'bg-orange-400'
                          }`} />
                        <CardHeader className="pb-3 bg-white">
                          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <CardTitle className="text-lg">{booking.company_name}</CardTitle>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                    booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                  }`}>
                                  {booking.status}
                                </span>
                              </div>
                              <CardDescription className="flex items-center gap-2 text-xs">
                                <Users className="w-3 h-3" /> {booking.name} ({booking.job_title})
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-teal">
                                {booking.space_requirement} sqm
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {booking.booth_type.replace('_', ' ')}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4 bg-slate-50/50">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                              <span className="text-xs font-semibold text-muted-foreground uppercase">Contact Info</span>
                              <p>{booking.email}</p>
                              <p>{booking.mobile_no}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-xs font-semibold text-muted-foreground uppercase">Location</span>
                              <p>{booking.country}</p>
                            </div>
                          </div>

                          {booking.status === 'pending' && (
                            <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-slate-100">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                onClick={() => booking.id && updateBookingStatus(booking.id, 'cancelled')}
                              >
                                <XCircle className="w-4 h-4 mr-1" /> Decline
                              </Button>
                              <Button
                                size="sm"
                                className="bg-teal hover:bg-teal/90 text-white"
                                onClick={() => booking.id && updateBookingStatus(booking.id, 'confirmed')}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" /> Approve Booking
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid gap-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-none shadow hover:shadow-md transition-shadow">
                    <div className={`h-1.5 w-full ${msg.status === 'responded' ? 'bg-green-500' :
                        msg.status === 'read' ? 'bg-blue-500' : 'bg-orange-400'
                      }`} />
                    <CardHeader className="bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{msg.name}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {msg.email} • {msg.mobile_number}
                          </CardDescription>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {msg.created_at && new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="bg-slate-50/50 pt-4">
                      <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-100 shadow-sm mb-4">
                        "{msg.message}"
                      </p>

                      <div className="flex gap-2 justify-end">
                        {msg.status !== 'responded' && (
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => msg.id && updateMessageStatus(msg.id, 'responded')}
                          >
                            Mark Responded
                          </Button>
                        )}
                        {msg.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => msg.id && updateMessageStatus(msg.id, 'read')}
                          >
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
