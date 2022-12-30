var chapterLinks = document.querySelectorAll('.toc-sidebar__menu--link');
var pathLinkParam = window.location.href.split('#')[1];

chapterLinks.forEach(function (link) {
  if (link.getAttribute('data-link-params') == pathLinkParam) {
    link.classList.add('active-page');
  } else {
    link.classList.remove('active-page');
  }
});

var contentContainer = document.querySelector('.manual__chapter--content');
var rowWrapper = contentContainer.querySelectorAll(
  '.row-fluid-wrapper.dnd-section'
);

rowWrapper.forEach(function (row) {
  var anchorTag = row.querySelectorAll('a');
  anchorTag.forEach(function (tag) {
    if (
      tag.getAttribute('data-hs-anchor') &&
      tag.getAttribute('id') == pathLinkParam
    ) {
      row.classList.add('active');
    }
  });
});
