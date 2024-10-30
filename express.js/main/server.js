import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import rutes from './routes/routes.js'; // Importa les rutes

const app = express();
const port = 3000;

// Aconseguir el directori actual en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware per analitzar formularis
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Added this line to support JSON parsing

// Servir fitxers estàtics
app.use(express.static(path.join(__dirname, 'public')));

// Middleware per a les rutes de "/rt"
app.use('/rt/', (req, res, next) => {
  console.log("Nova petició rebuda");
  next();
});

// Utilitza les rutes definides a "routes.js"
app.use('/rt', rutes);

// Posar el servidor en funcionament
app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});
