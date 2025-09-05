require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('../models');
const apiRouter = require('./routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'base-example-back',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },

    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

sequelize.authenticate()
    .then(() => {
        console.log("✅ Connection to MySQL has been established successfully.");
    })
    .catch((error) => {
        console.error("❌ Unable to connect to MySQL: ", error);
    });

app.get('/', (req, res) => {
    res.send('Hello word');
});

app.use('/api', apiRouter);

const PORT = 3000;
const HOST = 'localhost';
const URL = `http://${HOST}:${PORT}`;
const SWAGGER_URL = `${URL}/api-docs`;

app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on: \x1b[4m${URL}\x1b[0m`);
    console.log(`📄 Swagger documentation available at: \x1b[4m${SWAGGER_URL}\x1b[0m`);
});