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
    maxWidth: "400px",
  },
  input: {
    width: "100%",
    padding: "10px 15px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  list: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderTop: "none",
    borderRadius: "0 0 8px 8px",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    maxHeight: "300px",
    overflowY: "auto",
    zIndex: 1000,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  item: {
    padding: "10px 15px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background-color 0.2s",
  },
  itemHover: {
    backgroundColor: "#f0f0f0",
  },
  category: {
    fontSize: "12px",
    color: "#888",
    backgroundColor: "#eee",
    padding: "2px 6px",
    borderRadius: "4px",
  },
};

export const Autocomplete = ({ data, idKey, searchKey, placeholder }) => {
  // --- CHANGE 1: Destructure 'suggestionPaths' instead of 'focalPath' ---
  const { searchTerm, setSearchTerm, suggestions, consolidatedPath } =
    useAutocomplete(data, idKey, searchKey);
    const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{
      display: "flex",
          flexDirection: "column",
          /* justify-content: center; */
          alignItems: "center",
    }}>
      <div style={styles.wrapper}>
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
      <div>
        <h2>Suggestion Paths</h2>
        {/* --- CHANGE 2: Pass the correct props: 'paths' and 'prefix' --- */}
        <TrieVisualizer path={consolidatedPath} prefix={searchTerm} />
      </div>
    </div>
  );
};
