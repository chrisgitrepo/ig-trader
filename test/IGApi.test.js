const IGTrader = require('../src')

const igParams = {
  apiKey: 'test-api',
  username: 'test-username',
  password: 'test-password',
  type: 'demo'
}
jest.mock('../lib/ig')

describe('IGTrader', () => {
  test('should create an igClient with valid constructor', () => {
    const { apiKey, username, password } = igParams
    const igClient = new IGTrader(igParams)

    expect(igClient.username).toBe(username)
    expect(igClient.password).toBe(password)
    expect(igClient.ig.apiKey).toBe(apiKey)
    expect(igClient.ig.isDemo).toBeTruthy()
  })
})
