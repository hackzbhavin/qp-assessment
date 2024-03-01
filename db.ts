// db.ts

import Knex from "knex";
import { Model } from "objection";

const knexConfig = require("./knexfile");

// Initialize Knex instance
const knex = Knex(knexConfig.development);

// Bind Knex instance to objection.js
Model.knex(knex);

export default knex;
