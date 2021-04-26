/* eslint-disable no-console */

// posts-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient')
  const tableName = 'posts'
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      // await db.raw('create extension if not exists "uuid-ossp"')

      db.schema
        .createTable(tableName, table => {
          table.uuid('id').notNullable().primary().defaultTo(db.raw('(UUID())'))
          table.string('title')
          table.string('body')
          table.string('image')
          table.string('comments')
          table
            .uuid('userId')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e))
    }
  })

  return db
}
