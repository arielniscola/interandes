import server from "./src/app";
import { sequelize as conn } from "./src/db";
require("dotenv").config();
const PORT = process.env.PORT;
conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
  });
});
