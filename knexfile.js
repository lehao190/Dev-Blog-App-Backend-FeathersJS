const app = require('./src/app')
module.exports = app.get('postgres')
// module.exports = app.get('mysql')