require('colors')

module.exports = (error, _req, res, next) => {
	console.log(`${error}`.black.bgRed)

  switch(error){

    
    case error:
      return res.status(400).send(error)
  }
}