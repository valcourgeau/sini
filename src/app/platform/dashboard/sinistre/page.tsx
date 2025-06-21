import { Suspense } from "react";
import { 
  Home, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  User
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SinistreDashboardClient from "./sinistre-dashboard-client";

export default function SinistreDashboard() {
  return (
    <Suspense fallback={<SinistreDashboardSkeleton />}>
      <SinistreDashboardClient />
    </Suspense>
  );
}

function SinistreDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-muted rounded animate-pulse" />
        </div>
        <div className="text-right">
          <div className="h-4 w-20 bg-muted rounded animate-pulse mb-1" />
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Status Overview Skeleton */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-48 bg-muted rounded animate-pulse" />
          <div className="h-6 w-24 bg-muted rounded animate-pulse" />
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-4 w-12 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-2 bg-muted rounded animate-pulse" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="h-4 w-24 bg-muted rounded animate-pulse mb-1" />
              <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            </div>
            <div>
              <div className="h-4 w-24 bg-muted rounded animate-pulse mb-1" />
              <div className="h-5 w-28 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </Card>

      {/* Current Relocation Details Skeleton */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="h-6 w-64 bg-muted rounded animate-pulse mb-4" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-muted rounded animate-pulse" />
              <div>
                <div className="h-4 w-16 bg-muted rounded animate-pulse mb-1" />
                <div className="h-4 w-48 bg-muted rounded animate-pulse" />
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-muted rounded animate-pulse" />
              <div>
                <div className="h-4 w-16 bg-muted rounded animate-pulse mb-1" />
                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-muted rounded animate-pulse" />
              <div>
                <div className="h-4 w-32 bg-muted rounded animate-pulse mb-1" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions Skeleton */}
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 bg-background border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-5 w-5 bg-muted rounded animate-pulse" />
              <div className="h-5 w-20 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-muted rounded animate-pulse mb-3" />
            <div className="h-8 w-full bg-muted rounded animate-pulse" />
          </Card>
        ))}
      </div>

      {/* Recent Messages Skeleton */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-40 bg-muted rounded animate-pulse" />
          <div className="h-8 w-20 bg-muted rounded animate-pulse" />
        </div>
        
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-primary/20 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-muted rounded-full animate-pulse" />
                <div>
                  <div className="h-4 w-24 bg-muted rounded animate-pulse mb-1" />
                  <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="h-3 w-16 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 