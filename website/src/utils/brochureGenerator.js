// Professional PDF Brochure Generator using jsPDF
// This generates high-quality brochures with property images from DigitalOcean

import jsPDF from 'jspdf';

// Color palette
const COLORS = {
  primary: '#0f172a',      // Dark navy
  secondary: '#1e293b',    // Lighter navy
  gold: '#CBA65F',         // Brand gold
  goldLight: '#d4b676',    // Lighter gold
  white: '#ffffff',
  gray: '#64748b',
  lightGray: '#f1f5f9',
  green: '#10b981',
  text: '#1e293b',
  textLight: '#475569',
};

// Convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

// Fetch image and convert to base64
const fetchImageAsBase64 = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

// Load logo as base64
const loadLogo = async () => {
  try {
    // Try to load from public folder
    const response = await fetch('/hsp2.png');
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading logo:', error);
    return null;
  }
};

// Draw rounded rectangle
const drawRoundedRect = (doc, x, y, width, height, radius, fill = true, stroke = false) => {
  doc.roundedRect(x, y, width, height, radius, radius, fill ? 'F' : stroke ? 'S' : 'FD');
};

// Main brochure generator function
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
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // Load logo
    const logoBase64 = await loadLogo();

    // Fetch property images (first 4)
    const imagePromises = property.images?.slice(0, 4).map(img => fetchImageAsBase64(img.image)) || [];
    const propertyImages = await Promise.all(imagePromises);
    const validImages = propertyImages.filter(img => img !== null);

    let yPos = 0;

    // ==================== PAGE 1: COVER ====================

    // Header background
    const headerColor = hexToRgb(COLORS.primary);
    doc.setFillColor(headerColor.r, headerColor.g, headerColor.b);
    doc.rect(0, 0, pageWidth, 95, 'F');

    // Gold accent line under header
    const goldColor = hexToRgb(COLORS.gold);
    doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
    doc.rect(0, 95, pageWidth, 3, 'F');

    // Logo (white background box)
    if (logoBase64) {
      doc.setFillColor(255, 255, 255);
      drawRoundedRect(doc, margin, 12, 50, 25, 3);
      try {
        doc.addImage(logoBase64, 'PNG', margin + 3, 14, 44, 21);
      } catch (e) {
        console.log('Logo add failed:', e);
      }
    }

    // Tagline
    doc.setTextColor(goldColor.r, goldColor.g, goldColor.b);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('YOUR PROPERTY, OUR PRIORITY', pageWidth - margin, 25, { align: 'right' });

    // Property Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(property.title || 'Property Brochure', contentWidth);
    doc.text(titleLines, margin, 52);

    // Location
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(226, 232, 240);
    doc.text(`📍 ${property.location || 'Location not specified'}`, margin, 70);

    // Price and Status
    doc.setTextColor(goldColor.r, goldColor.g, goldColor.b);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    const priceText = property.price ? `$${parseFloat(property.price).toLocaleString()}` : 'Price on Request';
    doc.text(priceText, margin, 88);

    // Status badge
    const statusText = (property.status || 'Available').toUpperCase();
    const greenColor = hexToRgb(COLORS.green);
    doc.setFillColor(greenColor.r, greenColor.g, greenColor.b);
    const statusWidth = doc.getTextWidth(statusText) * 0.35 + 16;
    drawRoundedRect(doc, margin + doc.getTextWidth(priceText) * 0.35 + 10, 78, statusWidth, 12, 6);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(statusText, margin + doc.getTextWidth(priceText) * 0.35 + 10 + statusWidth/2, 86, { align: 'center' });

    yPos = 108;

    // ==================== MAIN PROPERTY IMAGE ====================
    if (validImages.length > 0) {
      try {
        const mainImgHeight = 90;
        doc.addImage(validImages[0], 'JPEG', margin, yPos, contentWidth, mainImgHeight, undefined, 'MEDIUM');
        yPos += mainImgHeight + 5;
      } catch (e) {
        console.log('Main image failed:', e);
        yPos += 10;
      }
    }

    // ==================== SECONDARY IMAGES (3 in a row) ====================
    if (validImages.length > 1) {
      const smallImgWidth = (contentWidth - 6) / 3;
      const smallImgHeight = 45;

      for (let i = 1; i < Math.min(4, validImages.length); i++) {
        try {
          const xOffset = margin + (i - 1) * (smallImgWidth + 3);
          doc.addImage(validImages[i], 'JPEG', xOffset, yPos, smallImgWidth, smallImgHeight, undefined, 'MEDIUM');
        } catch (e) {
          console.log(`Image ${i} failed:`, e);
        }
      }
      yPos += smallImgHeight + 10;
    }

    // ==================== PROPERTY DETAILS BOXES ====================
    const detailsY = yPos;
    const boxWidth = (contentWidth - 10) / 3;
    const boxHeight = 28;

    const details = [
      { label: 'BEDROOMS', value: property.beds || 'N/A' },
      { label: 'BATHROOMS', value: property.baths || 'N/A' },
      { label: 'GARAGE', value: property.garage || 'N/A' },
    ];

    details.forEach((detail, index) => {
      const x = margin + index * (boxWidth + 5);

      // Box background
      doc.setFillColor(248, 250, 252);
      drawRoundedRect(doc, x, detailsY, boxWidth, boxHeight, 2);

      // Gold top accent
      doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
      doc.rect(x, detailsY, boxWidth, 3, 'F');

      // Label
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text(detail.label, x + boxWidth/2, detailsY + 12, { align: 'center' });

      // Value
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(String(detail.value), x + boxWidth/2, detailsY + 23, { align: 'center' });
    });

    // ==================== PAGE 2: DETAILS & CONTACT ====================
    doc.addPage();
    yPos = margin;

    // More property details
    const moreDetails = [
      { label: 'LAND SIZE', value: property.sqft || 'N/A' },
      { label: 'FLOOR SIZE', value: property.floor_size || 'N/A' },
      { label: 'YEAR BUILT', value: property.year_built || 'N/A' },
    ];

    moreDetails.forEach((detail, index) => {
      const x = margin + index * (boxWidth + 5);

      doc.setFillColor(248, 250, 252);
      drawRoundedRect(doc, x, yPos, boxWidth, boxHeight, 2);

      doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
      doc.rect(x, yPos, boxWidth, 3, 'F');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text(detail.label, x + boxWidth/2, yPos + 12, { align: 'center' });

      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(String(detail.value), x + boxWidth/2, yPos + 23, { align: 'center' });
    });

    yPos += boxHeight + 15;

    // ==================== ABOUT THIS PROPERTY ====================
    // Section title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('About This Property', margin, yPos);

    // Gold underline
    doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
    doc.rect(margin, yPos + 2, 50, 2, 'F');

    yPos += 12;

    // Description box
    const descBoxHeight = 55;
    doc.setFillColor(248, 250, 252);
    drawRoundedRect(doc, margin, yPos, contentWidth, descBoxHeight, 3);

    // Gold left border
    doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
    doc.rect(margin, yPos, 3, descBoxHeight, 'F');

    // Description text
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const descriptionText = property.description || 'No description available.';
    const descLines = doc.splitTextToSize(descriptionText, contentWidth - 15);
    doc.text(descLines.slice(0, 8), margin + 8, yPos + 8);

    yPos += descBoxHeight + 15;

    // ==================== KEY FEATURES ====================
    if (property.features && property.features.length > 0) {
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('Key Features', margin, yPos);

      doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
      doc.rect(margin, yPos + 2, 40, 2, 'F');

      yPos += 12;

      const featureColWidth = (contentWidth - 5) / 2;
      const featuresPerCol = Math.ceil(Math.min(property.features.length, 8) / 2);

      property.features.slice(0, 8).forEach((feature, index) => {
        const col = Math.floor(index / featuresPerCol);
        const row = index % featuresPerCol;
        const x = margin + col * (featureColWidth + 5);
        const y = yPos + row * 12;

        // Feature box
        doc.setFillColor(240, 253, 244);
        drawRoundedRect(doc, x, y - 3, featureColWidth, 10, 2);

        // Green left border
        doc.setFillColor(34, 197, 94);
        doc.rect(x, y - 3, 3, 10, 'F');

        // Checkmark and text
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(22, 101, 52);
        doc.text(`✓ ${feature.feature || feature}`, x + 6, y + 3);
      });

      yPos += featuresPerCol * 12 + 15;
    }

    // ==================== CONTACT OUR AGENT ====================
    const agent = getPrimaryAgent?.(property)?.agent;

    // Agent section background
    doc.setFillColor(headerColor.r, headerColor.g, headerColor.b);
    const agentBoxHeight = 50;
    drawRoundedRect(doc, margin, yPos, contentWidth, agentBoxHeight, 4);

    // Gold top accent
    doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
    doc.rect(margin, yPos, contentWidth, 3, 'F');

    // Section title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(goldColor.r, goldColor.g, goldColor.b);
    doc.text('Contact Our Agent', margin + 10, yPos + 15);

    // Agent details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);

    const agentName = agent?.first_name ? `${agent.first_name} ${agent.surname || ''}` : 'House of Stone Properties';
    const agentEmail = agent?.email || 'info@hsp.co.zw';
    const agentPhone = agent?.cell_number || '+263 867 717 3442';

    doc.text(`Name: ${agentName}`, margin + 10, yPos + 26);
    doc.text(`Email: ${agentEmail}`, margin + 10, yPos + 34);
    doc.text(`Phone: ${agentPhone}`, margin + contentWidth/2, yPos + 26);
    doc.text('Office: +263 867 717 3442', margin + contentWidth/2, yPos + 34);

    yPos += agentBoxHeight + 15;

    // ==================== FOOTER ====================
    // Footer background
    const footerY = pageHeight - 35;
    doc.setFillColor(headerColor.r, headerColor.g, headerColor.b);
    doc.rect(0, footerY, pageWidth, 35, 'F');

    // Gold top line
    doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
    doc.rect(0, footerY, pageWidth, 2, 'F');

    // Company info
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(goldColor.r, goldColor.g, goldColor.b);
    doc.text('House of Stone Properties', margin, footerY + 12);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text('Your Property, Our Priority', margin, footerY + 19);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, footerY + 26);

    // Contact info (right side)
    doc.setTextColor(226, 232, 240);
    doc.text('Email: info@hsp.co.zw', pageWidth - margin, footerY + 12, { align: 'right' });
    doc.text('Phone: +263 867 717 3442', pageWidth - margin, footerY + 19, { align: 'right' });
    doc.text('Website: www.hsp.co.zw', pageWidth - margin, footerY + 26, { align: 'right' });

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
