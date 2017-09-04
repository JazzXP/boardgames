var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [ { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader", 
                exclude: /\.scss.d.ts$/
            }, { 
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "typings-for-css-modules-loader",
                        options: {
                            modules: true,
                            namedExport: true
                        }
                    },{
                        loader: "sass-loader"
                    }]
                })
            }, {
                test: /\.js$/, 
                enforce: "pre", 
                loader: "source-map-loader" 
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "axios": "axios"
    },
    devServer: {
        hot: true,
        inline: true
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: true          
        // })
    ]
}