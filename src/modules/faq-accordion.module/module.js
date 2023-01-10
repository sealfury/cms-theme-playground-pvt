// Get element siblings helper
const getElementSiblings = function (el) {
  let siblings = [];

  if (!el.parentNode) {
    return siblings;
  }

  let sibling = el.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== el) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

var faqToggles = document.querySelectorAll('.accordion-menu__toggle');

if (faqToggles) {
  faqToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var faqQuestion = this.parentElement;
      var faqAnswer = this.parentElement.nextElementSibling;
      var answerSiblings = getElementSiblings(faqAnswer);

      if (
        faqAnswer.classList.contains('open') ||
        faqQuestion.classList.contains('open')
      ) {
        faqAnswer.classList.remove('open');
        faqQuestion.classList.remove('open');
      } else {
        faqAnswer.classList.add('open');
        faqQuestion.classList.add('open');
      }

      answerSiblings.forEach(function (sibling) {
        if (sibling.classList.contains('open') && sibling !== faqQuestion) {
          sibling.classList.remove('open');
        }
      });
    });
  });

  var listItemFaqs = document.querySelectorAll('.accordion-menu__faq');
  for (var faq of listItemFaqs) {
    if (faq.classList.contains('open')) {
      faq.querySelector('a').setAttribute('aria-expanded', 'true');
      faq.querySelector('button').setAttribute('aria-expanded', 'true');
    } else {
      faq.querySelector('a').setAttribute('aria-expanded', 'false');
      faq.querySelector('button').setAttribute('aria-expanded', 'false');
    }
  }
}
