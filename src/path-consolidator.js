// src/path-consolidator.js

/**
 * Transforms a list of paths (e.g., ['apple', 'apply']) into a consolidated
 * tree structure suitable for rendering.
 * Shared prefixes appear once, and branches are nested.
 * e.g., ['a', 'p', 'p', [['l', 'e'], ['l', 'y']]]
 */
export function consolidatePaths(paths) {
  // 1. Build a temporary tree (prefix tree) from the paths
  const tree = {};
  for (const path of paths) {
    let currentNode = tree;
    for (const charObj of path) { // path is now like [{char: 'a', isEndOfWord: false}, ...]
      if (!currentNode[charObj.char]) {
        currentNode[charObj.char] = { _isEndOfWord: charObj.isEndOfWord, _children: {} };
      } else if (charObj.isEndOfWord) { // If path 'a' exists, and now we process 'a' as endOfWord
        currentNode[charObj.char]._isEndOfWord = true;
      }
      currentNode = currentNode[charObj.char]._children;
    }
  }

  // 2. Recursively convert the tree into our desired nested array structure
  function treeToConsolidatedArray(currentTreeLevel) {
    // currentTreeLevel refers to the _children object of a conceptual node
    // or the root tree object itself.
    const charsAsKeys = Object.keys(currentTreeLevel);

    // If it's a leaf node (no more children from this level), stop.
    if (charsAsKeys.length === 0) {
      return [];
    }

    // If there's only one child, it's a linear path. Continue vertically.
    if (charsAsKeys.length === 1) {
      const charKey = charsAsKeys[0];
      const nodeData = currentTreeLevel[charKey]; // This is { _isEndOfWord: boolean, _children: {} }
      const restOfPath = treeToConsolidatedArray(nodeData._children);
      return [{ char: charKey, isEndOfWord: nodeData._isEndOfWord }, ...restOfPath];
    }

    // If there are multiple children, it's a branching point.
    // Create a nested array of columns.
    const branches = charsAsKeys.map((charKey) => {
      const nodeData = currentTreeLevel[charKey];
      const branchPath = treeToConsolidatedArray(nodeData._children);
      return [{ char: charKey, isEndOfWord: nodeData._isEndOfWord }, ...branchPath];
    });

    // Wrap the branches in an outer array to signify a horizontal layout.
    return [branches];
  }

  return treeToConsolidatedArray(tree); // Start with the root of the tree
}
