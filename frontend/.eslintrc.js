// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['react-app', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'no-console': 'warn',
        'import/first': 'error',
        'react/prop-types': 0,
        'linebreak-style': ['error', 'unix'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
