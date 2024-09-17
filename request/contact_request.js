const Joi = require('joi');

const contactRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            'string.empty': 'The name field is required.',
            'string.min': 'The name must be at least 3 characters.'
        }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required().messages({
            'string.empty': 'The email field is required.',
            'string.email': 'The email must be a valid email address.'
        }),
        phone: Joi.string().min(8).required().messages({
            'string.empty': 'The phone field is required.',
            'string.min': 'The phone must be at least 8 characters.'
        })
    });

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        // Mapper les erreurs pour créer un format similaire à Laravel
        const formattedErrors = {};
        error.details.forEach(err => {
            const field = err.path[0]; // Le champ ayant causé l'erreur
            if (!formattedErrors[field]) {
                formattedErrors[field] = [];
            }
            formattedErrors[field].push(err.message);
        });

        console.log('formattedErrors ', formattedErrors);
        

        return formattedErrors;
    }

    return null;  // Pas d'erreurs
}

module.exports = {
    contactRequest
}
