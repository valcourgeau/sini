# Assurance Statistics Dashboard

This directory contains the statistics and analytics components for the assurance platform, featuring animated charts and interactive dashboards.

## File Structure

- `assurance-statistics.tsx` - Main statistics component with charts and analytics
- `page.tsx` - Dedicated statistics page accessible via `/platform/dashboard/assurance/statistiques`
- `README.md` - This documentation file

## Features

## Features

### 📊 Revenue Analytics
- **Monthly Revenue Chart**: Bar chart showing revenue trends by month
- **Cumulative Revenue Chart**: Area chart displaying total revenue progression
- **Revenue Summary**: Total revenue calculation with real-time updates

### 🎯 Performance Metrics
- **Status Distribution**: Pie chart showing dossier status breakdown
- **Canton Distribution**: Bar chart displaying cases by canton
- **Completion Rates**: Visual representation of dossier completion rates

### 👥 Agent Performance
- **Agent Comparison**: Composed chart comparing revenue vs completion rates
- **Individual Agent Cards**: Detailed performance metrics for each agent
- **Performance Indicators**: Response times, satisfaction ratings, and case counts

### 📈 Trend Analysis
- **Satisfaction Trends**: Line chart showing customer satisfaction over time
- **Response Time Trends**: Analysis of acceptance delays
- **Interactive Tooltips**: Detailed information on hover

## Technical Details

### Dependencies
- **Recharts**: For chart rendering and animations
- **Lucide React**: For icons
- **Tailwind CSS**: For styling

### Key Features
- **Responsive Design**: Charts adapt to different screen sizes
- **Animated Transitions**: Smooth animations when switching tabs or data changes
- **Interactive Elements**: Hover effects and click interactions
- **Real-time Updates**: Charts update based on filter changes

### Data Processing
The component processes relocation data to generate:
- Monthly revenue aggregations
- Cumulative revenue calculations
- Agent performance statistics
- Status and canton distributions
- Satisfaction trend analysis

### Customization
- **Color Schemes**: Configurable colors for different chart types
- **Animation Duration**: Adjustable animation speeds
- **Chart Types**: Support for bar, line, area, pie, and composed charts
- **Tooltip Customization**: Custom tooltip components for different chart types

## Usage

### As a Component
```tsx
import AssuranceStatistics from "./assurance-statistics";

<AssuranceStatistics
  data={relocationData}
  selectedFilter={selectedFilter}
  selectedAgent={selectedAgent}
  selectedCanton={selectedCanton}
  selectedDateFilter={selectedDateFilter}
/>
```

### As a Page
The statistics are also available as a dedicated page at:
`/platform/dashboard/assurance/statistiques`

This provides a full-screen view of all statistics and analytics with enhanced navigation.

## Props

- `data`: Array of relocation data objects
- `selectedFilter`: Current filter type ("agent", "canton", "group")
- `selectedAgent`: Selected agent ID
- `selectedCanton`: Selected canton
- `selectedDateFilter`: Date filter ("month", "year", "all")

## Chart Types

1. **Revenue Tab**
   - Monthly Revenue (Bar Chart)
   - Cumulative Revenue (Area Chart)

2. **Performance Tab**
   - Status Distribution (Pie Chart)
   - Canton Distribution (Bar Chart)

3. **Agents Tab**
   - Agent Performance Overview (Composed Chart)
   - Individual Agent Cards

4. **Trends Tab**
   - Satisfaction Trends (Line Chart)
   - Response Time Trends (Line Chart)

## Animation Features

- **Smooth Transitions**: All charts animate smoothly when data changes
- **Hover Effects**: Interactive tooltips with detailed information
- **Tab Switching**: Smooth transitions between different chart views
- **Data Updates**: Charts re-animate when filters change

## Performance Considerations

- **Efficient Data Processing**: Optimized data aggregation algorithms
- **Responsive Charts**: Charts scale appropriately for different devices
- **Memory Management**: Proper cleanup of chart instances
- **Lazy Loading**: Charts only render when tab is active 