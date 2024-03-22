document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const responsPrompt = prompt("Введите новое название", event.target.dataset.title);
    const id = event.target.dataset.id;

    if (responsPrompt === null) {
      return;
    }

    edit(id, responsPrompt).then(() => {
      document.getElementById(id).textContent = responsPrompt;
      event.target.dataset.title = responsPrompt;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, responsPrompt) {
  await fetch(`/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ title: responsPrompt, id: id }),
  });
}
