import express from 'express'
import * as dotenv from 'dotenv'
import employeeRouter from './routes/employee.routes.js'

// Configuração padrão do dotenv
dotenv.config()
// inicialização do express
const app = express()
// permitir a interpretação de json()   
app.use(express.json())

app.use("/employee", employeeRouter)
// http://localhost:8080/employee/
// http://localhost:8080/employee/create
// http://localhost:8080/employee/edit/:id



// executar o servidor na porta 8080
app.listen(Number(process.env.PORT), () => console.log(" Servidor na porta 8080!"))