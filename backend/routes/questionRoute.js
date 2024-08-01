import express from "express"
import { Question } from "../models/questionModel.js"

const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const questions = await Question.find({});
        return res.status(200).json({count:questions.length, data: questions})
        

    }
    catch(error){
        console.log(error.message)    
        res.status(500).send({message: error.message})
    }

})

router.get('/:id', async(req, res) =>{
    try{
        const { id } = req.params;
        const question = await Question.findById(id);        
        return res.status(200).json(question)

    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

})

router.put('/:id', async(req, res) =>{
    try{
        if (!req.body.question || !req.body.answer || !req.body.publishYear){
            return res.status(400).send({message: "Incomplete request"})

        }
        const { id } = req.params;
        const result = await Question.findByIdAndUpdate(id, req.body);
        if (!result){
            return res.status(400).send({message: "No such id"});
        }
        return res.status(200).send({message: "Successful"})

    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

})

router.delete('/:id', async(req, res) =>{
    try{
        const { id } = req.params;
        const result = await Question.findByIdAndDelete(id, req.body);
        if (!result){
            return res.status(400).send({message: "No such id"});
        }
        return res.status(200).send({message: "question deleted"})

    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

})


router.post('/', async(req, res) =>{
    try{
        if (!req.body.question || !req.body.answer || !req.body.publishYear){
            return res.status(400).send({message: "Data is incomplete"})
        }
        const newQuestion = {
            question: req.body.question,
            answer: req.body.answer,
            publishYear: req.body.publishYear
        }
        const question = await Question.create(newQuestion);
        return res.status(200).send(question)
    }
    catch(error)  {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})


export default router
