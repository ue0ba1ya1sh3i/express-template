// Imports
const express = require("express")
const expressApp = express()

// Set routes
const routes = [
  {
    route: "/example",
    code: require("./routes/example/index.js")
  }
]

// Settings
require('dotenv').config()
const port = process.env.PORT || 3000
expressApp.use(express.json())

// Log
expressApp.use((req, res, next) => {
  const time = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;

  console.log(`[${time}] ${method} ${url} from ${ip}`);

  next()
});

// Main routing
for (let i = 0; i < routes.length; i++) {
  expressApp.use(routes[i].route, routes[i].code)
}

// Not found routing
expressApp.use(require("./routes/notFound.js"))

expressApp.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
