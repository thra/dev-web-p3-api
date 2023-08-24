const express = require('express');
const path = require('path');
const cors = require('cors')
// require('dotenv').config();
// const helmet = require('helmet');
// const swaggerUi = require('swagger-ui-express')
// const yaml = require('yamljs')
// const swaggerDocs = yaml.load('swagger.yaml')

// Copy the .env.example in the root into a .env file in this folder
const envFilePath = path.resolve(__dirname, `.env`);
const env = require("dotenv").config({ path: envFilePath });
if (env.error) {
  throw new Error(`Unable to load the .env file from ${envFilePath}. Please copy .env.example to ${envFilePath}`);
}


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(helmet({
//   crossOriginResourcePolicy: false,
// }));
app.use('/images', express.static('/home/ubuntu/dev-web-p3-api-prod/images'));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

const db = require("./models");
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');
db.sequelize.sync().then(() => console.log('db is ready'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
module.exports = app;


if (app.get('env') === 'dev' || app.get('env') === 'test' || app.get('env') === 'testcafe' || app.get('env') === 'testcafelocal') {
  // development error handler. Will print stacktrace
  app.use((err, req, res, next) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({
        type: err.type,
        message: err.message,
        error: err
      })
  })
  // use swagger ui explorer
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

} else if (app.get('env') === 'prod' || app.get('env') === 'uat' || app.get('env') === 'demo') {
  // prod environment, forcing SSL
  // disableSSL === true && log.warn('disableSSL is set to true, overwriting to false since we are not on a development environment');
  // disableSSL = false;

  // production error handler. No stacktraces leaked to user
  app.use((err, req, res, next) => {
    console.error(err.stack)

    res
      .status(500)
      .json(errors.genericError());
  })
} else {
  // not taking any chances
  throw new Error(`unknown environment type "${app.get('env')}"`)
}