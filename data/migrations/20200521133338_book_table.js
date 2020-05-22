
exports.up = function(knex) {
  return knex.schema.createTable('books', tbl =>{
      tbl.increments();
      tbl.string('title').notNullable().unique();
      tbl.string('author').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('books');
};
