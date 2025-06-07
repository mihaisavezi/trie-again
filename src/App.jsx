// src/App.js
import React from "react";
import { sampleData } from "./users-data";
import { Autocomplete } from "./AutocompleteComponent";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 sm:p-8 font-sans">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-center tracking-tight">
        Trie Again
      </h1>
      <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 text-center max-w-xl md:max-w-2xl">
        I failed. I had to design an autocomplete component in a system design
        interview for a frontend role. I failed to mention tries.
      </p>
      <p className="text-base sm:text-lg text-gray-300 text-center max-w-xl md:max-w-2xl">
        So to celebrate this, I'm building this for everyone to visualise how
        tries work.
      </p>
      <p className="text-xs text-gray-400 mb-20">
        Obviously you could look this up in your browser console, but where's
        the fun in that?
      </p>
      {/* Container for the Autocomplete component */}
      <div className="w-full max-w-5xl">
        <Autocomplete
          data={sampleData}
          idKey="id"
          searchKey="name"
          placeholder="Search for a fruit or whatever you find in this random list..."
        />
      </div>
    </div>
  );
}

export default App;
