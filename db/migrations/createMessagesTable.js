const db = require('../index')

const createMessagesTableQuery = `
  CREATE TABLE messages (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMP default current_timestamp,
    room_id TEXT,
    nickname TEXT,
    avatar TEXT,
    body TEXT
  )
`

db.query(createMessagesTableQuery)
  .then(() => client.end())
  .catch(console.log)
