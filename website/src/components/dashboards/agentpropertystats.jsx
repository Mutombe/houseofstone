import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Home, Eye, Users, Mail, Phone, X, ChevronDown } from 'lucide-react';

const PropertyAnalyticsModal = ({ property, onClose }) => {
  // Sample data - in a real app, this would come from the API
  const statsData = [
    { name: 'Jan', views: 45, leads: 5 },
    { name: 'Feb', views: 78, leads: 8 },
    { name: 'Mar', views: 92, leads: 12 },
    { name: 'Apr', views: 65, leads: 7 },
    { name: 'May', views: 110, leads: 15 },
    { name: 'Jun', views: 85, leads: 9 },
  ];

  const leadSources = [
    { name: 'Website', value: 12 },
    { name: 'Facebook', value: 8 },
    { name: 'Instagram', value: 5 },
    { name: 'Referral', value: 3 },
    { name: 'Other', value: 2 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Analytics for {property.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Property Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className="text-sm font-medium">
                    {property.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Price:</span>
                  <span className="text-sm font-medium">
                    ${property.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Location:</span>
                  <span className="text-sm font-medium">
                    {property.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="text-sm font-medium capitalize">
                    {property.property_type}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Performance Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Views:</span>
                  <span className="text-sm font-medium">
                    {property.stats?.reduce((sum, stat) => sum + stat.views, 0) || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Leads:</span>
                  <span className="text-sm font-medium">
                    {property.leads?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Conversion Rate:</span>
                  <span className="text-sm font-medium">
                    {property.stats?.reduce((sum, stat) => sum + stat.views, 0) 
                      ? `${Math.round((property.leads?.length || 0) / property.stats.reduce((sum, stat) => sum + stat.views, 0) * 100)}%` 
                      : '0%'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Updated:</span>
                  <span className="text-sm font-medium">
                    {new Date(property.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Views & Leads Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#8884d8" name="Views" />
                  <Bar dataKey="leads" fill="#82ca9d" name="Leads" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Sources</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {leadSources.map((source, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{source.name}</span>
                      <span className="font-medium">{source.value} leads</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(source.value / leadSources[0].value) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Leads</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                {property.leads?.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{lead.contact_name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lead.status === 'new' 
                          ? 'bg-blue-100 text-blue-800' 
                          : lead.status === 'contacted' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : lead.status === 'converted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {lead.source?.name || 'Unknown source'} • {new Date(lead.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {(!property.leads || property.leads.length === 0) && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No leads yet for this property
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalyticsModal;