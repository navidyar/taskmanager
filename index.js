const tasks = {

    tasksList: [],

    setData: function() {       // Save Tasks List to localStorage/sessionStorage
        sessionStorage.setItem("tasksList", JSON.stringify(this.tasksList));
    },

    getData: function() {       // Get Tasks List from localStorage/sessionStorage
        return this.tasksList = JSON.parse(sessionStorage.getItem("tasksList"));
    },

    displayTasks: function() {
        
        if (this.getData() == null) {   // Check if Tasks List is set in localStorage/sessionStorage
            this.tasksList = [];
            this.setData();
        } else {
            this.tasksList = this.getData();
        }

        // Display Tasks List
        let html = "";
        if (this.tasksList != "") {
            html += '<ul id="taskslist">'
            html += '<li style="padding:10px;">Add New Task Form Can Go Here!</li>';
            // html += '<li><form><input type="text"/></form></li>';
            for (let i = 0; i < this.tasksList.length; i++) {
                html += 
                `<li>
                    <img src="images/checkmark.png" />
                    <form action="javascript:void(0);" method="post" autocomplete="off" id="updateForm">
                        <input type="text" class="updatetask${i}" value="${this.tasksList[i]}" onchange="tasks.updateTask('${i}');">
                    </form>
                    <img src="images/delete.png" onclick="tasks.deleteTask('${i}');" />
                </li>`;
            }
            html += '<li style="padding:10px;">Click text to edit. Form controls can go here, such as "select all"</li>';
            html += '</ul>'
        } else {
            html = 'No Task Items Available';
        }
        document.getElementById("mytasks").innerHTML = html;
    },

    addTask: function() {
        let taskName = document.getElementById('addtask');
        if (taskName.value != "") {
            this.tasksList = this.getData();
            this.tasksList.push(taskName.value);
            this.setData();
            taskName.value = '';
        }
        this.displayTasks();
    },
    
    updateTask: function(taskID, taskName) {
        let taskUpdateName = document.querySelector('.updatetask'+taskID);
        this.tasksList[taskID] = taskUpdateName.value;
        this.setData();
        taskUpdateName.focus(); // refocus on recently updated field
    },

    deleteTask: function(deleteItem) {
        this.tasksList.splice(deleteItem, 1);
        this.setData();
        this.displayTasks();
    },
    
    searchTask: function() {
        let searchterm = document.getElementById('searchtask');        
        let html = "";

        if (this.tasksList.includes(searchterm.value)) {
            html = searchterm.value;
        } else if (searchterm.value == "") {
            html = "Please enter a search term.";
        } else {
            html = `Sorry, no search results for: <span style="font-weight:bold">${searchterm.value}</span>`;
        }
        document.getElementById("searchresults").innerHTML = html;
        searchterm.value = '';
        this.displayTasks();
    },
};