const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gotoinc test task by Vitalii Lovkaites",
            version: "1.0.0",
            description:
                "This is a simple CRUD API for Todo app",
            contact: {
                name: "Vitalii Lovkaites",
                url: "https://www.linkedin.com/in/vitaliilovkaites",
                email: "lovkaitesvitalii@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options)

const swaggerDocs = (app) => {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    )
}

module.exports = swaggerDocs