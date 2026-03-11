import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    FlowState,
    QUICK_MENU_OPTIONS,
    EVENT_INFO,
    VISITOR_ROLES,
    INTEREST_AREAS,
    EXHIBITOR_CATEGORIES,
    isValidEmail,
    isValidPhone,
    mockSaveVisitor,
    mockSaveExhibitor
} from "@/lib/chatbotWorkflows";

interface Message {
    role: "user" | "bot";
    text: string;
    options?: string[];
}

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "bot",
            text: "Welcome to the **Green Vehicle Expo 2026 Assistant 🚗⚡**\n\nExplore the future of **electric and hybrid mobility** at the **BIEC Bangalore** from **29–31 July 2026**.\n\nI can help you **register as a visitor** or **book a stall** for the event.",
            options: ["Register as Visitor", "Book a Stall", "Event Information", "Speak to Human"]
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [flowState, setFlowState] = useState<FlowState>({
        activeFlow: "idle",
        step: "start",
        data: {}
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen, isLoading]);

    const addBotMessage = (text: string, options?: string[]) => {
        setMessages((prev) => [...prev, { role: "bot", text, options }]);
    };

    const addUserMessage = (text: string) => {
        setMessages((prev) => [...prev, { role: "user", text }]);
    };

    const processInput = async (userInput: string) => {
        addUserMessage(userInput);
        setInput("");
        setIsLoading(true);

        // Give it a tiny delay to feel conversational
        await new Promise((res) => setTimeout(res, 600));

        // Common Fallback / Quick Menu check
        if (QUICK_MENU_OPTIONS.includes(userInput) || userInput === "Start Over" || userInput === "Event Information" || userInput === "Speak to Human") {
            if (userInput === "Register as Visitor") {
                setFlowState({ activeFlow: "visitor", step: "name", data: {} });
                addBotMessage("Let's start with your details.\n\nPlease enter your **Full Name**\n*(as per your government ID)*");
            } else if (userInput === "Book a Stall" || userInput === "Stall Booking") {
                setFlowState({ activeFlow: "exhibitor", step: "name", data: {} });
                addBotMessage("Interested in **exhibiting at Green Vehicle Expo 2026?**\nExhibiting gives you access to industry professionals, OEMs, suppliers, and investors.\n\nLet's collect a few details about your company.\n\nPlease enter your **Name**");
            } else if (userInput === "Event Information") {
                setFlowState({ activeFlow: "idle", step: "start", data: {} });
                addBotMessage(EVENT_INFO, ["Register as Visitor", "Book a Stall"]);
            } else if (userInput === "Venue Location") {
                setFlowState({ activeFlow: "idle", step: "start", data: {} });
                addBotMessage("📍 **Venue:** Bangalore International Exhibition Centre (BIEC)\n10th Mile, Tumkur Road, Madavara Post, Dasanapura Hubli, Bengaluru, Karnataka 562123", ["Register as Visitor", "Book a Stall"]);
            } else if (userInput === "Speak to Human") {
                setFlowState({ activeFlow: "idle", step: "start", data: {} });
                addBotMessage("Our support team will get in touch with you shortly. You can also reach us at support@greenvehicleexpo.com", QUICK_MENU_OPTIONS);
            } else {
                setFlowState({ activeFlow: "idle", step: "start", data: {} });
                addBotMessage("How can I help you today?", QUICK_MENU_OPTIONS);
            }
            setIsLoading(false);
            return;
        }

        // PROCESS VISITOR FLOW
        if (flowState.activeFlow === "visitor") {
            const { step, data } = flowState;

            if (step === "name") {
                setFlowState({ ...flowState, step: "email", data: { ...data, name: userInput } });
                addBotMessage(`Thanks ${userInput}.\nPlease enter your **Official Email Address**\n(e.g., name@company.com)`);
            } else if (step === "email") {
                if (!isValidEmail(userInput)) {
                    addBotMessage("Please enter a valid email address containing '@' and a domain.");
                } else {
                    setFlowState({ ...flowState, step: "phone", data: { ...data, email: userInput } });
                    addBotMessage("Please enter your **Mobile Number**\nFormat: +91 followed by 10 digits (e.g. +919876543210)");
                }
            } else if (step === "phone") {
                if (!isValidPhone(userInput)) {
                    addBotMessage("Please enter a valid phone number, starting with +91 and followed by 10 digits.");
                } else {
                    setFlowState({ ...flowState, step: "company", data: { ...data, phone: userInput } });
                    addBotMessage("Please provide your **Company Name**");
                }
            } else if (step === "company") {
                setFlowState({ ...flowState, step: "role", data: { ...data, company: userInput } });
                addBotMessage("Select your **Job Title / Role**", VISITOR_ROLES);
            } else if (step === "role") {
                setFlowState({ ...flowState, step: "interest", data: { ...data, role: userInput } });
                addBotMessage("To personalize your expo experience, select your **primary interest area**", INTEREST_AREAS);
            } else if (step === "interest") {
                setFlowState({ ...flowState, step: "visit_type", data: { ...data, interest: userInput } });
                addBotMessage("Please choose your **visit type**", ["Single Day Pass - July 29", "Single Day Pass - July 30", "Single Day Pass - July 31", "Business Pass - 3 Days"]);
            } else if (step === "visit_type") {
                setFlowState({ ...flowState, step: "compliance", data: { ...data, visit_type: userInput } });
                addBotMessage("Please review the entry requirements:\n✔ Entry allowed **only for visitors aged 18+**\n✔ Valid **Photo ID required at entry** (Aadhaar, Passport, DL, Company ID)\n\nDo you accept these terms?", ["Yes, I accept", "No"]);
            } else if (step === "compliance") {
                if (userInput === "No") {
                    setFlowState({ activeFlow: "idle", step: "start", data: {} });
                    addBotMessage("Registration cancelled. You must accept the terms to register.", QUICK_MENU_OPTIONS);
                } else {
                    setFlowState({ ...flowState, step: "consent", data: { ...data, compliance: true } });
                    addBotMessage("Do you agree to receive **event updates and announcements** related to the expo?", ["Yes", "No"]);
                }
            } else if (step === "consent") {
                const finalData = { ...data, consent: userInput === "Yes" };
                await mockSaveVisitor(finalData);
                setFlowState({ activeFlow: "idle", step: "start", data: {} });
                addBotMessage(`🎉 **Registration Complete!**\n\nThank you **${finalData.name}** for registering for **Green Vehicle Expo 2026**.\nYour registration details have been successfully recorded.\n\n📍 **Venue:** Bangalore International Exhibition Centre\n📅 **Dates:** 29 – 31 July 2026\n🕘 **Entry Time:** 9:30 AM onwards\n\nPlease bring:\n- Valid Photo ID\n- Business Card (recommended)\n\nWe look forward to welcoming you! 🚗⚡`, QUICK_MENU_OPTIONS);
            }
        }
        // PROCESS EXHIBITOR FLOW
        else if (flowState.activeFlow === "exhibitor") {
            const { step, data } = flowState;

            if (step === "name") {
                setFlowState({ ...flowState, step: "company", data: { ...data, name: userInput } });
                addBotMessage(`Thanks ${userInput}.\nPlease enter your **Company Name**`);
            } else if (step === "company") {
                setFlowState({ ...flowState, step: "email", data: { ...data, company: userInput } });
                addBotMessage("Please enter your **Official Email**");
            } else if (step === "email") {
                if (!isValidEmail(userInput)) {
                    addBotMessage("Please enter a valid email address containing '@' and a domain.");
                } else {
                    setFlowState({ ...flowState, step: "phone", data: { ...data, email: userInput } });
                    addBotMessage("Please enter your **Contact Number** (e.g., +919876543210)");
                }
            } else if (step === "phone") {
                if (!isValidPhone(userInput)) {
                    addBotMessage("Please enter a valid phone number, starting with +91.");
                } else {
                    setFlowState({ ...flowState, step: "category", data: { ...data, phone: userInput } });
                    addBotMessage("Select the category that best describes your company.", EXHIBITOR_CATEGORIES);
                }
            } else if (step === "category") {
                setFlowState({ ...flowState, step: "space_req", data: { ...data, category: userInput } });
                addBotMessage("Do you have an estimated **stall space requirement**?", ["Bare Space (min 36 sqm)", "Shell Scheme (9 sqm)", "Shell Scheme (12 sqm)", "Shell Scheme (18 sqm)", "Not Sure - Need Assistance"]);
            } else if (step === "space_req") {
                setFlowState({ ...flowState, step: "product_desc", data: { ...data, stall_type: userInput } });
                addBotMessage("Please briefly describe **what products or services you plan to showcase** (e.g., EV batteries, charging stations, software)");
            } else if (step === "product_desc") {
                const finalData = { ...data, product_description: userInput };
                await mockSaveExhibitor(finalData);
                setFlowState({ activeFlow: "idle", step: "start", data: {} });
                addBotMessage(`✅ **Thank you for your interest in exhibiting!**\n\nYour exhibitor enquiry has been successfully recorded.\nA representative will review your request and assist you with:\n- Stall options\n- Space planning\n- Participation details\n\nWe look forward to having **${finalData.company}** at **Green Vehicle Expo 2026** 🚗⚡`, QUICK_MENU_OPTIONS);
            }
        }
        // FALLBACK
        else {
            addBotMessage("I'm sorry, I didn't understand that. Please choose one of the options below.", QUICK_MENU_OPTIONS);
        }

        setIsLoading(false);
    };

    const handleSend = () => {
        if (!input.trim()) return;
        processInput(input.trim());
    };

    const handleOptionClick = (option: string) => {
        if (isLoading) return;
        processInput(option);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-4 md:right-6 z-[9999] w-[calc(100vw-2rem)] md:w-[380px] h-[500px] md:h-[600px] max-h-[75vh] md:max-h-[80vh] bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="p-3 bg-primary text-primary-foreground flex items-center justify-between shadow-md">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-inner bg-white/10">
                                    <img src="/chatbot-avatar.png" alt="Bot Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm md:text-base">Expo Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-xs opacity-90">Online</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/20 text-white">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50" ref={scrollRef}>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn("flex flex-col gap-2 max-w-[95%]", msg.role === "user" ? "ml-auto items-end" : "items-start")}
                                >
                                    <div className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                                        <div
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden",
                                                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-white border"
                                            )}
                                        >
                                            {msg.role === "user" ? <User className="w-4 h-4" /> : <img src="/chatbot-avatar.png" alt="Bot" className="w-full h-full object-cover" />}
                                        </div>
                                        <div
                                            className={cn(
                                                "p-3 rounded-2xl text-[13px] md:text-sm shadow-sm leading-relaxed whitespace-pre-wrap",
                                                msg.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                                            )}
                                        >
                                            {/* Very simple bold parser for the chatbot text formatting */}
                                            {msg.text.split(/(\*\*.*?\*\*)/).map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                                                }
                                                return <span key={i}>{part}</span>;
                                            })}
                                        </div>
                                    </div>

                                    {/* Options rendering */}
                                    {msg.options && msg.options.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 ml-11 mt-1">
                                            {msg.options.map((option, optIdx) => (
                                                <button
                                                    key={optIdx}
                                                    onClick={() => handleOptionClick(option)}
                                                    disabled={isLoading}
                                                    className="text-[11px] md:text-xs font-medium px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 hover:border-teal-300 transition-colors disabled:opacity-50 text-left"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white border shadow-sm overflow-hidden">
                                        <img src="/chatbot-avatar.png" alt="Bot" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-3 rounded-2xl rounded-tl-none bg-white border border-slate-100 shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                                        <span className="text-xs text-slate-500">Typing...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-background border-t border-border">
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type a message..."
                                    className="flex-1 focus-visible:ring-primary text-black text-sm"
                                    disabled={isLoading}
                                />
                                <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon" className="shrink-0">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 md:right-6 z-[9999] w-14 h-14 bg-gradient-to-tr from-teal-500 to-emerald-600 text-white rounded-full shadow-xl shadow-teal-500/30 flex items-center justify-center hover:shadow-2xl hover:shadow-teal-500/40 transition-shadow"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X className="w-7 h-7" />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="w-10 h-10 rounded-full overflow-hidden">
                            <img src="/chatbot-avatar.png" alt="Chat" className="w-full h-full object-cover" />
                        </motion.div>
                    )}
                </AnimatePresence>
                {!isOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-bounce" />}
            </motion.button>
        </>
    );
};
