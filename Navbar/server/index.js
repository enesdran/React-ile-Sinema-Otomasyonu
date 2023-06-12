const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sınema",
});

app.use(cors());
app.use(express.json());

app.get("/api/t%C3%BCr%C3%BC", (req, res) => { //Türü türkçe karekter kullanımda yönlendirme yanliş oldugunda ismlendirme bu sekide yapıldı..
  let sqlSorgu = "SELECT * FROM sınema.species";

  db.query(sqlSorgu, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result); // Veriyi konsola yazdır
      res.json({ result });
    }
  });
});

app.get("/api/prefer", (req, res) => {
  let sqlSorgu = "SELECT * FROM sınema.prefer";

  db.query(sqlSorgu, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result); // Veriyi konsola yazdır
      res.json({ result });
    }
  });
});


app.get("/api/gelsin", (req, res) => {
  const { idfilm } = req.query;

  let sqlEkle = "SELECT * FROM sınema.fılm";
  // idfilm varsa sorguya idfilm parametresini ekle
  if (idfilm) {
    sqlEkle += " WHERE idfilm = ?";
  }

  db.query(sqlEkle, [idfilm], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json({ result });
      console.log(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
