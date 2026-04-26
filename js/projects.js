/* ========================================
   PROJECTS.JS - Filter & Modal
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // Project Filtering
  // ========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
          card.style.opacity = '1';
        } else {
          card.classList.add('hidden');
          card.style.opacity = '0';
        }
      });
    });
  });

  // ========================================
  // Modal Functionality
  // ========================================
  const modals = document.querySelectorAll('.modal');

  // Open Modal
  window.openModal = function(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // Close Modal
  window.closeModal = function() {
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
  };

  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // ========================================
  // Prevent body scroll when modal is open
  // ========================================
  const modalCloseButtons = document.querySelectorAll('.modal-close');

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // ========================================
  // Smooth scroll inside modal
  // ========================================
  const modalContents = document.querySelectorAll('.modal-content');

  modalContents.forEach(content => {
    // Make modal scrollable if content is too long
    if (content.scrollHeight > window.innerHeight * 0.8) {
      content.style.overflowY = 'auto';
    }
  });
});
