// src/components/Autocomplete.js

import React, { useState } from "react";
// Assuming the hook is in a subdirectory
import { useAutocomplete } from "./use-autocomplete";
import { TrieVisualizer } from "./TrieVisualizer";

// --- Styles remain the same ---
const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px 15px",
    fontSize: "16px",
    border: "1px solid #4A5568", // Tailwind gray-600
    borderRadius: "8px",
    boxSizing: "border-box",
    backgroundColor: "#2D3748", // Tailwind gray-800
    color: "#E2E8F0", // Tailwind gray-200
  },
  list: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#1A202C", // Tailwind gray-900
    border: "1px solid #4A5568", // Tailwind gray-600
    borderTop: "none",
    borderRadius: "0 0 8px 8px",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    maxHeight: "300px",
    overflowY: "auto",
    zIndex: 1000,
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)", // Slightly adjusted shadow for dark bg
  },
  item: {
    padding: "10px 15px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background-color 0.2s",
    color: "#E2E8F0", // Tailwind gray-200
  },
  itemHover: {
    backgroundColor: "#2D3748", // Tailwind gray-800
  },
  category: {
    fontSize: "12px",
    color: "#A0AEC0", // Tailwind gray-400
    backgroundColor: "#4A5568", // Tailwind gray-600
    padding: "2px 6px",
    borderRadius: "4px",
  },
  trieDisplayArea: {
    // marginTop will be removed/adjusted as it's now side-by-side
    // width will be set to 50% in the JSX
    height: '100%', // Allow it to take full height of its flex container if needed
  },
  trieHeader: {
    marginBottom: '0.75rem', // Equivalent to Tailwind's mb-3
    fontSize: '1.25rem',    // Equivalent to Tailwind's text-xl
    fontWeight: '600',      // Equivalent to Tailwind's font-semibold
    textAlign: 'center',
    color: '#E2E8F0',       // Tailwind gray-200, consistent text color
  },
  trieContainer: {
    height: '300px',   // Fixed height for the visualizer
    overflowY: 'auto', // Enable vertical scrolling
    border: '1px solid #4A5568', // Consistent border style
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#1A202C', // Consistent background
    boxSizing: 'border-box',
    // Horizontal scrolling will be enabled by default if content overflows
  },
};

export const Autocomplete = ({ data, idKey, searchKey, placeholder }) => {
  // --- CHANGE 1: Destructure 'suggestionPaths' instead of 'focalPath' ---
  const { searchTerm, setSearchTerm, suggestions, consolidatedPath } =
    useAutocomplete(data, idKey, searchKey);
    const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="justify-center" style={{
      display: "flex", // Changed to row layout
      flexDirection: "row",
      alignItems: "flex-start", // Align items to the top of the flex container
      width: "100%",      // Ensure component takes up available width from parent
      gap: "20px",        // Add some space between the two columns
    }}>
      {/* Left Column: Autocomplete Input and Suggestions */}
      <div style={{ ...styles.wrapper, width: "50%" }}> 
        {/* styles.wrapper already has position: relative, width: 100% (which is fine here as it's 100% of this 50% column), and maxWidth: 400px */}
        <input
          type="text"
          style={styles.input}
          placeholder={placeholder || "Search..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul
            style={styles.list}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {suggestions.map((item, index) => (
              <li
                key={item[idKey]}
                style={{
                  ...styles.item,
                  ...(hoveredIndex === index ? styles.itemHover : null),
                }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {item[searchKey]}
                <span style={styles.category}>
                  {item.category}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Right Column: Trie Visualizer */}
      <div style={{ ...styles.trieDisplayArea, width: "50%", marginTop: 0 }}>
        <h2 style={styles.trieHeader}>Suggestion Paths</h2>
        <div style={styles.trieContainer}>
          <TrieVisualizer path={consolidatedPath} prefix={searchTerm} />
        </div>
      </div>
    </div>
  );
};
