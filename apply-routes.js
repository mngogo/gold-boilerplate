const path = require('path')
const bodyParser = require('body-parser')

module.exports = function applyRoutes (app) {
	app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
}