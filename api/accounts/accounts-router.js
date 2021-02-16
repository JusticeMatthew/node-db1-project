const express = require('express');
const Accounts = require('./accounts-model');

const router = express.Router();

const { idValidation, bodyValidation } = require('../middleware/middleware');

router.get('/', async (req, res, next) => {
  try {
    const data = await Accounts.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', idValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Accounts.getById(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/', bodyValidation, async (req, res, next) => {
  try {
    const data = await Accounts.insert(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', idValidation, bodyValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const data = await Accounts.update(id, changes);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', idValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Accounts.remove(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res) => {
  res.status(500).json({
    info: 'Oops router issues :(',
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
