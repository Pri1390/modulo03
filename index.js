import express from "express"
import * as dotenv from "dotenv"
import {v4 as uuidv4} from "uuid"

dotenv.config()
const app = express()
app.use(express.json())

let data = [
    {
        nome: "Miguel",
        setor: "Transportes "
    }
]

// ROTAS!!
app.get("/", (request, response) => {
    // no json fica a resposta que queremos obter
    // sempre retornamos algo ( uma resposta )
    return response.status(200).json(data)
})

app.post("/create", (request, response) => {
    const newData ={
        // capturar  o body da requisição e adicionar um id
        ...request.body,
        id: uuidv4()
    }

    data.push(newData)

    return response.status(201).json(data)
})

// MÉTODO PUT 

app.put("/edit/:id", (request, response) => {
    // seta o id como um parâmetro  
    const { id } = request.params

    // reconhecendo o item
    const update = data.find(
        item => item.id === id
    )
    
    // descobre a posição dele dentro da lista
    const index = data.indexOf(update)


    //array[posição] = item
    //atualiza o item existente
    data[index] = {
        ...update,
        ...request.body
    }

    return response.status(200).json(data[index])
})


app.listen(Number(process.env.PORT), () => console.log(" Servidor na porta 8080!"))