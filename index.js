const express = require("express")

const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack)
    return
  }

  connection.query('CREATE TABLE IF NOT EXISTS people (name VARCHAR(255))', (err, result) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err)
      return
    }

    connection.query('INSERT INTO people (name) VALUES ("Lucas")', (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados na tabela:', err)
        return
      }
    })
  })
})

app.get("/", (req, res) => {
  connection.query('SELECT name FROM people', (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro interno no servidor');
      return;
    }

    const names = results.map(result => result.name).join(', ');
    const htmlResponse = `<h1>Full Cycle Rocks!</h1><p>Nomes cadastrados: ${names}</p>`;
    res.send(htmlResponse);
  });

})

app.listen(port, () => console.log("Rodando na porta: " + port))
