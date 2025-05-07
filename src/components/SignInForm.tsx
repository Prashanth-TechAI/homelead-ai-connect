
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface SignInFormProps {
  onSignIn: (companyName: string) => void;
}

const SignInForm = ({ onSignIn }: SignInFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyId.trim()) {
      toast.error("Please enter a Company ID or Name");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to /company/select
    setTimeout(() => {
      onSignIn(companyId);
      setIsOpen(false);
      setIsLoading(false);
    }, 800);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Company Login</h3>
            <p className="text-xs text-muted-foreground">Enter your Company ID to continue</p>
          </div>
          <Input
            placeholder="Enter Company ID or Name"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Connecting..." : "Login"}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default SignInForm;
