"use client";

import { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Search, 
  Send, 
  User, 
  FileText, 
  Building2,
  ArrowLeft,
  Plus,
  Phone,
  Mail,
  Info,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { getConversations, Conversation, Message } from '@/lib/data-loader';



export default function HostMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations from data
  useEffect(() => {
    const conversationsData = getConversations('host');
    setConversations(conversationsData);
  }, []);

  // Generate mock messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    const mockMessages: Message[] = [
      {
        id: 'msg-1',
        senderId: selectedConversation.participantId,
        senderName: selectedConversation.participantName,
        senderType: selectedConversation.participantType,
        content: selectedConversation.lastMessage,
        timestamp: selectedConversation.lastMessageTime,
        isRead: true,
        propertyId: selectedConversation.propertyId,
        reservationId: selectedConversation.reservationId
      },
      {
        id: 'msg-2',
        senderId: 'host-current',
        senderName: 'Vous',
        senderType: 'host',
        content: selectedConversation.participantType === 'agent' 
          ? "Merci pour l'information. Quand puis-je attendre les détails ?"
          : "Je suis ravi que vous soyez satisfait !",
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        isRead: true,
        propertyId: selectedConversation.propertyId,
        reservationId: selectedConversation.reservationId
      },
      {
        id: 'msg-3',
        senderId: selectedConversation.participantId,
        senderName: selectedConversation.participantName,
        senderType: selectedConversation.participantType,
        content: selectedConversation.participantType === 'agent'
          ? "Je vous envoie les détails dans les prochaines heures."
          : "L'emplacement est idéal et tout est très propre.",
        timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        isRead: true,
        propertyId: selectedConversation.propertyId,
        reservationId: selectedConversation.reservationId
      }
    ];

    setMessages(mockMessages);
  }, [selectedConversation]);

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
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'host-current',
      senderName: 'Vous',
      senderType: 'host',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
      propertyId: selectedConversation.propertyId,
      reservationId: selectedConversation.reservationId
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: newMessage, lastMessageTime: new Date().toISOString() }
        : conv
    ));
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

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/platform/dashboard/host">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary">Messages</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos communications avec les agents et clients
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Conversations */}
          <Card className="flex-1 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-primary">Conversations récentes</h3>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-400px)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={cn(
                    "p-4 border-b border-border cursor-pointer transition-colors hover:bg-secondary/50",
                    selectedConversation?.id === conversation.id && "bg-primary/10 border-primary/20"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          {conversation.participantType === 'agent' ? (
                            <User className="h-4 w-4 text-primary" />
                          ) : conversation.participantType === 'client' ? (
                            <User className="h-4 w-4 text-green-600" />
                          ) : (
                            <Building2 className="h-4 w-4 text-orange-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {conversation.participantName}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                conversation.status === 'active' && "border-green-500 text-green-600",
                                conversation.status === 'pending' && "border-yellow-500 text-yellow-600",
                                conversation.status === 'resolved' && "border-gray-500 text-gray-600"
                              )}
                            >
                              {conversation.status === 'active' ? 'Actif' : 
                               conversation.status === 'pending' ? 'En attente' : 'Résolu'}
                            </Badge>
                            {conversation.propertyId && (
                              <span className="text-xs text-muted-foreground">
                                {conversation.propertyId}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.propertyTitle && (
                        <p className="text-xs text-primary mt-1">
                          {conversation.propertyTitle}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        {selectedConversation.participantType === 'agent' ? (
                          <User className="h-5 w-5 text-primary" />
                        ) : selectedConversation.participantType === 'client' ? (
                          <User className="h-5 w-5 text-green-600" />
                        ) : (
                          <Building2 className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {selectedConversation.participantName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              selectedConversation.status === 'active' && "border-green-500 text-green-600",
                              selectedConversation.status === 'pending' && "border-yellow-500 text-yellow-600",
                              selectedConversation.status === 'resolved' && "border-gray-500 text-gray-600"
                            )}
                          >
                            {selectedConversation.status === 'active' ? 'Actif' : 
                             selectedConversation.status === 'pending' ? 'En attente' : 'Résolu'}
                          </Badge>
                          {selectedConversation.propertyId && (
                            <Link href={`/platform/dashboard/host/biens`}>
                              <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                                <Building2 className="h-3 w-3 mr-1" />
                                {selectedConversation.propertyId}
                              </Button>
                            </Link>
                          )}
                          {selectedConversation.reservationId && (
                            <Link href={`/platform/dashboard/host/reservations`}>
                              <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                {selectedConversation.reservationId}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
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
                        message.senderType === 'host' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] p-3 rounded-lg",
                          message.senderType === 'host'
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
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucune conversation sélectionnée
                  </h3>
                  <p className="text-muted-foreground">
                    Sélectionnez une conversation pour commencer à discuter
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Help Information */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full flex-shrink-0">
            <Info className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Support et assistance</h4>
            <p className="text-sm text-blue-700 mb-2">
              Pour toute question technique ou administrative, contactez notre équipe de support.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-200">
                <Phone className="h-3 w-3 mr-1" />
                Support téléphonique
              </Button>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-200">
                <Mail className="h-3 w-3 mr-1" />
                Email support
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
