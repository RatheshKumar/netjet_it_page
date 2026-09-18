/*
  NETJET INFOTECH
  Form validation — shared across contact, careers, industries pages
*/

(function () {
  'use strict';

  function validateForm (form) {
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => (el.textContent = ''));

    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      const val = field.value.trim();
      const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
      if (!val) {
        valid = false;
        if (errorEl) errorEl.textContent = 'This field is required.';
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    });

    // Email validation
    const emailFields = form.querySelectorAll('[type="email"]');
    emailFields.forEach(field => {
      const val = field.value.trim();
      const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
      if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        valid = false;
        if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        field.setAttribute('aria-invalid', 'true');
      }
    });

    return valid;
  }

  function attachForm (form) {
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm(form)) return;

      // Show success message (replace with real endpoint integration)
      const success = form.querySelector('.form-success');
      if (success) {
        success.textContent = '— Message received. We\'ll be in touch within 24 hours.';
        success.removeAttribute('hidden');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
    });
  }

  document.querySelectorAll('form[data-netjet-form]').forEach(attachForm);
})();
