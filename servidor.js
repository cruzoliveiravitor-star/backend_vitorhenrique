
app.get('/treinos', (req, res) => {
res.status(200).json(treinos);
});
// DEPOIS - dados vindos do banco SQLite
app.get('/treinos', (req, res) => {
const treinos = db.prepare('SELECT * FROM treinos').all();
res.status(200).json(treinos);
});

const express = require('express');
const app = express();

app.use(express.json());


const treinos = [];
let proximoId = 1;

function validarTreino(corpo) {
if (typeof corpo.nome !== 'string' || corpo.nome.trim() === ''){
return 'O campo nome e obrigatorio e deve ser um texto.';


}
if (typeof corpo.duracao !== 'number' || corpo.duracao <= 0) {
return 'O campo duracao e obrigatorio e deve ser um numero maior que zero.';
}
return null;
} NOT NULL

app.get('/treinos', (req, res) => {
const treinos = db.prepare('SELECT * FROM treinos').all();
res.status(200).json(treinos);
});

const treino = db.prepare(`SELECT * FROM treinos WHERE id = ${id}`).get();

const treino = db.prepare('SELECT * FROM treinos WHERE id = ?').get(id);



app.put('/treinos/:id', (req, res) => {
const id = Number(req.params.id);
const treino = db.prepare('SELECT * FROM treinos WHERE id = ?').get(id);
if (treino === undefined) {
return res.status(404).json({ erro: 'Treino nao encontrado.' });
}
const erro = validarTreino(req.body);
if (erro !== null){
return res.status(400).json({ erro: erro });
}
db.prepare('UPDATE treinos SET nome = ?, duracao = ? WHERE id = ?')
.run(req.body.nome, req.body.duracao, id);
const atualizado = db.prepare('SELECT * FROM treinos WHERE id = ?').get(id);
res.status(200).json(atualizado);
});


app.delete('/treinos/:id', (req, res) => {
const id = Number(req.params.id);
const treino = db.prepare('SELECT * FROM treinos WHERE id = ?').get(id);
if (treino === undefined) {
return res.status(404).json({ erro: 'Treino nao encontrado.' });
}
db.prepare('DELETE FROM treinos WHERE id = ?').run(id);
res.status(204).end();
});


const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});