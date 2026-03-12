export type FlowState = {
    activeFlow: 'idle' | 'visitor' | 'exhibitor' | 'human' | 'info' | 'collect_lead' | 'ai_chat';
    step: string;
    data: Record<string, any>;
};

export const QUICK_MENU_OPTIONS = [
    "Register as Visitor",
    "Book a Stall",
    "Event Information",
    "Venue Location",
    "Speak to Human"
];

export const EVENT_INFO = `
**Event:** Green Vehicle Expo 2026
**Venue:** Bangalore International Exhibition Centre (BIEC)
**Dates:** 29 – 31 July 2026
**Timings:** 9:30 AM onwards

Explore the future of electric and hybrid mobility!
`;

export const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone: string) => {
    return /^\+91\d{10,13}$/.test(phone);
};

export const VISITOR_ROLES = [
    "Owner / Director / CXO",
    "Senior Manager",
    "Manager",
    "Engineer / Technical Professional",
    "Dealer / Distributor",
    "Investor",
    "Student / Researcher",
    "Other"
];

export const INTEREST_AREAS = [
    "Electric Vehicles (2W / 3W / 4W)",
    "Hybrid Vehicles",
    "Batteries & Energy Storage",
    "Charging Infrastructure",
    "Spare Parts & Accessories",
    "Manufacturing Equipment",
    "Automotive Software / Technology",
    "EV Startups",
    "Other"
];

export const EXHIBITOR_CATEGORIES = [
    "Electric / Hybrid Vehicle Manufacturer",
    "Battery Manufacturer / Battery Pack Assembler",
    "Component Supplier (Tier 1 / Tier 2)",
    "Charging Infrastructure Provider",
    "Automotive Software / Testing Services",
    "EV Startup",
    "Dealer / Distributor",
    "Media / Association",
    "Other"
];

import { supabase } from './supabase';

export const mockSaveVisitor = async (data: any) => {
    console.table("Visitor Registration:", data);
    try {
        await supabase.from('chatbot_visitors').insert([data]);
    } catch (e) {
        console.error("Supabase insert failed", e);
    }
    return { success: true };
};

export const mockSaveExhibitor = async (data: any) => {
    console.table("Exhibitor Registration:", data);
    try {
        await supabase.from('chatbot_exhibitors').insert([data]);
    } catch (e) {
        console.error("Supabase insert failed", e);
    }
    return { success: true };
};

export const mockSaveLeadAndChat = async (data: any, chatHistory: any[]) => {
    console.log("Saving Lead Information:", data);
    console.log("Saving Chat History:", chatHistory);
    try {
        await supabase.from('chatbot_leads').insert([{
            name: data.name,
            email: data.email,
            phone: data.phone,
            chat_history: chatHistory,
            last_updated: new Date().toISOString()
        }]);
    } catch (e) {
        console.error("Failed to save to Supabase", e);
    }

    return { success: true };
};
