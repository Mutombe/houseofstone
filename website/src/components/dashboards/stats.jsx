// src/components/admin/StatisticsDashboard.js
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats } from '../../redux/slices/adminSlice';
import { useEffect } from 'react';
import { Building2, Eye, Users, User, Home } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa';

// Register Chart.js components
Chart.register(...registerables);

const PropertyTypePieChart = ({ properties }) => {
  const typeData = properties.reduce((acc, property) => {
    const type = property.property_type || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(typeData),
    datasets: [
      {
        data: Object.values(typeData),
        backgroundColor: [
          '#8B7355', // Primary brand color
          '#D2B48C', // Secondary
          '#5D4037', // Accent
          '#F5F5DC', // Light
          '#3E2723', // Dark
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Property Type Distribution</h3>
      <div className="h-64 flex justify-center">
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

// Price Range Histogram Component
const PriceRangeHistogram = ({ properties }) => {
  const prices = properties.map(p => p.price).filter(p => p > 0);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const range = maxPrice - minPrice;
  const binSize = range / 10;
  
  const bins = Array(10).fill(0).map((_, i) => ({
    range: `${Math.floor(minPrice + i * binSize).toLocaleString()} - ${Math.floor(minPrice + (i + 1) * binSize).toLocaleString()}`,
    count: 0
  }));

  prices.forEach(price => {
    const binIndex = Math.min(Math.floor((price - minPrice) / binSize), 9);
    bins[binIndex].count++;
  });

  const chartData = {
    labels: bins.map(b => b.range),
    datasets: [
      {
        label: 'Number of Properties',
        data: bins.map(b => b.count),
        backgroundColor: '#8B7355',
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Price Range Distribution</h3>
      <div className="h-64">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Properties',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Price Range ($)',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

// Views Over Time Line Chart Component
const ViewsOverTimeChart = ({ viewStats }) => {
  const chartData = {
    labels: viewStats?.map(stat => new Date(stat.date).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Daily Views',
        data: viewStats?.map(stat => stat.views) || [],
        borderColor: '#8B7355',
        backgroundColor: 'rgba(139, 115, 85, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Property Views Over Time</h3>
      <div className="h-64">
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Views',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

// Popular Properties Table Component
const PopularPropertiesTable = ({ properties }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Most Viewed Properties</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inquiries
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversion Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties?.map((property, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {property.images?.[0]?.image ? (
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={property.images[0].image}
                          alt=""
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                          <Home className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {property.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${property.price?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {property.view_count?.toLocaleString() || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {property.inquiry_count?.toLocaleString() || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {property.view_count
                      ? `${Math.round(
                          ((property.inquiry_count || 0) / property.view_count) *
                            100
                        )}%`
                      : '0%'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Location Heatmap Component
const LocationHeatmap = ({ properties }) => {
  // This would be replaced with an actual map library like Leaflet or Google Maps
  // Here's a simplified visualization using a grid

  const locationCounts = properties.reduce((acc, property) => {
    const location = property.location.split(',')[0]; // Get primary location part
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const sortedLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Property Location Distribution</h3>
      <div className="space-y-3">
        {sortedLocations.map(([location, count]) => (
          <div key={location} className="flex flex-col">
            <div className="flex justify-between text-sm mb-1">
              <span>{location}</span>
              <span className="font-semibold">{count} properties</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${(count / sortedLocations[0][1]) * 100}%`,
                  backgroundColor: '#8B7355',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dashboard Statistics Cards Component
const StatsCards = ({ stats }) => {
  const cardData = [
    {
      title: "Total Properties",
      value: stats?.active_listings || 0,
      icon: <Building2 size={24} />,
      trend: stats?.active_listings_trend || 0,
    },
    {
      title: "Total Views",
      value: stats?.total_views || 0,
      icon: <Eye size={24} />,
      trend: stats?.total_views_trend || 0,
    },
    {
      title: "Total Inquiries",
      value: stats?.total_inquiries || 0,
      icon: <Users size={24} />,
      trend: stats?.total_inquiries_trend || 0,
    },
    {
      title: "Registered Users",
      value: stats?.total_users || 0,
      icon: <User size={24} />,
      trend: stats?.total_users_trend || 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cardData.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold">{card.value.toLocaleString()}</h3>
              <p className={`text-sm mt-1 ${card.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {card.trend >= 0 ? '↑' : '↓'} {Math.abs(card.trend)}% from last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.admin.stats);
  const properties = useSelector((state) => state.properties.items);
  const loading = useSelector((state) => state.admin.status === 'loading');
  
  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8" style={{ color: '#8B7355' }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PropertyTypePieChart properties={properties} />
        <PriceRangeHistogram properties={properties} />
      </div>
      
      <ViewsOverTimeChart viewStats={stats?.views_last_7_days} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LocationHeatmap properties={properties} />
        <div>
          <PopularPropertiesTable properties={stats?.popular_properties} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;