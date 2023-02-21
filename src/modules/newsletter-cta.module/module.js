// Await form instertion into DOM before manipulating
// window.addEventListener('message', (e) => {
//   if (e.data.type === 'hsFormCallback' && e.data.eventName === 'onFormReady') {
//     // Make sure to select the correct form
//     var formContainer = document.querySelector(
//       '#hs_form_target_newsletter-email-form'
//     );
//     var form = formContainer.querySelector('form');
//     var legalConsent = form.querySelector('.legal-consent-container');

//     if (form && legalConsent) {
//       var emailContainer = form.querySelector('.hs-email');
//       emailContainer.appendChild(legalConsent);
//     }

//     var pageLang = document.documentElement.lang;
//     var formLang;
//     switch (pageLang) {
//       case 'en':
//         formLang = 'en-US';
//         break;
//       case 'sv':
//         formLang = 'sv-SV';
//         break;
//       case 'de':
//         formLang = 'de-DE';
//         break;
//     }
//     // submitFormData(form);
//   }

//   // form.addEventListener('formdata', function (e) {
//   //   const formData = e.formData;
//   //   const req = new XMLHttpRequest();
//   //   for (const val of formData.values()) {
//   //     console.log(val);
//   //   }

//   //   req.open('POST', 'https://mm8-api.maintmaster.com/api/systemrequest');
//   //   req.send(formData);
//   // });
// });

function submitFormData(formElement) {
  const data = new FormData(formElement);

  const req = new XMLHttpRequest();

  req.addEventListener('load', (e) => {
    console.log('successful');
  });
  req.addEventListener('error', (e) => {
    console.log('ERROR', req.status());
  });
  req.open('POST', 'https://mm8-api.maintmaster.com/api/systemrequest');
  req.send(data);
}

window.addEventListener('load', function () {
  var formContainer = document.querySelector(
    '#hs_form_target_newsletter-email-form'
  );
  var form = formContainer.querySelector('form');
  var legalConsent = form.querySelector('.legal-consent-container');
  var emailInput = form.querySelector('input[name="email"]');

  if (form && legalConsent) {
    var emailContainer = form.querySelector('.hs-email');
    emailContainer.appendChild(legalConsent);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitFormData(form);
  });
});
