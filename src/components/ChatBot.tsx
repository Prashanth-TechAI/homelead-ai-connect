
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

  const renderSuggestedQuestions = () => {
    // Get the last bot message
    const lastBotMessage = [...messages].reverse().find(msg => msg.sender === "bot");
    
    // Check if it has suggested questions (format: "text [question1, question2]")
    if (lastBotMessage && lastBotMessage.text.includes("[")) {
      const match = lastBotMessage.text.match(/\[(.*?)\]/);
      if (match && match[1]) {
        const questions = match[1].split(",").map(q => q.trim());
        if (questions.length > 0) {
          return (
            <div className="px-4 pb-2">
              <p className="text-xs text-slate-500 mb-1">Suggested questions:</p>
              <div className="flex flex-wrap gap-1">
                {questions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMessage(question);
                      // Focus input after setting message
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="text-xs bg-slate-100 hover:bg-slate-200 rounded px-2 py-1 text-slate-700"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          );
        }
      }
    }
    return null;
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 shadow-lg rounded-lg overflow-hidden z-50 flex flex-col">
      <Card className="border-0 flex flex-col h-[500px]">
        <CardHeader className="bg-slate-800 text-white flex flex-row items-center justify-between p-4 shrink-0">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/fb4ff85b-8993-429f-8a1b-338eb18944fe.png" 
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

        {renderSuggestedQuestions()}

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
