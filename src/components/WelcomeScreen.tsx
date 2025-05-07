
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, CheckCircle } from "lucide-react";

interface WelcomeScreenProps {
  companyName: string;
  onClose: () => void;
  onStartChat: () => void;
}

const WelcomeScreen = ({ companyName, onClose, onStartChat }: WelcomeScreenProps) => {
  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 shadow-lg rounded-lg overflow-hidden z-50">
      <Card className="border-0">
        <CardHeader className="bg-slate-800 text-white flex flex-row items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/26458218-528c-4c3f-b200-bcbd94b8f28a.png" 
              alt="HomeLead AI Logo" 
              className="h-8 w-8"
            />
            <CardTitle className="text-lg">HomeLead AI</CardTitle>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4 py-2">
            <h2 className="text-xl font-semibold">Hello {companyName}!</h2>
            <p className="text-slate-600">How can we help you today?</p>
            
            <div className="bg-slate-50 p-3 rounded-md flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Status: All Systems Operational</span>
            </div>
            
            <div className="space-y-2">
              <div className="border-b border-slate-200 py-2">
                <p className="text-sm text-slate-700">Lead Generation Services</p>
              </div>
              <div className="border-b border-slate-200 py-2">
                <p className="text-sm text-slate-700">Property Analysis Tools</p>
              </div>
              <div className="border-b border-slate-200 py-2">
                <p className="text-sm text-slate-700">Customer Support</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 p-4">
          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={onStartChat}
          >
            Start Chat
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
