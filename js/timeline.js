/* ========================================
   TIMELINE.JS - Timeline Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const timelineContainer = document.querySelector('.timeline-container');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (!timelineContainer) return;

  // Initialize IntersectionObserver for timeline animation
  const timelineOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate timeline line
        const line = entry.target.querySelector('.timeline-line');
        if (line) {
          line.style.opacity = '1';
        }

        // Show timeline items with animation
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
          }, index * 100);
        });

        timelineObserver.unobserve(entry.target);
      }
    });
  }, timelineOptions);

  timelineObserver.observe(timelineContainer);

  // Add hover effects to timeline items
  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-4px)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });
});
