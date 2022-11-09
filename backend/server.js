import path from 'path'
import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import bannerRoutes from './routes/bannerRoutes.js'
import passwordRoutes from './routes/passwordRoutes.js'

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  app.use(cors())
} else {
  app.use(cors({
  origin:[process.env.CLIENT_URL_SERVER, process.env.CLIENT_URL_BROWSER]
  }))
}


app.use(express.json())
// current API_PREFIX = apiv1
app.use(`/${process.env.API_PREFIX}/products`, productRoutes)
app.use(`/${process.env.API_PREFIX}/categories`, categoryRoutes)
app.use(`/${process.env.API_PREFIX}/users`, userRoutes)
app.use(`/${process.env.API_PREFIX}/orders`, orderRoutes)
app.use(`/${process.env.API_PREFIX}/upload`, uploadRoutes)
app.use(`/${process.env.API_PREFIX}/brands`, brandRoutes)
app.use(`/${process.env.API_PREFIX}/banners`, bannerRoutes)
app.use(`/${process.env.API_PREFIX}/reset`, passwordRoutes)

// app.get('/${process.env.API_PREFIX}/config/paypal', (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// )

//const __dirname = path.resolve()
//app.use('/${process.env.API_PREFIX}/uploads', express.static(path.join(__dirname, '/uploads')))
//
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')))
//
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....')
//   })
// }
  app.get('/', (req, res) => {
    res.send('API is running....')
  })

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.NODE_DOCKER_PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
