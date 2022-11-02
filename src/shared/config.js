const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
const path = `${__dirname}/../../${envFile}`
const env = require('dotenv').config({ path })

module.exports = env.parsed