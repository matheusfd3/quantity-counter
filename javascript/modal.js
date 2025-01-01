function closeUserTaskActionHistoryModal() {
    document.getElementById('modal-container').style.display = 'none';
}

function openUserTaskActionHistoryModal(index) {
    const tableBodyDOM = document.getElementById('modal-table-body');
    
    const userTask = userTasks[index];
    const userTaskActionHistory = userTask.actionHistory;
    
    document.getElementById('modal-title').innerText = `Histórico de "${userTask.title}"`;
    document.getElementById('modal-best-value').innerText = `Melhor sequência: ${userTask.bestValue}`;
    tableBodyDOM.innerHTML = '';

    userTaskActionHistory.forEach((history) => {
        tableBodyDOM.innerHTML += `
            <tr>
                <td>${history.action}</td>
                <td>${history.createdAt}</td>
                <td>${history.note}</td>
            </tr>
        `;
    });

    document.getElementById('modal-container').style.display = 'flex';
}