// Module variables
var featureValues = document.querySelectorAll('.stats-banner__feature--value');
var featuresWrapper = document.getElementById('stats-banner');

// Increment helper functions
function animateValue(el, start, end, duration) {
  let startTime = null;
  const incrementVals = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(incrementVals);
    }
  };
  window.requestAnimationFrame(incrementVals);
}

function animateMultipleValues(elements) {
  elements.forEach(function (el) {
    var val = el.dataset.featureVal;
    animateValue(el, 0, val, 1000);
  });
}

// Component is visible helper function
function onComponentVisible(el, cb) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        cb(el);
        observer.disconnect();
      }
    });
  }).observe(el);
}

// Count-to-value animation
onComponentVisible(featuresWrapper, () => {
  animateMultipleValues(featureValues);
});
