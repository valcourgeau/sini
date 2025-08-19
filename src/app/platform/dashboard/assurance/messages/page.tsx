"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  MessageSquare, 
  Search, 
  Send, 
  User, 
  FileText, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  Building2,
  MapPin,
  ArrowLeft,
  Plus,
  X,
  Filter,
  MoreVertical,
  Phone,
  Mail
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { RelocationData } from '@/types/relocation';
import { relocationCases, getConversations, getConversationById, Conversation, Message, getCaseById } from '@/lib/data-loader';

// Component that uses useSearchParams
function MessagesContent() {
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [searchCaseId, setSearchCaseId] = useState("");
  const [isSearchingCase, setIsSearchingCase] = useState(false);
  const [isNewConversationMode, setIsNewConversationMode] = useState(false);
  const [searchResults, setSearchResults] = useState<RelocationData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations from data and handle URL parameters
  useEffect(() => {
    const conversationsData = getConversations('assurance');
    setConversations(conversationsData);
    
    // Check for case parameter in URL
    const caseId = searchParams.get('case');
    if (caseId) {
      // Find existing conversation for this case
      const existingConversation = conversationsData.find(conv => conv.caseId === caseId);
      if (existingConversation) {
        setSelectedConversation(existingConversation);
      } else {
        // Create new conversation for this case
        const caseData = getCaseById(caseId);
        if (caseData) {
          const newConversation: Conversation = {
            id: `conv-${Date.now()}`,
            participantId: caseData.contactPerson.email,
            participantName: `${caseData.contactPerson.firstName} ${caseData.contactPerson.lastName}`,
            participantType: 'client',
            lastMessage: "Nouvelle conversation créée",
            lastMessageTime: new Date().toISOString(),
            unreadCount: 0,
            caseId: caseId,
            caseTitle: `Dossier ${caseId}`,
            status: 'active'
          };
          
          setConversations(prev => [newConversation, ...prev]);
          setSelectedConversation(newConversation);
        }
      }
    }
  }, [searchParams]);

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
        caseId: selectedConversation.caseId
      },
      {
        id: 'msg-2',
        senderId: 'agent-current',
        senderName: 'Vous',
        senderType: 'agent',
        content: selectedConversation.participantType === 'client' 
          ? "Je vais examiner votre dossier et vous recontacter rapidement."
          : "Dossier traité avec succès.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: true,
        caseId: selectedConversation.caseId
      },
      {
        id: 'msg-3',
        senderId: selectedConversation.participantId,
        senderName: selectedConversation.participantName,
        senderType: selectedConversation.participantType,
        content: selectedConversation.participantType === 'client'
          ? "Parfait, j'attends votre retour."
          : "Merci pour la mise à jour.",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        isRead: true,
        caseId: selectedConversation.caseId
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
      senderId: 'agent-current',
      senderName: 'Vous',
      senderType: 'agent',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
      caseId: selectedConversation.caseId
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

  const handleSearchCase = () => {
    if (!searchCaseId.trim()) return;
    
    const foundCase = relocationCases.find(case_ => 
      case_.id.toLowerCase().includes(searchCaseId.toLowerCase())
    );

    if (foundCase) {
      // Create or find existing conversation for this case
      const existingConversation = conversations.find(conv => conv.caseId === foundCase.id);
      
      if (existingConversation) {
        setSelectedConversation(existingConversation);
      } else {
        // Create new conversation
        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          participantId: foundCase.contactPerson.email,
          participantName: `${foundCase.contactPerson.firstName} ${foundCase.contactPerson.lastName}`,
          participantType: 'client',
          lastMessage: "Nouvelle conversation créée",
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          caseId: foundCase.id,
          caseTitle: `Dossier ${foundCase.id}`,
          status: 'active'
        };
        
        setConversations(prev => [newConversation, ...prev]);
        setSelectedConversation(newConversation);
      }
    }
    
    setSearchCaseId("");
    setIsSearchingCase(false);
  };

  const handleNewConversationClick = () => {
    setIsNewConversationMode(true);
    setSearchCaseId("");
    setSearchResults([]);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchCaseId(value);
    
    if (value.trim().length >= 2) {
      const results = relocationCases.filter(case_ => 
        case_.id.toLowerCase().includes(value.toLowerCase()) ||
        `${case_.contactPerson.firstName} ${case_.contactPerson.lastName}`.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results.slice(0, 5)); // Limit to 5 results
    } else {
      setSearchResults([]);
    }
  };

  const handleCaseSelect = (selectedCase: RelocationData) => {
    // Check if conversation already exists
    const existingConversation = conversations.find(conv => conv.caseId === selectedCase.id);
    
    if (existingConversation) {
      setSelectedConversation(existingConversation);
    } else {
      // Create new conversation
      const newConversation: Conversation = {
        id: `conv-${Date.now()}`,
        participantId: selectedCase.contactPerson.email,
        participantName: `${selectedCase.contactPerson.firstName} ${selectedCase.contactPerson.lastName}`,
        participantType: 'client',
        lastMessage: "Nouvelle conversation créée",
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        caseId: selectedCase.id,
        caseTitle: `Dossier ${selectedCase.id}`,
        status: 'active'
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setSelectedConversation(newConversation);
    }
    
    setSearchCaseId("");
    setSearchResults([]);
    setIsNewConversationMode(false);
  };

  const handleCancelNewConversation = () => {
    setIsNewConversationMode(false);
    setSearchCaseId("");
    setSearchResults([]);
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
    conv.caseTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/platform/dashboard/assurance">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary">Messages</h1>

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
              placeholder={isNewConversationMode ? "Rechercher un dossier ou un nom..." : "Rechercher des conversations..."}
              value={isNewConversationMode ? searchCaseId : searchTerm}
              onChange={(e) => isNewConversationMode ? handleSearchInputChange(e.target.value) : setSearchTerm(e.target.value)}
              className={cn(
                "pl-10 transition-all duration-300",
                isNewConversationMode && "bg-primary/10 border-primary/20 text-primary placeholder:text-primary/70"
              )}
            />
            <Button
              onClick={isNewConversationMode ? handleCancelNewConversation : handleNewConversationClick}
              variant="ghost"
              size="sm"
              className={cn(
                "absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 transition-all duration-300",
                isNewConversationMode 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "bg-primary hover:bg-primary/90 text-white"
              )}
            >
              {isNewConversationMode ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Search Results */}
          {isNewConversationMode && searchResults.length > 0 && (
            <Card className="p-2 bg-background border-primary/20">
              <div className="space-y-1">
                {searchResults.map((case_) => (
                  <div
                    key={case_.id}
                    onClick={() => handleCaseSelect(case_)}
                    className="p-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">{case_.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {case_.contactPerson.firstName} {case_.contactPerson.lastName}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          case_.status === 'completed' && "border-green-500 text-green-600",
                          case_.status === 'processing' && "border-blue-500 text-blue-600",
                          case_.status === 'pending' && "border-yellow-500 text-yellow-600"
                        )}
                      >
                        {case_.status === 'completed' ? 'Terminé' : 
                         case_.status === 'processing' ? 'En cours' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}



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
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {conversation.participantName}
                          </p>
                          <div className="flex items-center gap-2">
                            {conversation.caseId && (
                              <>
                                <span className="text-xs text-muted-foreground">
                                  {conversation.caseId}
                                </span>
                                {(() => {
                                  const caseData = getCaseById(conversation.caseId);
                                  if (caseData) {
                                    return (
                                      <>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          caseData.priority === "high" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                                        }`}>
                                          {caseData.priority === "high" ? "Haute" : "Normale"}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          {(() => {
                                            const getStatusIcon = (status: string) => {
                                              switch (status) {
                                                case "initie": return <FileText className="h-3 w-3" />;
                                                case "processing": return <Clock className="h-3 w-3" />;
                                                case "completed": return <CheckCircle2 className="h-3 w-3" />;
                                                case "pending": return <AlertTriangle className="h-3 w-3" />;
                                                case "cancelled": return <AlertTriangle className="h-3 w-3" />;
                                                default: return <Clock className="h-3 w-3" />;
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
                                            
                                            return (
                                              <>
                                                {getStatusIcon(caseData.status)}
                                                <span className={`text-xs font-medium ${getStatusColor(caseData.status)}`}>
                                                  {caseData.status === "initie" ? "Initié" : 
                                                   caseData.status === "processing" ? "En cours" : 
                                                   caseData.status === "completed" ? "Terminé" : 
                                                   caseData.status === "pending" ? "En attente" : "Annulé"}
                                                </span>
                                              </>
                                            );
                                          })()}
                                        </div>
                                      </>
                                    );
                                  }
                                  return null;
                                })()}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
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
                        <User className="h-5 w-5 text-primary" />
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
                          {selectedConversation.caseId && (
                            <Link href={`/platform/dashboard/assurance/dossiers/${selectedConversation.caseId}`}>
                              <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                {selectedConversation.caseId}
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
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
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
                        message.senderType === 'agent' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] p-3 rounded-lg",
                          message.senderType === 'agent'
                            ? "bg-primary text-primary-foreground"
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
    </div>
  );
}

// Loading component for Suspense fallback
function MessagesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" size="sm" className="mb-4" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-primary">Messages</h1>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Input placeholder="Chargement..." disabled className="pl-10" />
          </div>
          <Card className="flex-1 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-primary">Conversations récentes</h3>
            </div>
            <div className="p-4 text-center text-muted-foreground">
              Chargement des conversations...
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Chargement...
                </h3>
                <p className="text-muted-foreground">
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
export default function AssuranceMessagesPage() {
  return (
    <Suspense fallback={<MessagesLoading />}>
      <MessagesContent />
    </Suspense>
  );
}
