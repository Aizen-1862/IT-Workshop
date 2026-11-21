// --- TO-DO LIST LOGIC ---
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  tasks.push({ text, completed: false });
  todoInput.value = '';
  saveTasks();
  renderTasks();
});

renderTasks();

// --- CALCULATOR LOGIC ---
const calcDisplay = document.getElementById('calc-display');
const calcButtons = document.querySelectorAll('.calc-grid button');

calcButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === 'clear') {
      calcDisplay.value = '';
    } else if (action === 'delete') {
      calcDisplay.value = calcDisplay.value.slice(0, -1);
    } else if (action === 'calculate') {
      try {
        // Safely evaluate basic math expressions
        const sanitized = calcDisplay.value.replace(/[^0-9+\-*/.]/g, '');
        if (sanitized) {
          calcDisplay.value = Number(Function(`return (${sanitized})`)().toFixed(8));
        }
      } catch {
        calcDisplay.value = 'Error';
      }
    } else if (value) {
      if (calcDisplay.value === 'Error') calcDisplay.value = '';
      calcDisplay.value += value;
    }
  });
});
