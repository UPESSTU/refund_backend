//NPM Imports
require('dotenv').config()

const express = require('express'), 
      mongoose = require('mongoose'),
      cors = require('cors'),
      bodyParser = require("body-parser"),
      swaggerJsdoc = require("swagger-jsdoc"),
      swaggerUi = require("swagger-ui-express"),
      logger = require('./utils/logger'),
      rateLimiter = require('./utils/rateLimiter')


//Route Imports
const authRoutes = require('./routes/auth'),
      dueRoutes = require('./routes/due'),
      documentRoutes = require('./routes/document'),
      userRoutes = require('./routes/user'),
      fileRoutes = require('./routes/file')


const { checkJwt, checkAuthentication } = require('./middlewares/auth')

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "UPES Refund Application API Documentation",
        version: "1.0",
        description:
          "UPES Refund Application API Documentation",
        contact: {
          name: "Bhupender Singh",
          email: "Bhupender.106914@stu.upes.ac.in",
        },
      },
      servers: [
        {
          url: "http://localhost:8000",
        },
      ],
    },
    apis: ["./routes/*.js"],
}

//Configuration 
const PORT = process.env.PORT || 8000
const DATBASE_URI = process.env.DATABASE_URI
const specs = swaggerJsdoc(options)

const app = express() //Init Express App

app.use(rateLimiter)

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { 
    customSiteTitle: "UPES Refund Application API Documentation",
  })
)

//Middlewares
app.use(cors({
    origin: "http://localhost:5173", //Split The ORIGIN String into array
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'], // Methods Allowed
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'], //Headers Allowed
    credentials: true, //Are Credentials Required
}))

app.use(express.json())

//Routes
app.use('/auth', authRoutes)
app.use('/user', checkJwt, checkAuthentication, userRoutes)
app.use('/due', checkJwt, checkAuthentication, dueRoutes)
app.use('/document', checkJwt, checkAuthentication, documentRoutes)
app.use('/file', checkJwt, checkAuthentication, fileRoutes)

//Middleware Custom Response
app.use(async (err, req, res, next ) => {
    //If Error Name === 'UnauthorizedError'
    if (err.name === "UnauthorizedError") 
        //Return the 401 Error (Custom Error)
        return res.status(401).json({
            error: true,
            message: `${err.inner.name}: ${err.inner.message}`
        })
    else 
        next(err) //If No Error Take Call The Next Function
})

//Database Connection 
mongoose
    .connect(DATBASE_URI,  {
        
    })
    .then(() => {
        logger.info("Database Connected!")
        app.listen(PORT, () => {
            logger.info(`Server Running At PORT: ${PORT}`)
        })
    })
    .catch((err) => {
        logger.error(`Error: ${err.toString()}`)
    })
