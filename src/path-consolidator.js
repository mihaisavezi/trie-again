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
    for (const char of path) {
      if (!currentNode[char]) {
        currentNode[char] = {};
      }
      currentNode = currentNode[char];
    }
  }

  // 2. Recursively convert the tree into our desired nested array structure
  function treeToConsolidatedArray(node) {
    const keys = Object.keys(node);

    // If it's a leaf node, stop.
    if (keys.length === 0) {
      return [];
    }

    // If there's only one child, it's a linear path. Continue vertically.
    if (keys.length === 1) {
      const char = keys[0];
      const restOfPath = treeToConsolidatedArray(node[char]);
      return [char, ...restOfPath];
    }

    // If there are multiple children, it's a branching point.
    // Create a nested array of columns.
    const branches = keys.map((char) => {
      const branchPath = treeToConsolidatedArray(node[char]);
      return [char, ...branchPath];
    });

    // Wrap the branches in an outer array to signify a horizontal layout.
    return [branches];
  }

  return treeToConsolidatedArray(tree);
}
