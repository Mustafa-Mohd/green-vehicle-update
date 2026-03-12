import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, MessageSquare, User, Mail, Phone, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChatLead {
    id: number;
    name: string;
    email: string;
    phone: string;
    chat_history: { role: string; text: string }[];
    last_updated: string;
}

export default function AdminChats() {
    const [leads, setLeads] = useState<ChatLead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const { data, error } = await supabase
                    .from("chatbot_leads")
                    .select("*")
                    .order("last_updated", { ascending: false });

                if (error) {
                    throw error;
                }

                setLeads(data || []);
            } catch (err: any) {
                console.error("Error fetching chats:", err);
                setError(err.message || "Could not fetch chat leads. Make sure the 'chatbot_leads' table exists in Supabase.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchChats();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2">Loading chats...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-slate-900 flex items-center gap-3">
                            <MessageSquare className="w-8 h-8 text-primary" />
                            Chatbot Leads
                        </h1>
                        <p className="text-slate-500 mt-1">Review all conversations and contact details captured by the Media Day Assistant.</p>
                    </div>
                    <Badge variant="outline" className="px-3 py-1 bg-white shadow-sm text-sm">
                        Total Leads: {leads.length}
                    </Badge>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 mb-8">
                        {error}
                    </div>
                )}

                {leads.length === 0 && !error ? (
                    <div className="text-center p-12 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-slate-900">No chats found</h3>
                        <p className="text-slate-500">When users interact with the chatbot, their details will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leads.map((lead) => (
                            <Card key={lead.id} className="flex flex-col h-[500px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-slate-50/80 border-b pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-500" />
                                                {lead.name || "Anonymous"}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-2">
                                                <Mail className="w-3.5 h-3.5" />
                                                {lead.email || "No email"}
                                            </CardDescription>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                <Phone className="w-3.5 h-3.5" />
                                                {lead.phone || "No phone"}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-4 font-medium">
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(lead.last_updated).toLocaleString()}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
                                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Chat History</h4>
                                    {lead.chat_history && lead.chat_history.length > 0 ? (
                                        lead.chat_history.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[85%] rounded-lg p-2.5 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-white border text-slate-700'}`}>
                                                    {msg.text.split(/(\*\*.*?\*\*)/).map((part, i) => {
                                                        if (part.startsWith('**') && part.endsWith('**')) {
                                                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                                                        }
                                                        return <span key={i}>{part}</span>;
                                                    })}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500 italic text-center py-4">No complete chat history saved.</p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
