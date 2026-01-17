import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import StatisticsDashboard from "./stats";
import NotificationPanel from "./NotificationPanel";
import { selectUnreadCount } from "../../redux/slices/notificationSlice";
import { TableRowSkeleton } from "../ui/Skeleton";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  TrendingUp,
  Activity,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  Printer,
  CheckSquare,
  Square,
  FileDown,
  Mail,
  Share2,
} from "lucide-react";
import { FaRegCircleUser, FaWhatsapp } from "react-icons/fa6";
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
  fetchAdminProperties,
  selectAdminPagination,
  selectItemLoading,
  selectIsCreating,
} from "../../redux/slices/propertySlice";
import { Snackbar, Alert } from "@mui/material";
import { PropertyForm } from "./propertyForm";
import { showSuccess, showError } from "../../redux/slices/toastSlice";
import { MdHouseSiding } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { BsTextareaResize } from "react-icons/bs";
import { TbFileDescription } from "react-icons/tb";
import { MdStarPurple500 } from "react-icons/md";
import { MdOutlineHouse } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { PiUserCirclePlus } from "react-icons/pi";
import { PiPerson } from "react-icons/pi";

// Property Detail View Modal Component
const PropertyDetailModal = ({ property, onClose, onEdit }) => {
  if (!property) return null;

  const formatPrice = (price) => {
    if (!price) return "POA";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
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
          className="bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image Gallery */}
          <div className="relative h-64 bg-gradient-to-br from-[#1F2E44] to-[#0A1628] overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <div className="flex h-full gap-1">
                <div className="flex-1">
                  <img
                    src={property.images[0].image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/hsp-fallback1.png";
                    }}
                  />
                </div>
                {property.images.length > 1 && (
                  <div className="w-48 flex flex-col gap-1">
                    {property.images.slice(1, 4).map((img, index) => (
                      <div key={index} className="flex-1 relative">
                        <img
                          src={img.image}
                          alt={`${property.title} ${index + 2}`}
                          onError={(e) => {
                            e.target.src = "/hsp-fallback1.png";
                          }}
                          className="w-full h-full object-cover"
                        />
                        {index === 2 && property.images.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold">
                              +{property.images.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MdHouseSiding className="w-16 h-16 text-white/20" />
              </div>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Status badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  property.is_published
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {property.is_published ? "Published" : "Draft"}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#C9A962] text-[#0A1628] capitalize">
                {property.property_type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title and Price */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {property.title}
                </h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#C9A962]" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#C9A962]">
                  {formatPrice(property.price)}
                </p>
                <p className="text-sm text-gray-400 mt-1">ID: {property.id}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {property.beds && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <MdOutlineBedroomParent className="w-5 h-5 text-[#C9A962]" />
                  </div>
                  <p className="text-xl font-bold text-white">
                    {property.beds}
                  </p>
                  <p className="text-xs text-gray-400">Bedrooms</p>
                </div>
              )}
              {property.baths && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <PiBathtub className="w-5 h-5 text-[#C9A962]" />
                  </div>
                  <p className="text-xl font-bold text-white">
                    {property.baths}
                  </p>
                  <p className="text-xs text-gray-400">Bathrooms</p>
                </div>
              )}
              {property.sqft && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BsTextareaResize className="w-5 h-5 text-[#C9A962]" />
                  </div>
                  <p className="text-xl font-bold text-white">
                    {property.sqft}
                  </p>
                  <p className="text-xs text-gray-400">Sq Ft</p>
                </div>
              )}
              {property.year_built && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-5 h-5 text-[#C9A962]" />
                  </div>
                  <p className="text-xl font-bold text-white">
                    {property.year_built}
                  </p>
                  <p className="text-xs text-gray-400">Year Built</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <TbFileDescription className="w-4 h-4 text-[#C9A962]" />
                Description
              </h3>
              <div
                className="text-gray-400 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: property.description || "No description available.",
                }}
              />
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <MdStarPurple500 className="w-4 h-4 text-[#C9A962]" />
                  Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-400 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-[#C9A962]" />
                      <span>
                        {typeof feature === "object" ? feature.name : feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agent Info */}
            {property.agent && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#C9A962]" />
                  Listed By
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C9A962] to-[#B8985A] flex items-center justify-center text-[#0A1628] font-bold text-lg">
                    {property.agent?.full_name?.[0] || "A"}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {property.agent?.full_name || "Agent"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {property.agent?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 mb-1">Created</p>
                <p className="text-white font-medium">
                  {new Date(property.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 mb-1">Last Updated</p>
                <p className="text-white font-medium">
                  {new Date(
                    property.updated_at || property.created_at
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  onEdit(property);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all"
              >
                <Edit className="w-4 h-4" />
                Edit Property
              </motion.button>
              <a
                href={`/properties/${property.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Property Analytics Modal Component
const PropertyAnalyticsModal = ({ property, onClose }) => {
  if (!property) return null;

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
          className="bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
                  <BarChart2 className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Property Analytics
                  </h2>
                  <p className="text-gray-400 text-sm">{property.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MdHouseSiding className="w-4 h-4 text-[#C9A962]" />
                  Property Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white font-medium">
                      ${property.price?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white font-medium">
                      {property.location}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="text-white font-medium capitalize">
                      {property.property_type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        property.status === "available"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Views Stats */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#C9A962]" />
                  Views Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Views</span>
                    <span className="text-white font-medium">
                      {property.total_views || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last 7 Days</span>
                    <span className="text-white font-medium">
                      {property.views_last_7_days || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last 30 Days</span>
                    <span className="text-white font-medium">
                      {property.views_last_30_days || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Leads Stats */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C9A962]" />
                  Leads Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Leads</span>
                    <span className="text-white font-medium">
                      {property.total_leads || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last 7 Days</span>
                    <span className="text-white font-medium">
                      {property.leads_last_7_days || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conversion Rate</span>
                    <span className="text-[#C9A962] font-medium">
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
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#C9A962]" />
                  Engagement
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg. Time on Page</span>
                    <span className="text-white font-medium">
                      {property.avg_time_on_page || "0s"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact Clicks</span>
                    <span className="text-white font-medium">
                      {property.contact_clicks || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Favorite Saves</span>
                    <span className="text-white font-medium">
                      {property.favorite_saves || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#C9A962]" />
                  Views Over Time
                </h3>
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0A1628",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Bar
                        dataKey="views"
                        fill="#C9A962"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Agent Form Modal Component
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
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setCurrentForm(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-[#C9A962]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {currentForm === "edit" ? "Edit Agent" : "Add New Agent"}
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentForm(null)}
                  className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      required
                    />
                  </div>

                  {/* Middle Name */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                    />
                  </div>

                  {/* Surname */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Surname*
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      required
                    />
                  </div>

                  {/* Cell Number */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Cell Number*
                    </label>
                    <input
                      type="tel"
                      name="cell_number"
                      value={formData.cell_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      required
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Position*
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      required
                    >
                      <option value="" className="bg-[#0A1628]">
                        Select Position
                      </option>
                      <option value="agency_admin" className="bg-[#0A1628]">
                        Agency Admin
                      </option>
                      <option value="agent" className="bg-[#0A1628]">
                        Agent
                      </option>
                    </select>
                  </div>

                  {/* Permissions */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Permissions*
                    </label>
                    <select
                      name="permissions"
                      value={formData.permissions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      required
                    >
                      <option value="upload" className="bg-[#0A1628]">
                        Upload
                      </option>
                      <option value="edit" className="bg-[#0A1628]">
                        Edit
                      </option>
                      <option value="delete" className="bg-[#0A1628]">
                        Delete
                      </option>
                      <option value="view_only" className="bg-[#0A1628]">
                        View Only
                      </option>
                    </select>
                  </div>

                  {/* Agency Name */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Agency Name
                    </label>
                    <input
                      type="text"
                      name="agency_name"
                      value={formData.agency_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                    />
                  </div>

                  {/* Branch */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Branch
                    </label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors resize-none"
                      rows="2"
                    ></textarea>
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="is_active"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#C9A962] focus:ring-[#C9A962] focus:ring-offset-0"
                    />
                    <label
                      htmlFor="is_active"
                      className="text-sm text-gray-400"
                    >
                      Active Status
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentForm(null)}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300 flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader className="animate-spin h-5 w-5" />
                    ) : currentForm === "edit" ? (
                      "Update Agent"
                    ) : (
                      "Create Agent"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
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

// Stats Card Component
const StatsCard = ({ card, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#C9A962]/30 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 font-medium mb-1">{card.title}</p>
        <h3 className="text-2xl font-bold text-white">{card.value}</h3>
        {card.change && (
          <p
            className={`text-xs mt-1 flex items-center gap-1 ${
              card.change > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {card.change > 0 ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {Math.abs(card.change)}% from last month
          </p>
        )}
      </div>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${card.color}20` }}
      >
        <div style={{ color: card.color }}>{card.icon}</div>
      </div>
    </div>
  </motion.div>
);

// Sidebar Navigation Item
const SidebarItem = ({ icon: Icon, label, active, onClick, badge, collapsed }) => (
  <button
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={`relative flex items-center ${collapsed ? 'justify-center' : 'justify-between'} w-full ${collapsed ? 'px-3' : 'px-4'} py-3 rounded-xl transition-all duration-300 ${
      active
        ? "bg-[#C9A962]/10 text-[#C9A962] border border-[#C9A962]/20"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="font-medium">{label}</span>}
    </div>
    {badge && !collapsed && (
      <span className="px-2 py-0.5 bg-[#C9A962] text-[#0A1628] text-xs font-bold rounded-full">
        {badge}
      </span>
    )}
    {badge && collapsed && (
      <span className="absolute top-1 right-1 w-2 h-2 bg-[#C9A962] rounded-full" />
    )}
  </button>
);

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", confirmStyle = "danger" }) => {
  if (!isOpen) return null;

  const buttonStyles = {
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-white",
    primary: "bg-[#C9A962] hover:bg-[#B8984F] text-[#0A1628]",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              confirmStyle === "danger" ? "bg-red-500/20" : "bg-amber-500/20"
            }`}>
              <AlertCircle className={`w-6 h-6 ${
                confirmStyle === "danger" ? "text-red-400" : "text-amber-400"
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-gray-400 text-sm mt-1">{message}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors ${buttonStyles[confirmStyle]}`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PropertyDashboard = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties?.adminProperties);
  const pagination = useSelector(selectAdminPagination);
  const loadingStatus = useSelector((state) => state.properties.status);
  const itemLoading = useSelector(selectItemLoading);
  const isCreating = useSelector(selectIsCreating);
  const [analyticsProperty, setAnalyticsProperty] = useState(null);
  const error = useSelector((state) => state.properties.error);
  const user = useSelector((state) => state.auth.user);
  const adminStats = useSelector((state) => state.admin.stats);
  const users = useSelector((state) => state.user.list);
  const usersStatus = useSelector((state) => state.user.status);
  const usersError = useSelector((state) => state.user.error);
  const agents = useSelector((state) => state.agent.agents);
  const agentsStatus = useSelector((state) => state.agent.status);
  const notificationCount = useSelector(selectUnreadCount);

  const [activeTab, setActiveTab] = useState("properties");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Collapsed by default on desktop
  const [currentForm, setCurrentForm] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isPaginating, setIsPaginating] = useState(false); // Track pagination loading separately

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

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    confirmText: "Delete",
    confirmStyle: "danger",
  });
  const [propertyDetailView, setPropertyDetailView] = useState(null);

  // Selection state for bulk operations
  const [selectedPropertyIds, setSelectedPropertyIds] = useState(new Set());
  const [isPrinting, setIsPrinting] = useState(false);

  // Toggle single property selection
  const togglePropertySelection = (propertyId) => {
    setSelectedPropertyIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

  // Toggle all properties selection
  const toggleAllSelection = () => {
    if (selectedPropertyIds.size === filteredProperties.length) {
      setSelectedPropertyIds(new Set());
    } else {
      setSelectedPropertyIds(new Set(filteredProperties.map(p => p.id)));
    }
  };

  // Print single property PDF
  const printPropertyPDF = async (property) => {
    setIsPrinting(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      let y = margin;

      // Colors
      const navy = [10, 22, 40];
      const gold = [201, 169, 98];
      const white = [255, 255, 255];
      const gray = [107, 114, 128];

      // Header
      pdf.setFillColor(...navy);
      pdf.rect(0, 0, pageWidth, 40, 'F');
      pdf.setFillColor(...gold);
      pdf.rect(0, 0, pageWidth, 5, 'F');

      pdf.setTextColor(...gold);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('House of Stone Properties', margin, 25);

      y = 55;

      // Property Title
      pdf.setTextColor(...navy);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(property.title || 'Property', pageWidth - margin * 2);
      pdf.text(titleLines, margin, y);
      y += titleLines.length * 7 + 5;

      // Price
      pdf.setTextColor(...gold);
      pdf.setFontSize(20);
      pdf.text(`$${parseFloat(property.price || 0).toLocaleString()}`, margin, y);
      y += 12;

      // Location
      pdf.setTextColor(...gray);
      pdf.setFontSize(11);
      pdf.text(property.location || 'Location not specified', margin, y);
      y += 15;

      // Property Details Box
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(margin, y, pageWidth - margin * 2, 50, 3, 3, 'F');

      pdf.setTextColor(...navy);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Property Details', margin + 5, y + 12);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const details = [
        ['Type', property.property_type || 'N/A'],
        ['Status', property.status || 'N/A'],
        ['Bedrooms', property.beds || 'N/A'],
        ['Bathrooms', property.baths || 'N/A'],
        ['Size', property.sqft ? `${property.sqft} sqft` : 'N/A'],
        ['Year Built', property.year_built || 'N/A'],
      ];

      let detailY = y + 22;
      details.forEach((detail, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = margin + 5 + col * 60;
        const dy = detailY + row * 12;
        pdf.setTextColor(...gray);
        pdf.text(detail[0] + ':', x, dy);
        pdf.setTextColor(...navy);
        pdf.text(String(detail[1]), x + 25, dy);
      });
      y += 60;

      // Description
      if (property.description) {
        pdf.setTextColor(...navy);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Description', margin, y);
        y += 8;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(...gray);
        const cleanDesc = property.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const descLines = pdf.splitTextToSize(cleanDesc, pageWidth - margin * 2);
        pdf.text(descLines.slice(0, 8), margin, y);
        y += Math.min(descLines.length, 8) * 5 + 10;
      }

      // Footer
      const footerY = pdf.internal.pageSize.getHeight() - 15;
      pdf.setFillColor(...gold);
      pdf.rect(0, footerY - 5, pageWidth, 20, 'F');
      pdf.setTextColor(...navy);
      pdf.setFontSize(9);
      pdf.text('House of Stone Properties | info@hsp.co.zw | +263 867 717 3442', pageWidth / 2, footerY + 3, { align: 'center' });

      pdf.save(`${(property.title || 'property').replace(/[^a-z0-9]/gi, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  // Print multiple properties list
  const printPropertiesList = async (propertiesToPrint) => {
    setIsPrinting(true);
    try {
      const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape for list view
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      let y = margin;

      // Colors
      const navy = [10, 22, 40];
      const gold = [201, 169, 98];
      const gray = [107, 114, 128];

      // Header
      pdf.setFillColor(...navy);
      pdf.rect(0, 0, pageWidth, 25, 'F');
      pdf.setFillColor(...gold);
      pdf.rect(0, 0, pageWidth, 4, 'F');

      pdf.setTextColor(...gold);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('House of Stone Properties - Property List', margin, 16);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.text(`Generated: ${new Date().toLocaleDateString()} | Total: ${propertiesToPrint.length} properties`, pageWidth - margin, 16, { align: 'right' });

      y = 35;

      // Table Header
      const cols = [
        { header: 'Title', width: 70 },
        { header: 'Location', width: 50 },
        { header: 'Type', width: 25 },
        { header: 'Price', width: 35 },
        { header: 'Beds', width: 15 },
        { header: 'Baths', width: 15 },
        { header: 'Size', width: 25 },
        { header: 'Status', width: 25 },
      ];

      pdf.setFillColor(...gold);
      pdf.rect(margin, y, pageWidth - margin * 2, 8, 'F');
      pdf.setTextColor(...navy);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');

      let x = margin + 2;
      cols.forEach(col => {
        pdf.text(col.header, x, y + 5.5);
        x += col.width;
      });
      y += 10;

      // Table Rows
      pdf.setFont('helvetica', 'normal');
      propertiesToPrint.forEach((property, index) => {
        if (y > pageHeight - 20) {
          pdf.addPage();
          y = margin;
          // Repeat header on new page
          pdf.setFillColor(...gold);
          pdf.rect(margin, y, pageWidth - margin * 2, 8, 'F');
          pdf.setTextColor(...navy);
          pdf.setFont('helvetica', 'bold');
          x = margin + 2;
          cols.forEach(col => {
            pdf.text(col.header, x, y + 5.5);
            x += col.width;
          });
          y += 10;
          pdf.setFont('helvetica', 'normal');
        }

        // Alternate row colors
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(margin, y, pageWidth - margin * 2, 7, 'F');
        }

        pdf.setTextColor(...navy);
        pdf.setFontSize(7);
        x = margin + 2;

        const rowData = [
          (property.title || '').substring(0, 35),
          (property.location || '').substring(0, 25),
          property.property_type || '-',
          property.price ? `$${parseFloat(property.price).toLocaleString()}` : 'POA',
          property.beds || '-',
          property.baths || '-',
          property.sqft ? `${property.sqft}` : '-',
          property.status || '-',
        ];

        rowData.forEach((data, i) => {
          pdf.text(String(data), x, y + 5);
          x += cols[i].width;
        });
        y += 7;
      });

      // Footer
      const footerY = pageHeight - 8;
      pdf.setTextColor(...gray);
      pdf.setFontSize(7);
      pdf.text('House of Stone Properties | www.hsp.co.zw', pageWidth / 2, footerY, { align: 'center' });

      pdf.save(`properties_list_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  // Print selected or all properties
  const handlePrintSelected = () => {
    const selectedProps = filteredProperties.filter(p => selectedPropertyIds.has(p.id));
    if (selectedProps.length > 0) {
      printPropertiesList(selectedProps);
    }
  };

  const handlePrintAll = () => {
    printPropertiesList(filteredProperties);
  };

  // Generate shareable content from selected properties
  const generateShareContent = (properties) => {
    const baseUrl = 'https://hsp.co.zw';
    let content = `🏠 House of Stone Properties\n\nCheck out these amazing properties:\n\n`;

    properties.forEach((property, index) => {
      const price = property.price ? `$${property.price.toLocaleString()}` : 'Price on request';
      const location = property.location || 'Zimbabwe';
      const beds = property.beds ? `${property.beds} beds` : '';
      const baths = property.baths ? `${property.baths} baths` : '';
      const specs = [beds, baths].filter(Boolean).join(' • ');

      content += `${index + 1}. ${property.title}\n`;
      content += `   📍 ${location}\n`;
      content += `   💰 ${price}${specs ? ` • ${specs}` : ''}\n`;
      content += `   🔗 ${baseUrl}/properties/${property.id}\n\n`;
    });

    content += `\nView all properties at ${baseUrl}`;
    return content;
  };

  // Share selected properties via WhatsApp
  const handleShareWhatsApp = () => {
    const selectedProps = filteredProperties.filter(p => selectedPropertyIds.has(p.id));
    if (selectedProps.length === 0) return;

    const content = generateShareContent(selectedProps);
    const encodedContent = encodeURIComponent(content);
    window.open(`https://wa.me/?text=${encodedContent}`, '_blank');
  };

  // Share selected properties via Email
  const handleShareEmail = () => {
    const selectedProps = filteredProperties.filter(p => selectedPropertyIds.has(p.id));
    if (selectedProps.length === 0) return;

    const subject = `House of Stone Properties - ${selectedProps.length} Selected Properties`;
    const body = generateShareContent(selectedProps);
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleAddAgent = () => {
    setSelectedAgent(null);
    setCurrentForm("addAgent");
  };

  const handleEditAgent = (agent) => {
    setSelectedAgent(agent);
    setCurrentForm("editAgent");
  };

  const handleDeleteAgent = (id, agentName) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Agent",
      message: `Are you sure you want to delete "${agentName || 'this agent'}"? This action cannot be undone.`,
      confirmText: "Delete",
      confirmStyle: "danger",
      onConfirm: async () => {
        try {
          await dispatch(deleteAgent(id)).unwrap();
          dispatch(showSuccess("Agent deleted successfully!", "Delete Agent"));
        } catch (error) {
          dispatch(
            showError(
              "Unable to delete agent. Please try again.",
              "Delete Failed"
            )
          );
        }
      },
    });
  };

  const showPropertyAnalytics = (property) => {
    setAnalyticsProperty(property);
  };

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

  // Fetch properties with pagination
  useEffect(() => {
    setIsPaginating(true);
    dispatch(fetchAdminProperties({ page: currentPage, page_size: pageSize }))
      .finally(() => setIsPaginating(false));
  }, [dispatch, currentPage, pageSize]);

  // Listen for property update/create events (optimistic UI notifications)
  useEffect(() => {
    const handleUpdateSuccess = (e) => {
      dispatch(showSuccess(e.detail.message, "Property Updated"));
    };
    const handleUpdateError = (e) => {
      dispatch(showError(e.detail.message, "Update Failed"));
    };
    const handleCreateSuccess = (e) => {
      dispatch(showSuccess(e.detail.message, "Property Created"));
    };
    const handleCreateError = (e) => {
      dispatch(showError(e.detail.message, "Creation Failed"));
    };

    window.addEventListener('propertyUpdateSuccess', handleUpdateSuccess);
    window.addEventListener('propertyUpdateError', handleUpdateError);
    window.addEventListener('propertyCreateSuccess', handleCreateSuccess);
    window.addEventListener('propertyCreateError', handleCreateError);

    return () => {
      window.removeEventListener('propertyUpdateSuccess', handleUpdateSuccess);
      window.removeEventListener('propertyUpdateError', handleUpdateError);
      window.removeEventListener('propertyCreateSuccess', handleCreateSuccess);
      window.removeEventListener('propertyCreateError', handleCreateError);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAdminStats());
    dispatch(fetchAgents());
  }, [dispatch]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setCurrentPage(newPage);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  };

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

  const handleDeleteProperty = (id, propertyTitle) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Property",
      message: `Are you sure you want to delete "${propertyTitle || 'this property'}"? This action cannot be undone.`,
      confirmText: "Delete",
      confirmStyle: "danger",
      onConfirm: async () => {
        try {
          await dispatch(deleteProperty(id)).unwrap();
          dispatch(
            showSuccess("Property deleted successfully!", "Delete Property")
          );
          // No refetch needed - Redux slice handles optimistic removal
        } catch (error) {
          dispatch(
            showError(
              "Unable to delete property. Please try again.",
              "Delete Failed"
            )
          );
        }
      },
    });
  };

  const handleToggleVisibility = (property) => {
    const newStatus = !property.is_published;

    // Optimistic UI - show success immediately
    dispatch(
      showSuccess(
        newStatus ? "Property published!" : "Property unpublished",
        "Visibility Updated"
      )
    );

    // Dispatch update in background
    dispatch(
      updateProperty({
        id: property.id,
        data: { is_published: newStatus },
      })
    ).unwrap().catch(() => {
      // Revert on error - refetch to get correct state
      dispatch(fetchAdminProperties({ page: currentPage, page_size: pageSize }));
      dispatch(
        showError(
          "Unable to update visibility. Please try again.",
          "Update Failed"
        )
      );
    });
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

  const statsCards = [
    {
      title: "Active Listings",
      value: adminStats?.active_listings || 0,
      icon: <MdOutlineHouse className="w-6 h-6" />,
      color: "#C9A962",
      change: 12,
    },
    {
      title: "Total Inquiries",
      value: adminStats?.total_inquiries || 0,
      icon: <PiPerson className="w-6 h-6" />,
      color: "#10B981",
      change: 8,
    },
    {
      title: "Total Views",
      value: adminStats?.total_views || 0,
      icon: <Eye className="w-6 h-6" />,
      color: "#8B5CF6",
      change: 24,
    },
    {
      title: "Total Users",
      value: adminStats?.total_users || 0,
      icon: <FaUsersGear className="w-6 h-6" />,
      color: "#3B82F6",
      change: 5,
    },
  ];

  const renderStatCharts = () => {
    if (!adminStats || Object.keys(adminStats).length === 0) {
      // Show skeleton charts instead of spinner
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-white/10 rounded"></div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Views by Interaction Type */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#C9A962]" />
            Interaction Types
          </h3>
          <div className="h-64 flex items-end gap-4 mt-4">
            {adminStats?.views_by_type?.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${
                      (item.count /
                        Math.max(
                          ...adminStats.views_by_type.map((i) => i.count)
                        )) *
                      200
                    }px`,
                    background: "linear-gradient(to top, #C9A962, #E8D5A3)",
                  }}
                ></div>
                <div className="text-xs mt-2 text-gray-400 w-full text-center truncate">
                  {item.interaction_type}
                </div>
                <div className="font-semibold text-white">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Locations */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#C9A962]" />
            Popular Locations
          </h3>
          <div className="space-y-4">
            {adminStats?.popular_locations?.map((location, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{location.location}</span>
                  <span className="font-semibold text-white">
                    {location.count} properties
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#E8D5A3]"
                    style={{
                      width: `${
                        (location.count /
                          adminStats.popular_locations[0].count) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Properties Chart */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C9A962]" />
            Most Viewed Properties
          </h3>
          <div className="space-y-4">
            {adminStats?.popular_properties?.map((property, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C9A962] to-[#B8985A] flex items-center justify-center text-[#0A1628] font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white truncate">
                    {property.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-400">
                    <Eye className="w-3 h-3 mr-1" />
                    {property.views} views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <PiUserCirclePlus className="w-5 h-5 text-[#C9A962]" />
            User Growth
          </h3>
          <div className="h-64 flex items-end gap-1">
            {adminStats?.user_growth?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1"
                title={`${item.date}: ${item.count} users`}
              >
                <div
                  className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80 bg-[#C9A962]/60"
                  style={{
                    height: `${
                      (item.count /
                        Math.max(
                          ...adminStats.user_growth.map((i) => i.count)
                        )) *
                      200
                    }px`,
                  }}
                ></div>
                <div className="text-[10px] mt-1 text-gray-500 transform -rotate-45 origin-top-left">
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

  const renderPropertyForm = () => {
    if (
      !currentForm ||
      currentForm === "addAgent" ||
      currentForm === "editAgent"
    )
      return null;

    return (
      <PropertyForm
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
        selectedProperty={selectedProperty}
      />
    );
  };

  // Computed loading state for data sections only
  const isDataLoading = loadingStatus === "loading";

  // Error state
  if (loadingStatus === "failed") {
    return (
      <div className="min-h-screen bg-[#060D16] flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-400 mb-6">
            {typeof error === 'string' ? error : (error?.message || "Failed to load properties. Please try again.")}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => dispatch(fetchProperties())}
            className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl"
          >
            Retry
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#060D16]">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-24 left-4 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-[#0A1628] border border-white/10 rounded-lg text-white"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar - Fixed position, doesn't scroll with content */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -280,
          width: sidebarCollapsed ? 80 : 280
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`fixed inset-y-0 left-0 z-20 bg-[#0A1628] border-r border-white/10 flex flex-col pt-24`}
        style={{ width: sidebarCollapsed ? 80 : 280 }}
      >
        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -right-3 top-28 w-6 h-6 bg-[#0A1628] border border-white/10 rounded-full items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a2942] transition-colors z-30"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        <div className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-4'} py-6 space-y-2 overflow-y-auto`}>
          {/* Logo */}
          <div className={`${sidebarCollapsed ? 'px-0 justify-center' : 'px-4'} pb-6 mb-4 border-b border-white/10`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-10 h-10 bg-[#C9A962]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-[#C9A962]" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-white">House of Stone</h1>
                  <p className="text-xs text-gray-500">Admin Dashboard</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <SidebarItem
            icon={MdOutlineHouse}
            label="Properties"
            active={activeTab === "properties"}
            onClick={() => setActiveTab("properties")}
            badge={pagination?.count || filteredProperties.length}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={FaUsersGear}
            label="Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={UserCheck}
            label="Agents"
            active={activeTab === "agents"}
            onClick={() => setActiveTab("agents")}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={BellRing}
            label="Notifications"
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
            badge={notificationCount > 0 ? String(notificationCount) : null}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={BarChart2}
            label="Statistics"
            active={activeTab === "stats"}
            onClick={() => setActiveTab("stats")}
            collapsed={sidebarCollapsed}
          />
        </div>

        {/* User Profile */}
        <div className={`${sidebarCollapsed ? 'p-2' : 'p-4'} border-t border-white/10`}>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#C9A962] to-[#B8985A] flex items-center justify-center text-[#0A1628] font-bold flex-shrink-0">
              A
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main content - Scrollable area with dynamic margin for sidebar on desktop */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden pt-24 custom-scrollbar transition-[margin] duration-200 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'
        }`}
      >
        {/* Header - Sticky at top */}
        <header className="sticky top-0 z-10 bg-[#060D16]/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-white truncate">
                {activeTab === "properties" && "Properties"}
                {activeTab === "users" && "Users"}
                {activeTab === "agents" && "Agents"}
                {activeTab === "notifications" && "Notifications"}
                {activeTab === "stats" && "Statistics"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}</span>
                <span className="xs:hidden">{new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}</span>
              </p>
            </div>

            {activeTab === "properties" && (
              <div className="flex flex-wrap items-center gap-2">
                {/* Print Buttons */}
                {selectedPropertyIds.size > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrintSelected}
                    disabled={isPrinting}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
                  >
                    {isPrinting ? <Loader className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
                    <span className="hidden sm:inline">Print Selected ({selectedPropertyIds.size})</span>
                    <span className="sm:hidden">{selectedPropertyIds.size}</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrintAll}
                  disabled={isPrinting || !filteredProperties?.length}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/70 font-medium rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 text-sm"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="hidden sm:inline">Export All</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentForm("add")}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Property</span>
                  <span className="sm:hidden">Add</span>
                </motion.button>
              </div>
            )}

            {activeTab === "agents" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddAgent}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                <UserPlus className="w-5 h-5" />
                Add Agent
              </motion.button>
            )}
          </div>
        </header>

        <main className="p-3 sm:p-6">
          {/* Stats Overview */}
          {activeTab !== "stats" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {statsCards.map((card, index) => (
                <StatsCard key={index} card={card} index={index} />
              ))}
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              {/* Search and Filters */}
              <div className="p-4 sm:p-6 border-b border-white/10">
                {/* Desktop: All in one row */}
                <div className="hidden lg:flex items-center gap-4">
                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>

                  {/* Filters inline */}
                  <select
                    name="propertyType"
                    value={filterCriteria.propertyType}
                    onChange={handleFilterChange}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A962]/50"
                  >
                    <option value="" className="bg-[#0A1628]">All Types</option>
                    <option value="house" className="bg-[#0A1628]">House</option>
                    <option value="apartment" className="bg-[#0A1628]">Apartment</option>
                    <option value="flat" className="bg-[#0A1628]">Flat</option>
                    <option value="land" className="bg-[#0A1628]">Land</option>
                    <option value="commercial" className="bg-[#0A1628]">Commercial</option>
                    <option value="villa" className="bg-[#0A1628]">Villa</option>
                    <option value="cluster" className="bg-[#0A1628]">Cluster</option>
                    <option value="stand" className="bg-[#0A1628]">Stand</option>
                    <option value="duplex" className="bg-[#0A1628]">Duplex</option>
                    <option value="townhouse" className="bg-[#0A1628]">Townhouse</option>
                  </select>

                  <input
                    type="number"
                    name="priceMin"
                    placeholder="Min $"
                    value={filterCriteria.priceMin}
                    onChange={handleFilterChange}
                    className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50"
                  />
                  <input
                    type="number"
                    name="priceMax"
                    placeholder="Max $"
                    value={filterCriteria.priceMax}
                    onChange={handleFilterChange}
                    className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50"
                  />

                  {/* Sort Buttons */}
                  <div className="flex items-center gap-1 border-l border-white/10 pl-4">
                    {["price", "created_at", "location"].map((field) => (
                      <button
                        key={field}
                        onClick={() => handleSort(field)}
                        className={`px-2 py-1.5 text-xs rounded-lg transition-all duration-300 flex items-center gap-1 ${
                          filterCriteria.sortBy === field
                            ? "bg-[#C9A962]/20 text-[#C9A962]"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {field === "created_at" ? "Date" : field.charAt(0).toUpperCase() + field.slice(1)}
                        {filterCriteria.sortBy === field &&
                          (filterCriteria.sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile: Stacked layout */}
                <div className="lg:hidden flex flex-col gap-3">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      name="propertyType"
                      value={filterCriteria.propertyType}
                      onChange={handleFilterChange}
                      className="flex-1 min-w-[120px] px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A962]/50"
                    >
                      <option value="" className="bg-[#0A1628]">All Types</option>
                      <option value="house" className="bg-[#0A1628]">House</option>
                      <option value="apartment" className="bg-[#0A1628]">Apartment</option>
                      <option value="flat" className="bg-[#0A1628]">Flat</option>
                      <option value="land" className="bg-[#0A1628]">Land</option>
                      <option value="commercial" className="bg-[#0A1628]">Commercial</option>
                    </select>
                    <input
                      type="number"
                      name="priceMin"
                      placeholder="Min $"
                      value={filterCriteria.priceMin}
                      onChange={handleFilterChange}
                      className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50"
                    />
                    <input
                      type="number"
                      name="priceMax"
                      placeholder="Max $"
                      value={filterCriteria.priceMax}
                      onChange={handleFilterChange}
                      className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    {["price", "created_at"].map((field) => (
                      <button
                        key={field}
                        onClick={() => handleSort(field)}
                        className={`px-2 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1 ${
                          filterCriteria.sortBy === field ? "bg-[#C9A962]/20 text-[#C9A962]" : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {field === "created_at" ? "Date" : "Price"}
                        {filterCriteria.sortBy === field && (filterCriteria.sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bulk Actions Bar - appears when properties are selected */}
              {selectedPropertyIds.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 sm:px-6 py-3 bg-[#C9A962]/10 border-b border-[#C9A962]/20 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white font-medium">
                      {selectedPropertyIds.size} selected
                    </span>
                    <button
                      onClick={() => setSelectedPropertyIds(new Set())}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Clear selection
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Share Actions */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShareWhatsApp}
                      className="flex items-center gap-2 px-3 py-2 bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-medium rounded-lg hover:bg-[#25D366]/30 transition-all text-sm"
                      title="Share via WhatsApp"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShareEmail}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-medium rounded-lg hover:bg-blue-500/30 transition-all text-sm"
                      title="Share via Email"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="hidden sm:inline">Email</span>
                    </motion.button>

                    {/* Separator */}
                    <div className="hidden sm:block w-px h-6 bg-white/10 mx-1" />

                    {/* Print/Export Actions */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePrintSelected}
                      disabled={isPrinting}
                      className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all text-sm"
                      title="Print Selected"
                    >
                      {isPrinting ? <Loader className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
                      <span className="hidden sm:inline">Print</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const selectedProps = filteredProperties.filter(p => selectedPropertyIds.has(p.id));
                        if (selectedProps.length === 1) {
                          printPropertyPDF(selectedProps[0]);
                        } else {
                          printPropertiesList(selectedProps);
                        }
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-[#C9A962] text-[#0A1628] font-medium rounded-lg hover:bg-[#B8985A] transition-all text-sm"
                      title="Export as PDF"
                    >
                      <FileDown className="w-4 h-4" />
                      <span className="hidden sm:inline">Export PDF</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Helpful tip */}
              <div className="px-4 sm:px-6 py-2 bg-[#C9A962]/5 border-b border-white/10 flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  💡 <span className="text-[#C9A962]">Tip:</span> Use checkboxes to select properties for bulk actions.
                </span>
              </div>

              {/* Properties Table */}
              <div className="overflow-x-auto relative">
                {/* No loading overlay - individual rows handle their own loading state */}
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      {/* Checkbox column */}
                      <th className="px-3 py-4 text-left w-12">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleAllSelection(); }}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          {selectedPropertyIds.size === filteredProperties?.length && filteredProperties?.length > 0 ? (
                            <CheckSquare className="w-5 h-5 text-[#C9A962]" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Price
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Location
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                        Type
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {/* Show creating skeleton row at top when creating a new property */}
                    {isCreating && (
                      <motion.tr
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/5"
                      >
                        <td className="px-3 py-4 w-12">
                          <div className="w-5 h-5 bg-emerald-500/20 rounded animate-pulse" />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 animate-pulse" />
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-emerald-500/20 rounded animate-pulse" />
                              <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="h-4 w-20 bg-emerald-500/20 rounded animate-pulse" />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="h-6 w-20 bg-white/10 rounded-lg animate-pulse" />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="h-6 w-16 bg-emerald-500/20 rounded-full animate-pulse" />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Loader className="w-3 h-3 text-emerald-400 animate-spin" />
                            <span className="text-xs text-emerald-400 font-medium">Creating...</span>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                    {isPaginating || (isDataLoading && filteredProperties.length === 0)
                      ? // Show skeleton rows during pagination or initial load
                        [...Array(pageSize)].map((_, i) => (
                          <TableRowSkeleton key={i} columns={7} />
                        ))
                      : filteredProperties.length > 0
                      ? filteredProperties.map((property) =>
                          itemLoading[property.id] ? (
                            // Show skeleton for this specific property being updated
                            <motion.tr
                              key={property.id}
                              initial={{ opacity: 0.5 }}
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="bg-[#C9A962]/5"
                            >
                              <td className="px-3 py-4 w-12">
                                <div className="w-5 h-5 bg-[#C9A962]/20 rounded animate-pulse" />
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg bg-[#C9A962]/20 animate-pulse" />
                                  <div className="space-y-2">
                                    <div className="h-4 w-32 bg-[#C9A962]/20 rounded animate-pulse" />
                                    <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                                <div className="h-4 w-20 bg-[#C9A962]/20 rounded animate-pulse" />
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                                <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                                <div className="h-6 w-20 bg-white/10 rounded-lg animate-pulse" />
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="h-6 w-16 bg-[#C9A962]/20 rounded-full animate-pulse" />
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                  <Loader className="w-3 h-3 text-[#C9A962] animate-spin" />
                                  <span className="text-xs text-[#C9A962] font-medium">Updating...</span>
                                </div>
                              </td>
                            </motion.tr>
                          ) : (
                          <motion.tr
                            key={property.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`hover:bg-white/5 transition-colors cursor-pointer group ${selectedPropertyIds.has(property.id) ? 'bg-[#C9A962]/5' : ''}`}
                            onClick={() => setPropertyDetailView(property)}
                          >
                            {/* Checkbox */}
                            <td className="px-3 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => togglePropertySelection(property.id)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                              >
                                {selectedPropertyIds.has(property.id) ? (
                                  <CheckSquare className="w-5 h-5 text-[#C9A962]" />
                                ) : (
                                  <Square className="w-5 h-5 text-gray-500 group-hover:text-gray-400" />
                                )}
                              </button>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 overflow-hidden ring-2 ring-transparent group-hover:ring-[#C9A962]/30 transition-all flex-shrink-0">
                                  {property.images?.[0]?.image ? (
                                    <img
                                      src={property.images[0].image}
                                      alt={property.title}
                                      onError={(e) => {
                                        e.target.src = "/hsp-fallback1.png";
                                      }}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <MdHouseSiding className="w-4 h-4 sm:w-5 sm:h-5 text-white/30" />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <span className="text-xs sm:text-sm font-medium text-white truncate block max-w-[120px] sm:max-w-[200px] group-hover:text-[#C9A962] transition-colors">
                                    {property.title}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    #{property.id}
                                  </span>
                                  {/* Show price on mobile */}
                                  <span className="sm:hidden block text-xs text-[#C9A962] font-semibold mt-0.5">
                                    ${property.price?.toLocaleString() || "POA"}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                              <span className="text-sm text-[#C9A962] font-semibold">
                                ${property.price?.toLocaleString() || "POA"}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                              <div className="flex items-center gap-1 text-sm text-gray-400">
                                <MapPin className="w-3 h-3 text-[#C9A962]" />
                                <span className="truncate max-w-[150px]">
                                  {property.location}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                              <span className="text-sm text-white capitalize px-2 py-1 bg-white/5 rounded-lg">
                                {property.property_type}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium rounded-full ${
                                  property.is_published
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-gray-500/20 text-gray-400"
                                }`}
                              >
                                {property.is_published ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td
                              className="px-4 py-4 whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center gap-0.5 sm:gap-1">
                                {/* Print single property */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    printPropertyPDF(property);
                                  }}
                                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                  title="Print PDF"
                                >
                                  <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPropertyDetailView(property);
                                  }}
                                  className="p-1.5 sm:p-2 text-[#C9A962] hover:text-[#E8D5A3] hover:bg-[#C9A962]/10 rounded-lg transition-all"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleVisibility(property);
                                  }}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                  title={
                                    property.is_published
                                      ? "Unpublish"
                                      : "Publish"
                                  }
                                >
                                  {property.is_published ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    showPropertyAnalytics(property);
                                  }}
                                  className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all"
                                  title="Analytics"
                                >
                                  <BarChart2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditProperty(property);
                                  }}
                                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteProperty(property.id, property.title);
                                  }}
                                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                          )
                        )
                      : null}
                  </tbody>
                </table>
              </div>

              {/* Empty State - Only show when not loading and no data */}
              {!isDataLoading && filteredProperties.length === 0 && (
                <div className="py-16 text-center">
                  <MdOutlineHouse className="mx-auto h-12 w-12 text-gray-600" />
                  <h3 className="mt-4 text-lg font-medium text-white">
                    No properties found
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {searchTerm ||
                    filterCriteria.propertyType ||
                    filterCriteria.priceMin ||
                    filterCriteria.priceMax
                      ? "Try changing your search filters"
                      : "Get started by adding a property"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentForm("add")}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl"
                  >
                    <Plus className="w-5 h-5" />
                    Add Property
                  </motion.button>
                </div>
              )}

              {/* Pagination Controls */}
              {filteredProperties.length > 0 && (
                <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Info */}
                  <div className="text-sm text-gray-400">
                    Showing{" "}
                    <span className="text-white font-medium">
                      {(currentPage - 1) * pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="text-white font-medium">
                      {Math.min(
                        currentPage * pageSize,
                        pagination?.count || filteredProperties.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="text-white font-medium">
                      {pagination?.count || filteredProperties.length}
                    </span>{" "}
                    properties
                  </div>

                  {/* Page Size Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Show:</span>
                    <select
                      value={pageSize}
                      onChange={(e) =>
                        handlePageSizeChange(Number(e.target.value))
                      }
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A962]/50"
                    >
                      <option value={5} className="bg-[#0A1628]">
                        5
                      </option>
                      <option value={10} className="bg-[#0A1628]">
                        10
                      </option>
                      <option value={25} className="bg-[#0A1628]">
                        25
                      </option>
                      <option value={50} className="bg-[#0A1628]">
                        50
                      </option>
                    </select>
                  </div>

                  {/* Pagination Buttons */}
                  <div className="flex items-center gap-1">
                    {/* First Page */}
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="First page"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>

                    {/* Previous Page */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from(
                        { length: Math.min(5, pagination?.totalPages || 1) },
                        (_, i) => {
                          let pageNum;
                          const totalPages = pagination?.totalPages || 1;

                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                                currentPage === pageNum
                                  ? "bg-[#C9A962] text-[#0A1628]"
                                  : "text-gray-400 hover:text-white hover:bg-white/10"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                    </div>

                    {/* Next Page */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === (pagination?.totalPages || 1)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Last Page */}
                    <button
                      onClick={() =>
                        handlePageChange(pagination?.totalPages || 1)
                      }
                      disabled={currentPage === (pagination?.totalPages || 1)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Last page"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((card, index) => (
                  <StatsCard key={index} card={card} index={index} />
                ))}
              </div>
              {renderStatCharts()}
              <div className="mt-8">
                <StatisticsDashboard />
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl"
                >
                  <UserPlus className="w-5 h-5" />
                  Add User
                </motion.button>
              </div>

              {usersError && (
                <div className="p-8 text-center text-red-400">{usersError}</div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {usersStatus === "loading" && (!users || users.length === 0)
                      ? // Show skeleton rows when loading users
                        [...Array(5)].map((_, i) => (
                          <TableRowSkeleton key={i} columns={5} />
                        ))
                      : Array.isArray(users) && users.length > 0
                      ? users.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#C9A962] to-[#B8985A] flex items-center justify-center text-[#0A1628] font-bold">
                                  {user.first_name?.[0] ||
                                    user.email[0].toUpperCase()}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white">
                                    {user.first_name} {user.last_name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Joined{" "}
                                    {new Date(
                                      user.date_joined
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-400">
                                {user.email}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
                                {user.is_staff ? "Admin" : "User"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 text-xs font-medium rounded-full ${
                                  user.is_active
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {user.is_active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Agents Tab */}
          {activeTab === "agents" && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                    value={agentsSearchTerm}
                    onChange={(e) => setAgentsSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {agentsStatus === "loading" && agents.length === 0
                      ? // Show skeleton rows when loading agents
                        [...Array(5)].map((_, i) => (
                          <TableRowSkeleton key={i} columns={5} />
                        ))
                      : agents
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
                            <tr
                              key={agent.id}
                              className="hover:bg-white/5 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#C9A962] to-[#B8985A] flex items-center justify-center text-[#0A1628] font-bold">
                                    {agent.full_name?.charAt(0) || "A"}
                                  </div>
                                  <span className="text-sm font-medium text-white">
                                    {agent.full_name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-400">
                                  {agent.email}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-400">
                                  {agent.cell_number}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#C9A962]/20 text-[#C9A962] capitalize">
                                  {agent.position}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEditAgent(agent)}
                                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAgent(agent.id, agent.full_name)}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
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
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <NotificationPanel maxHeight="max-h-[calc(100vh-280px)]" />
          )}
        </main>
      </div>

      {/* Modals */}
      {renderPropertyForm()}
      {(currentForm === "addAgent" || currentForm === "editAgent") && (
        <AgentForm
          currentForm={currentForm === "editAgent" ? "edit" : "add"}
          setCurrentForm={setCurrentForm}
          selectedAgent={selectedAgent}
        />
      )}
      {analyticsProperty && (
        <PropertyAnalyticsModal
          property={analyticsProperty}
          onClose={() => setAnalyticsProperty(null)}
        />
      )}
      {propertyDetailView && (
        <PropertyDetailModal
          property={propertyDetailView}
          onClose={() => setPropertyDetailView(null)}
          onEdit={handleEditProperty}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        confirmStyle={confirmModal.confirmStyle}
      />
    </div>
  );
};

export default PropertyDashboard;
