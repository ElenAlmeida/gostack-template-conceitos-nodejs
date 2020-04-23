const express = require("express"); //ok
const cors = require("cors"); //ok

const { uuid, isUuid } = require("uuidv4"); // ok

const app = express(); //ok

app.use(express.json()); //ok
app.use(cors()); //ok

const repositories = []; //ok

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  const { title, url, techs, likes } = request.body;

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const repositorieLike = repositories[repositorieIndex].likes;

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositorieLike,
  };
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );
  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params;
  const { title, url, techs, likes } = request.body;
  let like;

  const repositorieIndex = repositories.findIndex((repositorie) => {
    if (repositorie.id === id) {
      return (like = repositorie.likes + 1);
    }
  });

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: like,
  };
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

module.exports = app;
