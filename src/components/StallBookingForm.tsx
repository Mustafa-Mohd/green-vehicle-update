import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { createUserStallBooking } from '@/lib/dbService';
import { StallBooking } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const StallBookingForm = () => {
  const [formData, setFormData] = useState<Omit<StallBooking, 'id' | 'created_at' | 'status' | 'user_id'>>({
    booth_type: 'shell_space',
    space_requirement: 0,
    name: '',
    job_title: '',
    company_name: '',
    country: '',
    mobile_no: '',
    email: '',
    terms_accepted: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.terms_accepted) {
        toast.error('Please accept the Terms & Conditions');
        return;
      }

      const result = await createUserStallBooking(formData);
      
      if (result.error) {
        throw new Error(result.error.message || 'Failed to submit booking');
      }

      toast.success('Stall booking submitted successfully!');
      setFormData({
        booth_type: 'shell_space',
        space_requirement: 0,
        name: '',
        job_title: '',
        company_name: '',
        country: '',
        mobile_no: '',
        email: '',
        terms_accepted: false,
      });
    } catch (error: any) {
      console.error('Error submitting stall booking:', error);
      toast.error(error.message || 'Failed to submit stall booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-lg shadow-teal/10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="booth_type" className="text-gray-900 font-semibold">Booth Type*</Label>
            <RadioGroup 
              value={formData.booth_type} 
              onValueChange={(value) => handleRadioChange('booth_type', value)} 
              className="mt-3 grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:border-teal transition-colors cursor-pointer">
                <RadioGroupItem value="shell_space" id="shell_space" className="border-gray-400 data-[state=checked]:bg-teal data-[state=checked]:border-teal" />
                <Label htmlFor="shell_space" className="text-gray-800 font-medium cursor-pointer flex-1 text-center">Shell Space</Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:border-teal transition-colors cursor-pointer">
                <RadioGroupItem value="bare_space" id="bare_space" className="border-gray-400 data-[state=checked]:bg-teal data-[state=checked]:border-teal" />
                <Label htmlFor="bare_space" className="text-gray-800 font-medium cursor-pointer flex-1 text-center">Bare Space</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="space_requirement" className="text-gray-900 font-semibold">Space requirement (sqm)*</Label>
            <Input
              id="space_requirement"
              name="space_requirement"
              type="number"
              min="1"
              value={formData.space_requirement || ''}
              onChange={handleNumberChange}
              required
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-gray-900 font-semibold">Name*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>

          <div>
            <Label htmlFor="job_title" className="text-gray-900 font-semibold">Job Title*</Label>
            <Input
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              required
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>

          <div>
            <Label htmlFor="company_name" className="text-gray-900 font-semibold">Company Name*</Label>
            <Input
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>

          <div>
            <Label htmlFor="country" className="text-gray-900 font-semibold">Country*</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>

          <div>
            <Label htmlFor="mobile_no" className="text-gray-900 font-semibold">Mobile No*</Label>
            <Input
              id="mobile_no"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              required
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-900 font-semibold">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="terms_accepted"
              name="terms_accepted"
              checked={formData.terms_accepted}
              onCheckedChange={(checked) => handleRadioChange('terms_accepted', checked.toString())}
              className="mt-1 border-gray-400 data-[state=checked]:bg-teal data-[state=checked]:border-teal"
            />
            <Label htmlFor="terms_accepted" className="text-sm font-normal leading-6 text-gray-900">
              I agree to the Terms & Conditions*
            </Label>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-teal to-emerald-500 hover:opacity-90 text-white font-bold py-6 text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Book Your Stall'
          )}
        </Button>
      </form>
    </div>
  );
};