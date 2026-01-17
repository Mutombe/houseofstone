import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  AlertCircle,
  Plus,
  X,
  Trash2,
  Loader,
  Star,
  Users,
  Eye,
  EyeOff,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  GripVertical,
  Image as ImageIcon,
  MapPin,
  DollarSign,
  Home,
  Bed,
  Bath,
  Square,
  Calendar,
  Link2,
  Check,
} from "lucide-react";
import { Snackbar, Alert } from "@mui/material";
import {
  createProperty,
  updateProperty,
} from "../../redux/slices/propertySlice";
import { fetchAgents } from "../../redux/slices/agentSlice";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdHouseSiding } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import CoordinateMapPicker from "../ui/CoordinateMapPicker";
import { MdStarPurple500 } from "react-icons/md";

// Rich Text Editor Component with Navy/Gold Theme
const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = "Enter description...",
  className = ""
}) => {
  const [activeTools, setActiveTools] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
      updateContent();
    }
  };

  const handleFormat = (command) => {
    execCommand(command);
    setActiveTools(prev => ({
      ...prev,
      [command]: document.queryCommandState(command)
    }));
  };

  const updateContent = () => {
    if (editorRef.current && onChange) {
      const content = editorRef.current.innerHTML;
      onChange({
        target: {
          name: 'description',
          value: content
        }
      });
    }
  };

  const handleInput = () => {
    updateContent();
  };

  const handleSelectionChange = () => {
    const commands = ['bold', 'italic', 'underline'];
    const newActiveTools = {};
    commands.forEach(command => {
      try {
        newActiveTools[command] = document.queryCommandState(command);
      } catch (e) {
        newActiveTools[command] = false;
      }
    });
    setActiveTools(newActiveTools);
  };

  const insertParagraph = () => {
    execCommand('formatBlock', 'p');
  };

  const insertHeading = (level) => {
    execCommand('formatBlock', `h${level}`);
  };

  const toolbarButtons = [
    { command: 'bold', icon: Bold, label: 'Bold', shortcut: 'Ctrl+B' },
    { command: 'italic', icon: Italic, label: 'Italic', shortcut: 'Ctrl+I' },
    { command: 'underline', icon: Underline, label: 'Underline', shortcut: 'Ctrl+U' },
    { command: 'insertUnorderedList', icon: List, label: 'Bullet List' },
  ];

  const cleanHtml = (html) => {
    if (!html) return '';
    return html.replace(/<p><br><\/p>/g, '').replace(/<div><br><\/div>/g, '');
  };

  return (
    <div className={`border border-white/10 rounded-xl overflow-hidden bg-white/5 ${className}`}>
      <div className="flex items-center justify-between bg-[#0A1628] p-3 border-b border-white/10">
        <div className="flex items-center space-x-1">
          {toolbarButtons.map(({ command, icon: Icon, label, shortcut }) => (
            <button
              key={command}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormat(command)}
              className={`p-2 rounded-lg transition-colors ${
                activeTools[command]
                  ? 'bg-[#C9A962]/20 text-[#C9A962]'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title={`${label}${shortcut ? ` (${shortcut})` : ''}`}
            >
              <Icon size={16} />
            </button>
          ))}
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => insertHeading(2)}
            className="px-2 py-1 text-sm rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white font-semibold"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => insertHeading(3)}
            className="px-2 py-1 text-sm rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white font-semibold"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertParagraph}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            title="Paragraph"
          >
            <AlignLeft size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`p-2 rounded-lg transition-colors flex items-center space-x-1 ${
            showPreview
              ? 'bg-[#C9A962]/20 text-[#C9A962]'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
          title="Toggle Preview"
        >
          <Eye size={16} />
          <span className="text-sm hidden sm:inline">Preview</span>
        </button>
      </div>

      <div className="relative">
        {showPreview ? (
          <div className="p-4 min-h-[200px] bg-[#060D16]">
            <div
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: cleanHtml(value) }}
            />
            {!value && (
              <div className="text-gray-500 italic">No content to preview</div>
            )}
          </div>
        ) : (
          <>
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onKeyUp={handleSelectionChange}
              onMouseUp={handleSelectionChange}
              onClick={handleSelectionChange}
              className="p-4 min-h-[200px] focus:outline-none prose prose-invert max-w-none text-white bg-[#060D16]"
              style={{ lineHeight: '1.6' }}
              suppressContentEditableWarning={true}
            />
            {(!value || value === '<p><br></p>') && (
              <div className="absolute top-4 left-4 text-gray-500 pointer-events-none">
                {placeholder}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Form Input Component - defined outside to prevent re-creation on each render
const FormInput = ({ label, icon: Icon, required, error, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">
      {label}{required && <span className="text-[#C9A962]">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${error ? 'text-red-400' : 'text-gray-500'}`} />
      )}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-white/5 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#C9A962]/50'} rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors`}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

// Form Select Component - defined outside to prevent re-creation on each render
const FormSelect = ({ label, icon: Icon, children, error, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${error ? 'text-red-400' : 'text-gray-500'}`} />
      )}
      <select
        {...props}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-10 py-3 bg-[#1a2942] border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#C9A962]/50'} rounded-xl text-white focus:outline-none transition-colors appearance-none cursor-pointer`}
        style={{ colorScheme: 'dark' }}
      >
        {children}
      </select>
      {/* Custom dropdown arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

export const PropertyForm = ({
  currentForm,
  setCurrentForm,
  selectedProperty,
}) => {
  const initialFormState = {
    title: "",
    description: "",
    price: "",
    location: "",
    property_type: "house",
    category: "sale",
    status: "available",
    beds: "",
    lounges: "",
    kitchens: "",
    dining_rooms: "",
    baths: "",
    area_unit: "sqm",
    area_measurement: "",
    sqft: "",
    year_built: "",
    floor_size: "",
    garage: "",
    latitude: "",
    longitude: "",
    is_published: true,
    virtual_tour_url: "",
    images: [],
    features: [],
    agents: [],
  };

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormState);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Local loading state
  const loading = isSubmitting; // Use local state instead of global
  const agents = useSelector((state) => state.agent.agents);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [feature, setFeature] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  // User-friendly error messages for each field
  const fieldErrorMessages = {
    title: "Please enter a property title",
    description: "Please add a property description",
    price: "Please enter a valid price",
    location: "Please enter the property location",
    property_type: "Please select a property type",
    category: "Please select a category",
    status: "Please select a status",
    beds: "Please enter a valid number of bedrooms",
    baths: "Please enter a valid number of bathrooms",
    area_measurement: "Please enter a valid area measurement",
    latitude: "Please enter a valid latitude",
    longitude: "Please enter a valid longitude",
    images: "Please upload at least one property image",
  };

  // Convert API errors to user-friendly messages
  const parseApiErrors = (errors) => {
    const friendlyErrors = {};
    for (const [field, messages] of Object.entries(errors)) {
      if (Array.isArray(messages)) {
        // Use custom message or fallback to API message
        friendlyErrors[field] = fieldErrorMessages[field] || messages[0];
      } else if (typeof messages === 'string') {
        friendlyErrors[field] = fieldErrorMessages[field] || messages;
      }
    }
    return friendlyErrors;
  };

  const areaUnits = [
    { value: "sqm", label: "Square Meters" },
    { value: "sqft", label: "Square Feet" },
    { value: "hectares", label: "Hectares" },
    { value: "acres", label: "Acres" },
  ];

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  useEffect(() => {
    if (currentForm === "edit" && selectedProperty) {
      setDeletedImageIds([]);

      const propertyForForm = {
        ...selectedProperty,
        price: selectedProperty.price?.toString() || "",
        beds: selectedProperty.beds?.toString() || "",
        baths: selectedProperty.baths?.toString() || "",
        area_measurement: selectedProperty.area_measurement?.toString() || "",
        floor_size: selectedProperty.floor_size?.toString() || "",
        lounges: selectedProperty.lounges?.toString() || "",
        kitchens: selectedProperty.kitchens?.toString() || "",
        dining_rooms: selectedProperty.dining_rooms?.toString() || "",
        garage: selectedProperty.garage?.toString() || "",
        area_unit: selectedProperty.area_unit || "sqm",
        virtual_tour_url: selectedProperty.virtual_tour_url || "",
        sqft: selectedProperty.sqft?.toString() || "",
        year_built: selectedProperty.year_built?.toString() || "",
        latitude: selectedProperty.latitude?.toString() || "",
        longitude: selectedProperty.longitude?.toString() || "",
        features: selectedProperty.features?.map((f) => f.feature || f) || [],
        agents: selectedProperty.property_agents?.map((pa) => ({
          agent_id: pa.agent?.id || pa.agent_id,
          name: pa.agent?.full_name || pa.name,
          is_primary: pa.is_primary || false,
        })) || [],
      };

      setFormData(propertyForForm);

      if (selectedProperty.images && selectedProperty.images.length > 0) {
        const existingImages = selectedProperty.images.map((img) => ({
          url: img.image,
          id: img.id,
          caption: img.caption || "",
          isExisting: true,
          order: img.order || 0
        }));
        existingImages.sort((a, b) => (a.order || 0) - (b.order || 0));
        setImagePreviewUrls(existingImages);
      } else {
        setImagePreviewUrls([]);
      }

      setImageFiles([]);
    } else if (currentForm === "add") {
      setFormData(initialFormState);
      setImagePreviewUrls([]);
      setImageFiles([]);
      setDeletedImageIds([]);
    }
  }, [currentForm, selectedProperty]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handler for coordinate changes from map picker
  const handleCoordinateChange = ({ latitude, longitude }) => {
    setFormData(prev => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    const newPreviewUrls = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      file: file,
      caption: "",
      isExisting: false,
      tempId: `new-${Date.now()}-${index}`,
      order: imagePreviewUrls.length + index
    }));

    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = imagePreviewUrls[index];

    if (imageToRemove.isExisting && imageToRemove.id) {
      setDeletedImageIds([...deletedImageIds, imageToRemove.id]);
    } else if (imageToRemove.file) {
      const updatedFiles = imageFiles.filter(f => f !== imageToRemove.file);
      setImageFiles(updatedFiles);
    }

    const updatedPreviews = imagePreviewUrls.filter((_, i) => i !== index);
    setImagePreviewUrls(updatedPreviews);
  };

  const handleCaptionChange = (index, caption) => {
    const updatedPreviews = [...imagePreviewUrls];
    updatedPreviews[index] = { ...updatedPreviews[index], caption };
    setImagePreviewUrls(updatedPreviews);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';

    const dragImage = e.target.cloneNode(true);
    dragImage.style.opacity = '0.5';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 50);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      setIsDragging(false);
      return;
    }

    const draggedItem = imagePreviewUrls[draggedIndex];
    const newPreviews = [...imagePreviewUrls];

    newPreviews.splice(draggedIndex, 1);

    const adjustedDropIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newPreviews.splice(adjustedDropIndex, 0, draggedItem);

    const reorderedPreviews = newPreviews.map((preview, index) => ({
      ...preview,
      order: index
    }));

    setImagePreviewUrls(reorderedPreviews);
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsDragging(false);
  };

  const handleAddAgent = () => {
    if (selectedAgent) {
      const agent = agents.find((a) => a.id.toString() === selectedAgent);
      if (agent && !formData.agents.some((a) => a.agent_id === agent.id)) {
        setFormData({
          ...formData,
          agents: [
            ...formData.agents,
            {
              agent_id: agent.id,
              name: agent.full_name,
              profile_image: agent.profile_image,
              is_primary: formData.agents.length === 0,
            },
          ],
        });
        setSelectedAgent("");
      }
    }
  };

  const handleRemoveAgent = (index) => {
    const updatedAgents = [...formData.agents];
    const wasPrimary = updatedAgents[index].is_primary;
    updatedAgents.splice(index, 1);

    if (wasPrimary && updatedAgents.length > 0) {
      updatedAgents[0].is_primary = true;
    }

    setFormData({
      ...formData,
      agents: updatedAgents,
    });
  };

  const handleTogglePrimaryAgent = (index) => {
    const updatedAgents = formData.agents.map((agent, i) => ({
      ...agent,
      is_primary: i === index,
    }));
    setFormData({
      ...formData,
      agents: updatedAgents,
    });
  };

  const handleAddFeature = () => {
    if (feature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, feature.trim()],
      });
      setFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({}); // Clear previous errors

    const propertyFormData = new FormData();

    const fieldsToProcess = {
      ...formData,
      price: parseFloat(formData.price),
      beds: formData.beds ? parseInt(formData.beds) : null,
      baths: formData.baths ? parseInt(formData.baths) : null,
      area_measurement: formData.area_measurement ? parseFloat(formData.area_measurement) : null,
      floor_size: formData.floor_size || null,
      sqft: formData.sqft ? parseInt(formData.sqft) : null,
      year_built: formData.year_built ? parseInt(formData.year_built) : null,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      lounges: formData.lounges ? parseInt(formData.lounges) : null,
      kitchens: formData.kitchens ? parseInt(formData.kitchens) : null,
      dining_rooms: formData.dining_rooms ? parseInt(formData.dining_rooms) : null,
    };

    Object.keys(fieldsToProcess).forEach((key) => {
      if (
        key !== "images" &&
        key !== "features" &&
        key !== "agents" &&
        fieldsToProcess[key] !== null &&
        fieldsToProcess[key] !== "" &&
        fieldsToProcess[key] !== undefined
      ) {
        propertyFormData.append(key, fieldsToProcess[key]);
      }
    });

    if (formData.features && formData.features.length > 0) {
      const featuresToSend = formData.features.map((feature) => ({ feature }));
      propertyFormData.append("features", JSON.stringify(featuresToSend));
    } else {
      propertyFormData.append("features", JSON.stringify([]));
    }

    const agentsToSend = formData.agents.map((agent) => ({
      agent_id: agent.agent_id,
      is_primary: agent.is_primary,
    }));
    propertyFormData.append("agents", JSON.stringify(agentsToSend));

    imageFiles.forEach((file) => {
      propertyFormData.append("images", file);
    });

    const imageCaptions = imagePreviewUrls.map((preview, index) => ({
      id: preview.id || null,
      caption: preview.caption || "",
      file: preview.file ? preview.file.name : null,
      order: index,
    }));

    propertyFormData.append("image_captions", JSON.stringify(imageCaptions));

    if (currentForm === "edit" && deletedImageIds.length > 0) {
      propertyFormData.append("deleted_images", JSON.stringify(deletedImageIds));
    }

    try {
      if (currentForm === "edit" && selectedProperty) {
        // Close modal immediately for optimistic UI
        const propertyId = selectedProperty.id;
        setCurrentForm(null);
        setIsSubmitting(false);

        // Dispatch update in background - Redux handles optimistic update
        dispatch(
          updateProperty({
            id: propertyId,
            data: propertyFormData,
          })
        ).unwrap().then(() => {
          // Show success notification via custom event
          window.dispatchEvent(new CustomEvent('propertyUpdateSuccess', {
            detail: { message: 'Property updated successfully!' }
          }));
          // No refetch needed - Redux slice handles optimistic update
        }).catch((error) => {
          window.dispatchEvent(new CustomEvent('propertyUpdateError', {
            detail: { message: error?.message || 'Failed to update property' }
          }));
        });

        return; // Exit early - modal already closed
      } else {
        // For create - use optimistic UI
        // Close modal immediately so admin can continue working
        setCurrentForm(null);
        setIsSubmitting(false);

        // Dispatch create in background - Redux will set isCreating=true for skeleton loading
        dispatch(createProperty(propertyFormData))
          .unwrap()
          .then(() => {
            window.dispatchEvent(new CustomEvent('propertyCreateSuccess', {
              detail: { message: 'Property created successfully!' }
            }));
            // No refetch needed - Redux slice adds new property to the list
          })
          .catch((error) => {
            console.error("Create error:", error);
            // Build error message from field errors if available
            let errorMessage = 'Failed to create property.';
            if (error?.errors || (typeof error === 'object' && !error.message)) {
              const apiErrors = error?.errors || error;
              const errorFields = Object.keys(apiErrors);
              if (errorFields.length > 0) {
                const fieldNames = errorFields.map(f => f.replace(/_/g, ' ')).join(', ');
                errorMessage = `Please check: ${fieldNames}`;
              }
            } else if (error?.message) {
              errorMessage = error.message;
            }

            window.dispatchEvent(new CustomEvent('propertyCreateError', {
              detail: { message: errorMessage }
            }));
          });

        return; // Exit early - modal already closed
      }
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      setSnackbar({
        open: true,
        message: error?.message || "Submission failed!",
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
            className="bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#C9A962]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {currentForm === "edit" ? "Edit Property" : "Add New Property"}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {currentForm === "edit" ? "Update property details" : "Create a new listing"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentForm(null)}
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Loading Overlay */}
              {loading && (
                <div className="absolute inset-0 bg-[#0A1628]/90 flex items-center justify-center z-10 rounded-2xl">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-3 border-[#C9A962] border-t-transparent rounded-full mb-4"
                    />
                    <p className="text-white font-medium">
                      {currentForm === "edit" ? "Updating property..." : "Creating property..."}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information Section */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-[#C9A962]" />
                    Basic Information
                  </h3>
                  {/* Error Summary Banner */}
                {Object.keys(fieldErrors).length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-red-400 font-medium">Please fix the following errors:</h4>
                        <ul className="mt-2 space-y-1">
                          {Object.entries(fieldErrors).map(([field, error]) => (
                            <li key={field} className="text-red-300 text-sm">• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Title"
                      required
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Property title"
                      error={fieldErrors.title}
                    />

                    <FormInput
                      label="Price ($)"
                      required
                      icon={DollarSign}
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      error={fieldErrors.price}
                    />

                    <FormInput
                      label="Location"
                      required
                      icon={MapPin}
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Property location"
                      error={fieldErrors.location}
                    />

                    {/* Coordinates Section with Map Picker */}
                    <div className="md:col-span-2">
                      <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
                        <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#C9A962]" />
                          Property Coordinates
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Coordinate Inputs */}
                          <div className="space-y-3">
                            <FormInput
                              label="Latitude"
                              icon={MapPin}
                              type="number"
                              name="latitude"
                              value={formData.latitude}
                              onChange={handleInputChange}
                              step="any"
                              placeholder="-17.8292 (e.g. Harare)"
                            />
                            <FormInput
                              label="Longitude"
                              icon={MapPin}
                              type="number"
                              name="longitude"
                              value={formData.longitude}
                              onChange={handleInputChange}
                              step="any"
                              placeholder="31.0522 (e.g. Harare)"
                            />
                          </div>
                          {/* Map Picker */}
                          <CoordinateMapPicker
                            latitude={formData.latitude}
                            longitude={formData.longitude}
                            onCoordinateChange={handleCoordinateChange}
                          />
                        </div>
                      </div>
                    </div>

                    <FormSelect
                      label="Property Type"
                      name="property_type"
                      value={formData.property_type}
                      onChange={handleInputChange}
                      error={fieldErrors.property_type}
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="flat">Flat</option>
                      <option value="land">Land</option>
                      <option value="commercial">Commercial</option>
                      <option value="villa">Villa</option>
                      <option value="cluster">Cluster</option>
                      <option value="stand">Stand</option>
                      <option value="duplex">Duplex</option>
                      <option value="townhouse">Townhouse</option>
                    </FormSelect>

                    <FormSelect
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      error={fieldErrors.category}
                    >
                      <option value="rental">Rental</option>
                      <option value="sale">Sale</option>
                      <option value="development">Developments</option>
                      <option value="commercial">Commercial Property</option>
                      <option value="industrial">Industrial Property</option>
                    </FormSelect>

                    <FormSelect
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      error={fieldErrors.status}
                    >
                      <option value="available">Available</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Sold</option>
                      <option value="off-market">Off Market</option>
                    </FormSelect>

                    <div className="flex items-center mt-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="is_published"
                            checked={formData.is_published}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:bg-[#C9A962]/30 transition-colors"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full peer-checked:bg-[#C9A962] peer-checked:translate-x-5 transition-all"></div>
                        </div>
                        <span className="text-gray-400 group-hover:text-white transition-colors">
                          Published (visible to users)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Property Details Section */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                    <Square className="w-5 h-5 text-[#C9A962]" />
                    Property Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput
                      label="Bedrooms"
                      icon={Bed}
                      type="number"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="0"
                    />

                    <FormInput
                      label="Bathrooms"
                      icon={Bath}
                      type="number"
                      name="baths"
                      value={formData.baths}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="0"
                    />

                    <FormInput
                      label="Square Feet"
                      type="number"
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="0"
                    />

                    <FormInput
                      label="Area"
                      type="number"
                      name="area_measurement"
                      value={formData.area_measurement}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />

                    <FormSelect
                      label="Area Unit"
                      name="area_unit"
                      value={formData.area_unit}
                      onChange={handleInputChange}
                    >
                      {areaUnits.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </FormSelect>

                    <FormInput
                      label="Year Built"
                      icon={Calendar}
                      type="number"
                      name="year_built"
                      value={formData.year_built}
                      onChange={handleInputChange}
                      min="1800"
                      max={new Date().getFullYear()}
                      placeholder={new Date().getFullYear().toString()}
                    />
                  </div>
                </div>

                {/* Property Agents Section */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                    <FaRegCircleUser className="w-5 h-5 text-[#C9A962]" />
                    Property Agents/Negotiators
                  </h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <select
                        value={selectedAgent}
                        onChange={(e) => setSelectedAgent(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      >
                        <option value="">Select an agent...</option>
                        {agents.map((agent) => (
                          <option key={agent.id} value={agent.id.toString()}>
                            {agent.full_name} - {agent.position}
                          </option>
                        ))}
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleAddAgent}
                        className="px-4 py-3 bg-[#C9A962]/10 border border-[#C9A962]/20 text-[#C9A962] rounded-xl hover:bg-[#C9A962]/20 transition-all"
                      >
                        <Plus size={20} />
                      </motion.button>
                    </div>

                    {formData.agents.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.agents.map((agent, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-3 rounded-xl"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#C9A962]/10 rounded-full flex items-center justify-center overflow-hidden">
                                {agent.profile_image ? (
                                  <img
                                    src={agent.profile_image}
                                    alt={agent.name}
                                    className="w-full h-full object-cover object-top"
                                  />
                                ) : (
                                  <FaRegCircleUser className="w-5 h-5 text-[#C9A962]" />
                                )}
                              </div>
                              <span className="text-white font-medium">{agent.name}</span>
                              {agent.is_primary && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#C9A962]/20 text-[#C9A962] border border-[#C9A962]/30">
                                  <MdStarPurple500 size={12} className="mr-1" />
                                  Primary
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => handleTogglePrimaryAgent(index)}
                                className="text-xs px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 hover:text-white transition-all"
                              >
                                {agent.is_primary ? "Remove Primary" : "Set Primary"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveAgent(index)}
                                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Section */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                    <IoCheckmarkDoneCircleOutline className="w-5 h-5 text-[#C9A962]" />
                    Property Features
                  </h3>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => setFeature(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                        placeholder="Add a feature (e.g., Pool, Fireplace, Garden)"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleAddFeature}
                        className="px-4 py-3 bg-[#C9A962]/10 border border-[#C9A962]/20 text-[#C9A962] rounded-xl hover:bg-[#C9A962]/20 transition-all"
                      >
                        <Plus size={20} />
                      </motion.button>
                    </div>

                    {formData.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.features.map((feat, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="flex items-center gap-2 bg-[#C9A962]/10 border border-[#C9A962]/20 px-3 py-1.5 rounded-full"
                          >
                            <span className="text-sm text-[#C9A962]">{feat}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="text-[#C9A962] hover:text-white transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description Section */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                    <AlignLeft className="w-5 h-5 text-[#C9A962]" />
                    Property Description<span className="text-[#C9A962]">*</span>
                  </h3>
                  <div className={fieldErrors.description ? 'ring-2 ring-red-500/50 rounded-xl' : ''}>
                    <RichTextEditor
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter a detailed description of the property..."
                      className="min-h-[250px]"
                    />
                  </div>
                  {fieldErrors.description && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.description}
                    </p>
                  )}
                </div>

                {/* Images Section */}
                <div>
                  <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#C9A962]" />
                    Property Images
                    {imagePreviewUrls.length > 0 && (
                      <span className="text-sm text-gray-400 font-normal ml-2">
                        ({imagePreviewUrls.length} image{imagePreviewUrls.length !== 1 ? 's' : ''})
                      </span>
                    )}
                  </h3>

                  <div className="space-y-4">
                    <label
                      htmlFor="property-images"
                      className="flex flex-col justify-center items-center border-2 border-dashed border-white/10 rounded-xl h-32 cursor-pointer hover:bg-white/5 hover:border-[#C9A962]/30 transition-all"
                    >
                      <ImageIcon className="w-10 h-10 text-gray-500 mb-2" />
                      <p className="text-gray-400 text-sm">Click to upload images</p>
                      <p className="text-gray-500 text-xs mt-1">PNG, JPG, GIF up to 10MB each</p>
                      <input
                        id="property-images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    {imagePreviewUrls.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                          <GripVertical className="w-4 h-4" />
                          Drag images to reorder. The first image will be the main property image.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {imagePreviewUrls.map((preview, index) => (
                            <div
                              key={preview.id || preview.tempId || index}
                              draggable
                              onDragStart={(e) => handleDragStart(e, index)}
                              onDragOver={(e) => handleDragOver(e, index)}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, index)}
                              onDragEnd={handleDragEnd}
                              className={`
                                bg-white/5 border rounded-xl p-3 space-y-2 cursor-move transition-all
                                ${isDragging && draggedIndex === index ? 'opacity-50' : ''}
                                ${dragOverIndex === index ? 'border-[#C9A962] border-2' : 'border-white/10'}
                                ${index === 0 ? 'ring-2 ring-[#C9A962]/50' : ''}
                              `}
                            >
                              {index === 0 && (
                                <div className="bg-[#C9A962] text-[#0A1628] text-xs font-semibold px-3 py-1 rounded-full text-center">
                                  Main Image
                                </div>
                              )}

                              <div className="relative h-40 group">
                                <img
                                  src={preview.url}
                                  alt={`Property preview ${index + 1}`}
                                  className="h-full w-full object-cover rounded-lg"
                                  draggable={false}
                                />

                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all rounded-lg flex items-center justify-center">
                                  <GripVertical className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>

                                {preview.isExisting ? (
                                  <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded-lg">
                                    Existing
                                  </div>
                                ) : (
                                  <div className="absolute top-2 left-2 bg-[#C9A962] text-[#0A1628] text-xs px-2 py-1 rounded-lg">
                                    New
                                  </div>
                                )}
                              </div>

                              <input
                                type="text"
                                placeholder="Add caption (optional)"
                                value={preview.caption || ""}
                                onChange={(e) => handleCaptionChange(index, e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          ))}
                        </div>

                        {deletedImageIds.length > 0 && (
                          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                            <p className="text-sm text-yellow-400 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              {deletedImageIds.length} image{deletedImageIds.length !== 1 ? 's' : ''} will be deleted when you save
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setCurrentForm(null)}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                    disabled={loading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin w-5 h-5" />
                        {currentForm === "edit" ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <IoCheckmarkDoneCircleOutline className="w-5 h-5" />
                        {currentForm === "edit" ? "Update Property" : "Add Property"}
                      </>
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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

export default PropertyForm;
