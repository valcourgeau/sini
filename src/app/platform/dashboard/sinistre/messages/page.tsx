"use client";

import { useState, useEffect, useRef } from "react";
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
  Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { getSinistreMessages, Message } from '@/lib/data-loader';

// Mock data for the current user's case
const mockUserCase = {
  id: "REL-003",
  contactPerson: {
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@email.com"
  },
  status: "processing" as const,
  disasterAddress: {
    city: "Genève",
    canton: "Genève"
  },
  agent: {
    name: "Thomas Moreau",
    email: "thomas.moreau@assurance.ch"
  }
};

export default function SinistreMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        senderName: mockUserCase.agent.name,
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
      case "initie": return "text-gray-600";
      case "processing": return "text-blue-600";
      case "completed": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "cancelled": return "text-red-600";
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
    <div className="space-y-6">
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
          <p className="text-muted-foreground mt-2">
            Communiquez avec votre agent d'assurance
          </p>
        </div>
      </div>

      {/* Case Information */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Dossier {mockUserCase.id}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mockUserCase.status)}`}>
                  {mockUserCase.status === "initie" ? "Initié" : 
                   mockUserCase.status === "processing" ? "En cours" : 
                   mockUserCase.status === "completed" ? "Terminé" : 
                   mockUserCase.status === "pending" ? "En attente" : "Annulé"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {mockUserCase.disasterAddress.city}, {mockUserCase.disasterAddress.canton}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Appeler
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
        </div>
      </Card>

      {/* Agent Information */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full">
            <User className="h-5 w-5 text-blue-700" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900">Votre agent</h4>
            <p className="text-sm text-blue-700">{mockUserCase.agent.name}</p>
            <p className="text-xs text-blue-600">{mockUserCase.agent.email}</p>
          </div>
          <div className="flex items-center gap-1 text-blue-600">
            <Info className="h-4 w-4" />
            <span className="text-xs">En ligne</span>
          </div>
        </div>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[calc(100vh-400px)] flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {mockUserCase.agent.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Agent d'assurance - Dossier {mockUserCase.id}
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
                    : "bg-secondary text-foreground"
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
        <div className="p-4 border-t border-border bg-secondary/30">
          <div className="flex gap-2">
            <Input
              placeholder="Tapez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Votre agent vous répondra dans les plus brefs délais
          </p>
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
                Appeler maintenant
              </Button>
              <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-200">
                <Mail className="h-3 w-3 mr-1" />
                Envoyer un email
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
