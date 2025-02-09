const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function removeNote(id) {
  const notes = await getNotes();

  // один из вариантов удаление через splice
  // const notesCopy = [...notes];
  // for (let i = 0; i < notesCopy.length; i++) {
  //   if (notesCopy[i].id === id) {
  //     notesCopy.splice(i, 1);
  //     break;
  //   }
  // }
  // await saveNotes(notesCopy);

  // один из вариантов удаление через filter
  const notesFiltered = notes.filter((note) => note.id !== id);

  await saveNotes(notesFiltered);

  console.log(chalk.bgRed(`Note with id="${id}" has been removed!`));
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function editNotes(id, title) {
  const notes = await getNotes();

  if (title === null) {
    return;
  }

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes[i].title = title;
    }
  }

  await saveNotes(notes);
  console.log(chalk.bgYellowBright(`Note with id="${id}" has been edited!`));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list notes:"));

  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNotes,
};
