const axios = require('axios')

class GithubService {
  constructor () {
    this.headers = { 'Accept': 'application/json' }
  }

  async getAccessToken ({ clientId, clientSecret, code }) {
    const path = `${process.env.BASE_URL}/login/oauth/access_token`

    try {
      const response = await axios.get(
        `${path}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
        { headers: this.headers }
      )
      return { error: false, token: response.data['access_token'] }
    } catch (error) {
      return { error: true, message: error }
    }
  }
}

module.exports = new GithubService()
