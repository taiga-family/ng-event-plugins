import {type JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: '@taiga-ui/jest-config',
    testMatch: ['<rootDir>/projects/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/projects/**/*.ts'],
};

export default config;
