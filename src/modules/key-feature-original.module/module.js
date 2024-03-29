// Module variables
var playButtons = document.querySelectorAll('.autoplay__button');
var features = document.querySelectorAll('.key-features__feature');

// Play on click (disabled autoplay) functionality
if (features) {
  features.forEach(function (feature) {
    const getSiblings = function (el) {
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

    var playButton = feature.querySelector('.autoplay__button');

    // TODO: when image has autoplay toggled on it never turns off
    // TODO: even when siblings are hovered over
    if (playButton) {
      playButton.addEventListener('mouseover', function () {
        this.parentNode.classList.add('playing');
        this.classList.add('playing');
        var image = this.parentNode.parentNode.querySelector(
          '.key-features__player--img'
        );
        if (image.classList.contains('not-playing')) {
          image.classList.remove('not-playing');
        }

        // Stop all other players when one is playing
        var parentCard =
          this.parentNode.parentNode.parentNode.parentNode.parentNode;
        var featureSiblings = getSiblings(parentCard);

        featureSiblings.forEach(function (sibling) {
          var player = sibling.querySelector('.autoplay__overlay');
          var siblingImg = sibling.querySelector('.key-features__player--img');
          var button = sibling.querySelector('.autoplay__button');

          if (button.classList.contains('playing')) {
            button.classList.remove('playing');
          }

          if (player.classList.contains('playing')) {
            player.classList.remove('playing');
          }

          if (!siblingImg.classList.contains('not-playing')) {
            siblingImg.classList.add('not-playing');
          }
        });
      });
    }
  });
}
