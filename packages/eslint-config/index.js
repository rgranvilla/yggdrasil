const jsExtensions = [".js", ".jsx"];
const tsExtensions = [".ts", ".tsx"];
const allExtensions = jsExtensions.concat(tsExtensions);

module.exports = {
  extends: ["universe/web", "universe/native"],
  settings: {
    "import/extensions": allExtensions,
    "import/resolver": {
      "babel-module": {},
      node: {
        extensions: allExtensions,
      },
    },
  },
  parser: "@typescript-eslint/parser",
  plugins: ["import", "eslint-plugin-import-helpers"],
  rules: {
    "import/namespace": [
      "error",
      {
        allowComputed: true,
      },
    ],
    camelcase: "error",
    "import/no-unresolved": "error",
    "import-helpers/order-imports": [
      "error",
      {
        newlinesBetween: "always",
        groups: ["module", ["/^~/"], ["parent", "sibling", "index"]],
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
      },
    ],
    "no-use-before-define": "off",
    "no-array-constructor": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  ignorePatterns: [
    "!.*",
    "node_modules",
    ".next",
    ".turbo",
    "dist",
    "compiled",
    "build-next-static",
    "build-storybook-static",
    // Files bellow are not git ignored. Eslint fix in the making https://github.com/eslint/eslint/issues/15010
    "VersionInfo.ts",
    "next-env.d.ts",
  ],
};
