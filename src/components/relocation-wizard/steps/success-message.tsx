import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function SuccessMessage() {
  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Request Submitted Successfully</h2>
        <p className="text-muted-foreground max-w-md">
          Your relocation assistance request has been submitted successfully. Our team will review your request and contact you shortly.
        </p>
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="font-medium mb-2">What happens next?</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <span>Our team will review your request within 24-48 hours.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <span>You'll receive a confirmation email with your request details.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <span>A relocation specialist will contact you to discuss next steps.</span>
          </li>
        </ul>
      </div>
      
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
} 