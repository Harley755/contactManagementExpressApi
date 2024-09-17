const express = require('express');
const router = express.Router();

const {
    getContacts,
    createContact,
    updateContact,
    deleteContact
 } = require('../controllers/contact_controller');


router.route('/').get(getContacts).post(createContact);

router.route('/:contactId').put(updateContact).delete(deleteContact);


module.exports = router;