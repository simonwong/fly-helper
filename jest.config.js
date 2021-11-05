module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.[t|j]sx?$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
      },
    ],
  },
  testEnvironment: 'jsdom',
}
