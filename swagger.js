"use strict"

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */
// npm i swagger-autogen

const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = {

	info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		contact: { name: packageJson.author, email: "mhturkel@gmail.com" },
		license: { name: packageJson.license, },
	},
	host: `${HOST}:${PORT}`,
	basePath: '/',
	schemes: ['http', 'https'],
	// JWT Settings:
	securityDefinitions: {
		JWT: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Entry Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>'
		}
	},
	security: [{ "JWT": true }],
	definition: {
		"/auth/login": {
			username: {
				type: "String",
				required: true
			},
			password: {
				type: "String",
				required: true
			},
		},
		"/auth/refresh": {
			"token.refresh": {
				description: "{ token: { refresh: ... } }",
				type: "String",
				required: true
			}
		},
	
		"Reservation": require('./models/reservationModel').schema.obj,
		"Restaurant": require('./models/restaurantModel').schema.obj,
		"User": require('./models/userModel').schema.obj,
	}
};

const routes = ['./index.js']
const outputFile = './swagger.json'

// Create JSON file:
swaggerAutogen(outputFile, routes, document)