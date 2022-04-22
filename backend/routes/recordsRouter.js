const express = require('express');
const recordsRouter = express.Router();

// get records handle
recordsRouter.get('/', require('../controllers/records/getRecords.js'));

// save record handle
recordsRouter.post('/', require('../controllers/records/saveRecord.js'));

// update record handle
recordsRouter.put('/:id', require('../controllers/records/updateRecord.js'));

// delete record handle
recordsRouter.delete('/:id', require('../controllers/records/deleteRecord.js'));

module.exports = recordsRouter;