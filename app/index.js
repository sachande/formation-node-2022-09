import { server } from "./server.js";
import config from "./src/config.js";

server.listen(config.port, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log(`Server ready http://localhost:${port}`);
});
