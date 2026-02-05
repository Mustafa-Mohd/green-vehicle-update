-- Create profiles table to store user information
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT DEFAULT 'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=teal&fontSize=36',
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create a function to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, false, 5242880, '{image/png,image/jpeg,image/gif,image/webp}');

-- Create policies for avatars storage
CREATE POLICY "Anyone can upload avatar" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can update avatar" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can read avatar" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatars');


-- Create table for stall bookings
CREATE TABLE stall_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  booth_type TEXT CHECK (booth_type IN ('shell_space', 'bare_space')) NOT NULL,
  space_requirement INTEGER NOT NULL,
  name TEXT NOT NULL,
  job_title TEXT,
  company_name TEXT NOT NULL,
  country TEXT NOT NULL,
  mobile_no TEXT NOT NULL,
  email TEXT NOT NULL,
  terms_accepted BOOLEAN DEFAULT FALSE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  user_id UUID REFERENCES auth.users
);

-- Enable Row Level Security on stall_bookings table
ALTER TABLE stall_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for stall_bookings table
CREATE POLICY "Public insert for stall bookings" ON stall_bookings
  FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Authenticated users can view own booking" ON stall_bookings
  FOR SELECT USING (auth.uid() = user_id AND auth.role() = 'authenticated');

CREATE POLICY "Admin can manage all bookings" ON stall_bookings
  FOR ALL USING (auth.role() = 'service_role');

-- Allow public select for admin purposes
CREATE POLICY "Admin can view all bookings" ON stall_bookings
  FOR SELECT TO service_role USING (true);


-- Create table for contact messages
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  mobile_number TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'responded')),
  user_id UUID REFERENCES auth.users
);

-- Enable Row Level Security on contact_messages table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_messages table
CREATE POLICY "Anyone can insert contact message" ON contact_messages
  FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Users can view own messages" ON contact_messages
  FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'authenticated');

CREATE POLICY "Admin can manage all messages" ON contact_messages
  FOR ALL USING (auth.role() = 'service_role');