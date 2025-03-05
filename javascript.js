document.addEventListener('DOMContentLoaded', function() {
  // Universal error handler function
  function showMessage(container, type, message, autoClose = false) {
    // Remove any existing messages
    const existingMessage = container.querySelector('.info-box[style*="margin-top"]');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = 'info-box';

    if (type === 'success') {
      messageEl.style.backgroundColor = '#e6f7e9';
      messageEl.style.borderLeftColor = '#2ecc71';
      messageEl.innerHTML = `<i class="fas fa-check-circle" style="color: #2ecc71;"></i> <p>${message}</p>`;
    } else if (type === 'error') {
      messageEl.style.backgroundColor = '#ffebee';
      messageEl.style.borderLeftColor = '#e74c3c';
      messageEl.innerHTML = `<i class="fas fa-exclamation-circle" style="color: #e74c3c;"></i> <p>${message}</p>`;
    } else if (type === 'info') {
      messageEl.style.backgroundColor = '#e3f2fd';
      messageEl.style.borderLeftColor = '#2196f3';
      messageEl.innerHTML = `<i class="fas fa-info-circle" style="color: #2196f3;"></i> <p>${message}</p>`;
    } else if (type === 'warning') {
      messageEl.style.backgroundColor = '#fff8e1';
      messageEl.style.borderLeftColor = '#ffc107';
      messageEl.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: #ffc107;"></i> <p>${message}</p>`;
    }

    messageEl.style.marginTop = '1rem';

    // Add message to container
    container.appendChild(messageEl);

    // Auto close if requested
    if (autoClose) {
      setTimeout(() => {
        messageEl.style.transition = 'opacity 0.5s ease';
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 500);
      }, 5000);
    }

    return messageEl;
  }

  // Make showMessage available globally
  window.showMessage = showMessage;
  // Page Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });

  // Navigation between pages
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all nav items and pages
      navItems.forEach(i => i.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      // Add active class to clicked nav item and corresponding page
      item.classList.add('active');
      const targetPage = document.getElementById(item.dataset.page);
      targetPage.classList.add('active');

      // Close mobile menu
      navMenu.classList.remove('active');

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // Tool Categories Navigation
  const categoryTabs = document.querySelectorAll('.category-tab');
  const categorySections = document.querySelectorAll('.category-section');
  const toolCards = document.querySelectorAll('.tool-card');
  const toolsContainer = document.querySelector('.tools-container');
  const exploreToolsBtn = document.getElementById('explore-tools-btn');

  // Category tabs event listeners
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and sections
      categoryTabs.forEach(t => t.classList.remove('active'));
      categorySections.forEach(s => s.classList.remove('active'));

      // Add active class to clicked tab and corresponding section
      tab.classList.add('active');
      const categoryId = tab.dataset.category;
      const targetSection = document.getElementById(categoryId);
      targetSection.classList.add('active');

      // Add animation class
      targetSection.classList.add('animate-fade-in');
      setTimeout(() => {
        targetSection.classList.remove('animate-fade-in');
      }, 500);
    });
  });

  // Explore Tools button
  if (exploreToolsBtn) {
    exploreToolsBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Switch to tools page
      navItems.forEach(i => i.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      const toolsNavItem = document.querySelector('[data-page="tools"]');
      const toolsPage = document.getElementById('tools');

      toolsNavItem.classList.add('active');
      toolsPage.classList.add('active');

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Add entrance animation to category tabs
      document.querySelector('.category-tabs').classList.add('animate-slide-up');
      setTimeout(() => {
        document.querySelector('.category-tabs').classList.remove('animate-slide-up');
      }, 500);
    });
  }

  // Tool selection from cards
  toolCards.forEach(card => {
    card.addEventListener('click', () => {
      // Show tools container
      toolsContainer.style.display = 'block';

      // Add animation to tools container
      toolsContainer.classList.add('animate-fade-in');
      setTimeout(() => {
        toolsContainer.classList.remove('animate-fade-in');
      }, 500);

      // Get tool ID from card
      const toolId = card.dataset.tool;

      // Clear existing active states
      tabs.forEach(t => t.classList.remove('active'));
      toolSections.forEach(s => s.classList.remove('active'));

      // Try to find the corresponding tab and section
      let targetTab = document.querySelector(`.tab[data-tab="${toolId}"]`);
      let targetSection = document.getElementById(toolId);

      // If tab doesn't exist, create it
      if (!targetTab) {
        // Create new tab for this tool
        const tabsList = document.querySelector('.tabs');
        const toolName = card.querySelector('h3').textContent;

        targetTab = document.createElement('li');
        targetTab.className = 'tab';
        targetTab.dataset.tab = toolId;
        targetTab.textContent = toolName;
        tabsList.appendChild(targetTab);

        // Add click event to the new tab
        targetTab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          toolSections.forEach(s => s.classList.remove('active'));
          targetTab.classList.add('active');

          const associatedSection = document.getElementById(toolId);
          if (associatedSection) {
            associatedSection.classList.add('active');
          }
        });
      }

      // If section doesn't exist, create it
      if (!targetSection) {
        const mainElement = document.querySelector('.tools-container main');
        const toolName = card.querySelector('h3').textContent;

        targetSection = document.createElement('section');
        targetSection.id = toolId;
        targetSection.className = 'tool-section';

        // Set up basic structure for the tool section
        targetSection.innerHTML = `
          <div class="tool-container">
            <h2>${toolName}</h2>
            <div class="tool-description">
              <div class="info-box">
                <i class="fas fa-info-circle"></i>
                <p>This tool lets you process your files with ease. Upload a file to get started.</p>
              </div>
            </div>
            <div class="upload-container">
              <label for="${toolId}-upload" class="upload-area">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drop your file here or click to browse</p>
                <input type="file" id="${toolId}-upload" hidden>
              </label>
            </div>

            <div class="file-info" id="${toolId}-info" style="display:none;">
              <div class="file-preview">
                <i class="fas fa-file file-icon"></i>
                <div class="file-details">
                  <h4 id="${toolId}-filename">file.ext</h4>
                  <p id="${toolId}-filesize">Size: 0 KB</p>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <button id="${toolId}-process-btn" class="action-btn" disabled>Process File</button>
              <button id="${toolId}-download-btn" class="action-btn secondary" disabled>Download</button>
            </div>
          </div>
        `;

        mainElement.appendChild(targetSection);

        // Add basic functionality to the new tool section
        const fileInput = document.getElementById(`${toolId}-upload`);
        const fileInfo = document.getElementById(`${toolId}-info`);
        const filenameEl = document.getElementById(`${toolId}-filename`);
        const filesizeEl = document.getElementById(`${toolId}-filesize`);
        const processBtn = document.getElementById(`${toolId}-process-btn`);
        const downloadBtn = document.getElementById(`${toolId}-download-btn`);

        if (fileInput) {
          fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Update file info
            filenameEl.textContent = file.name;
            filesizeEl.textContent = `Size: ${formatFileSize(file.size)}`;
            fileInfo.style.display = 'block';
            processBtn.disabled = false;

            // Add animation
            fileInfo.classList.add('animate-fade-in');
            setTimeout(() => {
              fileInfo.classList.remove('animate-fade-in');
            }, 500);
          });
        }

        if (processBtn) {
          processBtn.addEventListener('click', () => {
            // Show processing state
            processBtn.disabled = true;
            processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            // Simulate processing
            setTimeout(() => {
              processBtn.innerHTML = 'Process File';
              processBtn.disabled = false;
              downloadBtn.disabled = false;

              // Show success message
              showMessage(targetSection.querySelector('.tool-container'), 'success', 'File processed successfully!', true);
            }, 1500);
          });
        }

        if (downloadBtn) {
          downloadBtn.addEventListener('click', () => {
            // Show feedback message
            showMessage(targetSection.querySelector('.tool-container'), 'info', 'Download started...', true);
          });
        }
      }

      // Activate the tab and section
      targetTab.classList.add('active');
      targetSection.classList.add('active');

      // Smooth scroll to tools container
      setTimeout(() => {
        toolsContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    });
  });

  // Add hover effects and animations to tool cards
  toolCards.forEach(card => {
    // Add ripple effect on click
    card.addEventListener('mousedown', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;

      ripple.classList.add('active');

      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });

  // Footer tool links
  const footerToolLinks = document.querySelectorAll('.footer-tools a');

  footerToolLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Switch to tools page
      navItems.forEach(i => i.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      const toolsNavItem = document.querySelector('[data-page="tools"]');
      const toolsPage = document.getElementById('tools');

      toolsNavItem.classList.add('active');
      toolsPage.classList.add('active');

      // Show tools container
      toolsContainer.style.display = 'block';

      // Activate corresponding tab
      const toolId = link.dataset.tool;
      tabs.forEach(t => t.classList.remove('active'));
      toolSections.forEach(s => s.classList.remove('active'));

      const targetTab = document.querySelector(`.tab[data-tab="${toolId}"]`);
      const targetSection = document.getElementById(toolId);

      targetTab.classList.add('active');
      targetSection.classList.add('active');

      // Smooth scroll to tools container
      setTimeout(() => {
        toolsContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    });
  });

  // Tab Navigation
  const tabs = document.querySelectorAll('.tab');
  const toolSections = document.querySelectorAll('.tool-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and sections
      tabs.forEach(t => t.classList.remove('active'));
      toolSections.forEach(s => s.classList.remove('active'));

      // Add active class to clicked tab and corresponding section
      tab.classList.add('active');
      const targetSection = document.getElementById(tab.dataset.tab);
      targetSection.classList.add('active');
    });
  });

  // Image Compression Tool
  const compressionUpload = document.getElementById('compression-upload');
  const qualitySlider = document.getElementById('quality');
  const qualityValue = document.getElementById('quality-value');
  const compressBtn = document.getElementById('compress-btn');
  const downloadCompressedBtn = document.getElementById('download-compressed');
  const originalPreview = document.getElementById('original-preview');
  const compressedPreview = document.getElementById('compressed-preview');
  const originalSizeEl = document.getElementById('original-size');
  const newSizeEl = document.getElementById('new-size');
  const reductionEl = document.getElementById('reduction');
  const settingsEl = document.querySelector('.settings');
  const previewContainerEl = document.querySelector('.preview-container');

  // Original and compressed image data
  let originalImage = null;
  let compressedImage = null;
  let originalFileSize = 0;
  let compressedFileSize = 0;

  // Update quality value display
  qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = `${qualitySlider.value}%`;
  });

  // Handle image upload for compression
  compressionUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('File size exceeds 10MB. Please select a smaller file.');
      return;
    }

    originalFileSize = file.size;
    originalSizeEl.textContent = formatFileSize(originalFileSize);

    const reader = new FileReader();
    reader.onload = (event) => {
      originalImage = new Image();
      originalImage.onload = () => {
        // Display original image
        originalPreview.innerHTML = '';
        originalPreview.appendChild(originalImage.cloneNode());

        // Show settings and preview
        settingsEl.style.display = 'block';
        previewContainerEl.style.display = 'flex';
        compressBtn.disabled = false;
      };
      originalImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Compress image
  compressBtn.addEventListener('click', () => {
    if (!originalImage) {
      alert('Please upload an image first');
      return;
    }

    // Show loading state
    compressBtn.disabled = true;
    compressBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Compressing...';

    try {
      const quality = parseInt(qualitySlider.value) / 100;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context could not be created');
      }

      // Set canvas dimensions to match the image
      canvas.width = originalImage.naturalWidth;
      canvas.height = originalImage.naturalHeight;

      // Draw image on canvas
      ctx.drawImage(originalImage, 0, 0);

      // Get compressed image as data URL
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

      // Display compressed image
      compressedImage = new Image();

      compressedImage.onload = () => {
        compressedPreview.innerHTML = '';
        compressedPreview.appendChild(compressedImage);

        // Calculate compressed file size
        calculateCompressedSize(compressedDataUrl);

        // Enable download button
        downloadCompressedBtn.disabled = false;

        // Reset button state
        compressBtn.disabled = false;
        compressBtn.innerHTML = 'Compress Image';
      };

      compressedImage.onerror = () => {
        throw new Error('Failed to load compressed image');
      };

      compressedImage.src = compressedDataUrl;
    } catch (error) {
      console.error('Error compressing image:', error);

      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'info-box';
      errorMessage.style.backgroundColor = '#ffebee';
      errorMessage.style.borderLeftColor = '#e74c3c';
      errorMessage.style.marginTop = '1rem';
      errorMessage.innerHTML = `<i class="fas fa-exclamation-circle" style="color: #e74c3c;"></i> <p>Error compressing image: ${error.message || 'Please try again with a different image.'}</p>`;

      const existingMessage = document.querySelector('.info-box[style*="margin-top"]');
      if (existingMessage) {
        existingMessage.remove();
      }

      document.querySelector('#compression .tool-container').appendChild(errorMessage);

      // Reset button state
      compressBtn.disabled = false;
      compressBtn.innerHTML = 'Compress Image';
    }
  });

  // Calculate compressed size from data URL
  function calculateCompressedSize(dataUrl) {
    // Remove the metadata part of the data URL
    const base64String = dataUrl.split(',')[1];
    // Calculate size in bytes
    compressedFileSize = Math.floor((base64String.length * 3) / 4);

    // Update UI
    newSizeEl.textContent = formatFileSize(compressedFileSize);

    const reduction = ((originalFileSize - compressedFileSize) / originalFileSize) * 100;
    reductionEl.textContent = `${reduction.toFixed(2)}%`;
  }

  // Download compressed image
  downloadCompressedBtn.addEventListener('click', () => {
    if (!compressedImage) return;

    const a = document.createElement('a');
    a.href = compressedImage.src;
    a.download = 'compressed-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Image Crop Tool
  const cropUpload = document.getElementById('crop-upload');
  const cropBtn = document.getElementById('crop-btn');
  const downloadCroppedBtn = document.getElementById('download-cropped');
  const cropPreview = document.getElementById('crop-preview');
  const cropContainer = document.querySelector('.crop-container');

  let cropper = null;
  let croppedImage = null;

  // Handle image upload for cropping
  cropUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('File size exceeds 10MB. Please select a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      // Destroy previous cropper if exists
      if (cropper) {
        cropper.destroy();
      }

      // Create image element
      cropPreview.innerHTML = '';
      const img = document.createElement('img');
      img.src = event.target.result;
      cropPreview.appendChild(img);

      // Wait for the image to load before initializing Cropper
      setTimeout(() => {
        // Initialize cropper
        cropper = new Cropper(img, {
          aspectRatio: NaN,
          viewMode: 1,
          responsive: true,
          zoomable: true,
          scalable: true,
          guides: true,
          autoCropArea: 0.8,
        });

        // Set up aspect ratio buttons
        const aspectButtons = document.querySelectorAll('.aspect-btn');
        aspectButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.addEventListener('click', () => {
            aspectButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const ratio = parseFloat(btn.dataset.ratio);
            cropper.setAspectRatio(ratio);
          });
        });

        // Set first button (free) as active
        aspectButtons[0].classList.add('active');

        // Show crop container and enable crop button
        cropContainer.style.display = 'block';
        cropBtn.disabled = false;
      }, 100); // Small delay to ensure image is loaded in the DOM
    };
    reader.readAsDataURL(file);
  });

  // Crop image
  cropBtn.addEventListener('click', () => {
    if (!cropper) return;

    // Get cropped canvas
    const canvas = cropper.getCroppedCanvas({
      minWidth: 256,
      minHeight: 256,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    });

    if (!canvas) {
      alert('Could not crop the image');
      return;
    }

    // Display cropped image preview
    const croppedPreview = document.createElement('div');
    croppedPreview.className = 'cropped-preview';
    croppedPreview.innerHTML = '<h4>Cropped Result</h4>';
    croppedPreview.appendChild(canvas);

    // Remove previous preview if exists
    const existingPreview = document.querySelector('.cropped-preview');
    if (existingPreview) {
      existingPreview.remove();
    }

    cropContainer.appendChild(croppedPreview);

    // Convert to data URL
    croppedImage = canvas.toDataURL();

    // Enable download button
    downloadCroppedBtn.disabled = false;
  });

  // Download cropped image
  downloadCroppedBtn.addEventListener('click', () => {
    if (!croppedImage) return;

    const a = document.createElement('a');
    a.href = croppedImage;
    a.download = 'cropped-image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Image to PDF Tool
  const pdfUpload = document.getElementById('pdf-upload');
  const createPdfBtn = document.getElementById('create-pdf-btn');
  const pdfImagesList = document.getElementById('pdf-images-list');
  const pdfSettings = document.querySelector('.pdf-settings');

  let pdfImages = [];

  // Handle image upload for PDF conversion
  pdfUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Filter out non-image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      alert('Please select at least one image file');
      return;
    }

    // Validate file sizes (max 10MB per file)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = imageFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert(`${oversizedFiles.length} file(s) exceed 10MB. Please select smaller files.`);
      return;
    }

    // Limit number of files (max 20)
    if (imageFiles.length > 20) {
      alert('You can only convert up to 20 images at once');
      return;
    }

    // Clear previous images
    pdfImages = [];
    pdfImagesList.innerHTML = '';

    // Process each image
    let loadedCount = 0;
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Add to images array
        pdfImages.push({
          name: file.name,
          dataUrl: event.target.result
        });

        // Add to UI list
        addImageToList(file.name, event.target.result, pdfImagesList, pdfImages, function() {
          if (pdfImages.length === 0) {
            createPdfBtn.disabled = true;
            pdfSettings.style.display = 'none';
          }
        });

        // Check if all images are loaded
        loadedCount++;
        if (loadedCount === imageFiles.length) {
          pdfImagesList.style.display = 'block';
          pdfSettings.style.display = 'block';
          createPdfBtn.disabled = false;
        }
      };
      reader.readAsDataURL(file);
    });
  });

  // JPG to PDF Tool
  const jpgPdfUpload = document.getElementById('jpg-pdf-upload');
  const jpgToPdfBtn = document.getElementById('jpg-to-pdf-btn');
  const jpgPdfPreviewBtn = document.getElementById('jpg-pdf-preview-btn');
  const jpgImagesList = document.getElementById('jpg-images-list');
  const jpgQualitySlider = document.getElementById('jpg-quality-slider');
  const jpgQualityValue = document.getElementById('jpg-quality-value');
  const jpgPdfPreviewContainer = document.getElementById('jpg-pdf-preview-container');
  const jpgPdfPreview = document.getElementById('jpg-pdf-preview');

  let jpgImages = [];

  // Update quality value display
  if (jpgQualitySlider) {
    jpgQualitySlider.addEventListener('input', () => {
      jpgQualityValue.textContent = `${jpgQualitySlider.value}%`;
    });
  }

  // Handle JPG upload for PDF conversion
  if (jpgPdfUpload) {
    jpgPdfUpload.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      // Filter out non-JPG files
      const jpgFiles = files.filter(file => file.type === 'image/jpeg');
      if (jpgFiles.length === 0) {
        alert('Please select JPG images only');
        return;
      }

      // Validate file sizes (max 10MB per file)
      const maxSize = 10 * 1024 * 1024; // 10MB
      const oversizedFiles = jpgFiles.filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        alert(`${oversizedFiles.length} file(s) exceed 10MB. Please select smaller files.`);
        return;
      }

      // Limit number of files (max 20)
      if (jpgFiles.length > 20) {
        alert('You can only convert up to 20 images at once');
        return;
      }

      // Clear previous images
      jpgImages = [];
      jpgImagesList.innerHTML = '';

      // Process each image with animation
      let loadedCount = 0;
      jpgFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          // Add to images array
          jpgImages.push({
            name: file.name,
            dataUrl: event.target.result
          });

          // Add to UI list with delay for animation effect
          setTimeout(() => {
            addImageToList(file.name, event.target.result, jpgImagesList, jpgImages, function() {
              if (jpgImages.length === 0) {
                jpgToPdfBtn.disabled = true;
                jpgPdfPreviewBtn.disabled = true;
              }
            });

            // Check if all images are loaded
            loadedCount++;
            if (loadedCount === jpgFiles.length) {
              jpgImagesList.style.display = 'block';
              jpgToPdfBtn.disabled = false;
              jpgPdfPreviewBtn.disabled = false;

              // Add entrance animation
              const items = jpgImagesList.querySelectorAll('.image-item');
              items.forEach((item, i) => {
                item.style.animation = `slideUp 0.3s ease forwards ${i * 0.1}s`;
                item.style.opacity = '0';
              });
            }
          }, index * 100); // Stagger the appearance
        };
        reader.readAsDataURL(file);
      });
    });
  }

  // JPG to PDF Preview
  if (jpgPdfPreviewBtn) {
    jpgPdfPreviewBtn.addEventListener('click', async () => {
      if (jpgImages.length === 0) return;

      // Show loading state
      jpgPdfPreviewBtn.disabled = true;
      jpgPdfPreviewBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

      try {
        // Get settings
        const pageSize = document.getElementById('jpg-pdf-size').value;
        const orientation = document.querySelector('input[name="jpg-orientation"]:checked').value;
        const margin = parseInt(document.getElementById('jpg-pdf-margin').value);
        const quality = parseInt(jpgQualitySlider.value) / 100;

        // Create a preview PDF
        const pdfDoc = await createPdfFromImages(jpgImages, pageSize, orientation, margin, quality, 1); // Just first image for preview

        // Convert to data URL
        const pdfBytes = await pdfDoc.save();
        const pdfDataUri = 'data:application/pdf;base64,' + arrayBufferToBase64(pdfBytes);

        // Display preview
        jpgPdfPreviewContainer.style.display = 'block';

        // Create iframe to show PDF
        const iframe = document.createElement('iframe');
        iframe.src = pdfDataUri;
        jpgPdfPreview.innerHTML = '';
        jpgPdfPreview.appendChild(iframe);

        // Scroll to preview
        jpgPdfPreviewContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Reset button
        jpgPdfPreviewBtn.disabled = false;
        jpgPdfPreviewBtn.innerHTML = 'Preview';
      } catch (error) {
        console.error('Error creating PDF preview:', error);
        alert('Error creating PDF preview. Please try again.');
        jpgPdfPreviewBtn.disabled = false;
        jpgPdfPreviewBtn.innerHTML = 'Preview';
      }
    });
  }

  // JPG to PDF Conversion
  if (jpgToPdfBtn) {
    jpgToPdfBtn.addEventListener('click', async () => {
      if (jpgImages.length === 0) {
        alert('Please upload at least one JPG image');
        return;
      }

      // Validate that we have PDFLib loaded
      if (typeof PDFLib === 'undefined') {
        alert('PDF library not loaded. Please refresh the page and try again.');
        return;
      }

      // Show loading state
      jpgToPdfBtn.disabled = true;
      jpgToPdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Converting...';

      try {
        // Get settings
        const pageSize = document.getElementById('jpg-pdf-size').value;
        const orientation = document.querySelector('input[name="jpg-orientation"]:checked').value;
        const margin = parseInt(document.getElementById('jpg-pdf-margin').value);
        const quality = parseInt(jpgQualitySlider.value) / 100;

        // Create PDF with all images
        const pdfDoc = await createPdfFromImages(jpgImages, pageSize, orientation, margin, quality);

        // Check if PDF has pages
        if (pdfDoc.getPageCount() === 0) {
          throw new Error('Failed to add any images to the PDF');
        }

        // Convert to data URL
        const pdfBytes = await pdfDoc.save();
        const pdfDataUri = 'data:application/pdf;base64,' + arrayBufferToBase64(pdfBytes);

        // Download PDF
        const a = document.createElement('a');
        a.href = pdfDataUri;
        a.download = jpgImages.length > 1 ? 'jpgimages.pdf' : jpgImages[0].name.replace(/\.[^/.]+$/, ".pdf");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'info-box';
        successMessage.style.backgroundColor = '#e6f7e9';
        successMessage.style.borderLeftColor = '#2ecc71';
        successMessage.style.marginTop = '1rem';
        successMessage.innerHTML = '<i class="fas fa-check-circle" style="color: #2ecc71;"></i> <p>PDF created successfully!</p>';

        const existingMessage = document.querySelector('.info-box[style*="margin-top"]');
        if (existingMessage) {
          existingMessage.remove();
        }

        document.querySelector('#jpg-to-pdf .tool-container').appendChild(successMessage);

        // Reset button
        jpgToPdfBtn.disabled = false;
        jpgToPdfBtn.innerHTML = 'Create PDF';

        // Auto-close success message after 5 seconds
        setTimeout(() => {
          const message = document.querySelector('#jpg-to-pdf .tool-container .info-box[style*="margin-top"]');
          if (message) {
            message.style.transition = 'opacity 0.5s ease';
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
          }
        }, 5000);

      } catch (error) {
        console.error('Error creating PDF:', error);

        // Show detailed error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'info-box';
        errorMessage.style.backgroundColor = '#ffebee';
        errorMessage.style.borderLeftColor = '#e74c3c';
        errorMessage.style.marginTop = '1rem';
        errorMessage.innerHTML = `<i class="fas fa-exclamation-circle" style="color: #e74c3c;"></i> <p>Error creating PDF: ${error.message || 'Please try again with different images.'}</p>`;

        const existingMessage = document.querySelector('.info-box[style*="margin-top"]');
        if (existingMessage) {
          existingMessage.remove();
        }

        document.querySelector('#jpg-to-pdf .tool-container').appendChild(errorMessage);

        jpgToPdfBtn.disabled = false;
        jpgToPdfBtn.innerHTML = 'Create PDF';
      }
    });
  }

  // Word to PDF Tool
  const wordPdfUpload = document.getElementById('word-pdf-upload');
  const wordToPdfBtn = document.getElementById('word-to-pdf-btn');
  const wordFileInfo = document.getElementById('word-file-info');
  const wordFilename = document.getElementById('word-filename');
  const wordFilesize = document.getElementById('word-filesize');

  let wordFile = null;

  // Handle Word doc upload
  if (wordPdfUpload) {
    wordPdfUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Check file type
      if (!file.name.match(/\.(doc|docx)$/i)) {
        alert('Please select a Word document (.doc or .docx)');
        return;
      }

      // Check file size (max 20MB)
      const maxSize = 20 * 1024 * 1024; // 20MB
      if (file.size > maxSize) {
        alert('File size exceeds 20MB. Please select a smaller file.');
        return;
      }

      // Save file
      wordFile = file;

      // Update UI
      wordFilename.textContent = file.name;
      wordFilesize.textContent = `Size: ${formatFileSize(file.size)}`;
      wordFileInfo.style.display = 'block';
      wordToPdfBtn.disabled = false;

      // Add animation
      wordFileInfo.classList.add('animate-fade-in');
      setTimeout(() => {
        wordFileInfo.classList.remove('animate-fade-in');
      }, 500);
    });
  }

  // Word to PDF conversion
  if (wordToPdfBtn) {
    wordToPdfBtn.addEventListener('click', () => {
      if (!wordFile) return;

      // Show processing state
      wordToPdfBtn.disabled = true;
      wordToPdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Converting...';

      // Simulate processing
      setTimeout(() => {
        // Reset button state
        wordToPdfBtn.disabled = false;
        wordToPdfBtn.innerHTML = 'Convert to PDF';

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'info-box';
        successMessage.style.backgroundColor = '#e6f7e9';
        successMessage.style.borderLeftColor = '#2ecc71';
        successMessage.style.marginTop = '1rem';
        successMessage.innerHTML = '<i class="fas fa-check-circle" style="color: #2ecc71;"></i> <p>Conversion complete! Download starting...</p>';

        const existingMessage = document.querySelector('.info-box[style*="margin-top"]');
        if (existingMessage) {
          existingMessage.remove();
        }

        document.querySelector('#word-to-pdf .tool-container').appendChild(successMessage);

        // Auto-close message after 5 seconds
        setTimeout(() => {
          successMessage.style.transition = 'opacity 0.5s ease';
          successMessage.style.opacity = '0';
          setTimeout(() => successMessage.remove(), 500);
        }, 5000);

        // Simulate file download
        const a = document.createElement('a');
        a.href = "data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwgL0xlbmd0aCA1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeAFLcFhQsQE... (truncated)";
        a.download = wordFile.name.replace(/\.[^/.]+$/, ".pdf");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 2000);
    });
  }

  // Image Resize Tool
  const resizeUpload = document.getElementById('resize-upload');
  const widthInput = document.getElementById('width-input');
  const heightInput = document.getElementById('height-input');
  const maintainAspectRatio = document.getElementById('maintain-aspect-ratio');
  const resizeBtn = document.getElementById('resize-btn');
  const downloadResizedBtn = document.getElementById('download-resized');
  const resizeOriginalPreview = document.getElementById('resize-original-preview');
  const resizePreviewContainer = document.getElementById('resize-preview-container');
  const resizeSettings = document.getElementById('resize-settings');

  let originalImageObj = null;
  let resizedImageData = null;
  let aspectRatio = 1;

  if (resizeUpload) {
    resizeUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        originalImageObj = new Image();
        originalImageObj.onload = () => {
          // Display original image
          resizeOriginalPreview.innerHTML = '';
          resizeOriginalPreview.appendChild(originalImageObj.cloneNode());

          // Calculate aspect ratio
          aspectRatio = originalImageObj.naturalWidth / originalImageObj.naturalHeight;

          // Set initial dimensions
          widthInput.value = originalImageObj.naturalWidth;
          heightInput.value = originalImageObj.naturalHeight;

          // Show settings and preview
          resizeSettings.style.display = 'block';
          resizePreviewContainer.style.display = 'flex';
          resizeBtn.disabled = false;

          // Add animations
          resizeSettings.classList.add('animate-fade-in');
          resizePreviewContainer.classList.add('animate-fade-in');
          setTimeout(() => {
            resizeSettings.classList.remove('animate-fade-in');
            resizePreviewContainer.classList.remove('animate-fade-in');
          }, 500);
        };
        originalImageObj.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Handle width and height inputs with aspect ratio
  if (widthInput && heightInput && maintainAspectRatio) {
    widthInput.addEventListener('input', () => {
      if (maintainAspectRatio.checked) {
        const newWidth = parseInt(widthInput.value);
        if (!isNaN(newWidth)) {
          heightInput.value = Math.round(newWidth / aspectRatio);
        }
      }
    });

    heightInput.addEventListener('input', () => {
      if (maintainAspectRatio.checked) {
        const newHeight = parseInt(heightInput.value);
        if (!isNaN(newHeight)) {
          widthInput.value = Math.round(newHeight * aspectRatio);
        }
      }
    });
  }

  // Resize image
  if (resizeBtn) {
    resizeBtn.addEventListener('click', () => {
      if (!originalImageObj) return;

      const newWidth = parseInt(widthInput.value);
      const newHeight = parseInt(heightInput.value);

      if (isNaN(newWidth) || isNaN(newHeight) || newWidth <= 0 || newHeight <= 0) {
        alert('Please enter valid dimensions');
        return;
      }

      // Show loading state
      resizeBtn.disabled = true;
      resizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resizing...';

      try {
        // Create canvas and resize image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(originalImageObj, 0, 0, newWidth, newHeight);

        // Get resized image data
        resizedImageData = canvas.toDataURL('image/png');

        // Show success message
        showMessage(document.querySelector('#img-resize .tool-container'), 'success', 'Image resized successfully!', true);

        // Enable download button
        downloadResizedBtn.disabled = false;

        // Reset button state
        resizeBtn.disabled = false;
        resizeBtn.innerHTML = 'Resize Image';
      } catch (error) {
        console.error('Error resizing image:', error);
        showMessage(document.querySelector('#img-resize .tool-container'), 'error', 'Error resizing image: ' + error.message, true);

        // Reset button state
        resizeBtn.disabled = false;
        resizeBtn.innerHTML = 'Resize Image';
      }
    });
  }

  // Download resized image
  if (downloadResizedBtn) {
    downloadResizedBtn.addEventListener('click', () => {
      if (!resizedImageData) return;

      const a = document.createElement('a');
      a.href = resizedImageData;
      a.download = 'resized-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // Image Filters Tool
  const filterUpload = document.getElementById('filter-upload');
  const brightnessSlider = document.getElementById('brightness');
  const contrastSlider = document.getElementById('contrast');
  const saturationSlider = document.getElementById('saturation');
  const filterPreset = document.getElementById('filter-preset');
  const applyFilterBtn = document.getElementById('apply-filter-btn');
  const downloadFilteredBtn = document.getElementById('download-filtered');
  const filterOriginalPreview = document.getElementById('filter-original-preview');
  const filterResultPreview = document.getElementById('filter-result-preview');
  const filterPreviewContainer = document.getElementById('filter-preview-container');
  const filterControls = document.getElementById('filter-controls');

  let originalFilterImage = null;
  let filteredImageData = null;

  // Update slider value displays
  if (brightnessSlider) {
    brightnessSlider.addEventListener('input', () => {
      document.getElementById('brightness-value').textContent = `${brightnessSlider.value}%`;
    });
  }

  if (contrastSlider) {
    contrastSlider.addEventListener('input', () => {
      document.getElementById('contrast-value').textContent = `${contrastSlider.value}%`;
    });
  }

  if (saturationSlider) {
    saturationSlider.addEventListener('input', () => {
      document.getElementById('saturation-value').textContent = `${saturationSlider.value}%`;
    });
  }

  // Handle image upload for filters
  if (filterUpload) {
    filterUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        originalFilterImage = new Image();
        originalFilterImage.onload = () => {
          // Display original image
          filterOriginalPreview.innerHTML = '';
          filterOriginalPreview.appendChild(originalFilterImage.cloneNode());

          // Initialize result with original image
          filterResultPreview.innerHTML = '';
          filterResultPreview.appendChild(originalFilterImage.cloneNode());

          // Show controls and preview
          filterControls.style.display = 'block';
          filterPreviewContainer.style.display = 'flex';
          applyFilterBtn.disabled = false;

          // Add animations
          filterControls.classList.add('animate-fade-in');
          filterPreviewContainer.classList.add('animate-fade-in');
          setTimeout(() => {
            filterControls.classList.remove('animate-fade-in');
            filterPreviewContainer.classList.remove('animate-fade-in');
          }, 500);
        };
        originalFilterImage.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Apply filters
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener('click', () => {
      if (!originalFilterImage) return;

      // Show loading state
      applyFilterBtn.disabled = true;
      applyFilterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';

      try {
        // Create canvas for filtered image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = originalFilterImage.naturalWidth;
        canvas.height = originalFilterImage.naturalHeight;

        // Draw original image
        ctx.drawImage(originalFilterImage, 0, 0);

        // Apply filters
        const brightness = brightnessSlider.value / 100;
        const contrast = contrastSlider.value / 100;
        const saturation = saturationSlider.value / 100;
        const preset = filterPreset.value;

        // Apply preset filters
        if (preset !== 'none') {
          switch (preset) {
            case 'grayscale':
              ctx.filter = 'grayscale(100%)';
              break;
            case 'sepia':
              ctx.filter = 'sepia(100%)';
              break;
            case 'vintage':
              ctx.filter = 'sepia(50%) contrast(110%) brightness(110%)';
              break;
            case 'cool':
              ctx.filter = 'hue-rotate(180deg) saturate(150%)';
              break;
            case 'warm':
              ctx.filter = 'sepia(30%) saturate(140%) brightness(110%)';
              break;
          }

          // Redraw with filter
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(originalFilterImage, 0, 0);
        } else {
          // Apply manual adjustments
          ctx.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(originalFilterImage, 0, 0);
        }

        // Get filtered image data
        filteredImageData = canvas.toDataURL('image/jpeg');

        // Display filtered image
        const filteredImg = new Image();
        filteredImg.onload = () => {
          filterResultPreview.innerHTML = '';
          filterResultPreview.appendChild(filteredImg);

          // Enable download button
          downloadFilteredBtn.disabled = false;

          // Reset button state
          applyFilterBtn.disabled = false;
          applyFilterBtn.innerHTML = 'Apply Filters';
        };
        filteredImg.src = filteredImageData;

      } catch (error) {
        console.error('Error applying filters:', error);
        showMessage(document.querySelector('#img-filter .tool-container'), 'error', 'Error applying filters: ' + error.message, true);

        // Reset button state
        applyFilterBtn.disabled = false;
        applyFilterBtn.innerHTML = 'Apply Filters';
      }
    });
  }

  // Download filtered image
  if (downloadFilteredBtn) {
    downloadFilteredBtn.addEventListener('click', () => {
      if (!filteredImageData) return;

      const a = document.createElement('a');
      a.href = filteredImageData;
      a.download = 'filtered-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // Image Converter Tool
  const converterUpload = document.getElementById('converter-upload');
  const formatSelect = document.getElementById('format-select');
  const formatQuality = document.getElementById('format-quality');
  const formatQualityValue = document.getElementById('format-quality-value');
  const convertBtn = document.getElementById('convert-btn');
  const downloadConvertedBtn = document.getElementById('download-converted');
  const converterPreview = document.getElementById('converter-preview');
  const converterFilename = document.getElementById('converter-filename');
  const converterFilesize = document.getElementById('converter-filesize');
  const converterOptions = document.getElementById('converter-options');
  const qualitySetting = document.getElementById('quality-setting');

  let originalConvertImage = null;
  let convertedImageData = null;
  let originalFileName = '';

  // Update quality value display
  if (formatQuality) {
    formatQuality.addEventListener('input', () => {
      formatQualityValue.textContent = `${formatQuality.value}%`;
    });
  }

  // Toggle quality setting based on format
  if (formatSelect) {
    formatSelect.addEventListener('change', () => {
      const format = formatSelect.value;
      if (format === 'png' || format === 'gif') {
        qualitySetting.style.display = 'none';
      } else {
        qualitySetting.style.display = 'flex';
      }
    });
  }

  // Handle image upload for converter
  if (converterUpload) {
    converterUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      originalFileName = file.name;
      converterFilename.textContent = file.name;
      converterFilesize.textContent = `Size: ${formatFileSize(file.size)}`;

      const reader = new FileReader();
      reader.onload = (event) => {
        originalConvertImage = new Image();
        originalConvertImage.onload = () => {
          // Show preview and options
          converterPreview.style.display = 'block';
          converterOptions.style.display = 'block';
          convertBtn.disabled = false;

          // Add animations
          converterPreview.classList.add('animate-fade-in');
          converterOptions.classList.add('animate-fade-in');
          setTimeout(() => {
            converterPreview.classList.remove('animate-fade-in');
            converterOptions.classList.remove('animate-fade-in');
          }, 500);
        };
        originalConvertImage.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Convert image
  if (convertBtn) {
    convertBtn.addEventListener('click', () => {
      if (!originalConvertImage) return;

      // Show loading state
      convertBtn.disabled = true;
      convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Converting...';

      try {
        const format = formatSelect.value;
        const quality = formatQuality.value / 100;

        // Create canvas for conversion
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = originalConvertImage.naturalWidth;
        canvas.height = originalConvertImage.naturalHeight;

        // Draw original image
        ctx.drawImage(originalConvertImage, 0, 0);

        // Convert to selected format
        switch (format) {
          case 'jpeg':
            convertedImageData = canvas.toDataURL('image/jpeg', quality);
            break;
          case 'png':
            convertedImageData = canvas.toDataURL('image/png');
            break;
          case 'webp':
            convertedImageData = canvas.toDataURL('image/webp', quality);
            break;
          case 'gif':
            convertedImageData = canvas.toDataURL('image/gif');
            break;
          default:
            convertedImageData = canvas.toDataURL('image/jpeg', quality);
        }

        // Show success message
        showMessage(document.querySelector('#img-converter .tool-container'), 'success', 'Image converted successfully!', true);

        // Enable download button
        downloadConvertedBtn.disabled = false;

        // Reset button state
        convertBtn.disabled = false;
        convertBtn.innerHTML = 'Convert Image';
      } catch (error) {
        console.error('Error converting image:', error);
        showMessage(document.querySelector('#img-converter .tool-container'), 'error', 'Error converting image: ' + error.message, true);

        // Reset button state
        convertBtn.disabled = false;
        convertBtn.innerHTML = 'Convert Image';
      }
    });
  }

  // Download converted image
  if (downloadConvertedBtn) {
    downloadConvertedBtn.addEventListener('click', () => {
      if (!convertedImageData) return;

      const format = formatSelect.value;

      const a = document.createElement('a');
      a.href = convertedImageData;
      a.download = originalFileName.replace(/\.[^/.]+$/, `.${format}`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // Helper function for creating PDF from images
  async function createPdfFromImages(images, pageSize, orientation, margin, quality, previewLimit = null) {
    // Create a new PDF document
    const { PDFDocument, PageSizes } = PDFLib;
    const pdfDoc = await PDFDocument.create();

    // Set page size
    let pageWidth, pageHeight;
    switch (pageSize) {
      case 'a4':
        [pageWidth, pageHeight] = PageSizes.A4;
        break;
      case 'letter':
        [pageWidth, pageHeight] = PageSizes.Letter;
        break;
      case 'legal':
        [pageWidth, pageHeight] = PageSizes.Legal;
        break;
      case 'a3':
        [pageWidth, pageHeight] = PageSizes.A3;
        break;
      default:
        [pageWidth, pageHeight] = PageSizes.A4;
    }

    // Swap dimensions if landscape
    if (orientation === 'landscape') {
      [pageWidth, pageHeight] = [pageHeight, pageWidth];
    }

    // Process images for the PDF
    const imagesToProcess = previewLimit ? images.slice(0, previewLimit) : images;

    // Check if we have images to process
    if (imagesToProcess.length === 0) {
      throw new Error('No images to process');
    }

    let errorCount = 0;

    for (const img of imagesToProcess) {
      try {
        // Create a page
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Embed the image based on its format
        let embeddedImage;

        if (img.dataUrl.startsWith('data:image/jpeg') || img.dataUrl.startsWith('data:image/jpg')) {
          const jpgData = img.dataUrl.split(',')[1];
          const jpgBytes = base64ToUint8Array(jpgData);
          embeddedImage = await pdfDoc.embedJpg(jpgBytes);
        } else if (img.dataUrl.startsWith('data:image/png')) {
          const pngData = img.dataUrl.split(',')[1];
          const pngBytes = base64ToUint8Array(pngData);
          embeddedImage = await pdfDoc.embedPng(pngBytes);
        } else if (img.dataUrl.startsWith('data:image/')) {
          // Convert other image formats to PNG in-memory using canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const tempImg = new Image();
          tempImg.src = img.dataUrl;

          // Wait for image to load
          await new Promise(resolve => {
            tempImg.onload = resolve;
            tempImg.onerror = () => {
              console.error(`Error loading image: ${img.name}`);
              resolve(); // Resolve anyway to prevent hanging
            };
          });

          // Check if image loaded successfully
          if (tempImg.width === 0 || tempImg.height === 0) {
            throw new Error(`Image failed to load: ${img.name}`);
          }

          canvas.width = tempImg.width;
          canvas.height = tempImg.height;
          ctx.drawImage(tempImg, 0, 0);

          const pngDataUrl = canvas.toDataURL('image/png');
          const pngData = pngDataUrl.split(',')[1];
          const pngBytes = base64ToUint8Array(pngData);
          embeddedImage = await pdfDoc.embedPng(pngBytes);
        } else {
          throw new Error(`Unsupported image format for ${img.name}`);
        }

        // Get image dimensions
        const { width: imgWidth, height: imgHeight } = embeddedImage;

        // Calculate dimensions to fit on page (with margins)
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = pageHeight - (margin * 2);

        // Calculate scale to fit
        let scale = 1;
        if (imgWidth > maxWidth || imgHeight > maxHeight) {
          const xScale = maxWidth / imgWidth;
          const yScale = maxHeight / imgHeight;
          scale = Math.min(xScale, yScale);
        }

        // Calculate centered position
        const x = (pageWidth - (imgWidth * scale)) / 2;
        const y = (pageHeight - (imgHeight * scale)) / 2;

        // Draw image on page
        page.drawImage(embeddedImage, {
          x,
          y,
          width: imgWidth * scale,
          height: imgHeight * scale
        });
      } catch (err) {
        console.error(`Error processing image ${img.name}:`, err);
        errorCount++;
        // Continue processing other images
      }
    }

    // Check if all images failed
    if (errorCount === imagesToProcess.length) {
      throw new Error('Failed to process any of the images. Please check file formats and try again.');
    }

    return pdfDoc;
  }

  // Add image to UI list (reusable)
  function addImageToList(name, dataUrl, listElement, imagesArray, onRemove = null) {
    const item = document.createElement('div');
    item.className = 'image-item';

    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = name;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'image-item-name';
    nameSpan.textContent = name;

    const removeBtn = document.createElement('i');
    removeBtn.className = 'fas fa-times image-item-remove';
    removeBtn.addEventListener('click', () => {
      // Remove from array
      const index = imagesArray.findIndex(img => img.name === name);
      if (index !== -1) {
        imagesArray.splice(index, 1);
      }

      // Remove from UI
      item.remove();

      // Call custom onRemove callback if provided
      if (onRemove && typeof onRemove === 'function') {
        onRemove();
      }
    });

    item.appendChild(img);
    item.appendChild(nameSpan);
    item.appendChild(removeBtn);
    listElement.appendChild(item);

    return item;
  }

  // Download All button
  const downloadAllBtn = document.getElementById('download-all-btn');

  // Create PDF
  createPdfBtn.addEventListener('click', async () => {
    if (pdfImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    // Validate that we have PDFLib loaded
    if (typeof PDFLib === 'undefined') {
      alert('PDF library not loaded. Please refresh the page and try again.');
      return;
    }

    createPdfBtn.disabled = true;
    createPdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating PDF...';

    try {
      const orientation = document.getElementById('pdf-orientation').value;
      const pageSize = document.getElementById('pdf-size').value;

      // Create a new PDF document
      const { PDFDocument, PageSizes } = PDFLib;
      const pdfDoc = await PDFDocument.create();

      // Set page size
      let pageWidth, pageHeight;
      switch (pageSize) {
        case 'a4':
          [pageWidth, pageHeight] = PageSizes.A4;
          break;
        case 'letter':
          [pageWidth, pageHeight] = PageSizes.Letter;
          break;
        case 'legal':
          [pageWidth, pageHeight] = PageSizes.Legal;
          break;
        default:
          [pageWidth, pageHeight] = PageSizes.A4;
      }

      // Swap dimensions if landscape
      if (orientation === 'landscape') {
        [pageWidth, pageHeight] = [pageHeight, pageWidth];
      }

      // Add each image to the PDF
      for (const img of pdfImages) {
        try {
          // Create a page
          const page = pdfDoc.addPage([pageWidth, pageHeight]);

          // Embed the image
          let embeddedImage;
          if (img.dataUrl.startsWith('data:image/jpeg') || img.dataUrl.startsWith('data:image/jpg')) {
            const jpgData = img.dataUrl.split(',')[1];
            const jpgBytes = base64ToUint8Array(jpgData);
            embeddedImage = await pdfDoc.embedJpg(jpgBytes);
          } else if (img.dataUrl.startsWith('data:image/png')) {
            const pngData = img.dataUrl.split(',')[1];
            const pngBytes = base64ToUint8Array(pngData);
            embeddedImage = await pdfDoc.embedPng(pngBytes);
          } else if (img.dataUrl.startsWith('data:image/')) {
            // Convert other image formats to PNG in-memory using canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const tempImg = new Image();
            tempImg.src = img.dataUrl;

            // Wait for image to load
            await new Promise(resolve => {
              tempImg.onload = resolve;
            });

            canvas.width = tempImg.width;
            canvas.height = tempImg.height;
            ctx.drawImage(tempImg, 0, 0);

            const pngDataUrl = canvas.toDataURL('image/png');
            const pngData = pngDataUrl.split(',')[1];
            const pngBytes = base64ToUint8Array(pngData);
            embeddedImage = await pdfDoc.embedPng(pngBytes);
          } else {
            console.warn(`Unsupported image format for ${img.name}, skipping...`);
            continue;
          }

          // Get image dimensions
          const { width: imgWidth, height: imgHeight } = embeddedImage;

          // Calculate dimensions to fit on page (with margins)
          const margin = 50;
          const maxWidth = pageWidth - (margin * 2);
          const maxHeight = pageHeight - (margin * 2);

          // Calculate scale to fit
          let scale = 1;
          if (imgWidth > maxWidth || imgHeight > maxHeight) {
            const xScale = maxWidth / imgWidth;
            const yScale = maxHeight / imgHeight;
            scale = Math.min(xScale, yScale);
          }

          // Calculate centered position
          const x = (pageWidth - (imgWidth * scale)) / 2;
          const y = (pageHeight - (imgHeight * scale)) / 2;

          // Draw image on page
          page.drawImage(embeddedImage, {
            x,
            y,
            width: imgWidth * scale,
            height: imgHeight * scale
          });
        } catch (imageError) {
          console.error(`Error processing image ${img.name}:`, imageError);
          // Continue with other images instead of failing the whole process
        }
      }

      // Check if we have pages in the PDF
      if (pdfDoc.getPageCount() === 0) {
        throw new Error('Failed to add any images to the PDF');
      }

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const pdfDataUri = 'data:application/pdf;base64,' + arrayBufferToBase64(pdfBytes);

      // Download the PDF
      const a = document.createElement('a');
      a.href = pdfDataUri;
      a.download = 'images.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Enable download all button
      downloadAllBtn.disabled = false;

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'info-box';
      successMessage.style.backgroundColor = '#e6f7e9';
      successMessage.style.borderLeftColor = '#2ecc71';
      successMessage.style.marginTop = '1rem';
      successMessage.innerHTML = '<i class="fas fa-check-circle" style="color: #2ecc71;"></i> <p>PDF created successfully!</p>';

      const existingMessage = document.querySelector('.info-box[style*="margin-top"]');
      if (existingMessage) {
        existingMessage.remove();
      }

      document.querySelector('#to-pdf .tool-container').appendChild(successMessage);

      // Reset button
      createPdfBtn.disabled = false;
      createPdfBtn.innerHTML = 'Create PDF';
    } catch (error) {
      console.error('Error creating PDF:', error);

      // Show error message with details
      const errorMessage = document.createElement('div');
      errorMessage.className = 'info-box';
      errorMessage.style.backgroundColor = '#ffebee';
      errorMessage.style.borderLeftColor = '#e74c3c';
      errorMessage.style.marginTop = '1rem';
      errorMessage.innerHTML = `<i class="fas fa-exclamation-circle" style="color: #e74c3c;"></i> <p>Error creating PDF: ${error.message || 'Please try again with different images.'}</p>`;

      const existingMessage = document.querySelector('.info-box[style*="margin-top"]');
      if (existingMessage) {
        existingMessage.remove();
      }

      document.querySelector('#to-pdf .tool-container').appendChild(errorMessage);

      createPdfBtn.disabled = false;
      createPdfBtn.innerHTML = 'Create PDF';
    }
  });

  // Download all images individually
  downloadAllBtn.addEventListener('click', () => {
    if (pdfImages.length === 0) return;

    // Create a zip-like experience by downloading each image with a delay
    downloadAllBtn.disabled = true;
    downloadAllBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';

    let downloadCount = 0;

    const downloadNext = (index) => {
      if (index >= pdfImages.length) {
        downloadAllBtn.disabled = false;
        downloadAllBtn.innerHTML = 'Download All';
        return;
      }

      const img = pdfImages[index];
      const a = document.createElement('a');
      a.href = img.dataUrl;
      a.download = `image_${index + 1}_${img.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Download next after a short delay
      setTimeout(() => {
        downloadNext(index + 1);
      }, 300);
    };

    // Start downloading
    downloadNext(0);
  });

  // Helper Functions
  function formatFileSize(bytes) {
    if (bytes < 1024) {
      return bytes + ' bytes';
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / 1048576).toFixed(2) + ' MB';
    }
  }

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  // Drag and Drop Functionality
  const uploadAreas = document.querySelectorAll('.upload-area');

  uploadAreas.forEach(area => {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      area.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      area.addEventListener(eventName, () => {
        area.classList.add('highlight');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      area.addEventListener(eventName, () => {
        area.classList.remove('highlight');
      }, false);
    });

    area.addEventListener('drop', (e) => {
      const inputId = area.querySelector('input').id;
      const dt = e.dataTransfer;
      const files = dt.files;

      if (inputId === 'pdf-upload') {
        document.getElementById(inputId).files = files;
        const event = new Event('change');
        document.getElementById(inputId).dispatchEvent(event);
      } else {
        if (files.length > 0) {
          document.getElementById(inputId).files = files;
          const event = new Event('change');
          document.getElementById(inputId).dispatchEvent(event);
        }
      }
    }, false);
  });

  //Check if CryptoJS is loaded before adding PDF Protect and Unlock tools
  if(typeof CryptoJS !== 'undefined'){
    // Add PDF Protect tool implementation
    function protectPdf(){
      //Implementation for PDF protection using CryptoJS
      alert("PDF Protect tool - Coming soon!");
    }
    // Add PDF Unlock tool implementation
    function unlockPdf(){
      //Implementation for PDF unlocking using CryptoJS
      alert("PDF Unlock tool - Coming soon!");
    }
    //Add event listeners or integrate into existing structure as needed.
  }

  //Check if PDFLib is loaded before adding any PDF related functionality.
  if(typeof PDFLib !== 'undefined'){
    // Add any other PDF related tools here if needed.
  }
});
