const express = require("express");
require("dotenv").config();
const cors = require('cors');

// Importação das rotas
const produtosRouter = require("./routes/catalogos");
const loginRouter = require("./routes/login"); // Importando o novo arquivo
const autenticarAPIkey = require("./autorizar");

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());

// =====================
// Rotas Públicas (Sem necessidade de API Key)
// =====================

// Rota de Login deve vir ANTES do middleware de segurança
app.use("/login", loginRouter);

// Rota raiz
app.get("/", (req, res) => {
  res.send("👔 API ProntoLook rodando! Use /login para entrar.");
});

// =====================
// Rotas Protegidas (Exigem API Key)
// =====================

// Aplica a segurança apenas nas rotas que vêm abaixo
app.use(autenticarAPIkey); 

// Rota para gerenciar o catálogo de roupas
app.use("/catalogos", produtosRouter);

// =====================
// Servidor
// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

