module.exports = {
  root: true,
  plugins: ["import"],
  extends: "@react-native",
  overrides: [
    {
      files: ["*.js", "*.ts", "*.jsx", "*.tsx"],
      rules: {
        quotes: ["warn", "double"],
      },
    },
    {
      files: ["*.js", "*.ts", "*.jsx", "*.tsx"],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              ["builtin", "external"],
              "internal",
              ["parent", "sibling", "index"],
              ["type"],
            ],
            pathGroups: [
              {
                pattern: "{react,react-dom,react-native}",
                group: "external",
                position: "before",
              },
            ],
            pathGroupsExcludedImportTypes: [
              "react",
              "react-dom",
              "react-native",
            ],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
          },
        ],
        "@typescript-eslint/consistent-type-imports": "error",
      },
    },
  ],
};
