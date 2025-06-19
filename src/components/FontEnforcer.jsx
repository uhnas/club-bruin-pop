import { useEffect } from 'react';

const FontEnforcer = () => {
  useEffect(() => {
    const forceComicSans = () => {
      // Force Comic Sans on ALL elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        element.style.fontFamily = 'Comic Sans MS, Arial, Helvetica, sans-serif';
        element.style.setProperty('font-family', 'Comic Sans MS, Arial, Helvetica, sans-serif', 'important');
      });
      
      // Force on document body
      document.body.style.fontFamily = 'Comic Sans MS, Arial, Helvetica, sans-serif';
      document.body.style.setProperty('font-family', 'Comic Sans MS, Arial, Helvetica, sans-serif', 'important');
      
      // Force on html element
      document.documentElement.style.fontFamily = 'Comic Sans MS, Arial, Helvetica, sans-serif';
      document.documentElement.style.setProperty('font-family', 'Comic Sans MS, Arial, Helvetica, sans-serif', 'important');
    };

    // Force immediately
    forceComicSans();
    
    // Force after a small delay to catch any late-loading elements
    setTimeout(forceComicSans, 100);
    setTimeout(forceComicSans, 500);
    setTimeout(forceComicSans, 1000);
    
    // Set up mutation observer to force Comic Sans on any new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            node.style.fontFamily = 'Comic Sans MS, Arial, Helvetica, sans-serif';
            node.style.setProperty('font-family', 'Comic Sans MS, Arial, Helvetica, sans-serif', 'important');
            
            // Also force on all children
            const children = node.querySelectorAll('*');
            children.forEach(child => {
              child.style.fontFamily = 'Comic Sans MS, Arial, Helvetica, sans-serif';
              child.style.setProperty('font-family', 'Comic Sans MS, Arial, Helvetica, sans-serif', 'important');
            });
          }
        });
      });
    });

    // Watch for changes in the entire document
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Force Comic Sans every 100ms to be absolutely sure
    const interval = setInterval(forceComicSans, 100);

    // Listen for page visibility changes (like tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        forceComicSans();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for focus events (page becoming active)
    const handleFocus = () => forceComicSans();
    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      observer.disconnect();
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default FontEnforcer; 