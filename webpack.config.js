module.exports = {
  entry: `${__dirname}/client/src/index.jsx`,
  resolve: {extensions: ['.js','.jsx']},
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/client/dist`,
  },
};
