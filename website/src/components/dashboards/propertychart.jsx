import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  MessageSquare,
  Heart,
  TrendingUp,
  MapPin,
  DollarSign,
  Home,
  Calendar,
  Clock,
} from "lucide-react";
import { MdHouseSiding } from "react-icons/md";


const PropertyAnalyticsModal = ({ property, onClose }) => {
  if (!property) return null;

  // Weekly view data (sample - would come from API)
  const weeklyData = [
    { day: "M", views: 10 },
    { day: "T", views: 20 },
    { day: "W", views: 15 },
    { day: "T", views: 25 },
    { day: "F", views: 30 },
    { day: "S", views: 20 },
    { day: "S", views: 35 },
  ];

  const maxViews = Math.max(...weeklyData.map((d) => d.views));

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
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#C9A962]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Analytics for {property.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Property performance overview
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Property Information
                </h3>
                <div className="space-y-4">
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
                    <span className="text-white">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Home className="w-4 h-4 text-[#C9A962]" />
                      Type
                    </span>
                    <span className="text-white capitalize">{property.property_type}</span>
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
                </div>
              </div>

              {/* Views Stats */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Views Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#C9A962]" />
                      Total Views
                    </span>
                    <span className="text-white font-semibold">
                      {property.total_views || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C9A962]" />
                      Last 7 Days
                    </span>
                    <span className="text-white">
                      {property.views_last_7_days || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C9A962]" />
                      Last 30 Days
                    </span>
                    <span className="text-white">
                      {property.views_last_30_days || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Leads Stats */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Leads Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      Total Leads
                    </span>
                    <span className="text-white font-semibold">
                      {property.total_leads || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      Last 7 Days
                    </span>
                    <span className="text-white">
                      {property.leads_last_7_days || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Conversion Rate
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        property.total_views && property.total_leads / property.total_views >= 0.05
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {property.total_views
                        ? `${Math.round((property.total_leads / property.total_views) * 100)}%`
                        : "0%"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Engagement
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      Avg. Time on Page
                    </span>
                    <span className="text-white">
                      {property.avg_time_on_page || "0s"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      Contact Clicks
                    </span>
                    <span className="text-white">
                      {property.contact_clicks || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-400" />
                      Favorite Saves
                    </span>
                    <span className="text-white">
                      {property.favorite_saves || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Weekly Views Chart */}
              <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Views Over Time
                </h3>
                <div className="h-48 flex items-end justify-between gap-2">
                  {weeklyData.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.views / maxViews) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#C9A962] to-[#E8D5A3] relative group"
                        style={{ height: "100%" }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0A1628] border border-white/10 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.views} views
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{data.day}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyAnalyticsModal;
