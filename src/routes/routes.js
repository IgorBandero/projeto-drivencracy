import { Router } from "express";
import { createPoll, getPoll, createChoice, getChoices, newVote, getResult } from "../controllers/controllers.js";

const pollRoute = Router();

pollRoute.post("/poll", createPoll);
pollRoute.get("/poll", getPoll);
pollRoute.post("/choice", createChoice);
pollRoute.get("/poll/:id/choice", getChoices); 
pollRoute.post("/choice/:id/vote", newVote); 
pollRoute.get("/poll/:id/result", getResult);

export default pollRoute;