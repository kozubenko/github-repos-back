// express
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// services
const GithubService = require('./services/GithubService')

const app = express()
app.use(cors())

const port = process.env.PORT
const router = express.Router()

router.get('/request_github_token', async (req, res) => {
  const { client_id: clientId, client_secret: clientSecret, code } = req.query
  const result = await GithubService.getAccessToken({ clientId, clientSecret, code })

  if (!result.error) {
    res.json({ accessToken: result.token })
  } else {
    res.status(422).json({ error: result.message })
  }
})

app.use('/api', router)
app.listen(port)
console.log(`App started on port: ${port}`)
