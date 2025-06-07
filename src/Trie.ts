// src/Trie.js

class TrieNode {
  constructor() {
    this.children = {};
    this.ids = [];
    this.isEndOfWord = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, id) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.ids.push(id);
    node.isEndOfWord = true;
  }

  search(prefix) {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    return this._findAllIds(node);
  }

  _findAllIds(node) {
    let result = [...node.ids];
    for (const char in node.children) {
      result.push(...this._findAllIds(node.children[char]));
    }
    return result;
  }

  // --- NEW METHOD to get the full path for a single word ---
  getWordPath(word) {
    const path = [];
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        return []; // Word not found, return empty path
      }
      path.push(char);
      node = node.children[char];
    }
    return path;
  }
}
