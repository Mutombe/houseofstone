import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { selectAllProperties } from "../../redux/selectors";
import {
  createProperty,
  updateProperty,
  fetchProperties,
  fetchPropertyStats,
  fetchLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../../redux/slices/propertySlice";
import {
  fetchAgentStats,
  fetchAgentProperties,
  fetchAgents,
} from "../../redux/slices/agentSlice";
import {
  Building2,
  Users,
  BarChart2,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  Loader,
  Bell,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  User,
  Frown,
  Smile,
  TrendingUp,
  Home,
  DollarSign,
  Activity,
  Clock,
} from "lucide-react";
import LeadForm from "./leadform";
import PropertyAnalyticsModal from "./agentpropertystats";
import PropertyForm from "./propertyForm";
import {
  PropertyRowSkeleton,
  TableRowSkeleton,
  LoadingSpinner,
} from "../ui/Skeleton";
import { showSuccess, showError } from "../../redux/slices/toastSlice";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdHouseSiding } from "react-icons/md";


// Properties List Skeleton - Only shows skeleton rows inside the list container
const PropertiesListSkeleton = () => (
  <div className="divide-y divide-white/5">
    {[...Array(5)].map((_, i) => (
      <PropertyRowSkeleton key={i} />
    ))}
  </div>
);

// Leads Table Skeleton - Shows skeleton rows inside the table, header remains visible
const LeadsTableSkeleton = () => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-white/10">
          {["Property", "Contact", "Source", "Status", "Date", "Actions"].map((header, i) => (
            <th key={i} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {[...Array(5)].map((_, i) => (
          <TableRowSkeleton key={i} columns={6} />
        ))}
      </tbody>
    </table>
  </div>
);

// Stats Card Component
const StatsCard = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#C9A962]/30 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 font-medium mb-1">{stat.title}</p>
        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
        {stat.change && (
          <p
            className={`text-xs mt-1 flex items-center gap-1 ${
              stat.change.startsWith("+") ? "text-green-400" : "text-red-400"
            }`}
          >
            {stat.change.startsWith("+") ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {stat.change} from last period
          </p>
        )}
      </div>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${stat.color}20` }}
      >
        <div style={{ color: stat.color }}>{stat.icon}</div>
      </div>
    </div>
  </motion.div>
);

// Tab Button Component
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628]"
        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
    }`}
  >
    {children}
  </button>
);

const AgentDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const agents = useSelector((state) => state.agent.agents);
  const allproperties = useSelector(selectAllProperties);

  const agentProperties = allproperties?.filter(
    (property) =>
      property.agent?.email === user?.email ||
      property.property_agents?.some((pa) => pa.agent?.email === user?.email)
  );
  const leads = useSelector((state) => state.properties.leads);

  const agentStats = useSelector(
    (state) => state.agent.agentStats[user?.email] || {}
  );
  const properties = agentProperties;
  const currentAgent = agents.find((agent) => agent.email === user?.email);
  const agentLeads = leads.filter((lead) =>
    agentProperties.some((property) => property.id === lead.property?.id)
  );

  const leadSources = useSelector((state) => state.properties.leadSources);
  const propertiesStatus = useSelector((state) => state.properties.status);
  const leadsStatus = useSelector((state) => state.properties.leadsStatus || "idle");
  const agentsStatus = useSelector((state) => state.agent.status);

  // Computed loading states - Only for data sections, not the whole page
  const isPropertiesLoading = propertiesStatus === "loading";
  const isLeadsLoading = leadsStatus === "loading";

  const [activeTab, setActiveTab] = useState("properties");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);

  const [statsPeriod, setStatsPeriod] = useState("7days");
  const [leadStatsPeriod, setLeadStatsPeriod] = useState("30days");

  useEffect(() => {
    dispatch(fetchAgents());
    dispatch(fetchProperties());
    dispatch(fetchLeads());
  }, [dispatch]);

  const filteredProperties = Array.isArray(properties)
    ? properties.filter(
        (property) =>
          property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property?.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const togglePropertyExpand = (propertyId) => {
    if (expandedPropertyId === propertyId) {
      setExpandedPropertyId(null);
    } else {
      setExpandedPropertyId(propertyId);
      dispatch(fetchPropertyStats(propertyId));
    }
  };

  const handleAddLead = (property) => {
    setSelectedProperty(property);
    setSelectedLead(null);
    setShowLeadForm(true);
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setSelectedProperty(lead.property);
    setShowLeadForm(true);
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await dispatch(deleteLead(leadId)).unwrap();
        dispatch(showSuccess("Lead deleted successfully!", "Delete Lead"));
      } catch (error) {
        dispatch(showError("Unable to delete lead. Please try again.", "Delete Failed"));
      }
    }
  };

  const dashboardStats = [
    {
      title: "Total Properties",
      value: properties.length,
      icon: <Home className="w-6 h-6" />,
      color: "#C9A962",
      change: "+2%",
    },
    {
      title: "Active Leads",
      value: agentStats.active_leads || 0,
      icon: <Users className="w-6 h-6" />,
      color: "#10B981",
      change: "+5%",
    },
    {
      title: "Lead Conversion",
      value: "12%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#3B82F6",
      change: "+1.2%",
    },
    {
      title: "Avg. Response Time",
      value: "2.4h",
      icon: <Clock className="w-6 h-6" />,
      color: "#8B5CF6",
      change: "-0.5h",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060D16] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white"
            >
              Agent Dashboard
            </motion.h1>
            {currentAgent && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 mt-1"
              >
                Welcome back,{" "}
                <span className="text-[#C9A962]">
                  {currentAgent.first_name} {currentAgent.surname}
                </span>
              </motion.p>
            )}
          </div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <TabButton
              active={activeTab === "properties"}
              onClick={() => setActiveTab("properties")}
            >
              My Properties
            </TabButton>
            <TabButton
              active={activeTab === "leads"}
              onClick={() => setActiveTab("leads")}
            >
              Leads
            </TabButton>
            <TabButton
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </TabButton>
          </motion.div>
        </div>

        {/* Stats Cards - Always visible, computed from local data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Properties Tab */}
        {activeTab === "properties" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#C9A962]" />
                My Properties
              </h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedProperty(null);
                    setShowPropertyForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Add Property
                </motion.button>
              </div>
            </div>

            {/* Properties List */}
            <div className="divide-y divide-white/5">
              {isPropertiesLoading && filteredProperties.length === 0 ? (
                <PropertiesListSkeleton />
              ) : filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    {/* Property Row */}
                    <div
                      className="px-6 py-4 flex justify-between items-center cursor-pointer"
                      onClick={() => togglePropertyExpand(property.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white/10 overflow-hidden flex-shrink-0">
                          {property.images?.[0]?.image && (
                            <img
                              src={property.images[0].image}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {property.title}
                          </h3>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C9A962]" />
                            {property.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold text-[#C9A962]">
                          ${property.price.toLocaleString()}
                        </span>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            property.status === "available"
                              ? "bg-green-500/20 text-green-400"
                              : property.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {property.status}
                        </span>
                        {expandedPropertyId === property.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedPropertyId === property.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6 overflow-hidden"
                        >
                          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                              {/* Property Details */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                                  <Home className="w-4 h-4 text-[#C9A962]" />
                                  Property Details
                                </h4>
                                <div className="space-y-2">
                                  <p className="text-sm text-white">
                                    <span className="text-gray-500">Type:</span>{" "}
                                    <span className="capitalize">{property.property_type}</span>
                                  </p>
                                  <p className="text-sm text-white">
                                    <span className="text-gray-500">Beds:</span>{" "}
                                    {property.beds || "-"}
                                  </p>
                                  <p className="text-sm text-white">
                                    <span className="text-gray-500">Baths:</span>{" "}
                                    {property.baths || "-"}
                                  </p>
                                  <p className="text-sm text-white">
                                    <span className="text-gray-500">Size:</span>{" "}
                                    {property.sqft ? `${property.sqft} sqft` : "-"}
                                  </p>
                                </div>
                              </div>

                              {/* Leads Summary */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                                  <FaRegCircleUser className="w-4 h-4 text-[#C9A962]" />
                                  Leads Summary
                                </h4>
                                <div className="space-y-2">
                                  <p className="text-sm text-white">
                                    <span className="text-gray-500">Total:</span>{" "}
                                    {property.leads_count || 0}
                                  </p>
                                  <p className="text-sm text-white">
                                    <span className="text-gray-500">New:</span>{" "}
                                    {property.leads?.filter((l) => l.status === "new").length || 0}
                                  </p>
                                  <p className="text-sm text-white">
                                    <span className="text-gray-500">Contacted:</span>{" "}
                                    {property.leads?.filter((l) => l.status === "contacted").length || 0}
                                  </p>
                                  <p className="text-sm text-white">
                                    <span className="text-gray-500">Converted:</span>{" "}
                                    {property.leads?.filter((l) => l.status === "converted").length || 0}
                                  </p>
                                </div>
                              </div>

                              {/* Quick Actions */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                                  <Activity className="w-4 h-4 text-[#C9A962]" />
                                  Quick Actions
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddLead(property);
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                                  >
                                    <Plus className="w-3 h-3" />
                                    Add Lead
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedProperty(property);
                                      setShowAnalytics(true);
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                                  >
                                    <BarChart2 className="w-3 h-3" />
                                    View Stats
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedProperty(property);
                                      setShowPropertyForm(true);
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                                  >
                                    <Edit className="w-3 h-3" />
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Recent Leads Table */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-3">
                                Recent Leads
                              </h4>
                              {property.leads?.length > 0 ? (
                                <div className="overflow-x-auto">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="border-b border-white/10">
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Contact
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Source
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Status
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Date
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Actions
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                      {property.leads.slice(0, 3).map((lead) => (
                                        <tr key={lead.id} className="hover:bg-white/5">
                                          <td className="px-4 py-3 text-sm font-medium text-white">
                                            {lead.contact_name}
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-400">
                                            <div className="flex items-center gap-1">
                                              <Mail className="w-3 h-3 text-gray-500" />
                                              {lead.contact_email}
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <Phone className="w-3 h-3 text-gray-500" />
                                              {lead.contact_phone}
                                            </div>
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-400">
                                            {lead.source?.name || "Unknown"}
                                          </td>
                                          <td className="px-4 py-3">
                                            <span
                                              className={`px-2 py-1 text-xs rounded-full ${
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
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-400">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                          </td>
                                          <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleEditLead(lead);
                                                }}
                                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                              >
                                                <Edit className="w-4 h-4" />
                                              </button>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDeleteLead(lead.id);
                                                }}
                                                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                              >
                                                <Trash2 className="w-4 h-4" />
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-center py-4 text-sm text-gray-500">
                                  No leads yet for this property
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="px-6 py-16 text-center">
                  <Building2 className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    No properties found
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Get started by adding your first property
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedProperty(null);
                      setShowPropertyForm(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl"
                  >
                    <Plus className="w-5 h-5" />
                    Add Property
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaRegCircleUser className="w-5 h-5 text-[#C9A962]" />
                Leads Management
              </h2>
              <div className="flex gap-3">
                <select
                  value={leadStatsPeriod}
                  onChange={(e) => setLeadStatsPeriod(e.target.value)}
                  className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A962]/50"
                >
                  <option value="7days" className="bg-[#0A1628]">Last 7 Days</option>
                  <option value="30days" className="bg-[#0A1628]">Last 30 Days</option>
                  <option value="90days" className="bg-[#0A1628]">Last 90 Days</option>
                  <option value="all" className="bg-[#0A1628]">All Time</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedProperty(null);
                    setSelectedLead(null);
                    setShowLeadForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                  Add Lead
                </motion.button>
              </div>
            </div>

            {isLeadsLoading && leads.length === 0 ? (
              <LeadsTableSkeleton />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.length > 0 ? (
                    leads.map((lead, index) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white">
                            {lead.property?.title || "Property Deleted"}
                          </div>
                          <div className="text-sm text-[#C9A962]">
                            ${lead.property?.price?.toLocaleString() || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white">{lead.contact_name}</div>
                          <div className="text-sm text-gray-400">{lead.contact_email}</div>
                          <div className="text-sm text-gray-400">{lead.contact_phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {lead.source?.name || "Unknown"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
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
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditLead(lead)}
                              className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-16 text-center">
                        <User className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">No leads found</h3>
                        <p className="text-sm text-gray-400 mb-6">
                          Get started by adding your first lead
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedProperty(null);
                            setSelectedLead(null);
                            setShowLeadForm(true);
                          }}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl"
                        >
                          <Plus className="w-5 h-5" />
                          Add Lead
                        </motion.button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Performance Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-[#C9A962]" />
                  Property Performance
                </h2>
                <select
                  value={statsPeriod}
                  onChange={(e) => setStatsPeriod(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A962]/50"
                >
                  <option value="7days" className="bg-[#0A1628]">Last 7 Days</option>
                  <option value="30days" className="bg-[#0A1628]">Last 30 Days</option>
                  <option value="90days" className="bg-[#0A1628]">Last 90 Days</option>
                  <option value="all" className="bg-[#0A1628]">All Time</option>
                </select>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top Properties */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#C9A962]" />
                      Top Performing Properties
                    </h3>
                    <div className="space-y-4">
                      {(Array.isArray(properties) ? properties : [])
                        .sort((a, b) => (b.leads_count || 0) - (a.leads_count || 0))
                        .slice(0, 3)
                        .map((property, index) => (
                          <div key={property.id} className="flex items-start gap-3">
                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-white/10 overflow-hidden">
                              {property.images?.[0]?.image && (
                                <img
                                  src={property.images[0].image}
                                  alt={property.title}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-sm font-medium text-white truncate">
                                  {property.title}
                                </h4>
                                <span className="text-sm font-semibold text-[#C9A962]">
                                  {property.leads_count || 0} leads
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 truncate">{property.location}</p>
                              <div className="mt-2">
                                <div className="w-full bg-white/10 rounded-full h-1.5">
                                  <div
                                    className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] h-1.5 rounded-full"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        ((property.leads_count || 0) /
                                          Math.max(
                                            1,
                                            properties.reduce(
                                              (max, p) => Math.max(max, p.leads_count || 0),
                                              0
                                            )
                                          )) *
                                          100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Lead Sources */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#C9A962]" />
                      Lead Sources
                    </h3>
                    <div className="space-y-3">
                      {leadSources.slice(0, 5).map((source) => (
                        <div key={source.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{source.name}</span>
                          <span className="text-sm text-[#C9A962]">
                            {leads.filter((l) => l.source?.id === source.id).length} leads
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Conversion Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#C9A962]" />
                  Lead Conversion
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Converted */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/20 mb-3">
                      <Smile className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-sm font-medium text-white mb-1">Converted</h3>
                    <p className="text-3xl font-bold text-green-400">
                      {leads?.filter((l) => l.status === "converted").length || 0}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {leads?.length > 0
                        ? `${Math.round(
                            (leads.filter((l) => l.status === "converted").length / leads.length) * 100
                          )}% conversion rate`
                        : "No leads yet"}
                    </p>
                  </div>

                  {/* In Progress */}
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/20 mb-3">
                      <Bell className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-sm font-medium text-white mb-1">In Progress</h3>
                    <p className="text-3xl font-bold text-yellow-400">
                      {leads?.filter((l) => l.status === "contacted" || l.status === "qualified").length || 0}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Leads being worked on</p>
                  </div>

                  {/* Lost */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 mb-3">
                      <Frown className="h-6 w-6 text-red-400" />
                    </div>
                    <h3 className="text-sm font-medium text-white mb-1">Lost</h3>
                    <p className="text-3xl font-bold text-red-400">
                      {leads?.filter((l) => l.status === "lost").length || 0}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Unsuccessful leads</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      {showPropertyForm && (
        <PropertyForm
          property={selectedProperty}
          onClose={() => {
            setShowPropertyForm(false);
            setSelectedProperty(null);
          }}
          onSave={(property) => {
            if (selectedProperty) {
              dispatch(updateProperty(property));
            } else {
              dispatch(createProperty(property));
            }
            setShowPropertyForm(false);
            setSelectedProperty(null);
          }}
        />
      )}

      {showLeadForm && (
        <LeadForm
          lead={selectedLead}
          property={selectedProperty}
          leadSources={leadSources}
          onClose={() => {
            setShowLeadForm(false);
            setSelectedLead(null);
            setSelectedProperty(null);
          }}
          onSave={(lead) => {
            if (selectedLead) {
              dispatch(updateLead(lead));
            } else {
              dispatch(createLead(lead));
            }
            setShowLeadForm(false);
            setSelectedLead(null);
            setSelectedProperty(null);
          }}
        />
      )}

      {showAnalytics && selectedProperty && (
        <PropertyAnalyticsModal
          property={selectedProperty}
          onClose={() => {
            setShowAnalytics(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default AgentDashboard;
