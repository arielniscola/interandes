import server from "./src/app";
import { sequelize as conn } from "./src/db";
const PORT = 3001;
conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
  });
});
