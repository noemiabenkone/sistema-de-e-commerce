import "dotenv/config";
import app from "./app.js"

const PORT = 3000;

console.log("JWT_SECRET carregado:", Boolean(process.env.JWT_SECRET));

app.listen(PORT, () => {
    console.log(" servidor rodando")
})