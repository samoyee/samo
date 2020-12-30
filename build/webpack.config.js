const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "development";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const __wd = path.resolve(__dirname, "../");

module.exports = {
    mode: NODE_ENV,
    entry: {
        index: path.join(__wd, 'src/entry')
    },
    output: {
        path: path.resolve(__wd, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules", path.join(__wd, "src/components")],
        alias: {
            api: path.join(__wd, "src/api"),
            components: path.join(__wd, "src/assets"),
            main: path.join(__wd, "src/components"),
            store: path.join(__wd, "src/store"),
            utils: path.join(__wd, "src/utils"),
        },
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            automaticNameDelimiter: "-",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: 10,
                },
            },
        },
        runtimeChunk: {
            name: "manifest",
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/env", "@babel/react"],
                    plugins: [
                        "@babel/transform-runtime",
                        "@babel/plugin-proposal-export-default-from",
                        "@babel/plugin-proposal-logical-assignment-operators",
                        ["@babel/plugin-proposal-optional-chaining", { loose: false }],
                        ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
                        ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
                        "@babel/plugin-proposal-do-expressions",
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        "@babel/plugin-proposal-function-sent",
                        "@babel/plugin-proposal-export-namespace-from",
                        "@babel/plugin-proposal-numeric-separator",
                        "@babel/plugin-proposal-throw-expressions",
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-syntax-import-meta",
                        ["@babel/plugin-proposal-class-properties", { loose: false }],
                        "@babel/plugin-proposal-json-strings",
                    ],
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        }),
        // new CopyWebpackPlugin([
        //     { from: "public/file", to: "file" },
        //     { from: "public/i18n", to: "i18n" },
        // ]),
        new HtmlWebpackPlugin({
            title: "samo | 夏天",
            template: path.resolve(__wd, 'public/index.html'),
            filename: 'index.html',
            favicon: path.resolve(__wd, 'public/favicon.ico'),
            inject: true,
            chunks: ["manifest", "vendors", "index"],
            minify: !isDev && {
                removeRedundantAttributes: true, // 删除多余的属性
                collapseWhitespace: true, // 折叠空白区域
                removeAttributeQuotes: true, // 移除属性的引号
                removeComments: true, // 移除注释
                collapseBooleanAttributes: true, // 省略只有 boolean 值的属性值 例如：readonly checked
            },
        })
    ],
};
