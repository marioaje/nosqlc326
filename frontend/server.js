const express = require("express");
const path = require("path");

const app = express();

const PORT = 5002;

//Publicar los archivos estáticos de la carpeta public
app.use(express.static(
    path.join(__dirname, "public")
));


app.listen(PORT, () => {

    console.log(`Server API http://localhost:${PORT}`);
});