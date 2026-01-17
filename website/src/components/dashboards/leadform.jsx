import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  X,
  Check,
  AlertCircle,
  Loader,
  MessageSquare,
  MapPin,
  Building2,
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
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

  // Status options with colors
  const statusOptions = [
    { value: "new", label: "New", color: "bg-blue-500/20 text-blue-400" },
    { value: "contacted", label: "Contacted", color: "bg-yellow-500/20 text-yellow-400" },
    { value: "qualified", label: "Qualified", color: "bg-purple-500/20 text-purple-400" },
    { value: "converted", label: "Converted", color: "bg-green-500/20 text-green-400" },
    { value: "lost", label: "Lost", color: "bg-red-500/20 text-red-400" }
  ];

  // Form Input Component
  const FormInput = ({ label, icon: Icon, error, ...props }) => (
    <div>
      <label className="block text-sm text-gray-400 mb-2">
        {label}<span className="text-[#C9A962]">*</span>
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          {...props}
          className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
            error ? "border-red-500/50" : "border-white/10"
          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors`}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400 flex items-center gap-1"
        >
          <AlertCircle size={14} />
          {error}
        </motion.p>
      )}
    </div>
  );

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
          className="bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {lead ? "Edit Lead" : "Add New Lead"}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {lead ? "Update lead details" : "Create a new lead entry"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Property Preview */}
            {property && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Property
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#C9A962]/10 rounded-lg overflow-hidden flex-shrink-0">
                    {property.images?.[0]?.image ? (
                      <img
                        src={property.images[0].image}
                        alt={property.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[#C9A962]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {property.title}
                    </p>
                    <p className="text-[#C9A962] font-semibold">
                      ${property.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Contact Name"
                icon={User}
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                placeholder="Full name"
                error={errors.contact_name}
              />

              <FormInput
                label="Contact Email"
                icon={Mail}
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="email@example.com"
                error={errors.contact_email}
              />

              <FormInput
                label="Contact Phone"
                icon={Phone}
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                error={errors.contact_phone}
              />

              {/* Lead Source */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Lead Source
                </label>
                <select
                  name="source_id"
                  value={formData.source_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962]/50 transition-colors appearance-none"
                >
                  <option value="">Select a source</option>
                  {leadSources?.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: option.value })}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                        formData.status === option.value
                          ? `${option.color} border border-current`
                          : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Additional notes about this lead..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin w-4 h-4" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Lead
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeadForm;
