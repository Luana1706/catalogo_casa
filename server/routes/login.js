const express = require("express");
const pool = require("../db"); // Garanta que o db.js tenha o dotenv.config()
const router = express.Router();

// ROTA DE LOGIN
router.post("/", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        if (result.rows.length === 0 || result.rows[0].senha !== senha) {
            return res.status(401).json({ mensagem: "E-mail ou senha incorretos" });
        }

        // Login sucesso
        res.json({ 
            nome: result.rows[0].nome, 
            proximaPagina: "dashboard.html" // Enviamos o nome da página para o front mudar
        });
    } catch (err) {
        res.status(500).json({ mensagem: "Erro no banco de dados" });
    }
});

// ROTA DE CADASTRO
router.post("/registrar", async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        await pool.query("INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)", [nome, email, senha]);
        res.status(201).json({ mensagem: "Cadastro realizado!", proximaPagina: "index.html" });
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao cadastrar" });
    }
});

module.exports = router;