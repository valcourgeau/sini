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
