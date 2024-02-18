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
        "@typescript-eslint/consistent-type-imports": "error",
        "sort-imports": [
          "error",
          {
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["single", "multiple", "all", "none"],
            allowSeparatedGroups: false,
          },
        ],
      },
    },
  ],
};
