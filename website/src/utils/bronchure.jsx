// Install required package first:
// npm install jspdf jspdf-autotable html2canvas

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const generatePDFBrochure = async () => {
  setIsGeneratingBrochure(true);

  try {
    // Create a hidden container for the brochure
    const brochureContainer = document.createElement('div');
    brochureContainer.style.position = 'fixed';
    brochureContainer.style.left = '-9999px';
    brochureContainer.style.top = '0';
    brochureContainer.style.width = '210mm'; // A4 width
    brochureContainer.style.background = 'white';
    
    // Generate HTML content for the brochure
    brochureContainer.innerHTML = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #1e293b;
          background: white;
        }
        
        .brochure-content {
          width: 210mm;
          background: white;
        }
        
        .content-width {
          max-width: 180mm;
          margin: 0 auto;
          padding: 0 15mm;
        }
        
        /* Header */
        .header {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          padding: 35px 0;
          position: relative;
          overflow: hidden;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #CBA65F 0%, #d4b676 50%, #CBA65F 100%);
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        
        .logo-container {
          background: white;
          padding: 18px 30px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        
        .logo {
          height: 65px;
          width: auto;
        }
        
        .company-tagline {
          color: #CBA65F;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1px;
          text-align: right;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
        }
        
        .property-title-section {
          position: relative;
          z-index: 1;
        }
        
        .property-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 38px;
          color: white;
          margin-bottom: 15px;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        
        .property-location {
          font-size: 17px;
          color: #e2e8f0;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          font-weight: 400;
        }
        
        .location-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
          color: #CBA65F;
        }
        
        .property-price-status {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .property-price {
          font-family: 'Inter', sans-serif;
          font-size: 42px;
          color: #CBA65F;
          font-weight: 800;
          letter-spacing: -1px;
        }
        
        .status-badge {
          display: inline-block;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 10px 24px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Main Content */
        .content-wrapper {
          padding: 45px 0;
        }
        
        /* Property Images Grid */
        .property-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 45px;
          border-radius: 16px;
          overflow: hidden;
        }
        
        .property-images img {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }
        
        .main-image {
          grid-column: 1 / -1;
          height: 360px !important;
        }
        
        /* Sections */
        .section {
          margin-bottom: 45px;
          page-break-inside: avoid;
        }
        
        .section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px;
          color: #0f172a;
          margin-bottom: 25px;
          font-weight: 700;
          padding-bottom: 12px;
          border-bottom: 3px solid #CBA65F;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 80px;
          height: 3px;
          background: #0f172a;
        }
        
        /* Property Details Grid */
        .details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 25px;
        }
        
        .detail-item {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          padding: 24px 18px;
          border-radius: 12px;
          text-align: center;
          border: 2px solid #e2e8f0;
          position: relative;
        }
        
        .detail-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #CBA65F 0%, #d4b676 100%);
        }
        
        .detail-item .label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: 0.8px;
          font-family: 'Inter', sans-serif;
        }
        
        .detail-item .value {
          font-family: 'Inter', sans-serif;
          font-size: 26px;
          color: #0f172a;
          font-weight: 800;
        }
        
        /* Description */
        .description {
          font-size: 15px;
          line-height: 1.9;
          color: #475569;
          margin-bottom: 20px;
          text-align: justify;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 28px;
          border-radius: 12px;
          border-left: 5px solid #CBA65F;
          font-weight: 400;
        }
        
        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 30px;
        }
        
        .feature-item {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          padding: 14px 20px;
          border-radius: 10px;
          border-left: 5px solid #22c55e;
          font-size: 14px;
          color: #166534;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        
        .feature-item::before {
          content: '✓';
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: #22c55e;
          color: white;
          border-radius: 50%;
          margin-right: 14px;
          font-weight: bold;
          font-size: 13px;
        }
        
        /* Agent Info */
        .agent-info {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          padding: 32px;
          border-radius: 16px;
          margin-bottom: 30px;
          color: white;
          position: relative;
        }
        
        .agent-info::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #CBA65F 0%, #d4b676 100%);
        }
        
        .agent-info h3 {
          font-family: 'Playfair Display', Georgia, serif;
          color: #CBA65F;
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: 700;
        }
        
        .agent-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .agent-detail {
          display: flex;
          align-items: center;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid rgba(203, 166, 95, 0.2);
        }
        
        .agent-detail strong {
          color: #CBA65F;
          margin-right: 10px;
          min-width: 70px;
          font-weight: 600;
        }
        
        /* Footer */
        .footer {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          padding: 35px 0;
          color: white;
          position: relative;
        }
        
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #CBA65F 0%, #d4b676 50%, #CBA65F 100%);
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .footer-left .company-name {
          font-family: 'Playfair Display', Georgia, serif;
          color: #CBA65F;
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 10px;
        }
        
        .footer-left p {
          margin-bottom: 6px;
          font-size: 13px;
          color: #cbd5e1;
          font-weight: 400;
        }
        
        .footer-left .tagline {
          font-size: 12px;
          color: #94a3b8;
          font-style: italic;
          margin-top: 12px;
        }
        
        .footer-right {
          text-align: right;
        }
        
        .footer-contact {
          font-size: 13px;
          margin-bottom: 8px;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        
        .footer-contact strong {
          color: #CBA65F;
          margin-right: 8px;
          font-weight: 600;
          min-width: 70px;
          text-align: right;
        }
        
        .generated-date {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 15px;
          font-style: italic;
        }
      </style>
      
      <div class="brochure-content">
        <!-- Header -->
        <div class="header">
          <div class="content-width">
            <div class="logo-section">
              <div class="logo-container">
                <img src="/logo.png" alt="House of Stone Properties" class="logo" crossorigin="anonymous"/>
              </div>
              <div class="company-tagline">
                Your Property, Our Priority
              </div>
            </div>
            
            <div class="property-title-section">
              <h1 class="property-title">${property.title}</h1>
              <div class="property-location">
                📍 ${property.location}
              </div>
              <div class="property-price-status">
                <div class="property-price">$${parseFloat(property.price).toLocaleString()}</div>
                <div class="status-badge">${property.status}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="content-wrapper">
          <div class="content-width">
            <!-- Property Images -->
            <div class="property-images">
              ${property.images
                .slice(0, 5)
                .map(
                  (img, index) => `
                <img src="${img.image}" 
                     alt="${img.caption || `Property Image ${index + 1}`}" 
                     class="${index === 0 ? "main-image" : ""}"
                     crossorigin="anonymous"/>
              `
                )
                .join("")}
            </div>
            
            <!-- Property Details -->
            <div class="section">
              <h2 class="section-title">Property Details</h2>
              <div class="details-grid">
                <div class="detail-item">
                  <div class="label">Bedrooms</div>
                  <div class="value">${property.beds || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Bathrooms</div>
                  <div class="value">${property.baths || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Garage</div>
                  <div class="value">${property.garage || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Land Size</div>
                  <div class="value">${property.sqft || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Floor Size</div>
                  <div class="value">${property.floor_size || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Year Built</div>
                  <div class="value">${property.year_built || "N/A"}</div>
                </div>
              </div>
            </div>
            
            <!-- Description -->
            <div class="section">
              <h2 class="section-title">About This Property</h2>
              <div class="description">
                ${property.description}
              </div>
            </div>
            
            <!-- Features -->
            ${
              property.features && property.features.length > 0
                ? `
            <div class="section">
              <h2 class="section-title">Key Features</h2>
              <div class="features-grid">
                ${property.features
                  .map(
                    (feature) => `
                  <div class="feature-item">${feature.feature}</div>
                `
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
            
            <!-- Agent Info -->
            ${
              getPrimaryAgent(property)
                ? `
            <div class="agent-info">
              <h3>Contact Our Primary Agent</h3>
              <div class="agent-details">
                <div class="agent-detail">
                  <strong>Name:</strong> ${getPrimaryAgent(property).agent.first_name}
                </div>
                <div class="agent-detail">
                  <strong>Email:</strong> ${getPrimaryAgent(property).agent.email}
                </div>
                <div class="agent-detail">
                  <strong>Phone:</strong> ${getPrimaryAgent(property).agent.cell_number}
                </div>
                <div class="agent-detail">
                  <strong>Office:</strong> +263 867 717 3442
                </div>
              </div>
            </div>
            `
                : ""
            }
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="content-width">
            <div class="footer-content">
              <div class="footer-left">
                <div class="company-name">House of Stone Properties</div>
                <p class="tagline">Your Property, Our Priority</p>
                <p class="generated-date">Property Brochure - Generated on ${new Date().toLocaleDateString()}</p>
              </div>
              <div class="footer-right">
                <div class="footer-contact">
                  <strong>Email:</strong> info@hsp.co.zw
                </div>
                <div class="footer-contact">
                  <strong>Phone:</strong> +263 867 717 3442
                </div>
                <div class="footer-contact">
                  <strong>Alt:</strong> +263 712 525 654
                </div>
                <div class="footer-contact">
                  <strong>Website:</strong> www.hsp.co.zw
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Append to body temporarily
    document.body.appendChild(brochureContainer);
    
    // Wait for fonts and images to load
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate PDF using html2canvas and jsPDF
    const canvas = await html2canvas(brochureContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794, // A4 width in pixels at 96 DPI
    });
    
    // Remove temporary container
    document.body.removeChild(brochureContainer);
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 297; // A4 height in mm
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add image to PDF (split into pages if needed)
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;
    }
    
    // Download the PDF
    const filename = `${property.title.replace(/[^a-z0-9]/gi, '_')}_Brochure.pdf`;
    pdf.save(filename);
    
    setIsGeneratingBrochure(false);
    
  } catch (error) {
    console.error("Error generating brochure:", error);
    alert("Error generating brochure. Please try again.");
    setIsGeneratingBrochure(false);
  }
};

export default generatePDFBrochure;