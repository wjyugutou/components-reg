export default {
  extends: '@yugutou/stylelint-config',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['@each', '@for', 'each', 'for'],
      },
    ],
  },
}
