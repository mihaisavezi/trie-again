// src/App.js
import ReactDOM from "react-dom";
import React from "react";
import { useAutocomplete } from "./use-autocomplete";
import { TrieVisualizer } from "./TrieVisualizer"; // Import the visualizer
import { sampleData } from "./users-data";
import { Autocomplete } from "./AutocompleteComponent";

const styles = {
  app: { fontFamily: "sans-serif", padding: "20px" },
  container: { display: "flex", gap: "40px", alignItems: "flex-start", },
  leftPanel: { flex: 1 },
  rightPanel: { flex: 1, borderLeft: "1px solid #eee", paddingLeft: "20px" },
  header: { color: "#333" },
  paragraph: { color: "#666", marginBottom: "2rem" },
};

function App() {

  console.log("🚀 ~ App ~ sampleData:", sampleData);
  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Trie Again</h1>
      <p style={styles.paragraph}>
        To celebrate failing an interview on designing an autocomplete component, due to not discussing tries for storing the data to be easily searchable. I decided to build something to illustrate how a trie works.
      </p>
      <p style={styles.paragraph}>
        Type in the search box to see the Trie traversal in real-time.
      </p>
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          {/* Autocomplete Component from previous example */}
          <Autocomplete
            data={sampleData}
            idKey="id"
            searchKey="name"
            placeholder="Search for a fruit or vegetable..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;
