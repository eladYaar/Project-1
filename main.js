"use strict";

const taskDescriptionBox = document.getElementById("taskDescriptionBox");
const completeByDateBox = document.getElementById("completeByDateBox");
const completeByTimeBox = document.getElementById("completeByTimeBox");
const cardDiv = document.getElementById("cardDiv");

const taskList = loadData("taskList") ? loadData("taskList") : [];
let nextId = loadData("nextId") ? loadData("nextId") : 1;
showCard();


function saveTask() {
    addTaskToList();
    showCard();
    saveData();
}

function saveData() {
    const jsonTaskList = JSON.stringify(taskList);
    const jsonId = JSON.stringify(nextId);
    localStorage.setItem("taskList", jsonTaskList);
    localStorage.setItem("nextId", jsonId);
}


function removeItem(itemId) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === itemId) {
            if (!confirm(`Are You Sure You Want to Remove Task?`)) {
                return;
            }
            taskList.splice(i, 1);
            break;
        }
    }
    showCard();
    saveData();
}

function showCard() {
    let html = ""
    for (const item of taskList) {
        html +=
            `<div class="card">
            <span id="taskDescription">${item.taskDescription}</span>
            <span>To Complete Until:</span>
            <span>${item.completeByDate}</span>
            <span>${item.completeByTime}</span>
            <button id="removeButton" onclick="removeItem(${item.id})">❌</button>
            </div>`;
    }
    cardDiv.innerHTML = html;
}

function loadData(key) {
    const json = localStorage.getItem(key);
    if (json) {
        return JSON.parse(json);
    } else {
        return false;
    }
}
function addTaskToList() {
    const taskDescription = taskDescriptionBox.value;
    const completeByDate = completeByDateBox.value;
    const completeByTime = completeByTimeBox.value;

    if (!isValidData(taskDescription, completeByDate, completeByTime)) return;

    taskList.push({
        taskDescription,
        completeByDate,
        completeByTime,
        id: nextId++,
    })
    clearInputFields();
}

function clearInputFields() {
    taskDescriptionBox.value = "";
    completeByDateBox.value = "";
    completeByTimeBox.value = "";
    taskDescriptionBox.value = "";
}

function isValidData(task, date, time) {
    if (!task) {
        alert("Please Enter a Task Title!");
        taskDescriptionBox.focus();
        return false;
    }
    if (!date) {
        alert("Please Enter a Completion Date!");
        completeByDateBox.focus();
        return false;
    }
    if (!time) {
        alert("Please Enter a Completion Time!");
        completeByTimeBox.focus();
        return false;
    }
    return true;
}

function deleteAll() {
    if (!(prompt("Type 'DELETE' to Delete all the Tasks") === 'DELETE')) {
        return;
    }
    localStorage.removeItem("TaskList");
    localStorage.removeItem("nextId");
    taskList.length = 0;
    nextId = 1;
    showCard();
    saveData();
}