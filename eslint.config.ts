import taiga from '@taiga-ui/eslint-plugin-experience-next';

export default [
    ...taiga.configs.recommended,
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            'import/no-webpack-loader-syntax': 'off',
            'func-style': 'off',
        },
    },
    {
        files: ['**/*.md'],
        rules: {'markdown/heading-increment': 'off'},
    },
];
