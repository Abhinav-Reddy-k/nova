const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
const cors = require("cors")({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

exports.getCodeOutput = functions.https.onRequest(async (request, response) => {
  if (request.method !== "POST") {
    return response.status(400).send("Only POST requests are accepted");
  }

  cors(request, response, async () => {
    data = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: "504d3f8e7aa550a36678ac75c6daf92b",
        clientSecret:
          "9b3c4230355b9576fe602ff7a5286f9e0b542348a01771ff3d5318d6ac53cd16",
        ...request.body,
      }),
    });
    console.log(data);
    response.send(await data.json());
  });
});
