// .stylelintrc.cjs
module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-clean-order",
  ],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9-]*$",
      { resolveNestedSelectors: true }
    ],
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["global"]
    }],
    "max-nesting-depth": 5,
    "no-empty-source": null,
    "keyframes-name-pattern": [
      "^(?:[a-z][a-z0-9-]*|[a-z][a-zA-Z0-9]+)$"
    ],
    "number-max-precision": 10,
    "scss/no-global-function-names": null,
    "scss/at-mixin-pattern": "^([a-z][a-z0-9-]*|[a-z][a-zA-Z0-9]+)$",
    "no-descending-specificity": null,
  },
  overrides: [
    {
      files: ["**/Header.module.scss"],
      rules: {
        "number-max-precision": null
      }
    }
  ],
  ignoreFiles: [
    "**/node_modules/**",
    "**/.next/**",
    "**/dist/**"
  ],
};
