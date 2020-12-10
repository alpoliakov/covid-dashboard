module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
      },
    ],
  ],
};
