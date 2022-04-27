const express = require('express');
const recordsRouter = express.Router();
const protectRoute = require('../middleware/authMiddleware.js');

recordsRouter.route('/')
  // get records handle
  .get(protectRoute, require('../controllers/records/getRecords.js'))
  // save record handle
  .post(protectRoute, require('../controllers/records/saveRecord.js'));

recordsRouter.route('/:id')
  // update record handle
  .put(protectRoute, require('../controllers/records/updateRecord.js'))
  // delete record handle
  .delete(protectRoute, require('../controllers/records/deleteRecord.js'));

module.exports = recordsRouter;