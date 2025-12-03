import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "lucide-react";
import { Snackbar, Alert } from "@mui/material";
import {
  fetchProperties,
  createProperty,
  updateProperty,
} from "../../redux/slices/propertySlice";
import { fetchAgents } from "../../redux/slices/agentSlice";

// Rich Text Editor Component
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
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between bg-gray-50 p-2 border-b">
        <div className="flex items-center space-x-1">
          {toolbarButtons.map(({ command, icon: Icon, label, shortcut }) => (
            <button
              key={command}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormat(command)}
              className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                activeTools[command] ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
              title={`${label}${shortcut ? ` (${shortcut})` : ''}`}
            >
              <Icon size={16} />
            </button>
          ))}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => insertHeading(2)}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors text-gray-600 font-semibold"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => insertHeading(3)}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors text-gray-600 font-semibold"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertParagraph}
            className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600"
            title="Paragraph"
          >
            <AlignLeft size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`p-2 rounded hover:bg-gray-200 transition-colors flex items-center space-x-1 ${
            showPreview ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
          }`}
          title="Toggle Preview"
        >
          <Eye size={16} />
          <span className="text-sm hidden sm:inline">Preview</span>
        </button>
      </div>

      <div className="relative">
        {showPreview ? (
          <div className="p-4 min-h-[200px] bg-gray-50">
            <div
              className="prose prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanHtml(value) }}
            />
            {!value && (
              <div className="text-gray-400 italic">No content to preview</div>
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
              className="p-4 min-h-[200px] focus:outline-none prose prose-stone max-w-none"
              style={{ lineHeight: '1.6' }}
              suppressContentEditableWarning={true}
            />
            {(!value || value === '<p><br></p>') && (
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                {placeholder}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const COLORS = {
  primary: "#8B7355",
  secondary: "#D2B48C",
  accent: "#5D4037",
  light: "#F5F5DC",
  dark: "#3E2723",
  white: "#FFFFFF",
};

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
    area: "",
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
  const loading = useSelector((state) => state.properties.loading);
  const agents = useSelector((state) => state.agent.agents);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [feature, setFeature] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const areaUnits = [
    { value: "sqm", label: "Square Meters" },
    { value: "sqft", label: "Square Feet" },
    { value: "hectares", label: "Hectares" },
    { value: "acres", label: "Acres" },
  ];

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  // Populate form when editing an existing property
  useEffect(() => {
    if (currentForm === "edit" && selectedProperty) {
      // Reset deleted images when switching properties
      setDeletedImageIds([]);
      
      const propertyForForm = {
        ...selectedProperty,
        price: selectedProperty.price?.toString() || "",
        beds: selectedProperty.beds?.toString() || "",
        baths: selectedProperty.baths?.toString() || "",
        area: selectedProperty.area?.toString() || "",
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

      // Load existing images with proper structure
      if (selectedProperty.images && selectedProperty.images.length > 0) {
        const existingImages = selectedProperty.images.map((img) => ({
          url: img.image,
          id: img.id,
          caption: img.caption || "",
          isExisting: true,
          order: img.order || 0
        }));
        // Sort images by order if available
        existingImages.sort((a, b) => (a.order || 0) - (b.order || 0));
        setImagePreviewUrls(existingImages);
      } else {
        setImagePreviewUrls([]);
      }
      
      // Clear new image files
      setImageFiles([]);
    } else if (currentForm === "add") {
      // Reset form for new property
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
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Store the actual files for upload
    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    // Create preview URLs for display
    const newPreviewUrls = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      file: file,
      caption: "",
      isExisting: false,
      tempId: `new-${Date.now()}-${index}`, // Temporary ID for new images
      order: imagePreviewUrls.length + index
    }));

    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = imagePreviewUrls[index];
    
    if (imageToRemove.isExisting && imageToRemove.id) {
      // Track deletion of existing image
      setDeletedImageIds([...deletedImageIds, imageToRemove.id]);
    } else if (imageToRemove.file) {
      // Remove from new files
      const updatedFiles = imageFiles.filter(f => f !== imageToRemove.file);
      setImageFiles(updatedFiles);
    }
    
    // Remove from preview
    const updatedPreviews = imagePreviewUrls.filter((_, i) => i !== index);
    setImagePreviewUrls(updatedPreviews);
  };

  const handleCaptionChange = (index, caption) => {
    const updatedPreviews = [...imagePreviewUrls];
    updatedPreviews[index] = { ...updatedPreviews[index], caption };
    setImagePreviewUrls(updatedPreviews);
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    
    // Add a drag image
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
    
    // Remove dragged item
    newPreviews.splice(draggedIndex, 1);
    
    // Insert at new position
    const adjustedDropIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newPreviews.splice(adjustedDropIndex, 0, draggedItem);
    
    // Update order property
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
    
    // If we removed the primary agent and there are others, make the first one primary
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
    
    const propertyFormData = new FormData();
    
    // Process all form fields
    const fieldsToProcess = {
      ...formData,
      price: parseFloat(formData.price),
      beds: formData.beds ? parseInt(formData.beds) : null,
      baths: formData.baths ? parseInt(formData.baths) : null,
      area: formData.area ? parseFloat(formData.area) : null,
      floor_size: formData.floor_size || null,
      sqft: formData.sqft ? parseInt(formData.sqft) : null,
      year_built: formData.year_built ? parseInt(formData.year_built) : null,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      lounges: formData.lounges ? parseInt(formData.lounges) : null,
      kitchens: formData.kitchens ? parseInt(formData.kitchens) : null,
      dining_rooms: formData.dining_rooms ? parseInt(formData.dining_rooms) : null,
    };

    // Add standard fields to FormData
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

    // Process features
    if (formData.features && formData.features.length > 0) {
      const featuresToSend = formData.features.map((feature) => ({ feature }));
      propertyFormData.append("features", JSON.stringify(featuresToSend));
    } else {
      propertyFormData.append("features", JSON.stringify([]));
    }

    // Process agents
    const agentsToSend = formData.agents.map((agent) => ({
      agent_id: agent.agent_id,
      is_primary: agent.is_primary,
    }));
    propertyFormData.append("agents", JSON.stringify(agentsToSend));

    // Add new image files with order
    imageFiles.forEach((file) => {
      propertyFormData.append("images", file);
    });

    // Prepare image captions and order
    const imageCaptions = imagePreviewUrls.map((preview, index) => ({
      id: preview.id || null,
      caption: preview.caption || "",
      file: preview.file ? preview.file.name : null,
      order: index, // Include order for sorting
    }));

    propertyFormData.append("image_captions", JSON.stringify(imageCaptions));

    // Handle deleted images for edit mode
    if (currentForm === "edit" && deletedImageIds.length > 0) {
      propertyFormData.append("deleted_images", JSON.stringify(deletedImageIds));
    }

    try {
      if (currentForm === "edit" && selectedProperty) {
        await dispatch(
          updateProperty({
            id: selectedProperty.id,
            data: propertyFormData,
          })
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Property updated successfully!",
          severity: "success",
        });
      } else {
        await dispatch(createProperty(propertyFormData)).unwrap();

        setSnackbar({
          open: true,
          message: "Property created successfully!",
          severity: "success",
        });
      }

      setCurrentForm(null);
      dispatch(fetchProperties());
    } catch (error) {
      console.error("Submission error:", error);
      setSnackbar({
        open: true,
        message: error.message || "Submission failed!",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: COLORS.dark }}>
                {currentForm === "edit" ? "Edit Property" : "Add New Property"}
              </h2>
              <button
                onClick={() => setCurrentForm(null)}
                className="p-2 rounded-full hover:bg-gray-100"
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <div className="flex flex-col items-center">
                  <Loader className="animate-spin h-10 w-10 mb-2" style={{ color: COLORS.primary }} />
                  <p className="text-gray-600 font-medium">
                    {currentForm === "edit" ? "Updating property..." : "Creating property..."}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title*
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)*
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location*
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type*
                    </label>
                    <select
                      name="property_type"
                      value={formData.property_type}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="flat">Flat</option>
                      <option value="land">Land</option>
                      <option value="commercial">Commercial</option>
                      <option value="villa">Villa</option>
                      <option value="cluster">Cluster</option>
                      <option value="stand">Stand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="rental">Rental</option>
                      <option value="sale">Sale</option>
                      <option value="development">Developments</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="available">Available</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Sold</option>
                      <option value="off-market">Off Market</option>
                    </select>
                  </div>

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      name="is_published"
                      id="is_published"
                      checked={formData.is_published}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="is_published"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Published (visible to users)
                    </label>
                  </div>
                </div>
              </div>

              {/* Property Details Section - Same as before */}
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-3">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="baths"
                      value={formData.baths}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Square Feet
                    </label>
                    <input
                      type="number"
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area Unit
                    </label>
                    <select
                      name="area_unit"
                      value={formData.area_unit}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {areaUnits.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year Built
                    </label>
                    <input
                      type="number"
                      name="year_built"
                      value={formData.year_built}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      min="1800"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
              </div>

              {/* Property Agents Section */}
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <Users className="mr-2" size={20} />
                  Property Agents/Negotiators
                </h3>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <select
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an agent...</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id.toString()}>
                          {agent.full_name} - {agent.position}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddAgent}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  {formData.agents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Selected Agents:
                      </p>
                      <div className="space-y-2">
                        {formData.agents.map((agent, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">
                                {agent.name}
                              </span>
                              {agent.is_primary && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  <Star size={12} className="mr-1" />
                                  Primary
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => handleTogglePrimaryAgent(index)}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                              >
                                {agent.is_primary ? "Remove Primary" : "Set Primary"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveAgent(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Section */}
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-3">Property Features</h3>
                <div className="space-y-2">
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
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  {formData.features.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Added Features:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.features.map((feat, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                          >
                            <span className="text-sm">{feat}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Rich Text Description Section */}
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-3">
                  Property Description*
                </h3>
                <div className="space-y-2">
                  <RichTextEditor
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter a detailed description of the property..."
                    className="min-h-[250px]"
                  />
                </div>
              </div>

              {/* Enhanced Images Section with Drag & Drop */}
              <div>
                <h3 className="font-medium text-lg mb-3">
                  Property Images
                  {imagePreviewUrls.length > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({imagePreviewUrls.length} image{imagePreviewUrls.length !== 1 ? 's' : ''})
                    </span>
                  )}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="property-images"
                      className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md h-32 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload images
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB each
                        </p>
                      </div>
                      <input
                        id="property-images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {imagePreviewUrls.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">
                        <GripVertical className="inline mr-1" size={16} />
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
                              border rounded-md p-2 space-y-2 cursor-move transition-all
                              ${isDragging && draggedIndex === index ? 'opacity-50' : ''}
                              ${dragOverIndex === index ? 'border-blue-500 border-2' : 'border-gray-300'}
                              ${index === 0 ? 'ring-2 ring-blue-300' : ''}
                            `}
                          >
                            {index === 0 && (
                              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full text-center">
                                Main Image
                              </div>
                            )}
                            
                            <div className="relative h-40 group">
                              <img
                                src={preview.url}
                                alt={`Property preview ${index + 1}`}
                                className="h-full w-full object-cover rounded-md"
                                draggable={false}
                              />
                              
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-md flex items-center justify-center">
                                <GripVertical className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={16} />
                              </button>
                              
                              {preview.isExisting && (
                                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                  Existing
                                </div>
                              )}
                              
                              {!preview.isExisting && (
                                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                  New
                                </div>
                              )}
                            </div>
                            
                            <input
                              type="text"
                              placeholder="Add caption (optional)"
                              value={preview.caption || ""}
                              onChange={(e) => handleCaptionChange(index, e.target.value)}
                              className="w-full p-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        ))}
                      </div>
                      
                      {deletedImageIds.length > 0 && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <p className="text-sm text-yellow-800">
                            <AlertCircle className="inline mr-1" size={16} />
                            {deletedImageIds.length} image{deletedImageIds.length !== 1 ? 's' : ''} will be deleted when you save
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setCurrentForm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: loading ? '#ccc' : COLORS.primary,
                    color: COLORS.white,
                  }}
                  className="px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50 flex items-center space-x-2"
                  disabled={loading}
                >
                  {loading && <Loader className="animate-spin h-5 w-5" />}
                  <span>
                    {loading 
                      ? (currentForm === "edit" ? "Updating..." : "Creating...")
                      : (currentForm === "edit" ? "Update Property" : "Add Property")
                    }
                  </span>
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

export default PropertyForm;