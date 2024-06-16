import {
  hostDatabase,
  portDatabase,
  nameDatabase,
  passwordDatabase,
  userDatabase,
} from "../../sensitiveData.js";

const { Pool } = require("pg");

const pool = new Pool({
  host: hostDatabase,
  port: portDatabase,
  user: userDatabase,
  password: passwordDatabase,
  database: nameDatabase,
});

export default pool;
