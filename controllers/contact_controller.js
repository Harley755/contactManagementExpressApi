const { contactRequest } = require('../request/contact_request');
const { handleResponse } = require('../helpers/handle_response');
const { StatusCodes } = require('http-status-codes');
const expressAsyncHandler = require('express-async-handler');
const validateConnection = require('../helpers/validate_connection');
const errorHandle = require('../middleware/error_handle');

// get all contacts
// @route GET /api/contacts
// @access public
const getContacts = expressAsyncHandler(async (req, res) => {

    const connect = await validateConnection(req);

    try {
        const [results] = await connect.query('SELECT * FROM `contact`');
        handleResponse(res, results, "Get contacts successfully!");
    } catch (err) {
        console.log(err);
        handleResponse(res, null, err.message, false);
    }
});


// create contacts
// @route POST /api/contacts
// @access public

const createContact = expressAsyncHandler(async (req, res) => {
    // Validation des données
    const validationErrors = contactRequest(req.body);

    if (validationErrors) {
        return res.status(422).json(validationErrors);
    }

    const { name, email, phone } = req.body;

    console.log(name, email, phone);
    
    // Connexion à la base de données
    const connect = await validateConnection(req);

    // Logique d'insertion du contact ici...
    try {
         // Insertion du contact
        const [result] = await connect.execute(
            "INSERT INTO `contact` (`name`, `email`, `phone`) VALUES (?, ?, ?)",
            [name, email, phone]
        );

        console.log('Contact created with ID:', result.insertId);

        // Récupération des détails du contact créé
        const [rows] = await connect.execute(
            "SELECT * FROM `contact` WHERE `id` = ?",
            [result.insertId]
        );

        // Réponse après succès
        return handleResponse(res, rows, "Contact created successfully !");

    } catch (err) {
        console.log(err);
        return handleResponse(res, results, err, false)
    }

});


// update contacts
// @route PUT /api/contacts/:contactId
// @access public
const updateContact = expressAsyncHandler(async (req, res) => {
    // Validation des données
    const validationErrors = contactRequest(req.body);

    if (validationErrors) {
        return res.status(422).json(validationErrors);
    }

    let contactId = req.params.contactId;

    const { name, email, phone } = req.body;

    console.log(name, email, phone);
    
    // Connexion à la base de données
    const connect = await validateConnection(req);

    // Logique d'insertion du contact ici...
    try {
         // Insertion du contact
        await connect.execute(
            "UPDATE `contact` SET `name`=?,`email`=?,`phone`=? WHERE id=?",
            [name, email, phone, contactId]
        );

        console.log('Contact update with ID:', contactId);

        // Récupération des détails du contact créé
        const [rows] = await connect.execute(
            "SELECT * FROM `contact` WHERE `id` = ?",
            [contactId]
        );

        // Réponse après succès
        return handleResponse(res, rows, "Contact updated successfully !");

    } catch (err) {
        console.log(err);
        return handleResponse(res, null, err, false)
    }
});


// delete contacts
// @route DELETE /api/contacts/:contactId
// @access public
const deleteContact = expressAsyncHandler(async (req, res) => {
    let contactId = req.params.contactId;

     // Connexion à la base de données
    const connect = await validateConnection(req);

    try {
        await connect.execute(
            "DELETE FROM `contact` WHERE id=?",
            [contactId]
        );
         console.log('Contact update with ID:', contactId);

        // Récupération des détails du contact créé
        const [rows] = await connect.execute(
            "SELECT * FROM `contact` WHERE `id` = ?",
            [contactId]
        );

        // Réponse après succès
        return handleResponse(res, rows, "Contact deleted successfully !");

    } catch (err) {
        console.log(err);
        return handleResponse(res, null, err, false)
    }
})

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
};