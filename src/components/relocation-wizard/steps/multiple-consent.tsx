import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface MultipleConsentProps {
  form: UseFormReturn<any>;
}

export function MultipleConsent({ form }: MultipleConsentProps) {
  const { register, formState: { errors } } = form;
  const consentErrors = errors.multipleConsent || {};
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Consent & Authorization</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please review and agree to the following terms to submit your multiple relocation requests.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-md border border-border">
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            <h3 className="font-medium">Terms of Service for Multiple Requests</h3>
            <p className="text-sm text-muted-foreground">
              By using our relocation assistance service for multiple individuals, you agree to the following terms:
            </p>
            <ul className="list-disc list-outside ml-5 text-sm text-muted-foreground space-y-1">
              <li>You confirm that you are authorized to submit requests on behalf of all individuals listed.</li>
              <li>The information provided for each person is accurate and complete to the best of your knowledge.</li>
              <li>You authorize us to use this information to assist in finding suitable relocation options for all individuals.</li>
              <li>You understand that submission of this form does not guarantee relocation assistance for any individual.</li>
              <li>You agree to promptly communicate with all listed individuals about their relocation status.</li>
              <li>You acknowledge that relocation options are subject to availability and eligibility criteria.</li>
              <li>You understand that any false or misleading information may result in the rejection of the requests.</li>
            </ul>
            
            <h3 className="font-medium mt-6">Data Privacy Policy</h3>
            <p className="text-sm text-muted-foreground">
              We are committed to protecting the privacy of all individuals in your request:
            </p>
            <ul className="list-disc list-outside ml-5 text-sm text-muted-foreground space-y-1">
              <li>Personal information for all individuals will only be used for processing relocation requests.</li>
              <li>We may share information with relocation partners, housing providers, and relevant authorities as necessary.</li>
              <li>If insurance information was provided, we may contact the respective insurance providers to verify coverage.</li>
              <li>All data will be stored securely and retained for the duration required by applicable laws.</li>
              <li>Each individual has the right to access, correct, or request deletion of their personal information.</li>
              <li>For full details on how we handle data, please refer to our complete Privacy Policy.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="multipleConsent.agreeToTerms"
              {...register("multipleConsent.agreeToTerms")}
              className="rounded border-input h-5 w-5 mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="multipleConsent.agreeToTerms" className="text-base font-medium">
                I agree to the Terms of Service <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you confirm that you have read, understood, and agree to the terms outlined above 
                for all individuals included in this request.
              </p>
              {consentErrors.agreeToTerms && (
                <p className="text-sm text-red-500">
                  {consentErrors.agreeToTerms.message as string}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="multipleConsent.agreeToDataProcessing"
              {...register("multipleConsent.agreeToDataProcessing")}
              className="rounded border-input h-5 w-5 mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="multipleConsent.agreeToDataProcessing" className="text-base font-medium">
                I consent to the processing of personal data <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you confirm that you have the authority to consent to the collection, use, 
                and sharing of personal information for all individuals included in this request, as described in 
                our data privacy policy.
              </p>
              {consentErrors.agreeToDataProcessing && (
                <p className="text-sm text-red-500">
                  {consentErrors.agreeToDataProcessing.message as string}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-md border border-amber-100">
          <p className="text-sm text-amber-700">
            <strong>Important:</strong> After submitting your requests, you will receive a confirmation email 
            with a summary of all relocation requests. Our team will contact you and the respective individuals 
            for next steps.
          </p>
        </div>
      </div>
    </div>
  );
} 