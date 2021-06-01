// Firebase Configuration
// const admin = require('firebase-admin')
// const serviceAccount = require('../serviceAccountKey.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'dev-blogger-app.appspot.com'
// })
// const firebaseBucket = admin.storage().bucket()
// exports.firebaseBucket = firebaseBucket

/*  FireBase Config  */

const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('./logger')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')

const authentication = require('./authentication')

const knex = require('./knex')

const app = express(feathers())

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

// Configure Cors Options
const allowedDomains = ['http://localhost:8080', 'http://172.28.96.1:8080']

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedDomains.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
// Host the public folder
app.use('/', express.static(app.get('public')))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio(function(io) {
  io.on('connection', function(socket) {
    socket.emit('news', { text: 'A client connected!', name: 'Hello world' })

    socket.on('aha', function (data) {
      console.log(data)

      socket.broadcast.emit('aha2', data)
    })
  })
}))

app.configure(knex)

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
app.configure(authentication)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

module.exports = app
