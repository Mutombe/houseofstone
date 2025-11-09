import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import StatisticsDashboard from "./stats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Building2,
  AlertCircle,
  Home,
  Star,
  MapPin,
  DollarSign,
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
  BarChart2,
  Users,
  BellRing,
  Menu,
  X,
  PieChart,
  UserCheck,
  Calendar,
  Clock,
  CheckCircle,
  User,
  UserPlus,
  Camera,
} from "lucide-react";
import { Bold, Italic, List, AlignLeft, Underline, Type } from "lucide-react";
import { fetchUsers } from "../../redux/slices/userSlice";
import { fetchAdminStats } from "../../redux/slices/adminSlice";
import {
  fetchAgents,
  deleteAgent,
  selectSelectedAgent,
  createAgent,
  updateAgent,
} from "../../redux/slices/agentSlice";
import {
  fetchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../../redux/slices/propertySlice";
import { fetchPropertiesWithoutPagination } from "../../redux/slices/propertySlice";
import { Snackbar, Alert } from "@mui/material";
import { PropertyForm } from './propertyForm';

// Brand color constants
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

// Rich Text Editor Component

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
              <h3 className="text-lg font-semibold mb-4">
                Property Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Price:</span> $
                  {property.price?.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {property.location}
                </p>
                <p>
                  <span className="font-medium">Type:</span>{" "}
                  {property.property_type}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {property.status}
                </p>
              </div>
            </div>

            {/* Views Stats */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Views Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Views:</span>
                  <span className="font-medium">
                    {property.total_views || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last 7 Days:</span>
                  <span className="font-medium">
                    {property.views_last_7_days || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last 30 Days:</span>
                  <span className="font-medium">
                    {property.views_last_30_days || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Leads Stats */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Leads Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Leads:</span>
                  <span className="font-medium">
                    {property.total_leads || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last 7 Days:</span>
                  <span className="font-medium">
                    {property.leads_last_7_days || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Rate:</span>
                  <span className="font-medium">
                    {property.total_views
                      ? `${Math.round(
                          (property.total_leads / property.total_views) * 100
                        )}%`
                      : "0%"}
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
                  <span className="font-medium">
                    {property.avg_time_on_page || "0s"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Contact Clicks:</span>
                  <span className="font-medium">
                    {property.contact_clicks || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Favorite Saves:</span>
                  <span className="font-medium">
                    {property.favorite_saves || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="md:col-span-2 border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Views Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Jan", views: 10 },
                      { name: "Feb", views: 20 },
                      { name: "Mar", views: 15 },
                      { name: "Apr", views: 25 },
                      { name: "May", views: 30 },
                      { name: "Jun", views: 20 },
                      { name: "Jul", views: 35 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill={COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentForm = ({ currentForm, setCurrentForm, selectedAgent }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    surname: "",
    cell_number: "",
    email: "",
    position: "",
    permissions: "view_only",
    agency_name: "House of Stone Properties",
    branch: "Borrowdale",
    address: "21 Harare Drive Borrowdale, Harare",
    is_active: true,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const loading = useSelector((state) => state.agent.loading);

  useEffect(() => {
    if (currentForm === "editAgent" && selectedAgent) {
      setFormData({
        first_name: selectedAgent.first_name,
        middle_name: selectedAgent.middle_name || "",
        surname: selectedAgent.surname,
        cell_number: selectedAgent.cell_number,
        email: selectedAgent.email,
        position: selectedAgent.position,
        permissions: selectedAgent.permissions,
        agency_name: selectedAgent.agency_name,
        branch: selectedAgent.branch,
        address: selectedAgent.address,
        is_active: selectedAgent.is_active,
      });
    }
  }, [currentForm, selectedAgent]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const agentFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      agentFormData.append(key, formData[key]);
    });

    try {
      if (currentForm === "edit" && selectedAgent) {
        await dispatch(
          updateAgent({
            id: selectedAgent.id,
            data: agentFormData,
          })
        ).unwrap();
        setSnackbar({
          open: true,
          message: "Agent updated successfully!",
          severity: "success",
        });
      } else {
        await dispatch(createAgent(agentFormData)).unwrap();
        setSnackbar({
          open: true,
          message: "Agent created successfully!",
          severity: "success",
        });
      }

      dispatch(fetchAgents());
      setCurrentForm(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Operation failed!",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: COLORS.dark }}>
                {currentForm === "edit" ? "Edit Agent" : "Add New Agent"}
              </h2>
              <button
                onClick={() => setCurrentForm(null)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Middle Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Surname */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surname*
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Cell Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cell Number*
                  </label>
                  <input
                    type="tel"
                    name="cell_number"
                    value={formData.cell_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position*
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="agency_admin">Agency Admin</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Permissions*
                  </label>
                  <select
                    name="permissions"
                    value={formData.permissions}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="upload">Upload</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="view_only">View Only</option>
                  </select>
                </div>

                {/* Agency Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agency Name
                  </label>
                  <input
                    type="text"
                    name="agency_name"
                    value={formData.agency_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="2"
                  ></textarea>
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor="is_active"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Active Status
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setCurrentForm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }}
                  className="px-4 py-2 rounded-md hover:opacity-90"
                >
                  {loading ? (
                    <Loader className="animate-spin h-5 w-5" />
                  ) : currentForm === "edit" ? (
                    "Update Agent"
                  ) : (
                    "Create Agent"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          className="items-center"
          iconMapping={{
            error: <AlertCircle className="w-5 h-5" />,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const PropertyDashboard = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties?.adminProperties);
  const loadingStatus = useSelector((state) => state.properties.status);
  const [analyticsProperty, setAnalyticsProperty] = useState(null);
  const error = useSelector((state) => state.properties.error);
  const user = useSelector((state) => state.auth.user);
  const adminStats = useSelector((state) => state.admin.stats);
  const users = useSelector((state) => state.user.list);
  const usersStatus = useSelector((state) => state.user.status);
  const usersError = useSelector((state) => state.user.error);
  const agents = useSelector((state) => state.agent.agents);

  const [activeTab, setActiveTab] = useState("properties");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentForm, setCurrentForm] = useState(null);
  const [currentAgentForm, setCurrentAgentForm] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    propertyType: "",
    priceMin: "",
    priceMax: "",
    sortBy: "created_at",
    sortDirection: "desc",
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [agentsSearchTerm, setAgentsSearchTerm] = useState("");

  // Add handler functions
  const handleAddAgent = () => {
    setSelectedAgent(null);
    setCurrentForm("addAgent");
  };

  const handleEditAgent = (agent) => {
    selectSelectedAgent(agent);
    setCurrentForm("editAgent");
  };

  const handleDeleteAgent = (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      dispatch(deleteAgent(id));
    }
  };

  const showPropertyAnalytics = (property) => {
    setAnalyticsProperty(property);
  };

  // Initial form state for new/edit property
  const initialFormState = {
    title: "",
    description: "",
    price: "",
    location: "",
    property_type: "house",
    status: "available",
    beds: "",
    baths: "",
    sqft: "",
    year_built: "",
    lot_size: "",
    garage: "",
    latitude: "",
    longitude: "",
    is_published: true,
    virtual_tour_url: "",
    images: [],
    features: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    dispatch(fetchPropertiesWithoutPagination());
    dispatch(fetchAdminStats());
    dispatch(fetchAgents());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "users" && usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [activeTab, usersStatus, dispatch]);

  useEffect(() => {
    if (!currentForm) {
      setFormData(initialFormState);
      setSelectedProperty(null);
    }
  }, [currentForm]);

  // Load property data into form when editing
  useEffect(() => {
    if (selectedProperty && currentForm === "edit") {
      setFormData({
        title: selectedProperty.title || "",
        description: selectedProperty.description || "",
        price: selectedProperty.price || "",
        location: selectedProperty.location || "",
        property_type: selectedProperty.property_type || "house",
        latitude: selectedProperty.latitude || "",
        longitude: selectedProperty.longitude || "",
        is_published:
          selectedProperty.is_published !== undefined
            ? selectedProperty.is_published
            : true,
        virtual_tour_url: selectedProperty.virtual_tour_url || "",
      });
    }
  }, [selectedProperty, currentForm]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert string values to appropriate types
    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
    };

    if (currentForm === "edit" && selectedProperty) {
      dispatch(updateProperty({ id: selectedProperty.id, data: propertyData }));
    } else {
      dispatch(createProperty(propertyData));
    }

    setCurrentForm(null);
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      dispatch(deleteProperty(id));
    }
  };

  const handleToggleVisibility = (property) => {
    dispatch(
      updateProperty({
        id: property.id,
        data: { is_published: !property.is_published },
      })
    );
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setCurrentForm("edit");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  const handleSort = (field) => {
    setFilterCriteria((prev) => ({
      ...prev,
      sortBy: field,
      sortDirection:
        prev.sortBy === field && prev.sortDirection === "asc" ? "desc" : "asc",
    }));
  };

  // Filter and sort properties

  const filteredProperties = Array.isArray(properties)
    ? properties
        .filter((property) => {
          const matchesSearch =
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            property.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase());

          const matchesType =
            !filterCriteria.propertyType ||
            property.property_type === filterCriteria.propertyType;

          const matchesMinPrice =
            !filterCriteria.priceMin ||
            property.price >= parseFloat(filterCriteria.priceMin);

          const matchesMaxPrice =
            !filterCriteria.priceMax ||
            property.price <= parseFloat(filterCriteria.priceMax);

          return (
            matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice
          );
        })
        .sort((a, b) => {
          const field = filterCriteria.sortBy;
          const direction = filterCriteria.sortDirection === "asc" ? 1 : -1;

          if (field === "price") {
            return (a.price - b.price) * direction;
          }

          if (field === "created_at") {
            return (
              (new Date(a.created_at) - new Date(b.created_at)) * direction
            );
          }

          if (a[field] < b[field]) return -1 * direction;
          if (a[field] > b[field]) return 1 * direction;
          return 0;
        })
    : [];

  // Dashboard statistics cards
  const statsCards = [
    {
      title: "Active Listings",
      value: adminStats?.active_listings || 0,
      icon: <Building2 />,
      color: "#4CAF50",
    },
    {
      title: "Total Inquiries",
      value: adminStats?.total_inquiries || 0,
      icon: <Users />,
      color: "#2196F3",
    },
    {
      title: "Total Views",
      value: adminStats?.total_views || 0,
      icon: <Eye />,
      color: "#9C27B0",
    },
    {
      title: "Total Users",
      value: adminStats?.total_users || 0,
      icon: <Users />,
      color: "#FF9800",
    },
  ];

  // Render statistics charts based on admin data
  const renderStatCharts = () => {
    if (!adminStats || Object.keys(adminStats).length === 0) {
      return <div className="text-center py-8">Loading statistics...</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-16">
        {/* Views by Interaction Type */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Interaction Types</h3>
          <div className="h-64 flex items-end space-x-4 mt-4">
            {adminStats?.views_by_type?.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${
                      (item.count /
                        Math.max(
                          ...adminStats.views_by_type.map((i) => i.count)
                        )) *
                      200
                    }px`,
                    backgroundColor: COLORS.primary,
                  }}
                ></div>
                <div className="text-xs mt-2 text-gray-600 w-full text-center truncate">
                  {item.interaction_type}
                </div>
                <div className="font-semibold">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Locations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
          <div className="space-y-3">
            {adminStats?.popular_locations?.map((location, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between text-sm mb-1">
                  <span>{location.location}</span>
                  <span className="font-semibold">
                    {location.count} properties
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${
                        (location.count /
                          adminStats.popular_locations[0].count) *
                        100
                      }%`,
                      backgroundColor: COLORS.primary,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Properties Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Most Viewed Properties</h3>
          <div className="space-y-4">
            {adminStats?.popular_properties?.map((property, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mr-3"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium truncate">{property.title}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye size={14} className="mr-1" />
                    {property.views} views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-64 flex items-end space-x-1">
            {adminStats?.user_growth?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1"
                title={`${item.date}: ${item.count} users`}
              >
                <div
                  className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${
                      (item.count /
                        Math.max(
                          ...adminStats.user_growth.map((i) => i.count)
                        )) *
                      200
                    }px`,
                    backgroundColor: COLORS.secondary,
                  }}
                ></div>
                <div className="text-xs mt-1 text-gray-600 transform -rotate-45 origin-top-left">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Property Form Modal
  const renderPropertyForm = () => {
    if (!currentForm) return null;

    return (
      <PropertyForm
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
        selectedProperty={selectedProperty}
      />
    );
  };

  // Loading state
  if (loadingStatus === "loading" && properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader
            size={40}
            className="animate-spin mb-4"
            style={{ color: COLORS.primary }}
          />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (loadingStatus === "failed") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-700 mb-4">
            {error || "Failed to load properties. Please try again."}
          </p>
          <button
            onClick={() => dispatch(fetchProperties())}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 pt-16">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-20 pt-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} className="" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 z-10 transition duration-200 ease-in-out lg:flex`}
        style={{
          backgroundColor: COLORS.dark,
          width: "250px",
          paddingTop: "95px",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 text-center">
            <h1 className="text-2xl font-bold text-white">House of Stone</h1>
            <p className="text-gray-400 text-sm">Admin Dashboard</p>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            <button
              onClick={() => setActiveTab("properties")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === "properties"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Building2 size={18} />
              <span>Properties</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Users size={18} />
              <span>Users</span>
            </button>

            {/* Add this button to the sidebar navigation */}
            <button
              onClick={() => setActiveTab("agents")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === "agents"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Users size={18} />
              <span>Agents</span>
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === "notifications"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <BellRing size={18} />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === "stats"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <BarChart2 size={18} />
              <span>Statistics</span>
            </button>
          </nav>

          <div className="px-4 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: COLORS.dark }}>
              {activeTab === "properties" && "Property Management"}
              {activeTab === "users" && "User Management"}
              {activeTab === "notifications" && "Notifications"}
              {activeTab === "stats" && "Statistics Dashboard"}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 hidden md:block">
                <Clock size={14} className="inline mr-1" />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              {activeTab === "properties" && (
                <button
                  onClick={() => setCurrentForm("add")}
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:opacity-90"
                >
                  <Plus size={18} />
                  <span>Add Property</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          {activeTab !== "stats" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        {card.title}
                      </p>
                      <h3 className="text-2xl font-bold">{card.value}</h3>
                    </div>
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <div style={{ color: card.color }}>{card.icon}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  {/* Search */}
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center">
                      <Filter size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-500">Filters:</span>
                    </div>

                    <select
                      name="propertyType"
                      value={filterCriteria.propertyType}
                      onChange={handleFilterChange}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Types</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="land">Land</option>
                      <option value="commercial">Commercial</option>
                    </select>

                    <input
                      type="number"
                      name="priceMin"
                      placeholder="Min Price"
                      value={filterCriteria.priceMin}
                      onChange={handleFilterChange}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1.5 w-24 focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                      type="number"
                      name="priceMax"
                      placeholder="Max Price"
                      value={filterCriteria.priceMax}
                      onChange={handleFilterChange}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1.5 w-24 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      name="sortBy"
                      placeholder="Sort By"
                      value={filterCriteria.sortBy}
                      onChange={handleFilterChange}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1.5 w-24 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSort("price")}
                      className={`text-sm text-gray-500 ${
                        filterCriteria.sortBy === "price" ? "font-semibold" : ""
                      }`}
                    >
                      Price{" "}
                      {filterCriteria.sortDirection === "asc" ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleSort("created_at")}
                      className={`text-sm text-gray-500 ${
                        filterCriteria.sortBy === "created_at"
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      Date{" "}
                      {filterCriteria.sortDirection === "asc" ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleSort("location")}
                      className={`text-sm text-gray-500 ${
                        filterCriteria.sortBy === "location"
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      Location{" "}
                      {filterCriteria.sortDirection === "asc" ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((card, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">
                          {card.title}
                        </p>
                        <h3 className="text-2xl font-bold">{card.value}</h3>
                      </div>
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${card.color}20` }}
                      >
                        <div style={{ color: card.color }}>{card.icon}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <StatisticsDashboard />
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:opacity-90"
                >
                  <Plus size={18} />
                  <span>Add User</span>
                </button>
                {usersStatus === "loading" && <div>Loading users...</div>}
                {usersError && (
                  <div className="text-red-500">Error: {usersError}</div>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(users) &&
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                {user.first_name?.[0] ||
                                  user.email[0].toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.first_name} {user.last_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Joined{" "}
                                  {new Date(
                                    user.date_joined
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {user.is_staff ? "Admin" : "User"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="py-3 flex items-center justify-between border-t border-gray-200 mt-4">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">5</span> of{" "}
                      <span className="font-medium">20</span> users
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {[1, 2, 3].map((page) => (
                        <button
                          key={page}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === 1
                              ? "z-10 bg-stone-50 border-stone-500 text-stone-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add this case to the main content switch */}
          {activeTab === "agents" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={agentsSearchTerm}
                    onChange={(e) => setAgentsSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAddAgent}
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:opacity-90"
                >
                  <Plus size={18} />
                  <span>Add Agent</span>
                </button>
              </div>

              {/* Agents Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {agents
                      .filter(
                        (agent) =>
                          agent.full_name
                            ?.toLowerCase()
                            .includes(agentsSearchTerm.toLowerCase()) ||
                          agent.email
                            ?.toLowerCase()
                            .includes(agentsSearchTerm.toLowerCase()) ||
                          agent.phone
                            ?.toLowerCase()
                            .includes(agentsSearchTerm.toLowerCase()) ||
                          agent.position
                            ?.toLowerCase()
                            .includes(agentsSearchTerm.toLowerCase())
                      )
                      .map((agent) => (
                        <tr key={agent.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                {agent.full_name?.charAt(0) || "A"}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {agent.full_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {agent.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {agent.cell_number}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {agent.position}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditAgent(agent)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteAgent(agent.id)}
                                className="text-red-600 hover:text-red-900"
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
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Recent Notifications
                  </h3>
                  <div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Mark all as read
                    </button>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {[
                  {
                    type: "message",
                    title: "New inquiry received",
                    desc: 'You have received a new inquiry for "Modern Apartment in Downtown"',
                    time: "5 minutes ago",
                    read: false,
                  },
                  {
                    type: "user",
                    title: "New user registration",
                    desc: "Sarah Johnson has registered a new account",
                    time: "2 hours ago",
                    read: false,
                  },
                  {
                    type: "property",
                    title: "Property listing approved",
                    desc: "Beach House in Malibu has been approved and is now live",
                    time: "1 day ago",
                    read: true,
                  },
                  {
                    type: "alert",
                    title: "System maintenance",
                    desc: "The system will undergo maintenance on June 15th from 2:00 AM to 4:00 AM",
                    time: "2 days ago",
                    read: true,
                  },
                  {
                    type: "update",
                    title: "Price update",
                    desc: 'The price for "Luxury Villa" has been updated to $1,250,000',
                    time: "3 days ago",
                    read: true,
                  },
                ].map((notification, index) => (
                  <div
                    key={index}
                    className={`px-6 py-4 transition-colors ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        {notification.type === "message" && (
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <BellRing size={20} className="text-blue-700" />
                          </div>
                        )}
                        {notification.type === "user" && (
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Users size={20} className="text-green-700" />
                          </div>
                        )}
                        {notification.type === "property" && (
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Building2 size={20} className="text-purple-700" />
                          </div>
                        )}
                        {notification.type === "alert" && (
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <BellRing size={20} className="text-red-700" />
                          </div>
                        )}
                        {notification.type === "update" && (
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <DollarSign size={20} className="text-yellow-700" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm font-semibold ${
                              !notification.read
                                ? "text-blue-800"
                                : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-gray-200 text-center">
                <button
                  style={{ color: COLORS.primary }}
                  className="text-sm font-medium hover:underline"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}

          {/* Properties Table (continued from previous code) */}
          {activeTab === "properties" && (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("title")}
                      >
                        <div className="flex items-center">
                          Title
                          {filterCriteria.sortBy === "title" &&
                            (filterCriteria.sortDirection === "asc" ? (
                              <ArrowUp size={14} className="ml-1" />
                            ) : (
                              <ArrowDown size={14} className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("price")}
                      >
                        <div className="flex items-center">
                          Price
                          {filterCriteria.sortBy === "price" &&
                            (filterCriteria.sortDirection === "asc" ? (
                              <ArrowUp size={14} className="ml-1" />
                            ) : (
                              <ArrowDown size={14} className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProperties.map((property) => (
                      <tr key={property.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {property.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${property.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <MapPin size={14} className="mr-1 text-gray-400" />
                            <span className="truncate max-w-[150px]">
                              {property.location}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">
                            {property.property_type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              property.is_published
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {property.is_published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleToggleVisibility(property)}
                              className="text-gray-600 hover:text-gray-900 tooltip"
                              title={property.is_published ? "Hide" : "Publish"}
                            >
                              {property.is_published ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                            <button
                              onClick={() => showPropertyAnalytics(property)}
                              className="text-purple-600 hover:text-purple-900 tooltip"
                              title="Analytics"
                            >
                              <BarChart2 size={16} />
                            </button>
                            <button
                              onClick={() => handleEditProperty(property)}
                              className="text-blue-600 hover:text-blue-900 tooltip"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(property.id)}
                              className="text-red-600 hover:text-red-900 tooltip"
                              title="Delete"
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

              {filteredProperties.length === 0 && (
                <div className="py-12 text-center">
                  <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No properties found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ||
                    filterCriteria.propertyType ||
                    filterCriteria.priceMin ||
                    filterCriteria.priceMax
                      ? "Try changing your search filters"
                      : "Get started by adding a property"}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setCurrentForm("add")}
                      style={{
                        backgroundColor: COLORS.primary,
                        color: COLORS.white,
                      }}
                      className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium"
                    >
                      <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      Add Property
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {renderPropertyForm()}
      {(currentForm === "addAgent" || currentForm === "editAgent") && (
        <AgentForm
          currentForm={currentForm === "editAgent" ? "edit" : "add"}
          setCurrentForm={setCurrentForm}
          selectedAgent={selectedAgent}
        />
      )}

      {(currentForm === "addAgent" || currentForm === "editAgent") && (
        <AgentForm
          currentForm={currentForm === "editAgent" ? "edit" : "add"}
          setCurrentForm={setCurrentForm}
          selectedAgent={selectedAgent} // This should come from local state
        />
      )}
      {analyticsProperty && (
        <PropertyAnalyticsModal
          property={analyticsProperty}
          onClose={() => setAnalyticsProperty(null)}
        />
      )}
    </div>
  );
};

export default PropertyDashboard;
