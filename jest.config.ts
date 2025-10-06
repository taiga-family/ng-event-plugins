import {type JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: '@taiga-ui/jest-config',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testMatch: ['<rootDir>/projects/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/projects/**/*.ts'],
};

export default config;
