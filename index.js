const tasks = {

    tasksList: [],

    setData: function() {       // Save Tasks List to localStorage/sessionStorage
        sessionStorage.setItem("tasksList", JSON.stringify(this.tasksList));
    },

    getData: function() {       // Get Tasks List from localStorage/sessionStorage
        return this.tasksList = JSON.parse(sessionStorage.getItem("tasksList"));
    },

    displayTasks: function() {
        // Check if Tasks List is set in localStorage/sessionStorage
        if (this.getData() == null) {
            this.tasksList = [];
            this.setData();
        } else {
            this.tasksList = this.getData();
        }
        // Display Tasks List
        let html = "";
        html += '<ul id="taskslist">'
        html += `
            <li id="addtaskfield" style="padding:10px 10px 15px 10px; height:33px;">
                <form action="javascript:void(0);" method="post" id="addForm" autocomplete="off">
                    <label for="addtask">Add New Task :</label>
                    <input type="text" id="addtask" autofocus>
                    <input type="submit" id="addtaskbtn" value="add" onclick="tasks.addTask();">
                </form>
            </li>`;
        if (this.tasksList != "") {
            for (let i = 0; i < this.tasksList.length; i++) {
                html += `
                <li class="taskitemfield">
                    <img src="images/checkmark.png" class="img checkmark-img" />
                    <div class="updatetask${i} taskitem single-line" contenteditable="true" class="updatetask${i}" onblur="tasks.updateTask(${i})">${this.tasksList[i]}</div>
                    <img src="images/delete.png" class="img delete-img" onclick="tasks.deleteTask('${i}');" />
                </li>
                `;
            }
        } else {
            html += '<li id="emptylist"><p>No Task Items Available</p></li>';
        }
        html += '<li style="clear:both; padding:10px;">&nbsp;</li>';
        html += '</ul>'
        document.getElementById("mytasks").innerHTML = html;
    },

    addTask: function() {
        let taskName = document.getElementById('addtask');
        if (taskName.value != "") {
            this.tasksList = this.getData();
            this.tasksList.push(taskName.value);
            this.setData();
            this.displayTasks();
        }
        document.getElementById('addtask').focus();
    },
    
    updateTask: function(taskID) {
        let taskName = this.tasksList[taskID] = document.querySelector('.updatetask' + taskID).innerHTML;
        taskName = taskName.replace(/\&nbsp;/g, ""); // Replace HTML non-breaking space entity
        taskName = taskName.replace( /(<([^>]+)>)/ig, ""); // Replace HTML tags
        taskName = taskName.trim();
        document.querySelector('.updatetask' + taskID).innerHTML = taskName;
        this.tasksList[taskID] = taskName;
        this.setData();
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
            html = `<div class="searchfound"><span>Search Result Found for: </span><span>${searchterm.value}</span>`;
        } else if (searchterm.value == "") {
            html = "Please enter a search term.";
        } else {
            html = `<div class="searchnotfound"><span>Sorry, no search results for: </span><span>${searchterm.value}</span>`;
        }
        document.getElementById("searchresults").innerHTML = html;
        searchterm.value = '';
    },
};