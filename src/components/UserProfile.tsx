import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { LogOut, User, Settings, MapPin, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  email: string | null;
  full_name?: string;
  avatar_url?: string;
  company?: string;
  phone?: string;
}

export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // SUPABASE AUTHENTICATION COMMENTED OUT - Uncomment when authentication is needed
        /*
        const { data: { user } } = await supabase.auth.getUser();
          
        if (user) {
          // Fetch profile from database
          const { data, error, status } = await supabase
            .from('profiles')
            .select('id, email, full_name, avatar_url, company, phone, created_at, updated_at')
            .eq('id', user.id)
            .single();
              
          // If profile doesn't exist (status 406), handle gracefully
          if (status === 406 || (error && error.code === 'PGRST116')) { // Record not found
            const defaultProfile = {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}&backgroundColor=teal&fontSize=36`,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
              
            setUserProfile(defaultProfile as UserProfile);
            return; // Exit early to prevent error logging
          }
            
          if (error && !(error.code === 'PGRST116')) { // Don't log error if it's just record not found
            console.error('Error fetching profile:', error);
          } else if (data) {
            setUserProfile(data as UserProfile);
          }
        }
        */
          
        // For now, we'll simulate a user profile without authentication
        const guestProfile: UserProfile = {
          id: 'guest-id',
          email: 'guest@example.com',
          full_name: 'Guest User',
          avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Guest&backgroundColor=teal&fontSize=36',
          company: undefined,
          phone: undefined
        };
        setUserProfile(guestProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  
    // Listen for auth changes - COMMENTED OUT when authentication is disabled
    /*
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUserProfile(null);
      } else {
        fetchUserProfile();
      }
    });
  
    return () => {
      subscription.unsubscribe();
    };
    */
  }, []);

  const handleLogout = async () => {
    // SUPABASE AUTHENTICATION COMMENTED OUT - Uncomment when authentication is needed
    /*
    await supabase.auth.signOut();
    */
    // Redirect to login page
    navigate('/login');
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userProfile) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    try {
      // Upload to Supabase storage
      const fileName = `avatars/${userProfile.id}/${Date.now()}-${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user profile in database
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userProfile.id);

      if (profileError) throw profileError;

      // Update local state
      setUserProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null);

      alert('Avatar updated successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar');
    }
  };

  if (loading || !userProfile) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
        <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  const displayName = userProfile.full_name || 
                     userProfile.email?.split('@')[0] || 
                     'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userProfile.avatar_url} alt={displayName} />
            <AvatarFallback>
              {displayName
                .split(' ')
                .map(n => n[0])
                .join('')
                .substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userProfile.avatar_url} alt={displayName} />
            <AvatarFallback>
              {displayName
                .split(' ')
                .map(n => n[0])
                .join('')
                .substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[140px]">
              {userProfile.email}
            </p>
          </div>
        </div>
        <div className="p-2">
          {userProfile.company && (
            <Badge variant="secondary" className="text-xs">
              {userProfile.company}
            </Badge>
          )}
        </div>
        <DropdownMenuItem onClick={() => navigate('/events/green-vehicle-expo')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/events/green-vehicle-expo/planner')}>
          <MapPin className="mr-2 h-4 w-4" />
          <span>My Visit Planner</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/events/green-vehicle-expo/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Upload className="mr-2 h-4 w-4" />
              <span>Change Avatar</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Avatar</DialogTitle>
              <DialogDescription>
                Upload a new profile picture
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="avatar" className="text-right">Avatar</Label>
                <Input 
                  id="avatar" 
                  type="file" 
                  accept="image/*" 
                  className="col-span-3"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};