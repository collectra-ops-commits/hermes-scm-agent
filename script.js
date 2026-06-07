// Home Page - To-Do List Functionality
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button data-action="complete" data-index="${index}">Complete</button>
                    <button data-action="delete" data-index="${index}">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodoText = todoInput.value.trim();
        if (newTodoText) {
            todos.push({ text: newTodoText, completed: false });
            todoInput.value = '';
            saveTodos();
            renderTodos();
        }
    });

    todoList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'BUTTON') {
            const action = target.dataset.action;
            const index = parseInt(target.dataset.index);

            if (action === 'complete') {
                todos[index].completed = !todos[index].completed;
            } else if (action === 'delete') {
                todos.splice(index, 1);
            }
            saveTodos();
            renderTodos();
        }
    });

    renderTodos();

    // Daily SCM Framework Tip
    const scmTips = [
        "Embrace continuous improvement in your supply chain processes.",
        "Visibility is key: know where your goods are at all times.",
        "Diversify your supplier base to mitigate risks.",
        "Optimize inventory levels to reduce carrying costs.",
        "Collaborate with partners for a more resilient supply chain."
    ];

    const scmTipElement = document.getElementById('scm-tip');
    if (scmTipElement) {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        scmTipElement.textContent = scmTips[dayOfYear % scmTips.length];
    }

    // Daily SCM Fact (placeholder for more dynamic content)
    const scmFacts = [
        "Did you know that the term 'supply chain' was first coined by Keith Oliver in 1982?",
        "The Suez Canal blockage in 2021 highlighted the fragility of global supply chains.",
        "Blockchain technology is increasingly being adopted for supply chain transparency.",
        "Just-in-Time (JIT) inventory management aims to increase efficiency and decrease waste."
    ];
    const scmFactElement = document.getElementById('scm-fact');
    if (scmFactElement) {
        const today = new Date();
        const dayOfMonth = today.getDate();
        scmFactElement.textContent = scmFacts[dayOfMonth % scmFacts.length];
    }
});