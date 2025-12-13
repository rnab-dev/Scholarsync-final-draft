// Image Converter
const imageConverterInput = document.getElementById('imageConverterInput');
const imageConverterPreview = document.getElementById('imageConverterPreview');
const imagePreviewImg = document.getElementById('imagePreviewImg');
const imageFileName = document.getElementById('imageFileName');
const imageFileSize = document.getElementById('imageFileSize');
const imageConvertFormat = document.getElementById('imageConvertFormat');
const convertImageBtn = document.getElementById('convertImageBtn');

let currentImageFile = null;

imageConverterInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    currentImageFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreviewImg.src = event.target.result;
      imageConverterPreview.style.display = 'block';
      imageFileName.textContent = file.name;
      imageFileSize.textContent = formatFileSize(file.size);
      convertImageBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
});

convertImageBtn.addEventListener('click', () => {
  if (!currentImageFile) return;
  
  const format = imageConvertFormat.value;
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp';
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted-${Date.now()}.${format === 'jpeg' ? 'jpg' : format}`;
      a.click();
      URL.revokeObjectURL(url);
    }, mimeType, 0.95);
  };
  img.src = imagePreviewImg.src;
});

// Image Compressor with Size Target
const imageCompressorInput = document.getElementById('imageCompressorInput');
const compressorPreview = document.getElementById('compressorPreview');
const compressorPreviewImg = document.getElementById('compressorPreviewImg');
const compressorFileName = document.getElementById('compressorFileName');
const compressorFileSize = document.getElementById('compressorFileSize');
const compressionQuality = document.getElementById('compressionQuality');
const qualityValue = document.getElementById('qualityValue');
const compressImageBtn = document.getElementById('compressImageBtn');
const compressBySizeBtn = document.getElementById('compressBySizeBtn');
const compressionResult = document.getElementById('compressionResult');
const originalSize = document.getElementById('originalSize');
const compressedSize = document.getElementById('compressedSize');
const savedPercentage = document.getElementById('savedPercentage');
const downloadCompressedBtn = document.getElementById('downloadCompressedBtn');
const qualityModeBtn = document.getElementById('qualityModeBtn');
const sizeModeBtn = document.getElementById('sizeModeBtn');
const qualityMode = document.getElementById('qualityMode');
const sizeMode = document.getElementById('sizeMode');
const targetSize = document.getElementById('targetSize');
const sizeUnit = document.getElementById('sizeUnit');

let currentCompressorFile = null;
let compressedBlob = null;

// Mode toggle
qualityModeBtn.addEventListener('click', () => {
  qualityModeBtn.classList.add('active');
  sizeModeBtn.classList.remove('active');
  qualityMode.style.display = 'block';
  sizeMode.style.display = 'none';
});

sizeModeBtn.addEventListener('click', () => {
  sizeModeBtn.classList.add('active');
  qualityModeBtn.classList.remove('active');
  sizeMode.style.display = 'block';
  qualityMode.style.display = 'none';
});

// Preset size buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    targetSize.value = btn.dataset.size;
    sizeUnit.value = 'kb';
  });
});

compressionQuality.addEventListener('input', (e) => {
  qualityValue.textContent = e.target.value;
});

imageCompressorInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    currentCompressorFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      compressorPreviewImg.src = event.target.result;
      compressorPreview.style.display = 'block';
      compressorFileName.textContent = file.name;
      compressorFileSize.textContent = formatFileSize(file.size);
      compressImageBtn.disabled = false;
      compressBySizeBtn.disabled = false;
      compressionResult.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

// Compress by Quality
compressImageBtn.addEventListener('click', () => {
  if (!currentCompressorFile) return;
  
  const quality = compressionQuality.value / 100;
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    canvas.toBlob((blob) => {
      compressedBlob = blob;
      showCompressionResult(blob);
    }, 'image/jpeg', quality);
  };
  img.src = compressorPreviewImg.src;
});

// Compress by Target Size
compressBySizeBtn.addEventListener('click', async () => {
  if (!currentCompressorFile) return;
  
  const target = parseInt(targetSize.value);
  if (!target || target <= 0) {
    alert('Please enter a valid target size');
    return;
  }
  
  const unit = sizeUnit.value;
  const targetBytes = unit === 'mb' ? target * 1024 * 1024 : target * 1024;
  
  if (currentCompressorFile.size <= targetBytes) {
    alert(`Image is already smaller than ${target} ${unit.toUpperCase()}!`);
    return;
  }
  
  const img = new Image();
  img.onload = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Binary search for optimal quality
    let minQuality = 0.1;
    let maxQuality = 0.95;
    let attempts = 0;
    let bestBlob = null;
    
    while (attempts < 15) {
      const quality = (minQuality + maxQuality) / 2;
      
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/jpeg', quality);
      });
      
      if (blob.size <= targetBytes) {
        bestBlob = blob;
        minQuality = quality;
      } else {
        maxQuality = quality;
      }
      
      // If we're within 5% of target, that's good enough
      if (Math.abs(blob.size - targetBytes) / targetBytes < 0.05) {
        bestBlob = blob;
        break;
      }
      
      attempts++;
    }
    
    if (bestBlob && bestBlob.size <= targetBytes) {
      compressedBlob = bestBlob;
      showCompressionResult(bestBlob);
    } else {
      // Try reducing dimensions if quality compression isn't enough
      await compressWithResize(img, targetBytes, canvas);
    }
  };
  img.src = compressorPreviewImg.src;
});

async function compressWithResize(img, targetBytes, canvas) {
  let scale = 0.9;
  let attempts = 0;
  
  while (attempts < 10) {
    const newWidth = Math.floor(img.width * scale);
    const newHeight = Math.floor(img.height * scale);
    
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', 0.9);
    });
    
    if (blob.size <= targetBytes) {
      compressedBlob = blob;
      showCompressionResult(blob);
      return;
    }
    
    scale -= 0.1;
    attempts++;
  }
  
  alert('Could not compress to target size. Try a larger target or lower quality image.');
}

function showCompressionResult(blob) {
  originalSize.textContent = formatFileSize(currentCompressorFile.size);
  compressedSize.textContent = formatFileSize(blob.size);
  const saved = ((currentCompressorFile.size - blob.size) / currentCompressorFile.size * 100).toFixed(1);
  savedPercentage.textContent = saved;
  compressionResult.style.display = 'block';
}

downloadCompressedBtn.addEventListener('click', () => {
  if (!compressedBlob) return;
  
  const url = URL.createObjectURL(compressedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `compressed-${Date.now()}.jpg`;
  a.click();
  URL.revokeObjectURL(url);
});

// Utility function
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}


// Images to PDF
const imagesToPdfInput = document.getElementById('imagesToPdfInput');
const pdfImagesList = document.getElementById('pdfImagesList');
const generatePdfBtn = document.getElementById('generatePdfBtn');

let pdfImages = [];

imagesToPdfInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  pdfImages = [];
  pdfImagesList.innerHTML = '';
  
  if (files.length === 0) {
    generatePdfBtn.disabled = true;
    return;
  }
  
  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      pdfImages.push({
        data: event.target.result,
        name: file.name
      });
      
      const item = document.createElement('div');
      item.className = 'image-list-item';
      item.innerHTML = `
        <img src="${event.target.result}" alt="${file.name}">
        <span>${file.name}</span>
        <button class="icon-btn remove-image" data-index="${index}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      `;
      pdfImagesList.appendChild(item);
      
      if (pdfImages.length === files.length) {
        generatePdfBtn.disabled = false;
      }
    };
    reader.readAsDataURL(file);
  });
});

pdfImagesList.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.remove-image');
  if (removeBtn) {
    const index = parseInt(removeBtn.dataset.index);
    pdfImages.splice(index, 1);
    removeBtn.closest('.image-list-item').remove();
    if (pdfImages.length === 0) {
      generatePdfBtn.disabled = true;
    }
  }
});

generatePdfBtn.addEventListener('click', async () => {
  if (pdfImages.length === 0) return;
  
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  
  for (let i = 0; i < pdfImages.length; i++) {
    const img = new Image();
    await new Promise((resolve) => {
      img.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;
        
        let width, height;
        if (imgRatio > pageRatio) {
          width = pageWidth;
          height = pageWidth / imgRatio;
        } else {
          height = pageHeight;
          width = pageHeight * imgRatio;
        }
        
        if (i > 0) pdf.addPage();
        pdf.addImage(pdfImages[i].data, 'JPEG', 0, 0, width, height);
        resolve();
      };
      img.src = pdfImages[i].data;
    });
  }
  
  pdf.save(`images-to-pdf-${Date.now()}.pdf`);
});

const resizerInput = document.getElementById('resizerInput');
const resizerPreview = document.getElementById('resizerPreview');
const resizerPreviewImg = document.getElementById('resizerPreviewImg');
const resizerFileName = document.getElementById('resizerFileName');
const resizerOriginalDim = document.getElementById('resizerOriginalDim');
const resizeWidth = document.getElementById('resizeWidth');
const resizeHeight = document.getElementById('resizeHeight');
const maintainAspectRatio = document.getElementById('maintainAspectRatio');
const resizeImageBtn = document.getElementById('resizeImageBtn');

let currentResizerImage = null;
let originalWidth = 0;
let originalHeight = 0;

imageResizerInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        currentResizerImage = img;
        originalWidth = img.width;
        originalHeight = img.height;
        resizerPreviewImg.src = event.target.result;
        resizerPreview.style.display = 'block';
        resizerFileName.textContent = file.name;
        resizerOriginalDim.textContent = `${originalWidth} × ${originalHeight}px`;
        resizeWidth.value = originalWidth;
        resizeHeight.value = originalHeight;
        resizeImageBtn.disabled = false;
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

resizeWidth.addEventListener('input', () => {
  if (maintainAspectRatio.checked && originalWidth > 0) {
    const ratio = originalHeight / originalWidth;
    resizeHeight.value = Math.round(resizeWidth.value * ratio);
  }
});

resizeHeight.addEventListener('input', () => {
  if (maintainAspectRatio.checked && originalHeight > 0) {
    const ratio = originalWidth / originalHeight;
    resizeWidth.value = Math.round(resizeHeight.value * ratio);
  }
});

resizeImageBtn.addEventListener('click', () => {
  if (!currentResizerImage) return;
  
  const newWidth = parseInt(resizeWidth.value) || originalWidth;
  const newHeight = parseInt(resizeHeight.value) || originalHeight;
  
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(currentResizerImage, 0, 0, newWidth, newHeight);
  
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized-${newWidth}x${newHeight}-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
});

const wordCounterInput = document.getElementById('wordCounterInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const charNoSpaceCount = document.getElementById('charNoSpaceCount');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');
const readingTime = document.getElementById('readingTime');
const clearTextBtn = document.getElementById('clearTextBtn');

function updateWordCount() {
  const text = wordCounterInput.value;
  
  // Words
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  wordCount.textContent = words.length;
  
  // Characters with spaces
  charCount.textContent = text.length;
  
  // Characters without spaces
  charNoSpaceCount.textContent = text.replace(/\s/g, '').length;
  
  // Sentences
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  sentenceCount.textContent = sentences.length;
  
  // Paragraphs
  const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0);
  paragraphCount.textContent = paragraphs.length;
  
  // Reading time (average 200 words per minute)
  const minutes = Math.ceil(words.length / 200);
  readingTime.textContent = minutes;
}

wordCounterInput.addEventListener('input', updateWordCount);

clearTextBtn.addEventListener('click', () => {
  wordCounterInput.value = '';
  updateWordCount();
});

const imageCropperInput = document.getElementById('imageCropperInput');
const cropperPreview = document.getElementById('cropperPreview');
const cropperCanvas = document.getElementById('cropperCanvas');
const cropRatio = document.getElementById('cropRatio');
const cropImageBtn = document.getElementById('cropImageBtn');

let currentCropperImage = null;

imageCropperInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        currentCropperImage = img;
        drawCropPreview();
        cropperPreview.style.display = 'block';
        cropImageBtn.disabled = false;
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

cropRatio.addEventListener('change', () => {
  if (currentCropperImage) {
    drawCropPreview();
  }
});

function drawCropPreview() {
  if (!currentCropperImage) return;
  
  const ratio = cropRatio.value;
  const img = currentCropperImage;
  const maxWidth = 500;
  let cropWidth, cropHeight;
  
  switch(ratio) {
    case 'square':
      cropWidth = cropHeight = Math.min(img.width, img.height);
      break;
    case 'landscape':
      cropWidth = img.width;
      cropHeight = img.width * (9 / 16);
      if (cropHeight > img.height) {
        cropHeight = img.height;
        cropWidth = cropHeight * (16 / 9);
      }
      break;
    case 'portrait':
      cropHeight = img.height;
      cropWidth = img.height * (9 / 16);
      if (cropWidth > img.width) {
        cropWidth = img.width;
        cropHeight = cropWidth * (16 / 9);
      }
      break;
    case 'free':
      cropWidth = img.width;
      cropHeight = img.height;
      break;
  }
  
  const scale = Math.min(maxWidth / cropWidth, 1);
  cropperCanvas.width = cropWidth * scale;
  cropperCanvas.height = cropHeight * scale;
  
  const ctx = cropperCanvas.getContext('2d');
  const x = (img.width - cropWidth) / 2;
  const y = (img.height - cropHeight) / 2;
  ctx.drawImage(img, x, y, cropWidth, cropHeight, 0, 0, cropperCanvas.width, cropperCanvas.height);
}

cropImageBtn.addEventListener('click', () => {
  if (!currentCropperImage) return;
  
  const ratio = cropRatio.value;
  const img = currentCropperImage;
  let cropWidth, cropHeight;
  
  switch(ratio) {
    case 'square':
      cropWidth = cropHeight = Math.min(img.width, img.height);
      break;
    case 'landscape':
      cropWidth = img.width;
      cropHeight = img.width * (9 / 16);
      if (cropHeight > img.height) {
        cropHeight = img.height;
        cropWidth = cropHeight * (16 / 9);
      }
      break;
    case 'portrait':
      cropHeight = img.height;
      cropWidth = img.height * (9 / 16);
      if (cropWidth > img.width) {
        cropWidth = img.width;
        cropHeight = cropWidth * (16 / 9);
      }
      break;
    case 'free':
      cropWidth = img.width;
      cropHeight = img.height;
      break;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  const ctx = canvas.getContext('2d');
  const x = (img.width - cropWidth) / 2;
  const y = (img.height - cropHeight) / 2;
  ctx.drawImage(img, x, y, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cropped-${ratio}-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
});

// Utility function
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
