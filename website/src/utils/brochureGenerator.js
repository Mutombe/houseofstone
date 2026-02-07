// Professional Real Estate Brochure Generator
// Matches reference design: image-focused block layout with gold accents

import jsPDF from 'jspdf';

// Colors
const GOLD = [203, 166, 95];       // #CBA65F
const DARK_BLUE = [15, 23, 42];    // #0f172a
const WHITE = [255, 255, 255];
const LIGHT_GRAY = [245, 245, 245];
const TEXT_DARK = [30, 41, 59];

// API base URL for the image proxy
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hsp-backend.onrender.com';

// Fetch image as base64 - uses backend proxy for external URLs to bypass CORS
const fetchImageAsBase64 = async (url) => {
  try {
    // Handle relative URLs (like /logo.png) - fetch directly
    if (!url.startsWith('http')) {
      const fullUrl = `${window.location.origin}${url}`;
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    // External URLs (DigitalOcean, etc.) - use backend proxy to bypass CORS
    const proxyUrl = `${API_BASE_URL}/api/image-proxy/?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Proxy request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.data; // Returns the base64 data URL
  } catch (error) {
    console.error('Error fetching image:', url, error);
    return null;
  }
};

// Main brochure generator
export const generatePropertyBrochure = async (property, getPrimaryAgent, setIsGenerating) => {
  if (setIsGenerating) setIsGenerating(true);

  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 8;

    // Fetch logo
    let logoBase64 = null;
    try {
      logoBase64 = await fetchImageAsBase64('/logo.png');
    } catch (e) {
      console.log('Logo fetch failed:', e);
    }

    // Fetch property images (up to 5)
    const imageUrls = property.images?.slice(0, 5).map(img => img.image) || [];
    const imagePromises = imageUrls.map(url => fetchImageAsBase64(url));
    const fetchedImages = await Promise.all(imagePromises);
    const validImages = fetchedImages.filter(img => img !== null);

    console.log(`Fetched ${validImages.length} of ${imageUrls.length} images`);

    let y = margin;

    // ============ ROW 1: LOGO + HEADER ============
    const headerHeight = 45;

    // Logo section (left side - white background)
    doc.setFillColor(...WHITE);
    doc.rect(margin, y, 60, headerHeight, 'F');

    // Add logo
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, 'PNG', margin + 5, y + 5, 50, 35);
      } catch (e) {
        // Fallback: draw text
        doc.setFontSize(16);
        doc.setTextColor(...GOLD);
        doc.setFont('helvetica', 'bold');
        doc.text('HSP', margin + 25, y + 25, { align: 'center' });
      }
    }

    // Header section (right side - gold background)
    doc.setFillColor(...GOLD);
    doc.rect(margin + 60, y, pageWidth - margin * 2 - 60, headerHeight, 'F');

    // "HOUSE FOR SALE" or status text
    doc.setFontSize(28);
    doc.setTextColor(...DARK_BLUE);
    doc.setFont('helvetica', 'bold');
    const statusText = property.category === 'rent' ? 'FOR RENT' : 'FOR SALE';
    doc.text(statusText, margin + 65, y + 18);

    // Property title (truncated if too long)
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const titleText = property.title?.substring(0, 40) || 'Premium Property';
    doc.text(titleText, margin + 65, y + 28);

    // Price
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const priceText = property.price ? `$${parseFloat(property.price).toLocaleString()}` : 'Price on Request';
    doc.text(priceText, margin + 65, y + 40);

    y += headerHeight + 3;

    // ============ ROW 2: MAIN HERO IMAGE ============
    const heroHeight = 85;

    if (validImages.length > 0) {
      try {
        doc.addImage(validImages[0], 'JPEG', margin, y, pageWidth - margin * 2, heroHeight, undefined, 'MEDIUM');
      } catch (e) {
        // Fallback: gray box with text
        doc.setFillColor(...LIGHT_GRAY);
        doc.rect(margin, y, pageWidth - margin * 2, heroHeight, 'F');
        doc.setFontSize(14);
        doc.setTextColor(150, 150, 150);
        doc.text('Property Image', pageWidth / 2, y + heroHeight / 2, { align: 'center' });
      }
    } else {
      doc.setFillColor(...LIGHT_GRAY);
      doc.rect(margin, y, pageWidth - margin * 2, heroHeight, 'F');
      doc.setFontSize(12);
      doc.setTextColor(150, 150, 150);
      doc.text('Property Image', pageWidth / 2, y + heroHeight / 2, { align: 'center' });
    }

    // Location label on hero image
    doc.setFillColor(0, 0, 0, 0.6);
    doc.rect(margin, y + heroHeight - 12, pageWidth - margin * 2, 12, 'F');
    doc.setFontSize(10);
    doc.setTextColor(...WHITE);
    doc.setFont('helvetica', 'bold');
    doc.text(`📍 ${property.location || 'Prime Location'}`, margin + 5, y + heroHeight - 4);

    y += heroHeight + 3;

    // ============ ROW 3: 4 SMALLER IMAGES WITH LABELS ============
    const smallImgWidth = (pageWidth - margin * 2 - 9) / 4;
    const smallImgHeight = 40;

    const imageLabels = ['EXTERIOR', 'INTERIOR', 'BEDROOM', 'KITCHEN'];

    for (let i = 0; i < 4; i++) {
      const x = margin + i * (smallImgWidth + 3);
      const imgIndex = i + 1; // Start from second image

      if (validImages[imgIndex]) {
        try {
          doc.addImage(validImages[imgIndex], 'JPEG', x, y, smallImgWidth, smallImgHeight, undefined, 'MEDIUM');
        } catch (e) {
          doc.setFillColor(...LIGHT_GRAY);
          doc.rect(x, y, smallImgWidth, smallImgHeight, 'F');
        }
      } else {
        doc.setFillColor(...LIGHT_GRAY);
        doc.rect(x, y, smallImgWidth, smallImgHeight, 'F');
      }

      // Label overlay at bottom of each image
      doc.setFillColor(...GOLD);
      doc.rect(x, y + smallImgHeight - 8, smallImgWidth, 8, 'F');
      doc.setFontSize(7);
      doc.setTextColor(...DARK_BLUE);
      doc.setFont('helvetica', 'bold');
      doc.text(imageLabels[i], x + smallImgWidth / 2, y + smallImgHeight - 2, { align: 'center' });
    }

    y += smallImgHeight + 5;

    // ============ ROW 4: PROPERTY DETAILS GRID ============
    const detailBoxWidth = (pageWidth - margin * 2 - 15) / 6;
    const detailBoxHeight = 22;

    const details = [
      { label: 'BEDS', value: property.beds || '-' },
      { label: 'BATHS', value: property.baths || '-' },
      { label: 'GARAGE', value: property.garage || '-' },
      { label: 'LAND', value: property.sqft || '-' },
      { label: 'FLOOR', value: property.floor_size || '-' },
      { label: 'YEAR', value: property.year_built || '-' },
    ];

    details.forEach((detail, i) => {
      const x = margin + i * (detailBoxWidth + 3);

      // Box background
      doc.setFillColor(...LIGHT_GRAY);
      doc.rect(x, y, detailBoxWidth, detailBoxHeight, 'F');

      // Gold top bar
      doc.setFillColor(...GOLD);
      doc.rect(x, y, detailBoxWidth, 3, 'F');

      // Value
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...DARK_BLUE);
      doc.text(String(detail.value), x + detailBoxWidth / 2, y + 12, { align: 'center' });

      // Label
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(detail.label, x + detailBoxWidth / 2, y + 18, { align: 'center' });
    });

    y += detailBoxHeight + 5;

    // ============ ROW 5: ABOUT + CONTACT SECTION ============
    const bottomSectionHeight = 55;
    const aboutWidth = (pageWidth - margin * 2) * 0.6;
    const contactWidth = (pageWidth - margin * 2) * 0.4 - 3;

    // ABOUT THE PROPERTY section
    // Gold header bar
    doc.setFillColor(...GOLD);
    doc.rect(margin, y, aboutWidth, 8, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...DARK_BLUE);
    doc.text('ABOUT THE PROPERTY', margin + 3, y + 5.5);

    // Description box
    doc.setFillColor(...WHITE);
    doc.rect(margin, y + 8, aboutWidth, bottomSectionHeight - 8, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.rect(margin, y + 8, aboutWidth, bottomSectionHeight - 8, 'S');

    // Description text
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXT_DARK);
    const description = property.description?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || 'Contact us for more details about this property.';
    const descLines = doc.splitTextToSize(description, aboutWidth - 6);
    doc.text(descLines.slice(0, 6), margin + 3, y + 14);

    // CONTACT section (right side)
    const contactX = margin + aboutWidth + 3;

    // Dark blue background
    doc.setFillColor(...DARK_BLUE);
    doc.rect(contactX, y, contactWidth, bottomSectionHeight, 'F');

    // Gold accent bar
    doc.setFillColor(...GOLD);
    doc.rect(contactX, y, contactWidth, 3, 'F');

    // Company name
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GOLD);
    doc.text('HOUSE OF STONE', contactX + 5, y + 12);
    doc.text('PROPERTIES', contactX + 5, y + 18);

    // Contact details
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...WHITE);

    const agent = getPrimaryAgent?.(property)?.agent;
    const agentName = agent?.first_name ? `${agent.first_name} ${agent.surname || ''}` : 'Contact Us';
    const agentPhone = agent?.cell_number || '+263 867 717 3442';
    const agentEmail = agent?.email || 'info@hsp.co.zw';

    doc.text(`Agent: ${agentName}`, contactX + 5, y + 26);
    doc.text(`Phone: ${agentPhone}`, contactX + 5, y + 32);
    doc.text(`Email: ${agentEmail}`, contactX + 5, y + 38);
    doc.text('Web: www.hsp.co.zw', contactX + 5, y + 44);

    // Phone number prominent
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GOLD);
    doc.text('+263 867 717 3442', contactX + 5, y + 52);

    y += bottomSectionHeight + 3;

    // ============ FOOTER BAR ============
    doc.setFillColor(...GOLD);
    doc.rect(margin, y, pageWidth - margin * 2, 6, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...DARK_BLUE);
    doc.text('YOUR PROPERTY, OUR PRIORITY', pageWidth / 2, y + 4, { align: 'center' });

    // ============ PAGE 2: FEATURES (if applicable) ============
    if (property.features && property.features.length > 0) {
      doc.addPage();
      y = margin;

      // Header
      doc.setFillColor(...DARK_BLUE);
      doc.rect(0, 0, pageWidth, 30, 'F');

      doc.setFillColor(...GOLD);
      doc.rect(0, 27, pageWidth, 3, 'F');

      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...WHITE);
      doc.text('KEY FEATURES', margin, 18);

      y = 40;

      // Features grid (2 columns)
      const featureColWidth = (pageWidth - margin * 2 - 5) / 2;
      const featureHeight = 10;

      property.features.slice(0, 16).forEach((feature, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = margin + col * (featureColWidth + 5);
        const featureY = y + row * (featureHeight + 3);

        // Feature box
        doc.setFillColor(240, 253, 244);
        doc.rect(x, featureY, featureColWidth, featureHeight, 'F');

        // Gold left border
        doc.setFillColor(...GOLD);
        doc.rect(x, featureY, 3, featureHeight, 'F');

        // Feature text
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_DARK);
        const featureText = feature.feature || feature;
        doc.text(`✓ ${featureText}`, x + 6, featureY + 6.5);
      });

      // Footer on page 2
      doc.setFillColor(...DARK_BLUE);
      doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
      doc.setFillColor(...GOLD);
      doc.rect(0, pageHeight - 20, pageWidth, 2, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...GOLD);
      doc.text('House of Stone Properties', margin, pageHeight - 10);

      doc.setFontSize(8);
      doc.setTextColor(...WHITE);
      doc.text('info@hsp.co.zw | +263 867 717 3442 | www.hsp.co.zw', pageWidth - margin, pageHeight - 10, { align: 'right' });
    }

    // Save PDF
    const filename = `${(property.title || 'Property').replace(/[^a-z0-9]/gi, '_')}_Brochure.pdf`;
    doc.save(filename);

    if (setIsGenerating) setIsGenerating(false);
    return true;

  } catch (error) {
    console.error('Error generating brochure:', error);
    if (setIsGenerating) setIsGenerating(false);
    throw error;
  }
};

export default generatePropertyBrochure;
