import express from "express";
import { db } from "./db/connection.js";

const app = express();
const port = 5195;

app.use(express.json());
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conexión a la base de datos exitosa");
});



app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.post("/led", async (req, res) => {
  const { comando } = req.body;

  if (comando === "encender" || comando === "apagar") {
    try {
      // Inserta el comando en la base de datos
      const [result] = await db.execute(
        "INSERT INTO comandos (comando) VALUES (?)",
        [comando]
      );
      res.send(`Comando de ${comando} registrado en la base de datos`);
    } catch (error) {
      res.status(500).send("Error al registrar el comando en la base de datos");
    }
  } else {
    res.status(400).send("Comando no válido");
  }
});

app.get("/comandos", async (req, res) => {
  try {
    // Obtiene el comando más reciente que no ha sido ejecutado
    const [rows] = await db.execute(
      "SELECT * FROM comandos WHERE ejecutado = FALSE ORDER BY fecha DESC LIMIT 1"
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json({ comando: null });
    }
  } catch (error) {
    res.status(500).send("Error al obtener el comando");
  }
});

app.post("/comandos/:id/ejecutado", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("UPDATE comandos SET ejecutado = TRUE WHERE id = ?", [id]);
    res.send("Comando marcado como ejecutado");
  } catch (error) {
    res.status(500).send("Error al marcar el comando como ejecutado");
  }
});

