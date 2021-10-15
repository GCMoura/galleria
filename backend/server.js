const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const axios = require('axios')
const server = express()
const router = express.Router()

server.use(cors())
server.use(express.json({extend: true}))

dotenv.config()

const api_key = process.env.API_KEY
const port = process.env.PORT || 5000

router.get('/:search/:page', async (req, res) => {

  const { page } = req.params
  const { search } = req.params

  try {
    await axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=${api_key}&q=${search}&ps=100&p=${page}`)
      .then(response => {
        res.send(response.data)
      })
  } catch (error) {
      console.log(error)
  }
  
})

server.use(router)

server.listen(port, () => {
  console.log(`Server working on port ${port}`)
})
