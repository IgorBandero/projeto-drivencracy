import { db } from "../database/database.config.js";
import dayjs from "dayjs";
import { pollSchema } from "../schemas/schemas.js";
import { choiceSchema } from "../schemas/schemas.js";
import { MongoClient, ObjectId } from "mongodb";

//#####################################################################################

export async function createPoll(req, res){
    
    let { title, expireAt } = req.body;  

    const validation = pollSchema.validate(req.body);

    // Validação do título
    if (validation.error){
        console.log(validation.error);
        return res.status(422).send("Título vazio não é válido!");
    }

    // Se não for informada uma data de expiração, considera o prazo de 30 dias
    if (!expireAt) {
        const expire = dayjs().add(30, 'day');
        expireAt = expire.format('YYYY-MM-DD HH:mm'); 
    }

    const newPoll = {
        _id: new ObjectId(),
        title: title,
        expireAt: expireAt
    }

    try {
        await db.collection("polls").insertOne(newPoll)
        res.status(201).send(newPoll);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// #####################################################################################

export async function getPoll(req, res){

    try {
        const pollsList = await db.collection("polls").find().toArray();
        res.send(pollsList);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// #####################################################################################

export async function createChoice(req, res){

    const { title, pollId } = req.body;

    const validation = choiceSchema.validate(req.body);

    if (validation.error){
        console.log(validation.error);
        return res.status(422).send(validation.error);
    }

    const objectId = new ObjectId(pollId);
    const poll = await db.collection("polls").findOne({_id: objectId});
    console.log(poll);

    if (poll){

        const newAlternative = {
            _id: new ObjectId(),
            title: title, 
	        pollId: objectId
        }

        const date = dayjs(poll.expireAt);
        const todayDate = dayjs();

        if (date.isBefore(todayDate)){
            return res.status(403).send("Enquete já expirou!");
        }

        if(await db.collection("choices").findOne({title: newAlternative.title, pollId: newAlternative.pollId})){
            return res.status(409).send("Alternativa já existe!");
        }
        else {

            try {
                await db.collection("choices").insertOne(newAlternative);
                res.status(201).send(newAlternative);
            }
            catch(error){
                console.log(error.message);
            }
        }
    }
    else {
        return res.status(404).send("Enquete não encontrada!"); 
    }
}

// #####################################################################################
    

export async function getChoices(req, res){

    const {id} = req.params;
    const poll = await db.collection("polls").findOne({_id: new ObjectId(id)});
    console.log(poll);

    if (poll){

        const query = { pollId: id };
        try {
            const choicesList = await db.collection("choices").find({ pollId: new ObjectId(id) }).toArray();
            console.log(choicesList);
            res.send(choicesList);        
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    else {
        return res.status(404).send("Enquete não encontrada!");
    }
}

// #####################################################################################

export async function newVote(req, res){

    const dateNow = dayjs().format('YYYY-MM-DD HH:mm');
    const {id} = req.params;

    const vote = {
        _id: new ObjectId(),
        createdAt: dateNow,
        choiceId: new ObjectId(id) 
    }

    const choice = await db.collection("choices").findOne({_id: new ObjectId(id)});
    
    if(choice){        

        const poll = await db.collection("polls").findOne({_id: new ObjectId(choice.pollId)});
        const date = dayjs(poll.expireAt);

        if (!date.isBefore(dateNow)){
            try {
                await db.collection("votes").insertOne(vote);
                res.status(201).send("Voto computado com sucesso!");        
            } catch (error) {
                res.status(500).send(error.message);
            } 
        }
        else {
            return res.status(403).send("Enquete já expirou!");
        }        
    }
    else {
        return res.status(404).send("Alternativa não existe!");
    }
}

// #####################################################################################

export async function getResult(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}
