"use strict";
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = exports.swaggerUi = void 0;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
exports.swaggerUi = swaggerUi;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blogging Platform API",
            version: "1.0.0",
            description: "A simple blogging platform API",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Path to the API docs
};
const specs = swaggerJsdoc(options);
exports.specs = specs;
