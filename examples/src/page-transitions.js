/* global document, window, setTimeout, URL */


// Gestion des transitions de page
const loadingOverlay = document.getElementById('loading-overlay');
const app = document.getElementById('app');

// Masquer le loading une fois que l'app est chargée
window.addEventListener('load', () => {
  if (app) {
    app.classList.add('loaded');
  }
  
  // Masquer le loader après un délai
  setTimeout(() => {
    loadingOverlay.classList.add('fade-out');
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 300);
  }, 500);
});

// Afficher le loader lors des changements de page
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.href && !link.href.includes('#')) {
    // Vérifier si c'est un lien interne ou un lien de retour
    const currentHost = window.location.host;
    const linkHost = new URL(link.href).host;
    const isInternalLink = linkHost === currentHost || linkHost === '';
    const isBackLink = link.href.includes('../') || link.textContent.includes('Back');
    
    if (isInternalLink || isBackLink) {
      e.preventDefault();
      loadingOverlay.style.display = 'flex';
      loadingOverlay.classList.remove('fade-out');
      
      // Naviguer après un court délai
      setTimeout(() => {
        window.location.href = link.href;
      }, 200);
    }
  }
});

// Masquer le loader si on revient en arrière
window.addEventListener('pageshow', () => {
  loadingOverlay.style.display = 'none';
  loadingOverlay.classList.add('fade-out');
});
