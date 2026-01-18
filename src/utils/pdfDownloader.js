import html2pdf from 'html2pdf.js'

export const handleDownload = () => {
  const element = document.getElementById('resume-content')
  if (!element) {
    alert('Resume content not found!')
    return
  }

  // 1. Create a temporary container to hold the clone
  // This isolates the resume from the rest of the app's layout/CSS
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '0'
  container.style.width = '210mm' // Force exact A4 width
  container.style.minHeight = '296mm' // Match A4 height
  container.style.backgroundColor = '#ffffff'
  document.body.appendChild(container)

  // 2. Clone the resume element
  const clone = element.cloneNode(true)
  
  // 3. Reset styles on the clone to ensure it looks like a document, not a preview
  clone.style.transform = 'none' // Remove the scale(0.6) transform
  clone.style.margin = '0'
  clone.style.boxShadow = 'none'
  clone.style.width = '100%' // Fill the 210mm container
  clone.style.height = 'auto'
  clone.style.minHeight = '296mm' // Match A4 height
  clone.style.borderRadius = '0'
  
  // Remove the resizer handle from the PDF
  const resizer = clone.querySelector('.resizer')
  if (resizer) {
    resizer.remove()
    // Fix grid layout: The original is "30% 10px 1fr", we need "30% 1fr"
    // otherwise the main content falls into the 10px column.
    const currentGrid = clone.style.gridTemplateColumns
    if (currentGrid) {
      // Use regex to safely remove the 10px column definition
      clone.style.gridTemplateColumns = currentGrid.replace(/\s10px\s/, ' ')
    }
  }

  // Append clone to the container
  container.appendChild(clone)

  // 4. Configure PDF options
  const opt = {
    margin: 0, // No margin, let the CSS handle padding
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    enableLinks: true,
    html2canvas: { 
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow loading cross-origin images
      scrollY: 0,
      windowWidth: 1000 // Ensure desktop view rendering
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  }

  // 5. Generate PDF and cleanup
  html2pdf()
    .set(opt)
    .from(clone)
    .save()
    .then(() => {
      // Cleanup: remove the temporary container
      document.body.removeChild(container)
    })
    .catch((err) => {
      console.error('PDF generation failed:', err)
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    })
}
