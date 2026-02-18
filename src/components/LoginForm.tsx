import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AuthMode = "login" | "signup";

interface UserData {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  company?: string;
}

export const LoginForm = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    company: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // SUPABASE AUTHENTICATION COMMENTED OUT - Uncomment when authentication is needed
      /*
      const { error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
      });

      if (error) throw error;

      // Get user information after login
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Generate a default avatar based on user's name or email
        const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}&backgroundColor=teal&fontSize=36`;
        
        // Update user profile in database
        try {
          // First check if profile exists
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();
            
          let profileOperation;
          if (existingProfile) {
            // Update existing profile
            profileOperation = supabase
              .from('profiles')
              .update({
                avatar_url: defaultAvatar,
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id);
          } else {
            // Insert new profile
            profileOperation = supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email,
                avatar_url: defaultAvatar,
                updated_at: new Date().toISOString()
              });
          }
          
          const { error: profileError } = await profileOperation;
          
          if (profileError) throw profileError;
        } catch (profileErr) {
          console.error('Error updating profile:', profileErr);
        }
      }
      */

      // Redirect to the green vehicle expo page after login
      // Check if user should go to admin dashboard
      /* 
      // For demo purposes checking email
      if (userData.email.includes('admin')) {
         navigate("/admin");
      } else {
         navigate("/events/green-vehicle-expo");
      }
      */

      if (userData.email.includes('admin')) {
        navigate("/admin");
      } else {
        navigate("/events/green-vehicle-expo");
      }
    } catch (err: any) {
      setError(err.error_description || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // SUPABASE AUTHENTICATION COMMENTED OUT - Uncomment when authentication is needed
      /*
      const { error: signupError, data } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
            phone: userData.phone,
            company: userData.company
          }
        }
      });

      if (signupError) throw signupError;

      if (data.user) {
        // Save user information to database
        try {
          // Generate a default avatar based on user's name or email
          const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${userData.fullName || userData.email}&backgroundColor=teal&fontSize=36`;
          
          // Check if profile already exists
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', data.user.id)
            .single();
            
          let profileOperation;
          if (existingProfile) {
            // Update existing profile
            profileOperation = supabase
              .from('profiles')
              .update({
                full_name: userData.fullName,
                phone: userData.phone,
                company: userData.company,
                avatar_url: defaultAvatar,
                updated_at: new Date().toISOString()
              })
              .eq('id', data.user.id);
          } else {
            // Insert new profile
            profileOperation = supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                email: data.user.email,
                full_name: userData.fullName,
                phone: userData.phone,
                company: userData.company,
                avatar_url: defaultAvatar,
                updated_at: new Date().toISOString()
              });
          }
          
          const { error: profileError } = await profileOperation;
          
          if (profileError) throw profileError;
        } catch (profileErr) {
          console.error('Error saving profile:', profileErr);
        }
        
        // Redirect to the green vehicle expo page after signup
        navigate("/events/green-vehicle-expo");
      } else {
        // If email confirmation is required
        setError("Please check your email for confirmation. A confirmation email has been sent.");
      }
      */

      // Redirect to the green vehicle expo page after signup (without authentication)
      navigate("/events/green-vehicle-expo");
    } catch (err: any) {
      setError(err.error_description || err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
    setError(null);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-0 shadow-none bg-background/80 backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-teal">
            {authMode === "login" ? "Welcome Back" : "Join Expo"}
          </CardTitle>
          <CardDescription>
            {authMode === "login"
              ? "Sign in to access exclusive features"
              : "Create an account to personalize your expo experience"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={authMode === "login" ? handleLogin : handleSignup}>
          <CardContent className="space-y-4">
            {authMode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={userData.fullName}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company Name"
                      value={userData.company}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authMode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-teal hover:underline"
                  onClick={() => {
                    // Password reset functionality would go here
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-teal to-emerald-500 hover:from-teal/90 hover:to-emerald-500/90 text-white py-6 text-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {authMode === "login" ? "Signing in..." : "Creating account..."}
                </div>
              ) : authMode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>

            <Separator className="my-6" />

            <div className="text-center text-sm">
              {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="text-teal font-medium ml-1 hover:underline"
                onClick={toggleAuthMode}
              >
                {authMode === "login" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};