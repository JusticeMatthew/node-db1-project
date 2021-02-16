const db = require('../../data/dbConfig.js');

const getAll = () => {
  return db('accounts');
};

const getById = (id) => {
  return db('accounts').where('id', id).first();
};

const insert = (data) => {
  return db('accounts')
    .insert(data)
    .then(([id]) => {
      return db('accounts').where('id', id).first();
    });
};

const update = (id, changes) => {
  const updateId = id;
  return db('accounts')
    .where('id', id)
    .update(changes)
    .then(() => {
      return db('accounts').where('id', updateId).first();
    });
};

const remove = (id) => {
  return db('accounts')
    .where('id', id)
    .del()
    .then(() => {
      return db('accounts');
    });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
