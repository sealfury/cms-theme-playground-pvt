var chapterLinks = document.querySelectorAll('.toc-sidebar__menu--link');
var splitPath = window.location.href.split('/');
var pathLinkParam = splitPath.pop();

var splitPath = window.location.href.split('/');
var editorPathParams = splitPath.filter(
  (param) => param == 'preview' || param == 'content'
);

if (!editorPathParams.length) {
  console.log('Live Mode');
} else {
  console.log('Edit Mode');
}

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

// if (!editorPathParams.length) {
//   var chapterNum = pathLinkParam.replace('-', ' ');
//   var chapterHTML =
//     '<span class="manual__chapter--eyebrow">' + chapterNum + '</span>';
//   var row = rowWrapper[0].insertAdjacentHTML('afterbegin', chapterHTML);
// }

// if (!editorPathParams.length) {
//   rowWrapper.forEach(function (row) {
//     var anchorTag = row.querySelectorAll('a');
//     anchorTag.forEach(function (tag) {
//       if (
//         tag.getAttribute('data-hs-anchor') &&
//         tag.getAttribute('id') !== pathLinkParam
//       ) {
//         row.classList.add('inactive');
//       }

//       if (
//         tag.getAttribute('data-hs-anchor') &&
//         tag.getAttribute('id') == pathLinkParam
//       ) {
//         var chapterNum = pathLinkParam.replace('-', ' ');
//         var chapterHTML =
//           '<span class="manual__chapter--eyebrow">' + chapterNum + '</span>';
//         row.insertAdjacentHTML('afterbegin', chapterHTML);
//       }
//     });
//   });
// }
