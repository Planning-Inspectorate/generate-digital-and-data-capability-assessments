/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} node
 * @param {string} tag
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode[]} results
 * @returns {import('parse5').DefaultTreeAdapterTypes.ChildNode[]}
 */
export function getDescendantsByTag(node, tag, results = []) {
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].tagName === tag) {
        results.push(node.childNodes[i]);
      }
      getDescendantsByTag(node.childNodes[i], tag, results);
    }
  }
  return results;
}

/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} node
 * @param {string} tag
 * @returns {import('parse5').DefaultTreeAdapterTypes.ChildNode|undefined}
 */
export function getDescendantByTag(node, tag) {
  if (node.childNodes) {
    for (const item of node.childNodes) {
      if (item.tagName === tag) {
        return item;
      }
      const child =  getDescendantByTag(item, tag);
      if (child){
        return child;
      }
    }
  }
}

/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} node
 * @param {string} id
 * @returns {import('parse5').DefaultTreeAdapterTypes.ChildNode|undefined}
 */
export function getDescendantById(node, id) {
  if (node.childNodes) {
    for (const item of node.childNodes) {
      if (item?.attrs?.some(a => a.name === 'id' && a.value === id)) {
        return item;
      }
      const child =  getDescendantById(item, id);
      if (child){
        return child;
      }
    }
  }
}
/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} node
 * @param {string} className
 * @returns {import('parse5').DefaultTreeAdapterTypes.ChildNode|undefined}
 */
export function getDescendantByClass(node, className) {
  if (node.childNodes) {
    for (const item of node.childNodes) {
      if (item?.attrs?.some(a => a.name === 'class' && hasClassName(a.value, className))) {
        return item;
      }
      const child =  getDescendantByClass(item, className);
      if (child){
        return child;
      }
    }
  }
}

/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} node
 * @param {string} className
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode[]} results
 * @returns {import('parse5').DefaultTreeAdapterTypes.ChildNode[]}
 */
export function getDescendantsByClass(node, className, results = []) {
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const item = node.childNodes[i];
      if (item?.attrs?.some(a => a.name === 'class' && hasClassName(a.value, className))) {
        results.push(item);
      }
      getDescendantsByClass(item, className, results);
    }
  }
  return results;
}

/**
 * @param {string} value
 * @param {string} className
 * @returns {boolean}
 */
function hasClassName(value, className) {
  const classes = value.split(' ');
  return classes.includes(className);
}

/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} node
 * @param {string} content
 * @returns {import('parse5').DefaultTreeAdapterTypes.ChildNode|undefined}
 */
export function getDescendantByContent(node, content) {
  if (node.childNodes) {
    for (const item of node.childNodes) {
      if (item.childNodes?.length === 1 && item.childNodes[0].nodeName === '#text') {
        if (item.childNodes[0].value.includes(content)) {
          return item;
        }
      }
      const child =  getDescendantByContent(item, content);
      if (child){
        return child;
      }
    }
  }
}


/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} node
 * @returns {string|undefined}
 */
export function getText(node) {
  if (node.childNodes?.length === 1 && node.childNodes[0].nodeName === '#text') {
    return node.childNodes[0].value;
  }
}