"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  MessageSquare, 
  Send, 
  User, 
  FileText, 
  ArrowLeft,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Phone,
  Mail,
  Info,
  Search,
  Plus,
  X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { getSinistreMessages, Message } from '@/lib/data-loader';

// Mock data for the current user's case - will be updated based on URL params
const defaultUserCase = {
  id: "REL-001",
  contactPerson: {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com"
  },
  status: "processing",
  disasterAddress: {
    city: "Genève",
    canton: "Genève"
  },
  agent: {
    name: "Marie Dubois",
    email: "marie.dubois@assurance.ch"
  }
};

// Component that uses useSearchParams
function SinistreMessagesContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("ref") || defaultUserCase.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [dynamicHeight, setDynamicHeight] = useState("calc(100vh - 100px)");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use case ID from URL or default
  const userCase = {
    ...defaultUserCase,
    id: caseId
  };

  // Calculate dynamic height based on viewport and content
  useEffect(() => {
    const calculateHeight = () => {
      const viewportHeight = window.innerHeight;
      
      // Calculate actual header height by measuring DOM elements
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.offsetHeight + 20 : 80;
      
      // Calculate actual footer height
      const footerElement = document.querySelector('footer');
      const footerHeight = footerElement ? footerElement.offsetHeight + 20 : 100;
      
      // Account for page padding, margins, and header content
      const pagePadding = 120; // Increased to account for page header and spacing
      
      // Calculate available height
      const availableHeight = viewportHeight - headerHeight - footerHeight - pagePadding;
      
      // Set appropriate height based on viewport size - more generous for small screens
      let targetHeight;
      if (viewportHeight < 600) {
        // Very small screens - use most available space
        targetHeight = Math.max(availableHeight * 0.95, 200);
      } else if (viewportHeight < 800) {
        // Small screens - use most of available space
        targetHeight = Math.max(availableHeight * 0.9, 300);
      } else if (viewportHeight < 1000) {
        // Medium screens - balanced approach
        targetHeight = Math.max(availableHeight * 0.85, 400);
      } else {
        // Large screens - prevent excessive height but allow more flexibility
        targetHeight = Math.min(availableHeight * 0.8, 900);
      }
      
      setDynamicHeight(`${Math.round(targetHeight)}px`);
    };

    // Initial calculation
    calculateHeight();
    
    // Recalculate on resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateHeight, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Load messages from data
  useEffect(() => {
    const messagesData = getSinistreMessages();
    setMessages(messagesData);
  }, []);

  // Auto-scroll to bottom only when new messages are added (not when switching conversations)
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const isNewMessage = Date.now() - new Date(lastMessage.timestamp).getTime() < 5000; // Within 5 seconds
      
      if (isNewMessage) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'client-current',
      senderName: 'Vous',
      senderType: 'client',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate agent response after 2 seconds
    setTimeout(() => {
      const agentResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: 'agent-1',
        senderName: userCase.agent.name,
        senderType: 'agent',
        content: "Merci pour votre message. Je vais examiner votre demande et vous répondre dans les plus brefs délais.",
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "initie": return "bg-grey-100 text-gray-600";
      case "processing": return "bg-blue-100 text-blue-600";
      case "completed": return "bg-green-100 text-green-600";
      case "pending": return "bg-yellow-100 text-yellow-600";
      case "cancelled": return "bg-red-100 text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "initie": return <FileText className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "pending": return <AlertTriangle className="h-4 w-4" />;
      case "cancelled": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/platform/dashboard/sinistre">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary">Messages</h1>
          <p className="text-black mt-2">
            Communiquez avec votre agent d'assurance
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Case Information Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Case Information */}
          <Card className="p-4 bg-background border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-black">
                    Dossier {userCase.id}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userCase.status)}`}>
                    {userCase.status === "initie" ? "Initié" : 
                     userCase.status === "processing" ? "En cours" : 
                     userCase.status === "completed" ? "Terminé" : 
                     userCase.status === "pending" ? "En attente" : 
                     userCase.status === "cancelled" ? "Annulé" : "Inconnu"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-black">
                <Phone className="h-4 w-4 mr-2" />
                Appeler
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-black">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </Card>

          {/* Agent Information */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <User className="h-5 w-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900">Votre agent</h4>
                <p className="text-sm text-blue-700">{userCase.agent.name}</p>
                <p className="text-xs text-blue-600">{userCase.agent.email}</p>
              </div>
              <div className="flex items-center gap-1 text-blue-600">
                <Info className="h-4 w-4" />
                <span className="text-xs">En ligne</span>
              </div>
            </div>
          </Card>

          {/* Help Information */}
          <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-green-200 rounded-full flex-shrink-0">
                <Info className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900 mb-1">Besoin d'aide ?</h4>
                <p className="text-sm text-green-700 mb-2">
                  Vous pouvez également contacter votre agent par téléphone ou email pour des questions urgentes.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-200">
                    <Phone className="h-3 w-3 mr-1" />
                    Appeler
                  </Button>
                  <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-200">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col chat-area" style={{ minHeight: '400px' }}>
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">
                    {userCase.agent.name}
                  </h3>
                  <p className="text-sm text-black">
                    Agent d'assurance
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.senderType === 'client' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] p-3 rounded-lg",
                      message.senderType === 'client'
                        ? "bg-primary text-primary-foreground"
                        : message.senderType === 'system'
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-secondary text-black"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">
                        {message.senderName}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                      {!message.isRead && message.senderType === 'client' && (
                        <span className="text-xs opacity-70">(En attente)</span>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 text-black placeholder:text-black/70"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-black mt-2">
                Votre agent vous répondra dans les plus brefs délais
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function SinistreMessagesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" size="sm" className="mb-4" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-primary">Messages</h1>
          <p className="text-black mt-2">
            Communiquez avec votre agent d'assurance
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] min-h-[300px]">
        <div className="lg:col-span-1 space-y-4 h-full overflow-y-auto">
          <Card className="p-4 bg-background border-primary/20">
            <div className="animate-pulse">
              <div className="h-4 w-32 bg-muted rounded mb-2" />
              <div className="h-3 w-24 bg-muted rounded mb-4" />
              <div className="flex gap-2">
                <div className="h-8 w-full bg-muted rounded" />
                <div className="h-8 w-full bg-muted rounded" />
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-muted rounded mb-2" />
              <div className="h-3 w-32 bg-muted rounded mb-1" />
              <div className="h-3 w-40 bg-muted rounded" />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-3 h-full">
          <Card className="h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-black mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black mb-2">
                  Chargement...
                </h3>
                <p className="text-black">
                  Veuillez patienter
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function SinistreMessagesPage() {
  return (
    <Suspense fallback={<SinistreMessagesLoading />}>
      <SinistreMessagesContent />
    </Suspense>
  );
}
