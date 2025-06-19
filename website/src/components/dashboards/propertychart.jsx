const PropertyAnalyticsModal = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: COLORS.dark }}>
              Analytics for {property.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Property Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Price:</span> ${property.price?.toLocaleString()}</p>
                <p><span className="font-medium">Location:</span> {property.location}</p>
                <p><span className="font-medium">Type:</span> {property.property_type}</p>
                <p><span className="font-medium">Status:</span> {property.status}</p>
              </div>
            </div>

            {/* Views Stats */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Views Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Views:</span>
                  <span className="font-medium">{property.total_views || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last 7 Days:</span>
                  <span className="font-medium">{property.views_last_7_days || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last 30 Days:</span>
                  <span className="font-medium">{property.views_last_30_days || 0}</span>
                </div>
              </div>
            </div>

            {/* Leads Stats */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Leads Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Leads:</span>
                  <span className="font-medium">{property.total_leads || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last 7 Days:</span>
                  <span className="font-medium">{property.leads_last_7_days || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Rate:</span>
                  <span className="font-medium">
                    {property.total_views 
                      ? `${Math.round((property.total_leads / property.total_views) * 100)}%` 
                      : '0%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Engagement</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Avg. Time on Page:</span>
                  <span className="font-medium">{property.avg_time_on_page || '0s'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact Clicks:</span>
                  <span className="font-medium">{property.contact_clicks || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Favorite Saves:</span>
                  <span className="font-medium">{property.favorite_saves || 0}</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="md:col-span-2 border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Views Over Time</h3>
              <div className="h-64 flex items-end space-x-1">
                {/* This would be replaced with actual chart data */}
                {[10, 20, 15, 25, 30, 20, 35].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${value * 2}px`,
                        backgroundColor: COLORS.primary,
                      }}
                    ></div>
                    <span className="text-xs mt-1 text-gray-500">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};