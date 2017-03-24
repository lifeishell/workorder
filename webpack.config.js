const path = require('path');
const webpack = require("webpack");
const process = require("process");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//设置输入和输出根目录
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const DEV_PATH = path.resolve(ROOT_PATH, 'dev');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
//获取所有入口文件
const getEntries = require('./getEntries')();
//获取环境
const env = process.env.NODE_ENV;
//循环生成每个入口文件对应的html
const HtmlWebpack = [];
Object.keys(getEntries).forEach((item, index) => {
    let chunks = [item];
    switch (item) {
        case 'admin':
            item = 'admin';
            break;
        case 'user':
            item = 'user';
            break;
        case 'leader':
            item = 'leader';
            break;
        case 'index':
            item = 'index';
            break;
    }
    //动态生成html插件
    HtmlWebpack[index] = new HtmlWebpackPlugin({
        // favicon:'./src/img/favicon.ico', //favicon路径
        filename: `./${item}.html`, //生成的html存放路径，相对于 path
        template: `./src/pages/${item}.html`,
        chunks: chunks,
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: true, //为静态资源生成hash值
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    })
});

module.exports = {
    entry: getEntries,
    output: {
        path: env === 'development' ? DEV_PATH : BUILD_PATH,
        //publicPath: "/assets/",
        filename: "[name].js"
    },
    //目前最流行的Source Maps选项是cheap-module-eval-source-map，这个工具会帮助开发环境下在Chrome/Firefox中显示源代码文件，其速度快于source-map与eval-source-map：
    devtool: env === 'development' ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    devServer: {
        contentBase: DEV_PATH,
        historyApiFallback: true,
        hot: true,
        open: true,
        inline: true,
        port: 3333
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "eslint-loader",
            exclude: /node_modules/,
            enforce: 'pre' //webpack2写法
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
            //loaders的处理顺序是从右到左的，这里就是先运行css-loader然后是style-loader
            include: APP_PATH
        }, {
            test: /\.(woff|svg|eot|ttf|woff2)\??.*$/,
            loader: 'url-loader?name=./fonts/[name].[ext]'
        }, {
            test: /\.(png|jpg|gif|jpeg)$/,
            loader: 'file-loader?name=./images/[name].[ext]'
        }, {
            test: /\.html$/, //获取html里面的图片
            loader: 'html-loader'
        }, {
            test: /\.js$/, //用babel编译jsx和es6
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['es2015']
            }
        }]
    },
    watch: env === 'development',
    plugins: HtmlWebpack
};
switch (env) {
    case 'production':
        module.exports.plugins = (module.exports.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            //loader的最小化文件模式将会在webpack 3或者后续版本中被彻底取消掉.为了兼容部分旧式loader，你可以通过 LoaderOptionsPlugin 的配置项来提供这些功能。
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            //每次运行webpack清理上一次的文件夹
            new CleanPlugin([BUILD_PATH]),
            //压缩混淆JS插件,UglifyJsPlugin 将不再支持让 Loaders 最小化文件的模式。debug 选项已经被移除。Loaders 不能从 webpack 的配置中读取到他们的配置项。
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                },
                comments: false,
                beautify: false,
                sourceMap: false
            })
        ]);
        break;
}