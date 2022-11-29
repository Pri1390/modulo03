import express from 'express'
import * as dotenv from 'dotenv'
import employeeRouter from './routes/employee.routes.js'
import dbConnect from './config/db.config.js'

// configuração padrão do dotenv
dotenv.config()

dbConnect()

// inicialização do express
const app = express()
// permitir a interpretação de json()
app.use(express.json())

app.use('/employee', employeeRouter)




// executar o servidor na porta 8080
app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'))