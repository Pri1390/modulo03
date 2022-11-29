import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// banco de dados
let data = [
    {
        nome: "Miguel",
        setor: "Transportes"
    }
]

// ROTAS!!

// MÉTODO GET
router.get("/", (request, response) => {
    // no json fica a resposta que queremos obter
    // sempre retornamos algo ( uma resposta )
    return response.status(200).json(data)
})

// método POST

router.post("/create", (request, response) => {
    const newData ={
        // capturar  o body da requisição e adicionar um id
        ...request.body,
        id: uuidv4()
    }

    data.push(newData)

    return response.status(201).json(data)
})

// MÉTODO PUT 

router.put("/edit/:id", (request, response) => {
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

// MÉTODO DELETE

router.delete("/delete/:id", (request, response) => {
    const { id } = request.params

    const deleteById = data.find(
        item => item.id === id
    )

    const index = data.indexOf(deleteById)
    
    // exclui só o item que está posicioanado no index
    data.splice(index, 1)

    return response.status(200).json(data)

})

export default router