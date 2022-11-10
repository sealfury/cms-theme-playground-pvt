// Module variables
var playButtons = document.querySelectorAll('.autoplay__button');
var features = document.querySelectorAll('.key-features__feature');

// Play on click (disabled autoplay) functionality
if (features) {
  features.forEach(function (feature) {
    const getSiblings = (el) => {
      let siblings;
      let sibling = el.parentNode.firstChild;
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== el) {
          siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
      }
      return siblings;
    };

    var playButton = feature.querySelector('.autoplay_button');

    playButton.addEventListener('click', (e) => {
      var featureSiblings = getSiblings(feature);
      var siblingPlayers = featureSiblings.querySelector('.autoplay__overlay');
      var href = e.target.getAttribute('href');
      var image = document.createElement('img');
      e.preventDefault();

      image.setAttribute('src', href);
      image.classList.add('key-features__player--img');
      document.body.insertBefore(image, e.target);
      e.target.remove();
      e.target.parentNode.classList.add('playing');

      siblingPlayers.forEach(function (player) {
        var siblingImg = player
          .querySelector('key-features__player--img');
        var siblingImgSrc = siblingImg.getAttribute('src');
        var newButton = document
          .createElement('a')
          .setAttribute('href', siblingImgSrc)
          .classList.add('autoplay__button');
        if (player.classList.contains('playing')) {
          player.classList.remove('playing');
          document.body.insertBefore(siblingImg, newButton);
        }
      });
    });
  });
}

// playButtons.forEach(function (button) {
//   button.addEventListener('click', (e) => {
//     const href = e.target.getAttribute('href');
//     const image = document.createElement('img');
//     e.preventDefault();

//     image.setAttribute('src', href);
//     image.classList.add('key-features__player--img');
//     document.body.insertBefore(image, e.target);
//     e.target.remove();
//   });
// });
