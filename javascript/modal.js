function closeUserTaskActionHistoryModal() {
    document.getElementById('modal-container').style.display = 'none';
}

function openUserTaskActionHistoryModal(index) {
    const tableBodyDOM = document.getElementById('modal-table-body');
    
    const userTask = userTasks[index];
    const userTaskActionHistory = userTask.actionHistory;
    
    document.getElementById('modal-title').innerText = userTask.title;
    document.getElementById('modal-total-made').innerText = `Realizado: ${userTask.made}x`;
    document.getElementById('modal-best-sequence').innerText = `Melhor sequência: ${userTask.bestSequence}x`;

    let tableContent = '';

    userTaskActionHistory.forEach((history) => {
        tableContent += `
            <tr>
                <td>${history.action}</td>
                <td>${history.createdAt}</td>
                <td>${history.note}</td>
            </tr>
        `;
    });

    tableBodyDOM.innerHTML = tableContent;
    document.getElementById('modal-container').style.display = 'flex';
}