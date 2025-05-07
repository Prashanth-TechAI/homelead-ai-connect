
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import ChatBot from "@/components/ChatBot";
import WelcomeScreen from "@/components/WelcomeScreen";
import SignInForm from "@/components/SignInForm";

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{sender: string, text: string}>>([]);

  const handleSignIn = (company: string) => {
    setCompanyName(company);
    setIsSignedIn(true);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const startChat = () => {
    setShowWelcomeScreen(false);
    setChatMessages([
      { sender: "bot", text: `Hi there! What brings you here today?` }
    ]);
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: "user", text: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        text: "Thank you for your message. Our AI is processing your request. How else can I assist you today?"
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 flex justify-between items-center border-b border-slate-200">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/26458218-528c-4c3f-b200-bcbd94b8f28a.png" 
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
                    HomeLead AI provides advanced tools and analytics for real estate professionals. 
                    Sign in with your company ID to access personalized insights and support.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold mb-2">Lead Management</h3>
                      <p className="text-sm text-slate-600">Track and nurture potential clients with our AI-powered tools.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold mb-2">Market Analytics</h3>
                      <p className="text-sm text-slate-600">Get real-time insights on property trends and market conditions.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold mb-2">24/7 Support</h3>
                      <p className="text-sm text-slate-600">Our AI assistant is always ready to help with any questions.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Chat Icon */}
      {isSignedIn && !isChatOpen && (
        <div 
          className="fixed bottom-6 right-6 bg-emerald-600 h-14 w-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-emerald-700 transition-colors"
          onClick={toggleChat}
        >
          <MessageSquare className="h-6 w-6 text-white" />
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
