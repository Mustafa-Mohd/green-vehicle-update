import { supabase } from './supabase';
import { VisitPlan, Exhibitor, Session, Demo, RoutePoint, Pavilion, StallBooking, ContactMessage } from './types';

// Database service for the Expo Finder Pro application

// Visit Plans
export const saveVisitPlan = async (visitPlan: Omit<VisitPlan, 'id'>): Promise<{ data: VisitPlan | null; error: any }> => {
  const { data, error } = await supabase
    .from('visit_plans')
    .insert([{
      ...visitPlan,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  return { data, error };
};

export const getUserVisitPlans = async (userId: string): Promise<{ data: VisitPlan[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('visit_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const getVisitPlanById = async (id: string): Promise<{ data: VisitPlan | null; error: any }> => {
  const { data, error } = await supabase
    .from('visit_plans')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

// Exhibitors
export const getAllExhibitors = async (): Promise<{ data: Exhibitor[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('exhibitors')
    .select('*')
    .order('name');

  return { data, error };
};

export const getExhibitorsByCategory = async (categories: string[]): Promise<{ data: Exhibitor[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('exhibitors')
    .select('*')
    .in('category', categories)
    .order('name');

  return { data, error };
};

// Sessions
export const getAllSessions = async (): Promise<{ data: Session[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .order('time');

  return { data, error };
};

export const getSessionsByCategory = async (categories: string[]): Promise<{ data: Session[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .in('category', categories)
    .order('time');

  return { data, error };
};

// Demos
export const getAllDemos = async (): Promise<{ data: Demo[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('demos')
    .select('*')
    .order('name');

  return { data, error };
};

export const getDemosByType = async (types: string[]): Promise<{ data: Demo[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('demos')
    .select('*')
    .in('type', types)
    .order('name');

  return { data, error };
};

// Pavilions
export const getAllPavilions = async (): Promise<{ data: Pavilion[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('pavilions')
    .select('*')
    .order('booth_number');

  return { data, error };
};

export const getPavilionsByCategory = async (categories: string[]): Promise<{ data: Pavilion[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('pavilions')
    .select('*')
    .in('category', categories)
    .order('booth_number');

  return { data, error };
};

export const searchPavilions = async (searchTerm: string): Promise<{ data: Pavilion[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('pavilions')
    .select('*')
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,technologies.ilike.%${searchTerm}%`)
    .order('booth_number');

  return { data, error };
};

// Stall Bookings
export const createUserStallBooking = async (bookingData: Omit<StallBooking, 'id' | 'created_at' | 'status'>): Promise<{ data: StallBooking | null; error: any }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const bookingWithUserId = {
      ...bookingData,
      user_id: user?.id || null
    };
    
    const { data, error } = await supabase
      .from('stall_bookings')
      .insert([bookingWithUserId])
      .select()
      .single();
      
    return { data, error };
  } catch (error: any) {
    console.error('Error creating stall booking:', error);
    return { data: null, error };
  }
};

export const getUserStallBookings = async (userId?: string): Promise<{ data: StallBooking[] | null; error: any }> => {
  let query = supabase.from('stall_bookings').select('*');
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

// Contact Messages
export const createContactMessage = async (messageData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>): Promise<{ data: ContactMessage | null; error: any }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const messageWithUserId = {
      ...messageData,
      user_id: user?.id || null
    };
    
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([messageWithUserId])
      .select()
      .single();
      
    return { data, error };
  } catch (error: any) {
    console.error('Error creating contact message:', error);
    return { data: null, error };
  }
};

export const getUserContactMessages = async (userId?: string): Promise<{ data: ContactMessage[] | null; error: any }> => {
  let query = supabase.from('contact_messages').select('*');
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};