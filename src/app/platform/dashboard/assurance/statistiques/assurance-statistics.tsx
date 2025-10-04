"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Coins, 
  Users, 
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Award,
  Clock,
  Star,
  Building2,
  CheckCircle2,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RelocationData } from '@/types/relocation';

interface AssuranceStatisticsProps {
  data: RelocationData[];
  selectedFilter: "agent" | "canton" | "group";
  selectedAgent: string;
  selectedCanton: string;
  selectedDateFilter: "month" | "year" | "all";
}

const COLORS = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#f59e0b",
  danger: "#ef4444",
  success: "#22c55e",
  warning: "#f97316",
  info: "#06b6d4",
  purple: "#8b5cf6",
  pink: "#ec4899",
  indigo: "#6366f1"
};

const AGENT_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.accent,
  COLORS.purple,
  COLORS.pink,
  COLORS.indigo
];

export default function AssuranceStatistics({ 
  data, 
  selectedFilter, 
  selectedAgent, 
  selectedCanton, 
  selectedDateFilter 
}: AssuranceStatisticsProps) {
  const [activeTab, setActiveTab] = useState<"costs" | "performance" | "agents" | "trends">("costs");
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger animation on data change
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [data, selectedFilter, selectedAgent, selectedCanton, selectedDateFilter]);

  // Process data for charts
  const processMonthlyCosts = () => {
    const monthlyData: { [key: string]: number } = {};
    
    data.forEach(item => {
      if (item.cost?.totalCost) {
        const date = new Date(item.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + item.cost.totalCost;
      }
    });

    return Object.entries(monthlyData)
      .map(([month, costs]) => ({
        month,
        costs,
        formattedMonth: new Date(month + '-01').toLocaleDateString('fr-FR', { 
          month: 'short', 
          year: 'numeric' 
        })
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  const processCumulativeCosts = () => {
    const monthlyCosts = processMonthlyCosts();
    let cumulative = 0;
    
    return monthlyCosts.map(item => {
      cumulative += item.costs;
      return {
        ...item,
        cumulative
      };
    });
  };

  const processAgentPerformance = () => {
    const agentStats: { [key: string]: any } = {};
    
    data.forEach(item => {
      const agentId = item.agent.id;
      if (!agentStats[agentId]) {
        agentStats[agentId] = {
          name: item.agent.name,
          canton: item.agent.canton,
          totalCosts: 0,
          totalCases: 0,
          completedCases: 0,
          averageResponseTime: 0,
          totalResponseTime: 0,
          responseTimeCount: 0,
          averageSatisfaction: 0,
          totalSatisfaction: 0,
          satisfactionCount: 0,
          averageCost: 0,
          totalCost: 0,
          costCount: 0
        };
      }
      
      agentStats[agentId].totalCases++;
      if (item.status === "completed") agentStats[agentId].completedCases++;
      if (item.cost?.totalCost) {
        agentStats[agentId].totalCosts += item.cost.totalCost;
        agentStats[agentId].totalCost += item.cost.totalCost;
        agentStats[agentId].costCount++;
      }
      if (item.responseTime) {
        agentStats[agentId].totalResponseTime += item.responseTime;
        agentStats[agentId].responseTimeCount++;
      }
      if (item.satisfaction?.rating) {
        agentStats[agentId].totalSatisfaction += item.satisfaction.rating;
        agentStats[agentId].satisfactionCount++;
      }
    });

    return Object.values(agentStats)
      .map(agent => ({
        ...agent,
        averageResponseTime: agent.responseTimeCount > 0 ? agent.totalResponseTime / agent.responseTimeCount : 0,
        averageSatisfaction: agent.satisfactionCount > 0 ? agent.totalSatisfaction / agent.satisfactionCount : 0,
        averageCost: agent.costCount > 0 ? agent.totalCost / agent.costCount : 0,
        completionRate: agent.totalCases > 0 ? (agent.completedCases / agent.totalCases) * 100 : 0
      }))
      .sort((a, b) => a.totalCosts - b.totalCosts); // Sort in increasing order by costs
  };

  const processStatusDistribution = () => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status === "initie" ? "Initié" :
            status === "pending" ? "En attente" : 
            status === "processing" ? "En cours" : 
            status === "completed" ? "Terminé" : "Annulé",
      value: count,
      color: status === "initie" ? COLORS.info :
             status === "pending" ? COLORS.warning :
             status === "processing" ? COLORS.primary :
             status === "completed" ? COLORS.success : COLORS.danger
    }));
  };

  const processCantonDistribution = () => {
    const cantonCounts = data.reduce((acc, item) => {
      acc[item.agent.canton] = (acc[item.agent.canton] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(cantonCounts).map(([canton, count]) => ({
      name: canton,
      value: count,
      color: canton === "Genève" ? COLORS.primary : COLORS.secondary
    }));
  };

  const processSatisfactionTrends = () => {
    const monthlySatisfaction: { [key: string]: { total: number; count: number } } = {};
    
    data.forEach(item => {
      if (item.satisfaction?.rating) {
        const date = new Date(item.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlySatisfaction[monthKey]) {
          monthlySatisfaction[monthKey] = { total: 0, count: 0 };
        }
        
        monthlySatisfaction[monthKey].total += item.satisfaction.rating;
        monthlySatisfaction[monthKey].count += 1;
      }
    });

    return Object.entries(monthlySatisfaction)
      .map(([month, stats]) => ({
        month,
        averageSatisfaction: stats.count > 0 ? stats.total / stats.count : 0,
        formattedMonth: new Date(month + '-01').toLocaleDateString('fr-FR', { 
          month: 'short', 
          year: 'numeric' 
        })
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  const processResponseTimeTrends = () => {
    const monthlyResponseTime: { [key: string]: { total: number; count: number } } = {};
    
    data.forEach(item => {
      if (item.responseTime !== null && item.responseTime !== undefined) {
        const date = new Date(item.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyResponseTime[monthKey]) {
          monthlyResponseTime[monthKey] = { total: 0, count: 0 };
        }
        
        monthlyResponseTime[monthKey].total += item.responseTime;
        monthlyResponseTime[monthKey].count += 1;
      }
    });

    return Object.entries(monthlyResponseTime)
      .map(([month, stats]) => ({
        month,
        averageResponseTime: stats.count > 0 ? stats.total / stats.count : 0,
        formattedMonth: new Date(month + '-01').toLocaleDateString('fr-FR', { 
          month: 'short', 
          year: 'numeric' 
        })
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  const monthlyCosts = processMonthlyCosts();
  const cumulativeCosts = processCumulativeCosts();
  const agentPerformance = processAgentPerformance();
  const statusDistribution = processStatusDistribution();
  const cantonDistribution = processCantonDistribution();
  const satisfactionTrends = processSatisfactionTrends();
  const responseTimeTrends = processResponseTimeTrends();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: CHF {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{payload[0].name}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {payload[0].value} dossiers
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toFixed(1)}/5
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomResponseTimeTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toFixed(1)} jours
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Coûts totaux</p>
              <p className="text-2xl font-bold text-blue-800">
                CHF {data.reduce((sum, item) => sum + (item.cost?.totalCost || 0), 0).toLocaleString()}
              </p>
            </div>
            <Coins className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total dossiers</p>
              <p className="text-2xl font-bold text-green-800">
                {data.length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Satisfaction moy.</p>
              <p className="text-2xl font-bold text-purple-800">
                {(() => {
                  const ratings = data.filter(item => item.satisfaction?.rating).map(item => item.satisfaction!.rating);
                  return ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : "N/A";
                })()}/5
              </p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Agents actifs</p>
              <p className="text-2xl font-bold text-orange-800">
                {new Set(data.map(item => item.agent.id)).size}
              </p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 text-black">
        {[
          { key: "costs", label: "Coûts", icon: Coins },
          { key: "performance", label: "Performance", icon: Target },
          { key: "agents", label: "Agents", icon: Users },
          { key: "trends", label: "Tendances", icon: TrendingUp }
        ].map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.key as any)}
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Costs Tab */}
      {activeTab === "costs" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Costs Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">Coûts mensuels</h3>
                <p className="text-sm text-black">Évolution des coûts par mois</p>
              </div>
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyCosts} key={animationKey}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="formattedMonth" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `CHF ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="costs" 
                  fill={COLORS.primary}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Cumulative Costs Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">Coûts cumulés</h3>
                <p className="text-sm text-black">Progression des coûts totaux</p>
              </div>
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cumulativeCosts} key={animationKey}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="formattedMonth" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `CHF ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke={COLORS.secondary}
                  fill={COLORS.secondary}
                  fillOpacity={0.3}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">Répartition des statuts</h3>
                <p className="text-sm text-black">Distribution des dossiers par statut</p>
              </div>
              <PieChartIcon className="h-6 w-6 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart key={animationKey}>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1000}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Canton Distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">Répartition par canton</h3>
                <p className="text-sm text-black">Distribution des dossiers par canton</p>
              </div>
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cantonDistribution} key={animationKey}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill={COLORS.accent}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Agents Tab */}
      {activeTab === "agents" && (
        <div className="space-y-6">
          {/* Agent Performance Overview */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">Performance des agents</h3>
                <p className="text-sm text-black">Comparaison des performances par agent</p>
              </div>
              <Users className="h-6 w-6 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={agentPerformance} key={animationKey}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `CHF ${(value / 1000).toFixed(0)}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="totalCosts" 
                  fill={COLORS.primary}
                  radius={[4, 4, 0, 0]}
                  name="Coûts totaux"
                  animationDuration={1000}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke={COLORS.success}
                  strokeWidth={2}
                  name="Taux de completion (%)"
                  animationDuration={1000}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          {/* Agent Details Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentPerformance.map((agent, index) => (
              <Card key={agent.name} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{agent.name}</h4>
                    <p className="text-sm text-black">{agent.canton}</p>
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: AGENT_COLORS[index % AGENT_COLORS.length] }}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-black">Coûts totaux</span>
                    <span className="text-sm font-medium text-green-600">
                      CHF {agent.totalCosts.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-black">Dossiers</span>
                    <span className="text-sm font-medium">
                      {agent.completedCases}/{agent.totalCases}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-black">Taux completion</span>
                    <span className="text-sm font-medium text-primary">
                      {agent.completionRate.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-black">Délai moyen</span>
                    <span className="text-sm font-medium">
                      {agent.averageResponseTime.toFixed(1)} jours
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-black">Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {agent.averageSatisfaction.toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === "trends" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Satisfaction Trends */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">Évolution de la satisfaction</h3>
                <p className="text-sm text-black">Tendance de la satisfaction client</p>
              </div>
              <Star className="h-6 w-6 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionTrends} key={animationKey}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="formattedMonth" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 5]}
                  tickFormatter={(value) => `${value}/5`}
                />
                <Tooltip content={<CustomLineTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="averageSatisfaction" 
                  stroke={COLORS.accent}
                  strokeWidth={3}
                  dot={{ fill: COLORS.accent, strokeWidth: 2, r: 4 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Response Time Trends */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">Délais de réponse</h3>
                <p className="text-sm text-black">Évolution des délais d'acceptation</p>
              </div>
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeTrends} key={animationKey}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="formattedMonth" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 5]}
                  tickFormatter={(value) => `${value} jours`}
                />
                <Tooltip content={<CustomResponseTimeTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="averageResponseTime" 
                  stroke={COLORS.purple}
                  strokeWidth={3}
                  dot={{ fill: COLORS.purple, strokeWidth: 2, r: 4 }}
                  animationDuration={1000}
                  name="Délai moyen (jours)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
} 