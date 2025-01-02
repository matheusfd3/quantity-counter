let userTasks = [];

function loadUserTasksFromLocalStorage() {
    userTasks = JSON.parse(localStorage.getItem('userTasks'));

    if (userTasks === null) {
        userTasks = [];
    }

    loadUserTasksOnPage();
}

function saveUserTasksToLocalStorage() {
    localStorage.setItem('userTasks', JSON.stringify(userTasks));
}

function loadUserTasksOnPage() {
    const taskListDOM = document.getElementById('task-list');
    taskListDOM.innerHTML = '';

    if (userTasks.length === 0) {
        taskListDOM.innerHTML = `
            <li id="without-tasks">
                <p>&lt;Sem tarefas cadastradas&gt;</p>
            </li>
            `;
    } else {
        for (let i = 0; i < userTasks.length; i++) {
            const userTask = userTasks[i];
            
            let attributeSequenceColor = '';
            if (userTask.currentSequence <= maxSequence) {
                const taskColor = getSequenceColor(userTask.currentSequence);
                attributeSequenceColor = `style="color: ${taskColor}"`;
            } else {
                attributeSequenceColor = 'class="hue-rainbow"';
            }

            taskListDOM.innerHTML += `
                <li class="task-item pulse-green">
                    <ul class="task-item-actions">
                        <li>
                            <button onclick="resetUserTaskSequence(${i})">
                                <ion-icon name="refresh-outline"></ion-icon>
                            </button>
                            <button onclick="openUserTaskActionHistoryModal(${i})">
                                <ion-icon name="calendar-outline"></ion-icon>
                            </button>
                        </li>
                        <li>
                            <button onclick="updateUserTaskTitle(${i})">
                                <ion-icon name="create-outline"></ion-icon>
                            </button>
                            <button onclick="deleteUserTask(${i})">
                                <ion-icon name="trash-outline"></ion-icon>
                            </button>
                        </li>
                    </ul>
                    <div class="task-item-header">
                        <h2>${userTask.title}</h2>
                        <span>(${userTask.actionHistory[0].createdAt})</span>
                    </div>
                    <div class="task-item-content-container">
                        <button 
                            onclick="incrementUserTaskSequence(${i})"
                            ${attributeSequenceColor}
                        >${userTask.currentSequence}x</button>
                    </div>
                </li>
            `;
        }
    }
}

function resetUserTaskSequence(index) {
    const userTask = userTasks[index];

    if (confirm(`Deseja realmente resetar a tarefa "${userTask.title}"?`)) {
        const newUserTaskActionHistory = {
            action: 'Reset',
            createdAt: moment().format('DD/MM/YYYY HH:mm'),
            note: prompt('Motivo do reset:', '').trim()
        }
        
        userTasks[index].currentSequence = 0;
        userTasks[index].actionHistory.push(newUserTaskActionHistory);

        saveUserTasksToLocalStorage();
        loadUserTasksOnPage();
    }
}

function incrementUserTaskSequence(index) {
    const userTask = userTasks[index];

    if (confirm(`Adicionar +1 na tarefa "${userTask.title}"?`)) {
        userTasks[index].made++;
        userTasks[index].currentSequence++;
        userTasks[index].bestSequence = Math.max(userTasks[index].currentSequence, userTasks[index].bestSequence);

        const newUserTaskActionHistory = {
            action: `${userTasks[index].currentSequence}x`,
            createdAt: moment().format('DD/MM/YYYY HH:mm'),
            note: 'Incrementado'
        }

        userTasks[index].actionHistory.push(newUserTaskActionHistory);

        saveUserTasksToLocalStorage();
        loadUserTasksOnPage();
    }
}

function createUserTask(newUserTask) {
    userTasks.push(newUserTask);
    saveUserTasksToLocalStorage();
    loadUserTasksOnPage();
}

function updateUserTaskTitle(index) {
    const userTask = userTasks[index];
    const newUserTaskTitle = prompt('Digite um novo título para a tarefa:', userTask.title).trim();

    const userTaskTitles = userTasks.map(userTask => userTask.title);

    if (newUserTaskTitle == userTask.title || newUserTaskTitle === null) {
        return;
    } else if (newUserTaskTitle === '') {
        alert('Por favor, insira um título válido.');
        return;
    } else if (userTaskTitles.includes(newUserTaskTitle)) {
        alert('Já existe uma tarefa cadastrada com este título!');
        return;
    }

    userTasks[index].title = newUserTaskTitle;
    saveUserTasksToLocalStorage();
    loadUserTasksOnPage();
}

function deleteUserTask(index) {
    const userTask = userTasks[index];
    if (confirm(`Deseja realmente excluir a Tarefa "${userTask.title}"?`)) {
        userTasks.splice(index, 1);
        saveUserTasksToLocalStorage();
        loadUserTasksOnPage();
    }
}

function sendForm() {
    const taskTitleInput = document.getElementById('task-title-input');

    const taskTitle = taskTitleInput.value.trim();
    const userTaskTitles = userTasks.map(userTask => userTask.title);

    if (taskTitle === '') {
        alert('Por favor, insira um título válido.');
        return;
    } else if (userTaskTitles.includes(taskTitle)) {
        alert('Já existe uma tarefa cadastrada com este título!');
        return;
    }

    taskTitleInput.value = '';

    const newUserTask = {
        title: taskTitle,
        made: 0,
        currentSequence: 0,
        bestSequence: 0,
        actionHistory: [{
            action: 'Criação',
            createdAt: moment().format('DD/MM/YYYY HH:mm'),
            note: 'Criado'
        }]
    }

    createUserTask(newUserTask);
}
