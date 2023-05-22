module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^(?:../)*assets/(.*)$',
    '^(?:../)*constants/(.*)$',
    '^(?:../)*helpers/(.*)$',
    '^(?:../)*navigation/(.*)$',
    '^(?:../)*redux/(.*)$',
    '^(?:../)*components/(.*)$',
    '^(?:../)*screens/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};