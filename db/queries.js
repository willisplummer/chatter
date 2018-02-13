const db = require('./index')

const writeMessageQuery = `
  INSERT INTO messages(room_id, nickname, avatar, body) values($1, $2, $3, $4) returning *
`

const writeMessage = (room_id, nickname, avatarUrl, body) =>
  db.query(writeMessageQuery, [room_id, nickname, avatarUrl, body])
    .catch(console.log)


const getMessagesQuery = `
  SELECT * FROM messages WHERE room_id = $1 ORDER BY id ASC
`

const getMessages = (room_id) =>
  db.query(getMessagesQuery, [room_id])
    .then(r => r.rows)
    .catch(console.log)

module.exports = {
  getMessages,
  writeMessage
}
