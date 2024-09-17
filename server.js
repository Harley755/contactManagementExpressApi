const express = require('express');
const errorHandle = require('./middleware/error_handle');
const connectionDb = require('./config/db_connection');
const env = require('dotenv').config();

const app = express();
app.use(express.json());

// Attendre que la base de données se connecte avant de démarrer le serveur
const startServer = async () => {
    const connection = await connectionDb();
    // Assignation de la connexion
    app.locals.connection = connection;  

    app.use("/api/contacts", require("./routes/contact_routes"));
    app.use(errorHandle);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
