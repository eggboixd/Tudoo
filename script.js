const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

function addTask() {
    const task = taskInput.value.trim(); //remove white spaces, value from taskInput in the html file gets passed to this variable

    if (task) {
        createTaskElement(task); //calls the create task element function to add task to the list
        taskInput.value = ''; //clear input field once task has been added
        saveTasks(); //save tasks to the array list in localStorage
    } else {
        alert('Enter a task'); //if the input field is empty it tells the user to enter a task
    }
}

addButton.addEventListener('click', addTask); //when user clicks the butten, it will call the function addTask

function createTaskElement(task) {
    const listItem = document.createElement('li'); //creates a <li> element in the <ul> in the html file
    const taskText = document.createElement('span'); // creates a <span> element in the <ul> in the html file
    const deleteButton = document.createElement('button'); //creates a <button> element in the html file
    
    taskText.textContent = task; //puts the value of the task that has been inputted from the user
    
    deleteButton.textContent = 'Delete'; //the button says delete
    deleteButton.className = 'deleteTask'; //the class name is deleteTask, this is used in the CSS to style the button
    deleteButton.addEventListener('click', function() { //event listener for when user clicks on the button, it will remove an item from the list
        listItem.remove();  //remove item from the list
        saveTasks(); //saves the new array
    });

    listItem.appendChild(taskText);     //put the task that has been inputted in the <li> element
    listItem.appendChild(deleteButton); //renders the delete button
    taskList.appendChild(listItem);     //renders each task in the list
}

function saveTasks() {
    let tasks = []; //initialize an empty array
    taskList.querySelectorAll('li span').forEach(function(item) {
        tasks.push(item.textContent.trim());   //pushes textcontent and also removes any whitespaces
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); //saves task in localstorage
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; //retrieves stored string with key "tasks" from localStorage, if key exist return the string if not return nothing
    tasks.forEach(createTaskElement);   //loops for each item in the tasks array, calls the function createTaskElement that we created before
}
