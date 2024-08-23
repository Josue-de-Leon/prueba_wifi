import express from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

//const esp8266Url = "http://192.168.1.38/data"; // Cambia a la IP real del ESP8266

// setInterval(async () => {
//   try {
//     const response = await axios.get(esp8266Url);
//     console.log('Received data from ESP8266:', response.data);

// Puedes agregar aquí la lógica para procesar y almacenar los datos
//   } catch (error) {
//     console.error('Error fetching data from ESP8266:', error);
//   }
// }, 10000);  // Intervalo de 10 segundos

// let intervalId;

// app.post("/api/control", (req, res) => {
//   const { shouldSendData } = req.body;

//   if (shouldSendData === false) {
//     // Lógica para detener el envío de datos al ESP8266
//     if (intervalId) {
//       clearInterval(intervalId); // Detener el intervalo
//       intervalId = null; // Reiniciar la variable
//     }
//     console.log("Envío de datos deshabilitado");
//   } else {
//     // Lógica para reiniciar el envío de datos
//     if (!intervalId) {
//       // Solo iniciar un nuevo intervalo si no existe uno en ejecución
//       intervalId = setInterval(async () => {
//         try {
//           const response = await axios.get(esp8266Url);
//           console.log("Received data from ESP8266:", response.data);

//           // Puedes agregar aquí la lógica para procesar y almacenar los datos
//         } catch (error) {
//           console.error("Error fetching data from ESP8266:", error);
//         }
//       }, 3000); // Intervalo de 10 segundos
//     }
//     console.log("Envío de datos habilitado");
//   }

//   res.json({
//     message: `Envío de datos ${
//       shouldSendData ? "habilitado" : "deshabilitado"
//     }`,
//   });
// });

app.post("/led", async (req, res) => {
  const { comando } = req.body;

  if (comando === "encender") {
    try {
      // Enviar comando al ESP8266 para encender el LED
      await axios.get("http://192.168.1.42/led/on");
      res.send("LED encendido");
    } catch (error) {
      res.status(500).send("Error al encender el LED");
    }
  } else if (comando === "apagar") {
    try {
      // Enviar comando al ESP8266 para apagar el LED
      await axios.get("http://192.168.1.42/led/off");
      res.send("LED apagado");
    } catch (error) {
      res.status(500).send("Error al apagar el LED");
    }
  } else {
    res.status(400).send("Comando no válido");
  }
});
