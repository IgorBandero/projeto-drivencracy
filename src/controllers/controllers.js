import { db } from "../database/database.config.js";
import dayjs from "dayjs";

export async function createPoll(req, res){
    
    let { title, expireAt } = req.body;  

    if (!title){
        return res.status(422).send("Empty title is not valid!")
    }

    // Se não for informada uma data de expiração, considera 30 dias
    if (!expireAt) {
        const expire = dayjs().add(30, 'day');
        expireAt = expire.format('YYYY-MM-DD HH:mm'); 
    }

    try {
        await db.collection("polls").insertOne({title, expireAt})
        res.status(201).send({title, expireAt})
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getPoll(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function createChoice(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getChoices(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function newVote(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getResult(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}