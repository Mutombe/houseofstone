import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  X,
  Check,
  ChevronDown,
  Calendar,
  AlertCircle,
  Loader
} from "lucide-react";

const LeadForm = ({ lead, property, leadSources, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    source_id: "",
    status: "new",
    notes: "",
    property_id: property?.id || ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (lead) {
      setFormData({
        contact_name: lead.contact_name,
        contact_email: lead.contact_email,
        contact_phone: lead.contact_phone,
        source_id: lead.source?.id || "",
        status: lead.status,
        notes: lead.notes,
        property_id: lead.property?.id || property?.id || ""
      });
    } else if (property) {
      setFormData(prev => ({
        ...prev,
        property_id: property.id
      }));
    }
  }, [lead, property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.contact_name) newErrors.contact_name = "Name is required";
    if (!formData.contact_email) {
      newErrors.contact_email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contact_email)) {
      newErrors.contact_email = "Email is invalid";
    }
    if (!formData.contact_phone) newErrors.contact_phone = "Phone is required";
    if (!formData.property_id) newErrors.property_id = "Property is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      onSave({
        ...formData,
        id: lead?.id
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {lead ? "Edit Lead" : "Add New Lead"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {property && (
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Property
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                    {property.images?.[0]?.image && (
                      <img
                        src={property.images[0].image}
                        alt={property.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {property.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${property.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="contact_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Name*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="contact_name"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  className={`pl-10 block w-full shadow-sm sm:text-sm rounded-md ${
                    errors.contact_name
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary focus:border-primary"
                  }`}
                />
              </div>
              {errors.contact_name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.contact_name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact_email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Email*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  className={`pl-10 block w-full shadow-sm sm:text-sm rounded-md ${
                    errors.contact_email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary focus:border-primary"
                  }`}
                />
              </div>
              {errors.contact_email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.contact_email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact_phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Phone*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={16} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className={`pl-10 block w-full shadow-sm sm:text-sm rounded-md ${
                    errors.contact_phone
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary focus:border-primary"
                  }`}
                />
              </div>
              {errors.contact_phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.contact_phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="source_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Lead Source
              </label>
              <select
                id="source_id"
                name="source_id"
                value={formData.source_id}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              >
                <option value="">Select a source</option>
                {leadSources.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader size={18} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={18} className="mr-2" />
                    Save Lead
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;