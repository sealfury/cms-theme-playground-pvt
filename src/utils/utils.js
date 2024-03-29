// Get Element siblings
// (for triggered events that also need to untrigger sibling events)
const getSiblings =  (element) => {
  let siblings = [];

  if (!element.parentNode) {
    return siblings;
  }

  let sibling = element.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== element) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

// Exports
// module.exports = {
//   getSiblings,
// };
