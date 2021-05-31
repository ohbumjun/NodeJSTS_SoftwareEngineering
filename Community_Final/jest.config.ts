module.exports = {
    roots: ['<rootDir>/test'],
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
    transform: {
        '^.+\\.(ts)?$': 'ts-jest',
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    ]
};

