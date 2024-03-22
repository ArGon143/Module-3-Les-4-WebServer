const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes, removeNote, editNotes } = require("./notes.controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (request, response) => {
  response.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (request, response) => {
  await addNote(request.body.title);
  response.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.put("/", async (request, response) => {
  await editNotes(request.body.id, request.body.title);
  response.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.delete("/:id", async (request, response) => {
  await removeNote(request.params.id);
  response.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
