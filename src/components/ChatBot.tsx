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
    mockSaveExhibitor,
    mockSaveLeadAndChat
} from "@/lib/chatbotWorkflows";
import { askAIContext } from "@/lib/aiService";

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
            text: "Greetings! 👋 I am the **Media Day Assistant**.\n\nI can help you explore our upcoming events, answer your questions, or assist you with secure registrations and stall bookings.\n\nHow can I help you today?",
            options: QUICK_MENU_OPTIONS
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

        const userMessage = userInput.toLowerCase().trim();
        const smallTalk = ["hi", "hello", "hey", "how are you", "how r u", "how are u", "who are you", "good morning", "good evening", "good afternoon", "hola", "thanks", "ok", "assalamualaikum", "walaikum assalam", "i am", "i'm", "my name is", "iam "];
        const questionWords = ["what", "where", "when", "why", "how", "which", "tell me", "can you", "who", "about", "explain", "help", "know", "website", "details"];

        let intent = "workflow_input";
        if (QUICK_MENU_OPTIONS.includes(userInput) || ["Start Over", "Event Information", "Speak to Human"].includes(userInput)) {
            intent = "button_click";
        } else if (smallTalk.some(w => userMessage.includes(w)) || questionWords.some(w => userMessage.includes(w)) || userMessage.includes("?")) {
            intent = "question";
        } else if (flowState.activeFlow === "idle") {
            // Anything unrecognized in idle goes to AI
            intent = "question";
        }

        // 1. AI Routing & Interruptions
        if (intent === "question") {
            try {
                const aiResponse = await askAIContext(userInput, messages.slice(-5));

                if (flowState.activeFlow !== "idle") {
                    const { step, data } = flowState;
                    let field = "";
                    let action = "your registration";

                    if (flowState.activeFlow === "collect_lead") {
                        field = step === "name" ? "Full Name" : step === "email" ? "Email Address" : "Phone Number";
                        action = data.intendedAction ? `your ${data.intendedAction}` : action;
                    } else if (flowState.activeFlow === "visitor") {
                        field = step === "company" ? "Company Name" : step === "role" ? "Job Title" : step === "interest" ? "interest area" : step === "visit_type" ? "visit type" : "terms acceptance";
                        action = "visitor registration";
                    } else if (flowState.activeFlow === "exhibitor") {
                        field = step === "category" ? "category" : step === "space_req" ? "space requirement" : "product description";
                        action = "stall booking";
                    }

                    addBotMessage(aiResponse + `\n\nBy the way, could I still get your **${field}** to continue ${action}?`);
                } else {
                    addBotMessage(aiResponse, QUICK_MENU_OPTIONS);
                }

                // Save AI interaction too if we have lead info
                if (flowState.data.email) {
                    await mockSaveLeadAndChat(flowState.data, [...messages, { role: "user", text: userInput }, { role: "bot", text: aiResponse }]);
                }
            } catch (error) {
                console.error("AI Context Error:", error);
                addBotMessage("Sorry, I am having trouble connecting to my knowledge base right now. Please try again or use the main menu.", QUICK_MENU_OPTIONS);
            }
            setIsLoading(false);
            return;
        }

        // 2. Button Clicks & Quick Menu overrides
        if (intent === "button_click") {
            if (userInput.toLowerCase() === "start over") {
                setFlowState({ activeFlow: "idle", step: "start", data: {} });
                addBotMessage("Greetings! How can I help you today?", QUICK_MENU_OPTIONS);
            } else if (userInput === "Register as Visitor") {
                if (flowState.data.email) {
                    setFlowState({ activeFlow: "visitor", step: "company", data: flowState.data });
                    addBotMessage("Let's continue with your visitor registration.\n\nPlease provide your **Company Name**");
                } else {
                    setFlowState({ activeFlow: "collect_lead", step: "name", data: { ...flowState.data, intendedAction: "Register as Visitor" } });
                    addBotMessage("I'd love to help you register! To get started securely, please tell me your **Full Name**\n*(as per your government ID)*");
                }
            } else if (userInput === "Book a Stall" || userInput === "Stall Booking") {
                if (flowState.data.email) {
                    setFlowState({ activeFlow: "exhibitor", step: "category", data: flowState.data });
                    addBotMessage("Interested in **exhibiting at Green Vehicle Expo 2026?**\nLet's continue gathering a few details.\n\nSelect the category that best describes your company.", EXHIBITOR_CATEGORIES);
                } else {
                    setFlowState({ activeFlow: "collect_lead", step: "name", data: { ...flowState.data, intendedAction: "Book a Stall" } });
                    addBotMessage("Interested in **exhibiting at Green Vehicle Expo 2026?** Exhibiting gives you access to industry professionals, OEMs, and investors.\n\nBefore we capture the stall requirement, please tell me your **Full Name**");
                }
            } else if (userInput === "Event Information") {
                setFlowState({ activeFlow: "idle", step: "start", data: flowState.data });
                addBotMessage(EVENT_INFO, ["Register as Visitor", "Book a Stall"]);
            } else if (userInput === "Venue Location") {
                setFlowState({ activeFlow: "idle", step: "start", data: flowState.data });
                addBotMessage("📍 **Venue:** Bangalore International Exhibition Centre (BIEC)\n10th Mile, Tumkur Road, Madavara Post, Dasanapura Hubli, Bengaluru, Karnataka 562123", ["Register as Visitor", "Book a Stall"]);
            } else if (userInput === "Speak to Human") {
                setFlowState({ activeFlow: "idle", step: "start", data: flowState.data });
                addBotMessage("Our support team will get in touch with you shortly. You can also reach us at support@greenvehicleexpo.com", QUICK_MENU_OPTIONS);
            } else {
                setFlowState({ activeFlow: "idle", step: "start", data: flowState.data });
                addBotMessage("How can I help you today?", QUICK_MENU_OPTIONS);
            }
            setIsLoading(false);
            return;
        }

        // 3. Workflow Input Processing
        if (flowState.activeFlow === "collect_lead") {
            const { step, data } = flowState;

            if (step === "name") {
                setFlowState({ ...flowState, step: "email", data: { ...data, name: userInput } });
                addBotMessage(`Thanks ${userInput}! Please enter your **Email Address**.`);
            } else if (step === "email") {
                if (!isValidEmail(userInput)) {
                    addBotMessage("Please enter a valid email address.");
                } else {
                    setFlowState({ ...flowState, step: "phone", data: { ...data, email: userInput } });
                    addBotMessage("Great! Finally, please enter your **Phone Number**.");
                }
            } else if (step === "phone") {
                if (!isValidPhone(userInput)) {
                    addBotMessage("Please enter a valid phone number, starting with +91.");
                } else {
                    const finalData = { ...data, phone: userInput } as any;
                    await mockSaveLeadAndChat(finalData, [...messages, { role: "user", text: userInput }]);

                    if (data.intendedAction === "Register as Visitor") {
                        setFlowState({ activeFlow: "visitor", step: "company", data: finalData });
                        addBotMessage(`Thank you, ${finalData.name}! Let's continue with your visitor registration.\n\nPlease provide your **Company Name**`);
                    } else if (data.intendedAction === "Book a Stall") {
                        setFlowState({ activeFlow: "exhibitor", step: "category", data: finalData });
                        addBotMessage(`Thank you, ${finalData.name}! Let's continue gathering a few details for your stall booking.\n\nSelect the category that best describes your company.`, EXHIBITOR_CATEGORIES);
                    } else {
                        setFlowState({ activeFlow: "idle", step: "start", data: finalData });
                        addBotMessage(`Thank you, ${finalData.name}! How can I help you further?`, QUICK_MENU_OPTIONS);
                    }
                }
            }
            setIsLoading(false);
            return;
        }

        if (flowState.activeFlow === "visitor") {
            const { step, data } = flowState;

            if (step === "company") {
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
                    setFlowState({ activeFlow: "idle", step: "start", data: flowState.data });
                    addBotMessage("Registration cancelled. You must accept the terms to register.", QUICK_MENU_OPTIONS);
                } else {
                    setFlowState({ ...flowState, step: "consent", data: { ...data, compliance: true } });
                    addBotMessage("Do you agree to receive **event updates and announcements** related to the expo?", ["Yes", "No"]);
                }
            } else if (step === "consent") {
                const finalData = { ...data, consent: userInput === "Yes" } as any;
                await mockSaveVisitor(finalData);
                setFlowState({ activeFlow: "idle", step: "start", data: finalData });
                addBotMessage(`🎉 **Registration Complete!**\n\nThank you **${finalData.name}** for registering for **Green Vehicle Expo 2026**.\nYour registration details have been successfully recorded.\n\n📍 **Venue:** Bangalore International Exhibition Centre\n📅 **Dates:** 29 – 31 July 2026\n🕘 **Entry Time:** 9:30 AM onwards\n\nPlease bring:\n- Valid Photo ID\n- Business Card (recommended)\n\nWe look forward to welcoming you! 🚗⚡`, QUICK_MENU_OPTIONS);
            }
            setIsLoading(false);
            return;
        }

        if (flowState.activeFlow === "exhibitor") {
            const { step, data } = flowState;

            if (step === "category") {
                setFlowState({ ...flowState, step: "space_req", data: { ...data, category: userInput } });
                addBotMessage("Do you have an estimated **stall space requirement**?", ["Bare Space (min 36 sqm)", "Shell Scheme (9 sqm)", "Shell Scheme (12 sqm)", "Shell Scheme (18 sqm)", "Not Sure - Need Assistance"]);
            } else if (step === "space_req") {
                setFlowState({ ...flowState, step: "product_desc", data: { ...data, stall_type: userInput } });
                addBotMessage("Please briefly describe **what products or services you plan to showcase** (e.g., EV batteries, charging stations, software)");
            } else if (step === "product_desc") {
                const finalData = { ...data, product_description: userInput } as any;
                await mockSaveExhibitor(finalData);
                setFlowState({ activeFlow: "idle", step: "start", data: finalData });
                addBotMessage(`✅ **Thank you for your interest in exhibiting!**\n\nYour exhibitor enquiry has been successfully recorded.\nA representative will review your request and assist you with:\n- Stall options\n- Space planning\n- Participation details\n\nWe look forward to having **${finalData.company || finalData.name}** at **Green Vehicle Expo 2026** 🚗⚡`, QUICK_MENU_OPTIONS);
            }
            setIsLoading(false);
            return;
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
