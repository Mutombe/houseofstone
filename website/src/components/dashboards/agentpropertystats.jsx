import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  Home,
  Eye,
  Users,
  Mail,
  Phone,
  X,
  TrendingUp,
  Calendar,
  MessageSquare,
  Heart,
  Share2,
  MapPin,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdHouseSiding } from "react-icons/md";


const PropertyAnalyticsModal = ({ property, onClose }) => {
  // Sample data - in a real app, this would come from the API
  const statsData = [
    { name: "Jan", views: 45, leads: 5 },
    { name: "Feb", views: 78, leads: 8 },
    { name: "Mar", views: 92, leads: 12 },
    { name: "Apr", views: 65, leads: 7 },
    { name: "May", views: 110, leads: 15 },
    { name: "Jun", views: 85, leads: 9 },
  ];

  const leadSources = [
    { name: "Website", value: 12, color: "#C9A962" },
    { name: "Facebook", value: 8, color: "#60A5FA" },
    { name: "Instagram", value: 5, color: "#F472B6" },
    { name: "Referral", value: 3, color: "#34D399" },
    { name: "Other", value: 2, color: "#A78BFA" },
  ];

  const totalViews = property.stats?.reduce((sum, stat) => sum + stat.views, 0) || 0;
  const totalLeads = property.leads?.length || 0;
  const conversionRate = totalViews > 0 ? ((totalLeads / totalViews) * 100).toFixed(1) : 0;

  // Stats Card Component
  const StatCard = ({ title, value, icon: Icon, trend, color = "gold" }) => {
    const colorClasses = {
      gold: "bg-[#C9A962]/10 text-[#C9A962]",
      blue: "bg-blue-500/10 text-blue-400",
      green: "bg-green-500/10 text-green-400",
      pink: "bg-pink-500/10 text-pink-400",
    };

    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
          {trend !== undefined && (
            <span
              className={`flex items-center text-xs font-medium ${
                trend >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend >= 0 ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{title}</p>
      </div>
    );
  };

  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A1628] border border-white/10 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-[#C9A962]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Property Analytics
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-1">
                    {property.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="Total Views"
                value={totalViews.toLocaleString()}
                icon={Eye}
                trend={12}
                color="gold"
              />
              <StatCard
                title="Total Leads"
                value={totalLeads}
                icon={MessageSquare}
                trend={8}
                color="blue"
              />
              <StatCard
                title="Conversion Rate"
                value={`${conversionRate}%`}
                icon={TrendingUp}
                trend={conversionRate > 2 ? 5 : -3}
                color="green"
              />
              <StatCard
                title="Favorites"
                value={property.favorite_saves || 0}
                icon={Heart}
                trend={15}
                color="pink"
              />
            </div>

            {/* Property Overview & Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Property Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Property Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#C9A962]" />
                      Price
                    </span>
                    <span className="text-white font-semibold">
                      ${property.price?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C9A962]" />
                      Location
                    </span>
                    <span className="text-white font-medium">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Home className="w-4 h-4 text-[#C9A962]" />
                      Type
                    </span>
                    <span className="text-white font-medium capitalize">
                      {property.property_type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status</span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        property.status === "available"
                          ? "bg-green-500/20 text-green-400"
                          : property.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C9A962]" />
                      Last Updated
                    </span>
                    <span className="text-white font-medium">
                      {new Date(property.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead Sources */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Lead Sources
                </h3>
                <div className="space-y-3">
                  {leadSources.map((source, index) => {
                    const percentage = Math.round(
                      (source.value / leadSources[0].value) * 100
                    );
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-gray-300">{source.name}</span>
                          <span className="text-white font-medium">
                            {source.value} leads
                          </span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: source.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Views & Leads Chart */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Views & Leads Over Time
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#C9A962]" />
                    <span className="text-xs text-gray-400">Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#60A5FA]" />
                    <span className="text-xs text-gray-400">Leads</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={statsData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C9A962" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#C9A962" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="name"
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#C9A962"
                      strokeWidth={2}
                      fill="url(#viewsGradient)"
                      name="Views"
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stroke="#60A5FA"
                      strokeWidth={2}
                      fill="url(#leadsGradient)"
                      name="Leads"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Recent Leads
              </h3>
              {property.leads && property.leads.length > 0 ? (
                <div className="space-y-3">
                  {property.leads.slice(0, 5).map((lead) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C9A962]/10 rounded-full flex items-center justify-center">
                          <FaRegCircleUser className="w-5 h-5 text-[#C9A962]" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">
                            {lead.contact_name}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {lead.source?.name || "Unknown source"} &bull;{" "}
                            {new Date(lead.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          lead.status === "new"
                            ? "bg-blue-500/20 text-blue-400"
                            : lead.status === "contacted"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : lead.status === "converted"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                    <MessageSquare className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-sm">
                    No leads yet for this property
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyAnalyticsModal;
