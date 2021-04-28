/* eslint-disable no-console */

// saved_posts-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient')
  const tableName = 'saved_posts'
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema
        .createTable(tableName, table => {
          table.increments('id').notNullable()
          table.boolean('saved').defaultTo(false)
          table
            .integer('postId')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
          table
            .integer('userId')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
          table.timestamps(false, true)
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e))
    }
  })

  return db
}
