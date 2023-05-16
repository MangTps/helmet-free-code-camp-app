const express = require("express");
const app = express();
const helmet = require("helmet");

// Set security-related HTTP headers
app.use(helmet());

// Enable HSTS (HTTP Strict Transport Security)
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));

// Hide "X-Powered-By" header
app.use(helmet.hidePoweredBy());

// Prevent DNS prefetching
app.use(helmet.dnsPrefetchControl());

// Disable client-side caching
app.use(helmet.noCache());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Disable Strict-Transport-Security header
app.disable("strict-transport-security");

// Set X-Frame-Options to deny
app.use(helmet.frameguard({ action: "deny" }));

// Enable XSS (Cross-Site Scripting) protection
app.use(helmet.xssFilter());

// Prevent MIME type sniffing
app.use(helmet.noSniff());

// Set X-Download-Options to prevent Internet Explorer from executing downloads
app.use(helmet.ieNoOpen());

// Set Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'trusted-cdn.com'"],
    },
  })
);

// Mount your API routes
const api = require("./server.js");
app.use("/_api", api);

// Define a route for the homepage
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// Start the server
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`🍢 Information Security App started on port ${port}`);
});
