import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl font-bold">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">Green Vehicle Expo</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Sign in to access exclusive features like personalized visit planning, 
                  interactive maps, and more!
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-teal"></div>
                    </div>
                  </div>
                  <h3 className="font-semibold">Personalized Plans</h3>
                  <p className="text-sm text-muted-foreground">Custom visit itineraries</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <h3 className="font-semibold">Interactive Maps</h3>
                  <p className="text-sm text-muted-foreground">Find exhibitors easily</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-teal"></div>
                    </div>
                  </div>
                  <h3 className="font-semibold">Session Booking</h3>
                  <p className="text-sm text-muted-foreground">Reserve your spots</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <h3 className="font-semibold">Priority Access</h3>
                  <p className="text-sm text-muted-foreground">Skip the lines</p>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <LoginForm />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;