const path = require('path')

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].js'
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            'node_modules': path.resolve(__dirname, 'node_modules'),
            'src': path.resolve(__dirname, 'src')
        }
    }
}