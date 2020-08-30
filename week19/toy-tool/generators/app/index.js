var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  collecting() {
    this.log('method 1 just ran');
  }

  creating() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { title: 'Template with Yeoman' } // user answer `title` used
    );
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('lib/createElement.js'),
    )
    this.fs.copyTpl(
      this.templatePath('animation.js'),
      this.destinationPath('lib/animation.js'),
    )
    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('lib/gesture.js'),
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: 'Template with Yeoman' } // user answer `title` used
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.html'),
      this.destinationPath('webpack.config.html'),
      { title: 'Template with Yeoman' } // user answer `title` used
    );
    this.npmInstall([
      '@babel/core',
      '@babel/plugin-transform-react-jsx',
      '@babel/preset-env',
      '@istanbuljs/nyc-config-babel',
      'babel-loader',
      'babel-plugin-istanbul',
      'css',
      'css-loader',
      'mocha',
      'nyc',
      'webpack',
      'webpack-cli',
      'webpack-dev-server'
    ], { 'save-dev': true });
  }
};
