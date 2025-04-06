import { CheckCircle2, Home, ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export function SuccessMessage() {
  return (
    <div className="py-8 flex flex-col items-center text-center">
      <div className="rounded-full bg-green-100 p-3 mb-4">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Your property has been successfully added!</h2>
      
      <p className="text-muted-foreground mb-6 max-w-lg">
        Thank you for making your property available. We have received your submission and will process it as soon as possible.
      </p>
      
      <div className="bg-blue-50 rounded-lg p-6 max-w-md mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Home className="text-blue-600" />
          <h3 className="font-semibold text-blue-700">What happens next?</h3>
        </div>
        <ul className="text-sm text-left space-y-2 text-blue-700">
          <li className="flex gap-2">
            <span className="font-medium">1.</span>
            <span>We verify your property information</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium">2.</span>
            <span>You will receive a confirmation email within 24 hours</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium">3.</span>
            <span>Your property will be available for relocation applicants</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium">4.</span>
            <span>You will be notified when someone is interested in your property</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/"
          className="inline-flex h-10 items-center gap-2 justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Return to Home
        </Link>
        
        <Link 
          href="/property/dashboard"
          className="inline-flex h-10 items-center gap-2 justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Manage My Properties
          <ArrowRightCircle size={16} />
        </Link>
      </div>
    </div>
  );
} 