// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";


// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
// ]);

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      sourceType: "commonjs", // CommonJS used in Node.js
      globals: globals.node   // ✅ Node.js environment globals
    },
    plugins: {
      js,
    },
    extends: ["plugin:js/recommended"], // Optional: use js/recommended rules
  }
]);

