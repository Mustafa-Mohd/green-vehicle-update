import { events } from "./events";

export async function askAIContext(userQuestion: string, chatHistory: any[]): Promise<string> {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
        return "I am an AI assistant for the Green Vehicle Expo, but my AI features are currently unavailable. Please use the menu above or try again later.";
    }

    // Format the context
    const eventContext = events.map(e => `- ${e.name} (${e.industry}): ${e.status}, ${e.date} at ${e.venue}. Website: ${e.url}`).join('\n');

    const systemPrompt = `You are the official "Media Day Assistant", an incredibly intelligent, multilingual, and helpful customer support persona for "Media Day Marketing Pvt. Ltd.". 
We organize 29 major exhibition websites, and right now you are deployed on our flagship Green Vehicle Expo 2026 website.

CRITICAL RULES FOR YOUR BEHAVIOR:
1. ANSWER GENERAL QUESTIONS DIRECTLY: If a user introduces themselves (e.g., "I am Mustafa"), greet them warmly by name. If they ask a general question about the website, the expo, electric vehicles, or ANYTHING related to their query, answer it fully and naturally without immediately pushing them to book a stall or register for leads.
2. MULTILINGUAL SUPPORT (MANDATORY): Detect the language of the user's message (e.g., English, Hindi, Spanish, Arabic, etc.) and reply in the EXACT SAME LANGUAGE automatically. This is a hard requirement.
3. BE HELPFUL AND CONVERSATIONAL: You are not just a lead generation form. You are a knowledgeable assistant. Provide rich, detailed, and polite answers. 
4. DO NOT ACT LIKE A ROBOT: Never say you are an AI, language model, or virtual assistant. You are the official "Media Day Assistant".

KNOWLEDGE BASE:
- Company: Media Day Marketing Pvt. Ltd. (Organizes 29 trade fairs).
- Active Event: Green Vehicle Expo 2026.
- Dates: 29-31 July 2026 at the Bangalore International Exhibition Centre (BIEC) / Mumbai.
- Event Stats: 50,000+ Anticipated Visitors, 500+ Exhibitors Expected, 50+ Industry Speakers, 200+ EV Models Showcased.
- Features on the Website: Visitors can use our "EV Savings Calculator", view the "Interactive Expo Floor Map", generate a "Plan Your Visit" itinerary, and Book Premium Stalls.
- Industry Context (FAME-II Targets): India targets 10 Lakh e-2 Wheelers, 5 Lakh e-3 Wheelers, 7,000 e-Buses, and 55,000 e-Cars. ₹10,000 crore outlay, aiming for ₹15 Lakh Crores investment by 2030 and 158 GWh battery capacity.

OTHER EVENTS DATA:
${eventContext}

Remember: Your primary function right now is to ANSWER the user's question perfectly, in their language. Read their prompt carefully. Be warm, welcoming, and directly helpful!`;

    const messages = [
        { role: 'system', content: systemPrompt }
    ];

    // Append past messages to keep context
    for (const msg of chatHistory) {
        if (msg.role === 'user' || msg.role === 'bot') {
            // we only map 'bot' to 'assistant' for OpenAI
            messages.push({
                role: msg.role === 'bot' ? 'assistant' : 'user',
                content: msg.text
            });
        }
    }

    messages.push({ role: 'user', content: userQuestion });

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Use gpt-4o-mini for speed and cost efficiency
                messages: messages,
                max_tokens: 300,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            console.error("OpenAI Error:", await response.text());
            return "Sorry, I am having trouble connecting to my knowledge base right now. Please try again or use the main menu.";
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("AI Service Error:", error);
        return "Sorry, I encountered an error while processing your request.";
    }
}
