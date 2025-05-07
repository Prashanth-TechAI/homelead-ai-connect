
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";

interface ChatBotProps {
  messages: Array<{sender: string, text: string}>;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  companyName: string;
}

const ChatBot = ({ messages, onSendMessage, onClose, companyName }: ChatBotProps) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 shadow-lg rounded-lg overflow-hidden z-50 flex flex-col">
      <Card className="border-0 flex flex-col h-[500px]">
        <CardHeader className="bg-slate-800 text-white flex flex-row items-center justify-between p-4 shrink-0">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/26458218-528c-4c3f-b200-bcbd94b8f28a.png" 
              alt="HomeLead AI Logo" 
              className="h-6 w-6"
            />
            <div className="text-sm">
              <div className="font-medium">HomeLead AI</div>
              <div className="text-xs text-slate-300">{companyName}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-y-auto">
          <div className="py-4 px-4 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.sender === "user" 
                      ? "bg-emerald-600 text-white" 
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <CardFooter className="p-2 border-t flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            size="icon"
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatBot;
