// Tab functionality
function openTab(evt, tabName) {
  var i, tabcontent = document.getElementsByClassName("tabcontent"),
    tablinks = document.getElementsByClassName("tablinks");

  // Hide all tab content
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove active class from all tabs
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the current tab and add active class
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Image comparison functionality - Pure JavaScript
function initImageComparisons() {
  const comparisons = document.querySelectorAll('.cmp');
  
  comparisons.forEach(comparison => {
    let isDragging = false;
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const rect = comparison.getBoundingClientRect();
      const x = (e.pageX || e.touches[0].pageX) - rect.left;
      const w = comparison.offsetWidth;
      const pct = Math.max(0, Math.min(1, x / w));
      
      // Update clip path and handle position
      const top = comparison.querySelector('.top');
      const handle = comparison.querySelector('.handle');
      
      if (top) {
        top.style.clipPath = `inset(0 ${100 - pct * 100}% 0 0)`;
      }
      if (handle) {
        handle.style.left = `${pct * 100}%`;
      }
    };
    
    const startDrag = () => {
      isDragging = true;
    };
    
    const stopDrag = () => {
      isDragging = false;
    };
    
    // Mouse events
    comparison.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', handleMouseMove);
    
    // Touch events
    comparison.addEventListener('touchstart', startDrag);
    document.addEventListener('touchend', stopDrag);
    document.addEventListener('touchmove', handleMouseMove);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize image comparisons
  initImageComparisons();
  
  // Open default tab
  const defaultOpenBtn = document.getElementById("defaultOpen");
  if (defaultOpenBtn) {
    // Use setTimeout to ensure everything is rendered
    setTimeout(() => {
      defaultOpenBtn.click();
    }, 0);
  }
});