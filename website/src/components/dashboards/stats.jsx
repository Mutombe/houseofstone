// src/components/dashboards/stats.jsx
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdminStats,
  selectAdminStats,
  selectAdminStatsStatus,
} from '../../redux/slices/adminSlice';
import { useEffect, useState } from 'react';
import {
  Building2,
  Eye,
  Users,
  Heart,
  Share2,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Home,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FaRegCircleUser } from "react-icons/fa6";

// Register Chart.js components
Chart.register(...registerables);

// Trend indicator component
const TrendIndicator = ({ value, suffix = '%' }) => {
  const isPositive = value >= 0;
  return (
    <span
      className={`inline-flex items-center text-sm font-medium ${
        isPositive ? 'text-green-400' : 'text-red-400'
      }`}
    >
      {isPositive ? (
        <ArrowUpRight className="w-4 h-4 mr-1" />
      ) : (
        <ArrowDownRight className="w-4 h-4 mr-1" />
      )}
      {Math.abs(value)}{suffix}
    </span>
  );
};

// Enhanced Stats Card with Navy/Gold Theme
const StatCard = ({ title, value, icon: Icon, trend, color = 'gold', index = 0 }) => {
  const colorClasses = {
    gold: 'bg-[#C9A962]/10 text-[#C9A962]',
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
    purple: 'bg-purple-500/10 text-purple-400',
    pink: 'bg-pink-500/10 text-pink-400',
    cyan: 'bg-cyan-500/10 text-cyan-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#C9A962]/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              <TrendIndicator value={trend} />
              <span className="text-xs text-gray-500">vs last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Stats Cards Grid
const StatsCards = ({ stats }) => {
  const cardData = [
    {
      title: 'Total Views',
      value: stats?.total_views || 0,
      icon: Eye,
      trend: stats?.trends?.views,
      color: 'gold',
    },
    {
      title: 'Inquiries',
      value: stats?.total_inquiries || 0,
      icon: MessageSquare,
      trend: stats?.trends?.inquiries,
      color: 'blue',
    },
    {
      title: 'Favorites',
      value: stats?.total_favorites || 0,
      icon: Heart,
      trend: stats?.trends?.favorites,
      color: 'pink',
    },
    {
      title: 'Shares',
      value: stats?.total_shares || 0,
      icon: Share2,
      trend: stats?.trends?.shares,
      color: 'green',
    },
    {
      title: 'Active Listings',
      value: stats?.active_listings || 0,
      icon: Building2,
      color: 'purple',
    },
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      icon: FaRegCircleUser,
      color: 'cyan',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {cardData.map((card, index) => (
        <StatCard key={index} {...card} index={index} />
      ))}
    </div>
  );
};

// Views Over Time Line Chart with Navy/Gold Theme
const ViewsOverTimeChart = ({ stats }) => {
  const dailyStats = stats?.stats_last_7_days || [];

  const chartData = {
    labels: dailyStats.map((stat) =>
      new Date(stat.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        label: 'Views',
        data: dailyStats.map((stat) => stat.total_views || 0),
        borderColor: '#C9A962',
        backgroundColor: 'rgba(201, 169, 98, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#C9A962',
        pointBorderColor: '#0A1628',
        pointBorderWidth: 2,
      },
      {
        label: 'Inquiries',
        data: dailyStats.map((stat) => stat.total_inquiries || 0),
        borderColor: '#60A5FA',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#60A5FA',
        pointBorderColor: '#0A1628',
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Activity Over Time</h3>
          <p className="text-sm text-gray-400">Views and inquiries for the last 7 days</p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-lg">
          <Calendar className="w-4 h-4 text-[#C9A962]" />
          <span className="text-sm text-[#C9A962]">Last 7 days</span>
        </div>
      </div>
      <div className="h-72">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#9CA3AF',
                  usePointStyle: true,
                  padding: 20,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                  color: '#9CA3AF',
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#9CA3AF',
                },
              },
            },
          }}
        />
      </div>
    </motion.div>
  );
};

// Popular Properties Table with Navy/Gold Theme
const PopularPropertiesTable = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Popular Properties</h3>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-[#C9A962]/10 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-[#C9A962]" />
          </div>
          <p className="text-gray-400 text-center">No property data available yet.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Popular Properties</h3>
        <p className="text-sm text-gray-400">Top performing listings this month</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Inquiries
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Favorites
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Conversion
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {properties.map((property, index) => {
              const conversionRate =
                property.views > 0
                  ? ((property.inquiries / property.views) * 100).toFixed(1)
                  : 0;
              return (
                <motion.tr
                  key={property.id || index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-[#C9A962]" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white line-clamp-1">
                          {property.title}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {property.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-white">
                      <Eye className="w-4 h-4 mr-2 text-[#C9A962]" />
                      {(property.views || 0).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-white">
                      <MessageSquare className="w-4 h-4 mr-2 text-blue-400" />
                      {(property.inquiries || 0).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-white">
                      <Heart className="w-4 h-4 mr-2 text-pink-400" />
                      {(property.favorites || 0).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        conversionRate >= 5
                          ? 'bg-green-500/20 text-green-400'
                          : conversionRate >= 2
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {conversionRate}%
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// Location Distribution Bar Chart with Navy/Gold Theme
const LocationDistribution = ({ locations }) => {
  if (!locations || locations.length === 0) {
    return null;
  }

  const chartData = {
    labels: locations.map((loc) => loc.location),
    datasets: [
      {
        label: 'Properties',
        data: locations.map((loc) => loc.count),
        backgroundColor: '#C9A962',
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
          <MapPin className="w-5 h-5 text-[#C9A962]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Properties by Location</h3>
          <p className="text-sm text-gray-400">Distribution across regions</p>
        </div>
      </div>
      <div className="h-64">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                  color: '#9CA3AF',
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#9CA3AF',
                },
              },
            },
          }}
        />
      </div>
    </motion.div>
  );
};

// Loading Skeleton with Navy/Gold Theme
const StatsSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 h-28">
          <div className="h-4 bg-white/10 rounded w-2/3 mb-3"></div>
          <div className="h-8 bg-white/10 rounded w-1/2"></div>
        </div>
      ))}
    </div>
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-80">
      <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
      <div className="h-64 bg-white/10 rounded"></div>
    </div>
  </div>
);

// Main Dashboard Component
const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectAdminStats);
  const status = useSelector(selectAdminStatsStatus);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (status === 'loading') {
    return <StatsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <ViewsOverTimeChart stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularPropertiesTable properties={stats?.popular_properties} />
        <LocationDistribution locations={stats?.popular_locations} />
      </div>
    </div>
  );
};

export default StatisticsDashboard;
