// src/hooks/useAutocomplete.js

import { useState, useMemo, useEffect, useRef } from "react";
import { Trie } from "./Trie";
import { consolidatePaths } from "./path-consolidator"; // <-- Import the new utility

export const useAutocomplete = (data, idKey, searchKey) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // --- NEW STATE: Stores the consolidated tree structure ---
  const [consolidatedPath, setConsolidatedPath] = useState([]);
  const cache = useRef(new Map());

  // Trie and dataMap logic remains the same
  const { trie, dataMap } = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0)
      return { trie: null, dataMap: new Map() };
    const newTrie = new Trie();
    for (const item of data) {
      newTrie.insert(item[searchKey], item[idKey]);
    }
    const newDataMap = new Map(data.map((item) => [item[idKey], item]));
    return { trie: newTrie, dataMap: newDataMap };
  }, [data, idKey, searchKey]);

  useEffect(() => {
    if (!trie) return;

    if (searchTerm.length < 2) {
      setSuggestions([]);
      setConsolidatedPath([]); // Clear path when input is short
      return;
    }

    const handler = setTimeout(() => {
      let results = [];
      if (cache.current.has(searchTerm)) {
        results = cache.current.get(searchTerm);
      } else {
        const resultIds = trie.search(searchTerm);
        results = resultIds.map((id) => dataMap.get(id)).filter(Boolean);
        cache.current.set(searchTerm, results);
      }

      setSuggestions(results);

      // --- NEW LOGIC: Consolidate the paths of the top results ---
      const topResults = results.slice(0, 6);
      // Get paths with isEndOfWord information from the trie for each result
      const objectPaths = topResults.map(item => trie.getWordPath(item[searchKey])).filter(p => p.length > 0);

      if (objectPaths.length > 0) {
        setConsolidatedPath(consolidatePaths(objectPaths));
      } else {
        setConsolidatedPath([]);
      }
      // -----------------------------------------------------------
    }, 250);

    return () => clearTimeout(handler);
  }, [searchTerm, trie, dataMap]);

  return { searchTerm, setSearchTerm, suggestions, consolidatedPath };
};
