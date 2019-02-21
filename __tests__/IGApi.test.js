// const IGTrader = require('../src')

// const igParams = {
//   apiKey: 'test-api',
//   username: 'test-username',
//   password: 'test-password',
//   type: 'demo'
// }
// jest.mock('../lib/ig')

// describe('IGTrader', () => {
//   test('should create an igTrader with valid constructor', () => {
//     const { apiKey, username, password } = igParams
//     const igTrader = new IGTrader(igParams)

//     expect(igTrader.username).toBe(username)
//     expect(igTrader.password).toBe(password)
//     expect(igTrader.ig.apiKey).toBe(apiKey)
//     expect(igTrader.ig.isDemo).toBeTruthy()
//   })
// })

const IGTrader = require('../src')

const igParams = {
  apiKey: 'test',
  username: 'test',
  password: 'test',
  type: 'demo'
}

describe('IGTrader', () => {
  test('should get activity', async () => {
    const igTrader = new IGTrader(igParams)

    const data = await igTrader.activity({ minutesAgo: 20 })
    console.log(JSON.stringify(data));
  })
})
