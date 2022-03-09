// top of the file
import Cors from "cors";

export default function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
  
// Initialize the cors middleware
export const cors = initMiddleware(
  // You can read more about the available options here: <https://github.com/expressjs/cors#configuration-options>
  Cors({
    origin: "*",
    methods: ["GET", "POST", 'OPTIONS'],
    credentials: true,
  })
);