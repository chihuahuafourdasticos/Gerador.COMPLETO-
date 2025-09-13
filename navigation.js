// --- Navigation ---
export function showTool(toolId) {
  // Hide all tool containers
  document.getElementById('address-generator').style.display = 'none';
  document.getElementById('name-modifier').style.display = 'none';
  document.getElementById('plano-b').style.display = 'none';
  document.getElementById('clean-generator').style.display = 'none';

  // Deactivate all nav buttons
  document.getElementById('nav-address').classList.remove('active');
  document.getElementById('nav-name').classList.remove('active');
  document.getElementById('nav-plano').classList.remove('active');
  document.getElementById('nav-clean').classList.remove('active');

  // Show the selected tool container
  const toolElement = document.getElementById(toolId);
  if (toolElement) {
      toolElement.style.display = 'block'; // Default display
       // Activate the corresponding nav button
       const navButton = document.getElementById(`nav-${toolId.split('-')[0]}`); // e.g., nav-address
       if (navButton) {
           navButton.classList.add('active');
       }

       // Special case for name-modifier layout
       if (toolId === 'name-modifier') {
           toolElement.style.display = 'flex'; // Use flex for name modifier layout
       }
  } else {
      console.error(`Tool container with ID ${toolId} not found.`);
  }
}

// No specific init needed for navigation itself currently
// export function initNavigation() { }