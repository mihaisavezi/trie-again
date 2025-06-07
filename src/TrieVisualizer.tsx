// src/components/TrieVisualizer.js

import React from "react";

// --- Styles for the recursive tree visualizer ---
const styles = {
  // Main container for a vertical segment or horizontal branches
  nodeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  // Container for horizontal branches
  branchContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "140px", // Space between branches
    alignItems: "flex-start", // Align branches from the top
    paddingTop: "10px",
  },
  // Style for a single character node
  node: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    fontWeight: "bold",
    fontFamily: "monospace",
    border: "2px solid #ced4da",
    backgroundColor: "#ffffff",
    zIndex: 2,
    transition: "all 0.2s ease-in-out",
  },
  // Style for nodes that are part of the user's input prefix
  prefixNode: {
    backgroundColor: "#cfe2ff",
    borderColor: "#0d6efd",
    color: "#073b8a",
    transform: "scale(1.1)",
  },
  // Style for the down-arrow connector
  arrow: {
    fontSize: "24px",
    color: "#adb5bd",
    lineHeight: "0.5",
    margin: "4px 0",
  },
};

/**
 * A robust recursive component that renders the consolidated tree.
 * @param {Array} pathSegment - The current segment of the tree to render.
 * @param {string} prefix - The user's full search term.
 * @param {string} pathSoFar - The path accumulated from parent nodes, used for highlighting.
 */
const PathRenderer = ({ pathSegment, prefix, pathSoFar = "" }) => {
  if (!pathSegment || pathSegment.length === 0) {
    return null; // Base case: end of a path
  }

  const [currentItem, ...restOfPath] = pathSegment;
  const [nextItem, ...rest] = restOfPath;


  // --- BRANCHING LOGIC ---
  // If the current item is a nested array, it represents a branching point.
  if (Array.isArray(currentItem)) {
    return (
      <div style={styles.branchContainer}>
        {/* Render each branch recursively */}
        {currentItem.map((branch, index) => (
          <PathRenderer
            key={index}
            pathSegment={branch}
            prefix={prefix}
            pathSoFar={pathSoFar}
          />
        ))}
      </div>
    );
  }

  // --- LINEAR PATH LOGIC ---
  // Otherwise, the current item is a single character.
  const char = currentItem;
  const newPathSoFar = pathSoFar + char;
  const isPrefixPart = prefix.toLowerCase().startsWith(newPathSoFar.toLowerCase());
  return (
    <div style={styles.nodeContainer}>
      <div style={{ ...styles.node, ...(isPrefixPart && styles.prefixNode) }}>
        {char}
      </div>

      {/* Render an arrow if there's more to this path */}
      {restOfPath.length > 0 ? (
        Array.isArray(nextItem) ? (
          <div style={styles.arrow}>↙ ↘ </div>
        ) : (
          <div style={styles.arrow}>↓</div>
        )
      ) : null}

      {/* Continue rendering the rest of the path segment */}
      <PathRenderer
        pathSegment={restOfPath}
        prefix={prefix}
        pathSoFar={newPathSoFar}
      />
    </div>
  );
};

export const TrieVisualizer = ({ path, prefix }) => {
  if (!path || path.length === 0) {
    return (
      <p style={{ color: "#6c757d" }}>Suggestions will be visualized here.</p>
    );
  }

  return <PathRenderer pathSegment={path} prefix={prefix.toLowerCase()} />;
};
