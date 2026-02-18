import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { createUserStallBooking } from '@/lib/dbService';
import { StallBooking } from '@/lib/types';
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2, Box, Sparkles, Building2, Store } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Pricing configuration
const BOOTH_PRICING = {
  shell_space: 12000, // INR per sqm
  bare_space: 10000, // INR per sqm
};

export const StallBookingForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<StallBooking, 'id' | 'created_at' | 'status' | 'user_id'>>({
    booth_type: 'shell_space',
    space_requirement: 9, // Default min size
    name: '',
    job_title: '',
    company_name: '',
    country: '',
    mobile_no: '',
    email: '',
    terms_accepted: false,
  });

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Calculate cost based on type and size
    const rate = formData.booth_type === 'shell_space' ? BOOTH_PRICING.shell_space : BOOTH_PRICING.bare_space;
    setTotalCost(rate * (formData.space_requirement || 0));
  }, [formData.booth_type, formData.space_requirement]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBoothSelect = (type: 'shell_space' | 'bare_space') => {
    setFormData(prev => ({ ...prev, booth_type: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms_accepted) {
      toast.error('Please accept the Terms & Conditions');
      return;
    }

    setIsLoading(true);
    try {
      const result = await createUserStallBooking(formData);
      if (result.error) throw new Error(result.error.message);

      toast.success('Stall booking submitted successfully!');
      // Reset form or redirect
      setStep(1);
      setFormData(prev => ({ ...prev, name: '', email: '', mobile_no: '', company_name: '', terms_accepted: false }));
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      toast.error(error.message || 'Failed to submit booking');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full transition-colors", step === 1 ? "bg-teal text-white" : "bg-teal/10 text-teal")}>
            <span className="font-bold border-2 border-current w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            <span className="font-medium text-sm">Booth Selection</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-200"></div>
          <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full transition-colors", step === 2 ? "bg-teal text-white" : "bg-teal/10 text-teal")}>
            <span className="font-bold border-2 border-current w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
            <span className="font-medium text-sm">Details & Payment</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-teal/10 shadow-xl shadow-teal/5 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-8 space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center">Choose Your Space</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Shell Space Card */}
                    <div
                      onClick={() => handleBoothSelect('shell_space')}
                      className={cn(
                        "relative cursor-pointer group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg",
                        formData.booth_type === 'shell_space'
                          ? "border-teal bg-teal/5 ring-1 ring-teal/20"
                          : "border-gray-100 hover:border-teal/50"
                      )}
                    >
                      <div className="absolute top-4 right-4">
                        {formData.booth_type === 'shell_space' && <CheckCircle2 className="text-teal w-6 h-6" />}
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                        <Store className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Shell Scheme</h4>
                      <p className="text-2xl font-bold text-teal mb-4">₹12,000<span className="text-sm font-normal text-muted-foreground">/sqm</span></p>

                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Standard Octonorm Structure</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Fascia Name Board</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Spotlights & Power Socket</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>1 Table & 2 Chairs</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Carpet & Waste Bin</li>
                      </ul>
                      <p className="text-xs text-muted-foreground bg-white/50 p-2 rounded border border-gray-100">
                        Ready-to-use solution. Best for standard displays.
                      </p>
                    </div>

                    {/* Bare Space Card */}
                    <div
                      onClick={() => handleBoothSelect('bare_space')}
                      className={cn(
                        "relative cursor-pointer group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg",
                        formData.booth_type === 'bare_space'
                          ? "border-teal bg-teal/5 ring-1 ring-teal/20"
                          : "border-gray-100 hover:border-teal/50"
                      )}
                    >
                      <div className="absolute top-4 right-4">
                        {formData.booth_type === 'bare_space' && <CheckCircle2 className="text-teal w-6 h-6" />}
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Bare Space</h4>
                      <p className="text-2xl font-bold text-teal mb-4">₹10,000<span className="text-sm font-normal text-muted-foreground">/sqm</span></p>

                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Raw Floor Space Only</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Customize Your Own Design</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Ideal for Large Installations</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Direct Electricity Point</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal"></div>Minimum 18 sqm required</li>
                      </ul>
                      <p className="text-xs text-muted-foreground bg-white/50 p-2 rounded border border-gray-100">
                        Design freedom. Construction by own agency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Size Slider Input */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-lg font-semibold">Requirement Area (sqm)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        name="space_requirement"
                        value={formData.space_requirement}
                        onChange={handleChange}
                        min={formData.booth_type === 'bare_space' ? 18 : 9}
                        className="w-24 text-right font-bold text-lg"
                      />
                      <span className="text-muted-foreground">sqm</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Min: {formData.booth_type === 'bare_space' ? '18' : '9'} sqm</span>
                    <span className="text-teal font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Estimate: ₹{totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="button" onClick={nextStep} className="bg-teal hover:bg-teal/90 text-white px-8 py-6 rounded-xl text-lg group">
                    Next Step <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Contact Person</h3>
                    <div className="grid gap-4">
                      <div>
                        <Label>Full Name*</Label>
                        <Input name="name" value={formData.name} onChange={handleChange} required className="mt-1" placeholder="John Doe" />
                      </div>
                      <div>
                        <Label>Job Title*</Label>
                        <Input name="job_title" value={formData.job_title} onChange={handleChange} required className="mt-1" placeholder="Marketing Manager" />
                      </div>
                      <div>
                        <Label>Email Address*</Label>
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1" placeholder="john@company.com" />
                      </div>
                      <div>
                        <Label>Mobile Number*</Label>
                        <Input name="mobile_no" value={formData.mobile_no} onChange={handleChange} required className="mt-1" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Company Info</h3>
                    <div className="grid gap-4">
                      <div>
                        <Label>Company Name*</Label>
                        <Input name="company_name" value={formData.company_name} onChange={handleChange} required className="mt-1" placeholder="Green Tech Pvt Ltd" />
                      </div>
                      <div>
                        <Label>Country/Region*</Label>
                        <Input name="country" value={formData.country} onChange={handleChange} required className="mt-1" placeholder="India" />
                      </div>

                      <div className="bg-teal/5 p-4 rounded-xl border border-teal/10 mt-6">
                        <h4 className="font-semibold text-teal mb-2 flex items-center gap-2">
                          <Box className="w-4 h-4" /> Booking Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="font-medium capitalize">{formData.booth_type.replace('_', ' ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="font-medium">{formData.space_requirement} sqm</span>
                          </div>
                          <div className="border-t border-teal/10 my-2 pt-2 flex justify-between text-lg font-bold text-teal">
                            <span>Total Estimated:</span>
                            <span>₹{totalCost.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      name="terms_accepted"
                      checked={formData.terms_accepted}
                      onCheckedChange={(c) => setFormData(prev => ({ ...prev, terms_accepted: c === true }))}
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-snug">
                      I agree to the <a href="#" className="text-teal hover:underline">Terms and Conditions</a> and <a href="#" className="text-teal hover:underline">Privacy Policy</a>. I understand that this is a provisional booking request.
                    </Label>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button type="button" variant="ghost" onClick={prevStep} className="hover:bg-gray-100">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Choice
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-teal to-emerald-600 hover:opacity-90 text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-teal/20"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Confirm Booking Request'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};