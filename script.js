document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const reminderInput = document.getElementById("reminderInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    addTaskBtn.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      const reminderText = reminderInput.value;
      if (taskText !== "") {
        const li = document.createElement("li");
        li.textContent = taskText;
        if (reminderText !== "") {
          const reminder = document.createElement("span");
          reminder.textContent = `Reminder: ${formatReminderDate(reminderText)}`;
          li.appendChild(reminder);
          setReminder(reminderText, taskText);
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
          li.remove();
          if (reminderText !== "") {
            removeReminder(taskText);
          }
        });
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = "";
        reminderInput.value = "";
      } else {
        alert("Please enter a task!");
      }
    });
    function formatReminderDate(dateString) {
      const date = new Date(dateString);
      return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    }
    function setReminder(reminderDate, task) {
      const now = new Date().getTime();
      const reminderTime = new Date(reminderDate).getTime();
  
      const timeToReminder = reminderTime - now;
      if (timeToReminder >= 0) {
        setTimeout(function () {
          alert(`Reminder: ${task}`);
        }, timeToReminder);
      }
    }
    function removeReminder(task) {
      const currentTasks = taskList.getElementsByTagName("li");
      for (let i = 0; i < currentTasks.length; i++) {
        if (currentTasks[i].textContent.includes(task)) {
          const taskReminder = currentTasks[i].getElementsByTagName("span")[0];
          if (taskReminder) {
            taskReminder.remove();
          }
          break;
        }
      }
    }
  });
  