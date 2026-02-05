import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createContactMessage } from '@/lib/dbService';
import { ContactMessage } from '@/lib/types';
import { Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const ContactForm = () => {
  const [formData, setFormData] = useState<Omit<ContactMessage, 'id' | 'created_at' | 'status' | 'user_id'>>({
    name: '',
    email: '',
    organization: '',
    mobile_number: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        toast.error('Please fill in all required fields');
        return;
      }

      const result = await createContactMessage(formData);
      
      if (result.error) {
        throw new Error(result.error.message || 'Failed to send message');
      }

      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        organization: '',
        mobile_number: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Error sending contact message:', error);
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg shadow-teal/10 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
        <p className="text-gray-600 text-sm mb-6">
          Your email address will not be published. Required fields are marked *
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-gray-900 font-semibold">
                Name* <span className="text-red-500">*</span>
              </Label>
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
              <Label htmlFor="email" className="text-gray-900 font-semibold">
                Email* <span className="text-red-500">*</span>
              </Label>
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
          </div>
          
          <div>
            <Label htmlFor="organization" className="text-gray-900 font-semibold">
              Organization
            </Label>
            <Input
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>
          
          <div>
            <Label htmlFor="mobile_number" className="text-gray-900 font-semibold">
              Mobile Number
            </Label>
            <Input
              id="mobile_number"
              name="mobile_number"
              type="tel"
              value={formData.mobile_number}
              onChange={handleChange}
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="text-gray-900 font-semibold">
              Message* <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="mt-2 bg-white border-gray-300 text-gray-900 focus:border-teal focus:ring-teal"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-teal to-emerald-500 hover:opacity-90 text-white font-bold py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};