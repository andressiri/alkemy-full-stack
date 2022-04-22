const express = require('express');
const recordsRouter = express.Router();

recordsRouter.route('/')
  // get records handle
  .get(require('../controllers/records/getRecords.js'))
  // save record handle
  .post(require('../controllers/records/saveRecord.js'));

recordsRouter.route('/:id')
  // update record handle
  .put(require('../controllers/records/updateRecord.js'))
  // delete record handle
  .delete(require('../controllers/records/deleteRecord.js'));

module.exports = recordsRouter;