import { Pool } from "pg";
import {
  hostDatabase,
  portDatabase,
  nameDatabase,
  passwordDatabase,
  userDatabase,
} from "../../sensitiveData";

const pool = new Pool({
  host: hostDatabase,
  port: portDatabase,
  user: userDatabase,
  password: passwordDatabase,
  database: nameDatabase,
});

export default pool;
