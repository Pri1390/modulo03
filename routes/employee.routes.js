import express from 'express'
import { trusted } from 'mongoose'
import EmployeeModel from "../models/employee.models.js"


const router = express.Router()


// -------- ROTAS --------
// método GET
router.get('/', async (request, response) => {
    try {
        const employees = await EmployeeModel.find()

        return response.status(200).json(employees)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo está errado."})
    }
})

// método POST
router.post('/create', async (request, response) => {
    try {
       const  newEmployee = await EmployeeModel.create(request.body)

        return response.status(201).json(newEmployee)
    } catch (error) {
        console.log(error)

        return response.status(500).json({msg: "Algo está errado!"})
    }     
})

// método PUT
router.put('/edit/:id', async (request, response) => {
    // seta o id como parâmetro
    
    try{
        const { id } = request.params

        const update =  await EmployeeModel.findByIdAndUpdate(
            id,
            {...request.body},
            {new: true, runValidators: true}

        )          

        return response.status(200).json(update)

    }catch(error) {
        console.log(error)
        return response.status(500).json({msg: "Algo está errado!"})

    }
  
   
})

// método DELETE
router.delete('/delete/:id', async (request, response) => {
    try{
        const { id } = request.params

        const deleteEmployee = await EmployeeModel.findByIdAndDelete(id)

        return response.status(200).json(deleteEmployee)          
    }catch (error) {
        console.log(error)
        return response.status(500).json({msg: "Algo está errado!"})

    }     
})

export default router