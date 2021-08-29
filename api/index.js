require('colors')
require('dotenv').config()
const cors = require('cors')
const express = require('express')

const superHeroAppRouter = require('./Routers/SuperHeroApp') 

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))


app.get('/', (_req, res, next) => {
	res.send(`
    <div>
      <div>
          <h1> Welcome to Multichallenge API </h1>
      </div>
      <div>
          <p> This are your options: </p>
      </div>
    </div>
  `)
})

app.use('/SuperHeroApp', superHeroAppRouter)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
	console.log(`Server created and running on port ${PORT}`.black.bgGreen)
})

module.exports = { app, server }