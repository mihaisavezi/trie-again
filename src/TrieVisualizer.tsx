// src/components/TrieVisualizer.js

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    gap: "40px", // Space between branches
    alignItems: "flex-start", // Align branches from the top
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
    border: "2px solid #4A5568", // Tailwind gray-600
    backgroundColor: "#2D3748", // Tailwind gray-800
    color: "#E2E8F0", // Tailwind gray-200
    zIndex: 2,
    transition: "all 0.2s ease-in-out",
  },
  endOfWordNode: {
    border: "2px solid #68D391", // Tailwind green-400
  },
  // Style for nodes that are part of the user's input prefix
  prefixNode: {
    backgroundColor: "#3182CE", // Tailwind blue-600
    borderColor: "#63B3ED", // Tailwind blue-400
    color: "#FFFFFF", // White
    transform: "scale(1.1)",
  },
  // Style for the down-arrow connector
  arrow: {
    fontSize: "24px",
    color: "#718096", // Tailwind gray-500
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
const nodeVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

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
      <motion.div style={styles.branchContainer}>
        {/* Render each branch recursively */}
        {currentItem.map((branch, index) => (
          <AnimatePresence key={index}>
            <PathRenderer
              pathSegment={branch}
              prefix={prefix}
              pathSoFar={pathSoFar}
            />
          </AnimatePresence>
        ))}
      </motion.div>
    );
  }

  // --- LINEAR PATH LOGIC ---
  // Otherwise, the current item is an object like { char: 'a', isEndOfWord: true }
  const charObject = currentItem; // currentItem is now an object
  const char = charObject.char;
  const isEndOfWord = charObject.isEndOfWord;
  const newPathSoFar = pathSoFar + char;
  const isPrefixPart = prefix.toLowerCase().startsWith(newPathSoFar.toLowerCase());

  const nodeStyle = {
    ...styles.node,
    ...(isPrefixPart && styles.prefixNode),
    ...(isEndOfWord && styles.endOfWordNode), // Apply endOfWordNode style
  };

  return (
    <motion.div
      style={styles.nodeContainer}
      variants={nodeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div style={nodeStyle} variants={nodeVariants}> {/* Apply combined style */}
        {char}
      </motion.div>

      {/* Render an arrow if there's more to this path */}
      {restOfPath.length > 0 ? (
        Array.isArray(nextItem) ? (
          <div style={styles.arrow}>↙ ↘ </div>
        ) : (
          <div style={styles.arrow}>↓</div>
        )
      ) : null}

      {/* Continue rendering the rest of the path segment */}
      <AnimatePresence>
        <PathRenderer
          pathSegment={restOfPath}
          prefix={prefix}
          pathSoFar={newPathSoFar}
        />
      </AnimatePresence>
    </motion.div>
  );
};

export const TrieVisualizer = ({ path, prefix }) => {
  if (!path || path.length === 0) {
    return (
      <p style={{ color: "#A0AEC0" }}>Suggestions will be visualized here.</p> // Tailwind gray-400
    );
  }

  return (
    <AnimatePresence>
      <PathRenderer pathSegment={path} prefix={prefix.toLowerCase()} />
    </AnimatePresence>
  );
};
