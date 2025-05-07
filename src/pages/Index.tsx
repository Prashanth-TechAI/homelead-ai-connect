
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Server, Database } from "lucide-react";
import ChatBot from "@/components/ChatBot";
import WelcomeScreen from "@/components/WelcomeScreen";
import SignInForm from "@/components/SignInForm";
import { toast } from "sonner";

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{sender: string, text: string}>>([]);

  const handleSignIn = (company: string) => {
    setCompanyName(company);
    setIsSignedIn(true);
    
    // In a real implementation, this would call the backend API
    // POST /company/select with company_identifier=company
    console.log(`Selected company: ${company}`);
    toast.success(`Welcome, ${company}!`);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const startChat = () => {
    setShowWelcomeScreen(false);
    setChatMessages([
      { sender: "bot", text: `Hello! How can I assist you with HomeLead AI today?` }
    ]);
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: "user", text: message }]);
    
    // In a real implementation, this would call the backend API
    // POST /chat/query with query=message
    setTimeout(() => {
      const responses = [
        { 
          text: "We currently have 5 active projects. Would you like to see more details?",
          followUp: ["Show project details", "What's the total value?"]
        },
        { 
          text: "Your lead conversion rate is 24%, which is 5% higher than last month.",
          followUp: ["What's the industry average?", "Show trend chart"]
        },
        { 
          text: "There are 12 new leads in the system that have not been assigned yet.",
          followUp: ["Assign leads automatically", "Show lead details"]
        }
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const suggestionText = randomResponse.followUp.length > 0 
        ? ` [${randomResponse.followUp.join(", ")}]` 
        : "";
        
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        text: randomResponse.text + suggestionText
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 flex justify-between items-center border-b border-slate-200">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/fb4ff85b-8993-429f-8a1b-338eb18944fe.png" 
            alt="HomeLead AI" 
            className="h-8 mr-2"
          />
          <h1 className="text-xl font-bold text-slate-800">HomeLead AI</h1>
        </div>
        
        {!isSignedIn && (
          <SignInForm onSignIn={handleSignIn} />
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        {isSignedIn ? (
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-4xl font-bold mb-4 text-slate-800">WELCOME TO HOMELEAD</h1>
            <p className="text-xl text-slate-600 mb-8">Click on the icon to chat with us</p>
          </div>
        ) : (
          <div className="max-w-4xl w-full">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome to HomeLead AI</CardTitle>
                <CardDescription>
                  Your intelligent real estate assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-slate-700">
                    HomeLead AI is a real-time, AI-powered chatbot system built for real estate companies.
                    Sign in with your company ID to access personalized insights and support.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                      <MessageSquare className="h-8 w-8 text-emerald-600 mb-2" />
                      <h3 className="font-semibold mb-2 text-center">Semantic Pipeline</h3>
                      <p className="text-sm text-slate-600 text-center">LLM + Qdrant for conversational answers</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                      <Database className="h-8 w-8 text-emerald-600 mb-2" />
                      <h3 className="font-semibold mb-2 text-center">Analytical Pipeline</h3>
                      <p className="text-sm text-slate-600 text-center">PandasAI + Postgres for data insights</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                      <Server className="h-8 w-8 text-emerald-600 mb-2" />
                      <h3 className="font-semibold mb-2 text-center">Real-Time Sync</h3>
                      <p className="text-sm text-slate-600 text-center">MongoDB → Postgres + Qdrant watchers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="text-sm text-slate-500">
                  Maintained by AI Team • Status: Production-Ready
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>

      {/* Chat Icon */}
      {isSignedIn && !isChatOpen && (
        <div 
          className="fixed bottom-6 right-6 bg-slate-800 h-14 w-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-slate-700 transition-colors"
          onClick={toggleChat}
        >
          <img
            src="/lovable-uploads/fb4ff85b-8993-429f-8a1b-338eb18944fe.png"
            alt="Chat"
            className="h-8 w-8"
          />
        </div>
      )}

      {/* Chat Interface */}
      {isSignedIn && isChatOpen && (
        showWelcomeScreen ? (
          <WelcomeScreen 
            companyName={companyName}
            onClose={toggleChat}
            onStartChat={startChat}
          />
        ) : (
          <ChatBot 
            messages={chatMessages}
            onSendMessage={sendMessage}
            onClose={toggleChat}
            companyName={companyName}
          />
        )
      )}
    </div>
  );
};

export default Index;
