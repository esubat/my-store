import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Store API DOC',
            version: '1.0',
            description: 'This is a REST API for managing a store.',
        },

    },
    apis: ['./src/api/*.{ts,js}'],
};
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;