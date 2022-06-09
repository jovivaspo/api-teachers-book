const dotenv = require('dotenv');
const path = require('path');

const uri = `../${process.env.NODE_ENV}.env`.replace(" ","")

dotenv.config({
    path: path.resolve(__dirname, uri )
})

module.exports = {
    NODE_ENV : process.env.NODE_ENV,
    PORT : process.env.PORT,
    URI_MONGO: process.env.URI_MONGO,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    KEY : process.env.KEY,
    EMAIL: process.env.EMAIL,
    PASS: process.env.PASS

}