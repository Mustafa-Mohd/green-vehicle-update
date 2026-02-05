// Types for the Expo Finder Pro application

export type VisitPurpose = "learning" | "purchasing" | "networking" | "investment";
export type InterestCategory = "two-wheeler" | "three-wheeler" | "four-wheeler" | "charging" | "battery";
export type TimeAvailability = "half-day" | "full-day" | "multiple-days";
export type PavilionCategory = "2w" | "battery" | "charging" | "startups" | "4w" | "3w";
export type PavilionStatus = "available" | "occupied" | "reserved";

// User Visit Plan
export interface VisitPlan {
  id?: string;
  userId?: string;
  createdAt?: string;
  formData: {
    purpose: VisitPurpose[];
    interests: InterestCategory[];
    timeAvailability: TimeAvailability;
  };
  results: {
    exhibitors: Exhibitor[];
    sessions: Session[];
    demos: Demo[];
    route: RoutePoint[];
  };
}

// Exhibitor
export interface Exhibitor {
  id: string;
  name: string;
  category: InterestCategory;
  location: string;
  boothNumber: string;
  description: string;
  contact: string;
  technologies: string[];
  estimatedTime: string;
}

// Session
export interface Session {
  id: string;
  title: string;
  speaker: string;
  time: string;
  location: string;
  category: InterestCategory;
  duration: string;
  description?: string;
  attendees?: number;
}

// Demo
export interface Demo {
  id: string;
  name: string;
  type: InterestCategory;
  location: string;
  estimatedTime: string;
  description?: string;
  features?: string[];
}

// Route Point
export interface RoutePoint {
  id: string;
  boothNumber: string;
  location: string;
  estimatedTime: string;
}

// Pavilion
export interface Pavilion {
  id: string;
  name: string;
  category: PavilionCategory;
  status: PavilionStatus;
  coordinates: { x: number; y: number };
  size: "small" | "medium" | "large";
  description: string;
  contact?: string;
  technologies?: string[];
}

// User
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

// Stall Booking
export interface StallBooking {
  id?: string;
  created_at?: string;
  booth_type: 'shell_space' | 'bare_space';
  space_requirement: number;
  name: string;
  job_title: string;
  company_name: string;
  country: string;
  mobile_no: string;
  email: string;
  terms_accepted: boolean;
  status?: 'pending' | 'confirmed' | 'cancelled';
  user_id?: string;
}

// Contact Message
export interface ContactMessage {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  organization?: string;
  mobile_number?: string;
  message: string;
  status?: 'pending' | 'read' | 'responded';
  user_id?: string;
}