const listNameInput = document.getElementById("listName");
const addListBtn = document.getElementById("addList");
const listsContainer = document.getElementById("listsContainer");

let lists = JSON.parse(localStorage.getItem("todoLists")) || [];

function saveLists() {
  localStorage.setItem("todoLists", JSON.stringify(lists));
}

function renderLists() {
  listsContainer.innerHTML = "";

  lists.forEach((list, listIndex) => {
    const card = document.createElement("div");
    card.className = "list-card";
    if (list.done) card.classList.add("completed");

    card.innerHTML = `
      <div class="list-header">
        <div class="list-header-left">
          <input type="checkbox" ${list.done ? "checked" : ""} />
          <h2>${list.name}</h2>
        </div>
        <button class="delete-list">🗑</button>
      </div>

      <div class="task-input">
        <input placeholder="New task..." ${list.done ? "disabled" : ""} />
        <button ${list.done ? "disabled" : ""}>Add</button>
      </div>

      <div class="tasks"></div>
    `;

    const checkbox = card.querySelector("input[type='checkbox']");
    const deleteBtn = card.querySelector(".delete-list");
    const taskInput = card.querySelector(".task-input input");
    const addTaskBtn = card.querySelector(".task-input button");
    const tasksDiv = card.querySelector(".tasks");

    checkbox.addEventListener("change", () => {
      list.done = checkbox.checked;
      saveLists();
      renderLists();
    });

    deleteBtn.addEventListener("click", () => {
      lists.splice(listIndex, 1);
      saveLists();
      renderLists();
    });

    list.tasks.forEach((task, taskIndex) => {
      const taskEl = document.createElement("div");
      taskEl.className = "task";

      taskEl.innerHTML = `
        <span>${task}</span>
        <button>✕</button>
      `;

      taskEl.querySelector("button").onclick = () => {
        list.tasks.splice(taskIndex, 1);
        saveLists();
        renderLists();
      };

      tasksDiv.appendChild(taskEl);
    });

    addTaskBtn.onclick = () => {
      const value = taskInput.value.trim();
      if (!value) return;

      list.tasks.push(value);
      taskInput.value = "";
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
    tasks: [],
    done: false
  });

  listNameInput.value = "";
  saveLists();
  renderLists();
};

renderLists();
