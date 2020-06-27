module.exports = {
  entry: `${__dirname}/client/src/index.jsx`,
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: [/\.css/],
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },]
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/client/dist`,
  },
};
