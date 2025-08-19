import relocationCasesData from '@/data/relocation-cases.json';
import { RelocationData } from '@/types/relocation';

export const relocationCases: RelocationData[] = relocationCasesData.cases as RelocationData[];

/**
 * Get a specific case by ID
 */
export const getCaseById = (id: string): RelocationData | undefined => {
  return relocationCases.find(case_ => case_.id === id);
};

/**
 * Get cases filtered by status
 */
export const getCasesByStatus = (status: string): RelocationData[] => {
  return relocationCases.filter(case_ => case_.status === status);
};

/**
 * Get cases filtered by type (single/multiple)
 */
export const getCasesByType = (type: 'single' | 'multiple'): RelocationData[] => {
  return relocationCases.filter(case_ => case_.relocationType === type);
};

/**
 * Get cases filtered by priority
 */
export const getCasesByPriority = (priority: string): RelocationData[] => {
  return relocationCases.filter(case_ => case_.priority === priority);
};

/**
 * Get cases filtered by agent
 */
export const getCasesByAgent = (agentId: string): RelocationData[] => {
  return relocationCases.filter(case_ => case_.agent?.id === agentId);
};

/**
 * Get cases filtered by canton
 */
export const getCasesByCanton = (canton: string): RelocationData[] => {
  return relocationCases.filter(case_ => case_.agent?.canton === canton);
};

/**
 * Search cases by text (ID, name, or city)
 */
export const searchCases = (searchTerm: string): RelocationData[] => {
  const term = searchTerm.toLowerCase();
  return relocationCases.filter(case_ => {
    return case_.id.toLowerCase().includes(term) ||
           `${case_.contactPerson.firstName} ${case_.contactPerson.lastName}`.toLowerCase().includes(term) ||
           case_.disasterAddress.city.toLowerCase().includes(term);
  });
};

/**
 * Get the primary request (first person) from a case
 */
export const getPrimaryRequest = (case_: RelocationData) => {
  return case_.relocationRequests[0];
};

/**
 * Calculate total number of people across all requests in a case
 */
export const getTotalPeople = (case_: RelocationData) => {
  return case_.relocationRequests.reduce((total, req) => 
    total + req.adults + req.children, 0
  );
};

/**
 * Check if a case has any special needs
 */
export const hasSpecialNeeds = (case_: RelocationData) => {
  return case_.relocationRequests.some(req => 
    req.hasAnimals || req.hasAccessibilityNeeds || req.specialNeeds
  );
};

/**
 * Get total number of bedrooms across all requests
 */
export const getTotalBedrooms = (case_: RelocationData) => {
  return case_.relocationRequests.reduce((total, req) => total + req.bedrooms, 0);
};

/**
 * Check if a case has insurance coverage
 */
export const hasInsuranceCoverage = (case_: RelocationData) => {
  return case_.insurance?.hasInsurance === true;
};

/**
 * Get arrival date range for a case
 */
export const getArrivalDateRange = (case_: RelocationData) => {
  if (case_.relocationRequests.length === 0) return null;
  
  const dates = case_.relocationRequests.map(req => new Date(req.arrivalDate));
  const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
  const latest = new Date(Math.max(...dates.map(d => d.getTime())));
  
  return { earliest, latest };
};

/**
 * Calculate average response time for completed cases
 */
export const getAverageResponseTime = (cases: RelocationData[] = relocationCases) => {
  const completedCases = cases.filter(case_ => case_.responseTime !== null && case_.responseTime !== undefined);
  if (completedCases.length === 0) return 0;
  
  const totalTime = completedCases.reduce((sum, case_) => sum + (case_.responseTime || 0), 0);
  return totalTime / completedCases.length;
};

/**
 * Calculate average satisfaction rating
 */
export const getAverageSatisfaction = (cases: RelocationData[] = relocationCases) => {
  const ratedCases = cases.filter(case_ => case_.satisfaction?.rating);
  if (ratedCases.length === 0) return 0;
  
  const totalRating = ratedCases.reduce((sum, case_) => sum + (case_.satisfaction!.rating), 0);
  return totalRating / ratedCases.length;
};

/**
 * Calculate total costs
 */
export const getTotalCosts = (cases: RelocationData[] = relocationCases) => {
  return cases.reduce((sum, case_) => sum + (case_.cost?.totalCost || 0), 0);
};

/**
 * Get cases within a date range
 */
export const getCasesInDateRange = (startDate: Date, endDate: Date): RelocationData[] => {
  return relocationCases.filter(case_ => {
    const caseDate = new Date(case_.createdAt);
    return caseDate >= startDate && caseDate <= endDate;
  });
};

/**
 * Get cases for the current month
 */
export const getCurrentMonthCases = (): RelocationData[] => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return getCasesInDateRange(startOfMonth, endOfMonth);
};

/**
 * Get cases for the current year
 */
export const getCurrentYearCases = (): RelocationData[] => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31);
  
  return getCasesInDateRange(startOfYear, endOfYear);
};

/**
 * Get statistics for dashboard
 */
export const getDashboardStats = (cases: RelocationData[] = relocationCases) => {
  return {
    totalCases: cases.length,
    initiatedCases: cases.filter(case_ => case_.status === 'initie').length,
    pendingCases: cases.filter(case_ => case_.status === 'pending').length,
    processingCases: cases.filter(case_ => case_.status === 'processing').length,
    completedCases: cases.filter(case_ => case_.status === 'completed').length,
    averageResponseTime: getAverageResponseTime(cases),
    averageSatisfaction: getAverageSatisfaction(cases),
    totalCosts: getTotalCosts(cases),
    singleRelocations: cases.filter(case_ => case_.relocationType === 'single').length,
    multipleRelocations: cases.filter(case_ => case_.relocationType === 'multiple').length,
  };
};

// Conversation data types
export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantType: 'agent' | 'client' | 'system';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  caseId?: string;
  caseTitle?: string;
  propertyId?: string;
  propertyTitle?: string;
  reservationId?: string;
  status?: 'active' | 'pending' | 'resolved';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'agent' | 'client' | 'host' | 'system';
  content: string;
  timestamp: string;
  isRead: boolean;
  caseId?: string;
  propertyId?: string;
  reservationId?: string;
}

// Load conversation data
export function getConversations(userType: 'assurance' | 'sinistre' | 'host'): Conversation[] {
  try {
    const conversationsData = require('@/data/conversations.json');
    return conversationsData[userType]?.conversations || [];
  } catch (error) {
    console.error('Error loading conversations:', error);
    return [];
  }
}

// Load messages for sinistre (single conversation)
export function getSinistreMessages(): Message[] {
  try {
    const conversationsData = require('@/data/conversations.json');
    return conversationsData.sinistre?.messages || [];
  } catch (error) {
    console.error('Error loading sinistre messages:', error);
    return [];
  }
}

// Get conversation by ID
export function getConversationById(userType: 'assurance' | 'sinistre' | 'host', conversationId: string): Conversation | null {
  const conversations = getConversations(userType);
  return conversations.find(conv => conv.id === conversationId) || null;
}

// Get conversations by case ID (for assurance)
export function getConversationsByCaseId(caseId: string): Conversation[] {
  const conversations = getConversations('assurance');
  return conversations.filter(conv => conv.caseId === caseId);
}

// Get conversations by property ID (for host)
export function getConversationsByPropertyId(propertyId: string): Conversation[] {
  const conversations = getConversations('host');
  return conversations.filter(conv => conv.propertyId === propertyId);
}

// Get recent conversations for dashboard display
export function getRecentConversations(userType: 'assurance' | 'sinistre' | 'host'): Conversation[] {
  const conversations = getConversations(userType);
  // Sort by last message time (most recent first) and return top conversations
  return conversations
    .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
    .slice(0, 5); // Return top 5 most recent conversations
}

// Get unread conversations count
export function getUnreadConversationsCount(userType: 'assurance' | 'sinistre' | 'host'): number {
  const conversations = getConversations(userType);
  return conversations.reduce((count, conv) => count + conv.unreadCount, 0);
}

// Notification data types
export interface Notification {
  id: string;
  type: 'message' | 'system' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'normal' | 'low';
  actionUrl?: string | null;
  sender?: string;
  caseId?: string;
}

export interface RecentMessage {
  id: string;
  from: string;
  subject: string;
  date: string;
  unread: boolean;
  type: 'agent' | 'client' | 'system';
  caseId?: string;
}

// Load notification data
export function getNotifications(userType: 'assurance' | 'sinistre' | 'host'): Notification[] {
  try {
    const notificationsData = require('@/data/notifications.json');
    return notificationsData[userType]?.notifications || [];
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
}

// Load recent messages
export function getRecentMessages(userType: 'assurance' | 'sinistre' | 'host'): RecentMessage[] {
  try {
    const notificationsData = require('@/data/notifications.json');
    return notificationsData[userType]?.recentMessages || [];
  } catch (error) {
    console.error('Error loading recent messages:', error);
    return [];
  }
}

// Get unread notifications count
export function getUnreadNotificationsCount(userType: 'assurance' | 'sinistre' | 'host'): number {
  const notifications = getNotifications(userType);
  return notifications.filter(notif => !notif.isRead).length;
}

// Get unread messages count
export function getUnreadMessagesCount(userType: 'assurance' | 'sinistre' | 'host'): number {
  const messages = getRecentMessages(userType);
  return messages.filter(msg => msg.unread).length;
}

// Document data types
export interface RecentDocument {
  id: string;
  fileName: string;
  caseId: string;
  clientName: string;
  status: 'pending' | 'uploaded' | 'signed' | 'rejected';
  date: string;
  type: 'insurance_declaration' | 'relocation_contract' | 'expert_report' | 'other';
}

// Load recent documents
export function getRecentDocuments(userType: 'assurance' | 'sinistre' | 'host'): RecentDocument[] {
  try {
    const notificationsData = require('@/data/notifications.json');
    return notificationsData[userType]?.recentDocuments || [];
  } catch (error) {
    console.error('Error loading recent documents:', error);
    return [];
  }
}

// Get pending documents count
export function getPendingDocumentsCount(userType: 'assurance' | 'sinistre' | 'host'): number {
  const documents = getRecentDocuments(userType);
  return documents.filter(doc => doc.status === 'pending').length;
}
