var heroBannerVideo = document.querySelector('.hero-media-player__wrapper');
var popupContainer = document.querySelector('.popup-container');
var popupOverlay = document.querySelector('.popup-overlay');
var iframeContainer = document.querySelector('.popup-iframe-container');
var videoIframe = document.getElementById('popup-iframe');
var closeButton = document.querySelector('.popup-close');

// Use existing video iframe in modal instead of creating new
function cloneIframe(parent, container) {
  var iframe = parent.querySelector('iframe');
  var clonedIframe = iframe.cloneNode(true);
  var videoWidget = document.querySelector('.hs-video-widget');
  clonedIframe.setAttribute('id', 'popup-iframe');
  container.insertAdjacentElement('afterbegin', clonedIframe);
  videoWidget.setAttribute('style', 'display: none;');
}

// Activate popup video modal on click anywhere in hero banner video
function activatePopup() {
  var popupElements = Array.from([
    popupContainer,
    popupOverlay,
    iframeContainer,
    closeButton,
  ]);
  var closePopupClickables = Array.from([closeButton, popupOverlay]);
  var popupIframe = document.getElementById('popup-iframe');
  var originalIframe = heroBannerVideo.querySelector('iframe');
  var originalSrc = originalIframe.getAttribute('src');
  var allowAttr = originalIframe.getAttribute('allow');

  if (heroBannerVideo.getAttribute('data-has-popup') == 'true') {
    var clickToPopupLink = document.querySelector('.hero-media-player__popup');

    clickToPopupLink.addEventListener('click', function (e) {
      e.preventDefault();

      popupElements.forEach(function (element) {
        element.classList.add('show-popup');
      });

      if (!popupIframe.getAttribute('src').length) {
        popupIframe.setAttribute('src', originalSrc);
        popupIframe.setAttribute('allow', allowAttr);
      }
    });

    // Close popup on click outside or on close icon
    closePopupClickables.forEach(function (clickable) {
      clickable.addEventListener('click', function (e) {
        e.preventDefault();

        popupElements.forEach(function (element) {
          if (element.classList.contains('show-popup')) {
            element.classList.remove('show-popup');
          }
        });

        document.getElementById('popup-iframe').setAttribute('src', '');
      });
    });
  }
}

if (heroBannerVideo.children.length && !window.location.pathname.includes('editor')) {
  document.addEventListener('DOMContentLoaded', function () {
    // Wait for hubspot video iframe to load before trying to clone
    setTimeout(() => {
      cloneIframe(heroBannerVideo, iframeContainer);
    }, 100);

    // Wait for successful cloning/placing of iframe before enabling popup features
    setTimeout(() => {
      activatePopup();
    }, 200);
  });
}
