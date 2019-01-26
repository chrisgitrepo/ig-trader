# igclient
Minimalist Node.js client for programmatically spread betting with the IG API

# Installation

`npm install igclient`

# Import

You can import one or many clients depending on what you need:

ES6 Import:

`import { DynamoClient, SNSClient } from 'igclient'`

CommonJS:

`const { DynamoClient, SNSClient } = require('igclient')`

# Usage

```
const client = new DynamoClient({
  region: 'eu-west-1',
  tableName: 'users-prod'
})

const getUser = async (id) => {
  const data = await client.get({ id })
  console.log(data)
}

getUser('fred')
```
If there is a DynamoDB table called *users-prod* in your AWS account containing an item with the primary key (id) of 'fred', the above code will print it to the console.  