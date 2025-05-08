import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SingleConsentProps {
  form: UseFormReturn<any>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

interface ConsentErrors {
  agreeToTerms?: { message?: string };
  agreeToDataProcessing?: { message?: string };
}

export function SingleConsent({ form, onSubmit, isSubmitting }: SingleConsentProps) {
  const { register, formState: { errors } } = form;
  const consentErrors = (errors.singleConsent || {}) as ConsentErrors;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Consent & Authorization</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please review and agree to the following terms to submit your relocation request.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-md border border-border">
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            <h3 className="font-medium">Terms of Service</h3>
            <p className="text-sm text-muted-foreground">
              By using our relocation assistance service, you agree to the following terms:
            </p>
            <ul className="list-disc list-outside ml-5 text-sm text-muted-foreground space-y-1">
              <li>The information provided in this form is accurate and complete to the best of your knowledge.</li>
              <li>You authorize us to use this information to assist you in finding suitable relocation options.</li>
              <li>You understand that submission of this form does not guarantee relocation assistance.</li>
              <li>You agree to respond promptly to any follow-up communications regarding your request.</li>
              <li>You acknowledge that relocation options are subject to availability and eligibility criteria.</li>
              <li>You understand that any false or misleading information may result in the rejection of your request.</li>
            </ul>
            
            <h3 className="font-medium mt-6">Data Privacy Policy</h3>
            <p className="text-sm text-muted-foreground">
              We are committed to protecting your privacy. Here's how we handle your data:
            </p>
            <ul className="list-disc list-outside ml-5 text-sm text-muted-foreground space-y-1">
              <li>Your personal information will only be used for processing your relocation request and related services.</li>
              <li>We may share your information with relocation partners, housing providers, and relevant authorities as necessary.</li>
              <li>If you provided insurance information, we may contact your insurance provider to verify coverage.</li>
              <li>Your data will be stored securely and retained for the duration required by applicable laws.</li>
              <li>You have the right to access, correct, or request deletion of your personal information.</li>
              <li>For full details on how we handle your data, please refer to our complete Privacy Policy.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="singleConsent.agreeToTerms"
              {...register("singleConsent.agreeToTerms")}
              className="rounded border-input h-5 w-5 mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="singleConsent.agreeToTerms" className="text-base font-medium">
                I agree to the Terms of Service <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you confirm that you have read, understood, and agree to the terms outlined above.
              </p>
              {consentErrors.agreeToTerms && (
                <p className="text-sm text-destructive">
                  {consentErrors.agreeToTerms.message as string}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="singleConsent.agreeToDataProcessing"
              {...register("singleConsent.agreeToDataProcessing")}
              className="rounded border-input h-5 w-5 mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="singleConsent.agreeToDataProcessing" className="text-base font-medium">
                I consent to the processing of my personal data <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you give your consent for the collection, use, and sharing of your 
                personal information as described in our data privacy policy.
              </p>
              {consentErrors.agreeToDataProcessing && (
                <p className="text-sm text-destructive">
                  {consentErrors.agreeToDataProcessing.message as string}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-md border border-primary/10">
          <p className="text-sm text-primary/80">
            <strong>Important:</strong> After submitting your request, you will receive a confirmation email 
            with a summary of your relocation request. Our team will contact you for next steps.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="button" 
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </div>
    </div>
  );
} 