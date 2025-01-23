module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser", // Use TypeScript parser
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended", // Base ESLint rules
    "plugin:@typescript-eslint/recommended", // TypeScript rules
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors
  ],
  plugins: ["@typescript-eslint"], // Use TypeScript plugin
  rules: {
    // Customize rules as needed
    "prettier/prettier": "warn", // Show Prettier issues as warnings
    "@typescript-eslint/no-unused-vars": ["error"], // Error for unused variables
    "@typescript-eslint/explicit-module-boundary-types": "off", // Turn off explicit return types for functions
  },
};
