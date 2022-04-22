const express = require('express');
const recordsRouter = express.Router();

recordsRouter.route('/')
  // get records handle
  .get('/', require('../controllers/records/getRecords.js'))
  // save record handle
  .post(require('../controllers/records/saveRecord.js'));

recordsRouter.route('/')
  // update record handle
  .put('/:id', require('../controllers/records/updateRecord.js'))
  // delete record handle
  .delete('/:id', require('../controllers/records/deleteRecord.js'));

module.exports = recordsRouter;