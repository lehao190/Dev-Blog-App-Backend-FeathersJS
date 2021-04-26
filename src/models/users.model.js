/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient')
  const tableName = 'users'

  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      // await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

      db.schema
        .createTable(tableName, table => {
          table.uuid('id').notNullable().primary().defaultTo(db.raw('(UUID())'))
          table.string('username')
          table.string('email').unique()
          table.string('password')
          table.string('googleId')
          table.string('facebookId')
          table.string('githubId')
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e))
    }
  })

  return db
}
