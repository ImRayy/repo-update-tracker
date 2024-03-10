module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],

  // REST OF YOUR CUSTOM PRETTIER CONFIG GOES BELOW
  pluginSearchDirs: false,
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  semi: true,
  tabWidth: 2,
  trailingComma: "es5",
};
