class IG {
  constructor(apiKey, isDemo) {
    this.apiKey = apiKey
    this.isDemo = isDemo
  }

  login(username, password) {
    return true
  }

  post(route, apiVersion, object) {
    return true
  }
}

module.exports = IG