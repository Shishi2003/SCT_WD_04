const listNameInput = document.getElementById("listName");
const addListBtn = document.getElementById("addList");
const listsContainer = document.getElementById("listsContainer");

let lists = JSON.parse(localStorage.getItem("todoLists")) || [];

function saveLists() {
  localStorage.setItem("todoLists", JSON.stringify(lists));
}

function renderLists() {
  listsContainer.innerHTML = "";

  lists.forEach(list => {
    const card = document.createElement("div");
    card.className = "list-card";

    card.innerHTML = `
      <h2>${list.name}</h2>
      <div class="task-input">
        <input placeholder="New task..." />
        <button>Add</button>
      </div>
      <div class="tasks"></div>
    `;

    const taskInput = card.querySelector("input");
    const addTaskBtn = card.querySelector("button");
    const tasksDiv = card.querySelector(".tasks");

    list.tasks.forEach((task, i) => {
      const t = document.createElement("div");
      t.className = "task";
      t.innerHTML = `<span>${task}</span><button>✕</button>`;

      t.querySelector("button").onclick = () => {
        list.tasks.splice(i, 1);
        saveLists();
        renderLists();
      };

      tasksDiv.appendChild(t);
    });

    addTaskBtn.onclick = () => {
      const val = taskInput.value.trim();
      if (!val) return;

      list.tasks.push(val);
      saveLists();
      renderLists();
    };

    listsContainer.appendChild(card);
  });
}

addListBtn.onclick = () => {
  const name = listNameInput.value.trim();
  if (!name) return;

  lists.push({
    id: Date.now(),
    name,
    tasks: []
  });

  listNameInput.value = "";
  saveLists();
  renderLists();
};

renderLists();
