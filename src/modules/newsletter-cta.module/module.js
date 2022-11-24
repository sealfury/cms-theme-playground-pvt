// Await form instertion into DOM before manipulating
window.addEventListener('message', (e) => {
  if (e.data.type === 'hsFormCallback' && e.data.eventName === 'onFormReady') {
    // Make sure to select the correct form
    var formContainer = document.querySelector(
      '#hs_form_target_newsletter-email-form'
    );
    var form = formContainer.querySelector('form');
    var legalConsent = form.querySelector('.legal-consent-container');

    if (form && legalConsent) {
      var emailContainer = form.querySelector('.hs-email');
      emailContainer.appendChild(legalConsent);
    }
  }
});
