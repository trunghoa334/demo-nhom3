const path = require('path')
const dotenv = require('dotenv')

const desp = require('./package.json').dependencies
const modeEnv = process.env.NODE_ENV
dotenv.config({ path: path.resolve(__dirname, `.env.${modeEnv}`) })

module.exports = {
    publicPath: '/',
    moduleExposes: {},
    moduleRemotes: {},
    shared: {
        ...desp
    }
}
