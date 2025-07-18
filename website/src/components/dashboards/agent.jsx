import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "lucide-react";
import LeadForm from "./leadform";
import PropertyAnalyticsModal from "./agentpropertystats";
import { PropertyForm } from "./admin";

const COLORS = {
  primary: "#8B7355", // Stone brown as primary brand color
  secondary: "#D2B48C", // Tan/light stone color
  accent: "#5D4037", // Dark stone color for accents
  light: "#F5F5DC", // Beige/off-white for light backgrounds
  dark: "#3E2723", // Very dark brown for text
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9F7F5",
    100: "#F0EBE5",
    200: "#E0D5C9",
    300: "#C9B8A8",
    400: "#B39E89",
    500: "#8B7355",
    600: "#6D5A43",
    700: "#4F4132",
    800: "#332B21",
    900: "#1A1610",
  },
};

const StatsCard = ({ stat }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
          <h3 className="text-2xl font-bold">{stat.value}</h3>
          {stat.change && (
            <p
              className={`text-xs mt-1 ${
                stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change} from last period
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${stat.color}20` }}
        >
          <div style={{ color: stat.color }}>{stat.icon}</div>
        </div>
      </div>
    </div>
  );
};

const AgentDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const agents = useSelector((state) => state.agent.agents);

  const agentProperties = properties.filter(property => 
  property.agent?.email === user?.email ||
  property.property_agents?.some(pa => pa.agent?.email === user?.email)
);
const leads = useSelector((state) => state.properties.leads);

  const agentStats = useSelector(
    (state) => state.agent.agentStats[user?.email] || {}
  );
  const currentAgent = agents.find(agent => agent.email === user?.email);
  const agentLeads = leads.filter(lead => 
    agentProperties.some(property => property.id === lead.property?.id)
  );
  const properties = agentProperties;
  const leadSources = useSelector((state) => state.properties.leadSources);
  const loading = useSelector((state) => state.properties.loading);

  const [activeTab, setActiveTab] = useState("properties");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);

  // Stats state
  const [statsPeriod, setStatsPeriod] = useState("7days");
  const [leadStatsPeriod, setLeadStatsPeriod] = useState("30days");

   useEffect(() => {
    // Fetch all agents and properties on mount
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
      // Fetch stats when expanding
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

  const handleDeleteLead = (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteLead(leadId));
    }
  };

  const dashboardStats = [
    {
      title: "Total Properties",
      value: properties.length,
      icon: <Home size={24} />,
      color: COLORS.primary,
      change: "+2%",
    },
    {
      title: "Active Leads",
      value: agentStats.active_leads || 0,
      icon: <Users size={24} />,
      color: "#4CAF50",
      change: "+5%",
    },
    {
      title: "Lead Conversion",
      value: "12%",
      icon: <TrendingUp size={24} />,
      color: "#2196F3",
      change: "+1.2%",
    },
    {
      title: "Avg. Response Time",
      value: "2.4h",
      icon: <Bell size={24} />,
      color: "#9C27B0",
      change: "-0.5h",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          {currentAgent && (
            <p className="text-gray-600">
              Welcome back, {currentAgent.first_name} {currentAgent.surname}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("properties")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "properties"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              My Properties
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "leads"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Leads
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "analytics"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        {/* Properties Tab */}
        {activeTab === "properties" && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                My Properties
              </h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    setShowPropertyForm(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  <Plus size={18} />
                  <span>Add Property</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div key={property.id} className="hover:bg-gray-50">
                    <div
                      className="px-6 py-4 flex justify-between items-center cursor-pointer"
                      onClick={() => togglePropertyExpand(property.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                          {property.images?.[0]?.image && (
                            <img
                              src={property.images[0].image}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {property.title}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {property.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold">
                          ${property.price.toLocaleString()}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            property.status === "available"
                              ? "bg-green-100 text-green-800"
                              : property.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {property.status}
                        </span>
                        {expandedPropertyId === property.id ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </div>

                    {expandedPropertyId === property.id && (
                      <div className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">
                              Property Details
                            </h4>
                            <div className="space-y-2">
                              <p className="text-sm">
                                <span className="font-medium">Type:</span>{" "}
                                {property.property_type}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Beds:</span>{" "}
                                {property.beds || "-"}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Baths:</span>{" "}
                                {property.baths || "-"}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Size:</span>{" "}
                                {property.sqft ? `${property.sqft} sqft` : "-"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">
                              Leads Summary
                            </h4>
                            <div className="space-y-2">
                              <p className="text-sm">
                                <span className="font-medium">
                                  Total Leads:
                                </span>{" "}
                                {property.leads_count || 0}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">New:</span>{" "}
                                {property.leads?.filter(
                                  (l) => l.status === "new"
                                ).length || 0}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Contacted:</span>{" "}
                                {property.leads?.filter(
                                  (l) => l.status === "contacted"
                                ).length || 0}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Converted:</span>{" "}
                                {property.leads?.filter(
                                  (l) => l.status === "converted"
                                ).length || 0}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">
                              Quick Actions
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => handleAddLead(property)}
                                className="flex items-center px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary-dark"
                              >
                                <Plus size={14} className="mr-1" />
                                Add Lead
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedProperty(property);
                                  setShowAnalytics(true);
                                }}
                                className="flex items-center px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
                              >
                                <BarChart2 size={14} className="mr-1" />
                                View Stats
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedProperty(property);
                                  setShowPropertyForm(true);
                                }}
                                className="flex items-center px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
                              >
                                <Edit size={14} className="mr-1" />
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Recent Leads for this property */}
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-3">
                            Recent Leads
                          </h4>
                          {property.leads?.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
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
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {property.leads.slice(0, 3).map((lead) => (
                                    <tr key={lead.id}>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {lead.contact_name}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                          <Mail
                                            size={14}
                                            className="mr-1 text-gray-400"
                                          />
                                          {lead.contact_email}
                                        </div>
                                        <div className="flex items-center">
                                          <Phone
                                            size={14}
                                            className="mr-1 text-gray-400"
                                          />
                                          {lead.contact_phone}
                                        </div>
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {lead.source?.name || "Unknown"}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap">
                                        <span
                                          className={`px-2 py-1 text-xs rounded-full ${
                                            lead.status === "new"
                                              ? "bg-blue-100 text-blue-800"
                                              : lead.status === "contacted"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : lead.status === "converted"
                                              ? "bg-green-100 text-green-800"
                                              : "bg-gray-100 text-gray-800"
                                          }`}
                                        >
                                          {lead.status}
                                        </span>
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(
                                          lead.created_at
                                        ).toLocaleDateString()}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                          <button
                                            onClick={() => handleEditLead(lead)}
                                            className="text-blue-600 hover:text-blue-800"
                                          >
                                            <Edit size={16} />
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDeleteLead(lead.id)
                                            }
                                            className="text-red-600 hover:text-red-800"
                                          >
                                            <Trash2 size={16} />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="text-center py-4 text-sm text-gray-500">
                              No leads yet for this property
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No properties found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding your first property
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSelectedProperty(null);
                        setShowPropertyForm(true);
                      }}
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-dark"
                    >
                      <Plus className="-ml-1 mr-2 h-5 w-5" />
                      Add Property
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Leads Management
              </h2>
              <div className="flex space-x-3">
                <select
                  value={leadStatsPeriod}
                  onChange={(e) => setLeadStatsPeriod(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="all">All Time</option>
                </select>
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    setSelectedLead(null);
                    setShowLeadForm(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  <Plus size={18} />
                  <span>Add Lead</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.length > 0 ? (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {lead.property?.title || "Property Deleted"}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${lead.property?.price?.toLocaleString() || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {lead.contact_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {lead.contact_email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {lead.contact_phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.source?.name || "Unknown"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              lead.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : lead.status === "contacted"
                                ? "bg-yellow-100 text-yellow-800"
                                : lead.status === "converted"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditLead(lead)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <User className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No leads found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Get started by adding your first lead
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={() => {
                              setSelectedProperty(null);
                              setSelectedLead(null);
                              setShowLeadForm(true);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-dark"
                          >
                            <Plus className="-ml-1 mr-2 h-5 w-5" />
                            Add Lead
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Property Performance
                </h2>
                <select
                  value={statsPeriod}
                  onChange={(e) => setStatsPeriod(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="all">All Time</option>
                </select>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                      Top Performing Properties
                    </h3>
                    <div className="space-y-4">
                      {(Array.isArray(properties) ? properties : [])
                        .sort(
                          (a, b) => (b.leads_count || 0) - (a.leads_count || 0)
                        )
                        .slice(0, 3)
                        .map((property) => (
                          <div key={property.id} className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                              {property.images?.[0]?.image && (
                                <img
                                  src={property.images[0].image}
                                  alt={property.title}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {property.title}
                                </h4>
                                <span className="text-sm font-semibold">
                                  {property.leads_count || 0} leads
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {property.location}
                              </p>
                              <div className="mt-1">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-primary h-1.5 rounded-full"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        ((property.leads_count || 0) /
                                          Math.max(
                                            1,
                                            properties.reduce(
                                              (max, p) =>
                                                Math.max(
                                                  max,
                                                  p.leads_count || 0
                                                ),
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

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                      Lead Sources
                    </h3>
                    <div className="space-y-3">
                      {leadSources.slice(0, 5).map((source) => (
                        <div
                          key={source.id}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {source.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {
                              leads.filter((l) => l.source?.id === source.id)
                                .length
                            }{" "}
                            leads
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Lead Conversion
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <Smile className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Converted
                    </h3>
                    <p className="mt-1 text-3xl font-semibold text-green-600">
                      {leads?.filter((l) => l.status === "converted").length ||
                        0}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {leads?.length > 0
                        ? `${Math.round(
                            (leads.filter((l) => l.status === "converted")
                              .length /
                              leads.length) *
                              100
                          )}% conversion rate`
                        : "No leads yet"}
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                      <Bell className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      In Progress
                    </h3>
                    <p className="mt-1 text-3xl font-semibold text-yellow-600">
                      {leads?.filter(
                        (l) =>
                          l.status === "contacted" || l.status === "qualified"
                      ).length || 0}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Leads being worked on
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                      <Frown className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Lost
                    </h3>
                    <p className="mt-1 text-3xl font-semibold text-red-600">
                      {leads?.filter((l) => l.status === "lost").length || 0}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Unsuccessful leads
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Property Form Modal */}
      {showPropertyForm && (
        <PropertyForm
          property={selectedProperty}
          onClose={() => {
            setShowPropertyForm(false);
            setSelectedProperty(null);
          }}
          onSave={(property) => {
            if (selectedProperty) {
              // Update existing property
              dispatch(updateProperty(property));
            } else {
              // Add new property
              dispatch(createProperty(property));
            }
            setShowPropertyForm(false);
            setSelectedProperty(null);
          }}
        />
      )}

      {/* Lead Form Modal */}
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
              // Update existing lead
              dispatch(updateLead(lead));
            } else {
              // Add new lead
              dispatch(createLead(lead));
            }
            setShowLeadForm(false);
            setSelectedLead(null);
            setSelectedProperty(null);
          }}
        />
      )}

      {/* Analytics Modal */}
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
