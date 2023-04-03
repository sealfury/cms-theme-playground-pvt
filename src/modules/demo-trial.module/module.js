// function submitFormData(formElement) {
//   const data = new FormData(formElement);

//   const req = new XMLHttpRequest();

//   req.addEventListener('load', (e) => {
//     console.log('successful');
//   });
//   req.addEventListener('error', (e) => {
//     console.log('ERROR', req.status());
//   });
//   req.open('POST', 'https://mm8-api.maintmaster.com/api/systemrequest');
//   req.send(data);
// }

// window.addEventListener('load', function () {
//   var formContainer = document.querySelector(
//     '#hs_form_target_trial'
//   );
//   var form = formContainer.querySelector('form');
//   // var legalConsent = form.querySelector('.legal-consent-container');
//   var emailInput = form.querySelector('input[name="email"]')
//   console.log(emailInput.value);
//   if (form && legalConsent) {
//     var emailContainer = form.querySelector('.hs-email');
//     emailContainer.appendChild(legalConsent);
//   }

//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     submitFormData(form);
//   });
// });

function submitFormData(email, lang) {
  const data = { EmailAddress: email, Language: lang };
  const req = new XMLHttpRequest();

  req.addEventListener('load', (e) => {
    console.log('successful');
  });
  req.addEventListener('error', (e) => {
    console.log('ERROR', req.status());
  });

  req.open('POST', 'https://mm8-api.maintmaster.com/api/systemrequest');

  req.setRequestHeader('Content-Type', 'application/json');

  req.send(JSON.stringify(data));
}

window.addEventListener('load', function () {
  setTimeout(() => {
    var formContainer = document.getElementById('hs_form_target_trial');
    var form = formContainer.querySelector('form');
    var emailInput = form.querySelector('input[type="email"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitFormData(emailInput.value, document.documentElement.lang);
    });
  }, 100);
});
