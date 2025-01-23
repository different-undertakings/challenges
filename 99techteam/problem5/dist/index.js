"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pg_1 = require("pg"); // Import the Pool class from the pg module
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Express App
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Middleware
app.use(body_parser_1.default.json());
console.log({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
});
// PostgreSQL Connection
const pool = new pg_1.Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
});
// Routes
// Create a resource
app.post("/resources", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const result = yield pool.query("INSERT INTO resources (name, description) VALUES ($1, $2) RETURNING id, name, description", [name, description]);
        const resource = result.rows[0];
        // res.status(201).json(resource);
        res.status(201).json({ resource: 1111 });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// List resources with basic filters
app.get("/resources", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const query = name
            ? "SELECT * FROM resources WHERE name ILIKE $1"
            : "SELECT * FROM resources";
        const values = name ? [`%${name}%`] : [];
        const result = yield pool.query(query, values);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get details of a resource
// @ts-ignore
app.get("/resources/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield pool.query("SELECT * FROM resources WHERE id = $1", [
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Resource not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update resource details
// @ts-ignore
app.put("/resources/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const result = yield pool.query("UPDATE resources SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description", [name, description, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Resource not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Delete a resource
// @ts-ignore
app.delete("/resources/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield pool.query("DELETE FROM resources WHERE id = $1", [
            id,
        ]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Resource not found" });
        }
        res.status(200).json({ message: "Resource deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
