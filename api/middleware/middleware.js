const Account = require('../accounts/accounts-model');

async function idValidation(req, res, next) {
  try {
    const id = await Account.getById(req.params.id);
    if (id) {
      next();
    } else {
      res.status(404).json(`Account with id: ${req.params.id} not found`);
    }
  } catch (error) {
    res
      .status(500)
      .json('Account ID does not appear to be in the correct format');
  }
}

function bodyValidation(req, res, next) {
  const { name, budget } = req.body;

  if (name && budget) {
    next();
  } else {
    res.status(400).json({ message: 'Name and Budget required!' });
  }
}

module.exports = {
  idValidation,
  bodyValidation,
};
