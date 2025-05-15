import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, Facebook, Twitter, Linkedin } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { shareProperty } from '../../redux/slices/propertySlice';

const PropertyShareModal = ({ property, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Generate a share link for the property
  const generateShareLink = async () => {
    if (!property || isGenerating) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const resultAction = await dispatch(shareProperty(property.id));
      if (shareProperty.fulfilled.match(resultAction)) {
        setShareLink(resultAction.payload.share_link);
      } else {
        setError('Failed to generate share link. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy the share link to clipboard
  const copyToClipboard = () => {
    if (!shareLink) return;
    
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setError('Failed to copy to clipboard');
      });
  };

  // Get social sharing links
  const getSocialShareUrl = (platform) => {
    if (!shareLink) return '#';
    
    const text = `Check out this property: ${property.title}`;
    
    switch (platform) {
      case 'whatsapp':
        return `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareLink)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareLink)}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`;
      default:
        return '#';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-stone-900">Share Property</h2>
          <button 
            className="text-stone-500 hover:text-stone-900"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-stone-100 rounded-lg p-4 mb-4">
            <p className="font-medium text-stone-900">{property?.title}</p>
            <p className="text-stone-600 text-sm">{property?.location}</p>
          </div>
          
          {!shareLink ? (
            <button
              onClick={generateShareLink}
              disabled={isGenerating}
              className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5 mr-2" />
                  Generate Share Link
                </>
              )}
            </button>
          ) : (
            <>
              <div className="flex mb-4">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-4 py-2 rounded-l-lg border border-stone-200 focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-stone-900 text-white px-4 rounded-r-lg hover:bg-stone-800 transition-colors flex items-center justify-center"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-stone-600 mb-2">Share via:</p>
                <div className="flex space-x-4">
                  <a
                    href={getSocialShareUrl('whatsapp')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                  <a
                    href={getSocialShareUrl('facebook')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={getSocialShareUrl('twitter')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={getSocialShareUrl('linkedin')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </>
          )}
          
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropertyShareModal;