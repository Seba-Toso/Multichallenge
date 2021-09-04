require('dotenv').config()
const superHeroAppRouter = require('express').Router()
const axios = require('axios')
const { json } = require('express')

const { TOKEN } = process.env

superHeroAppRouter.get('/', (req, res, next) => {
    res.send(`
    <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
      <div className='pb-5'>
          <h1 className='display-1 '> Welcome to Superhero API </h1>
      </div>
      <div className='pb-4'>
          <p className='display-6 lead'> This are your options: 
            <ul>
              <li>.../getHeroes -> Make a http request to SuperHero Api with name or id</li>
              <li></li>
              <li></li>
            </ul>
          </p>
      </div>
    </div>
  `)
})

superHeroAppRouter.get('/getHeroes', async (req, res, next) => {
  const { name, id } = req.query
  const url = name? `https://superheroapi.com/api/${TOKEN}/search/${name}` : `https://superheroapi.com/api/${TOKEN}/${id}`
  try {
    const response = await axios.get(url)
    if(id && response){
      const {id, name, powerstats, biography,appearance, work, connections, image } = response.data
      const result = {'response': response.data.response, 'results-for': id, results: [{id, name, powerstats, biography, appearance, work, connections, image}]}
      return res.status(200).send(result)
    }
    res.status(200).send(response.data)
  } catch (error) {
    console.log(error)
  }
})




module.exports = superHeroAppRouter