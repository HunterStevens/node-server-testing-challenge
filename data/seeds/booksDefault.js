
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {title:'The Great Gatsby', author:'F. Scott Fitzgerald'},
        {title:'Gone', author:'Michael Grant'},
        {title:'Cinder', author:'Marissa Meyer'}
      ]);
    });
};
