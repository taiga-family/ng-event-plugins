import taiga from '@taiga-ui/eslint-plugin-experience-next';
import {globalIgnores} from 'eslint/config';

export default [
    ...taiga.configs.recommended,
    globalIgnores(['**/*.{js,mjs}']),
    {
        files: ['**/*.ts'],
        rules: {
            'import/no-webpack-loader-syntax': 'off',
        },
    },
];
