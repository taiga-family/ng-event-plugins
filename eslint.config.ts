import taiga from '@taiga-ui/eslint-plugin-experience-next';
import {globalIgnores} from 'eslint/config';

export default [
    ...taiga.configs.recommended,
    globalIgnores(['**/*.{js,mjs}']),
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            'import/no-webpack-loader-syntax': 'off',
        },
    },
];
