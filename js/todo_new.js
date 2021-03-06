$(document).ready(function () {
    const todoForm = {
        todos: [],
        statusOfList: "all"
    }


    window.addItem = (event) => {
        var input = $(event.target).siblings()[0];
        var toAdd = $(input).val();

        todoForm.todos.push({id: generateUUID(), name: toAdd, complete: false});
        render()
    }
    window.checkComplete = (currentCompleteStatus) => {
        if (currentCompleteStatus == false) {
            return "";
        } else {
            return "checked";
        }
    }
    window.checkItem = (event) => {
        var viewId = $(event.target).parent("li").attr("id");

        let checkedItem = todoForm.todos.find((item) => item.id === viewId);
        if (checkedItem !== undefined) {
            checkedItem.complete = !checkedItem.complete;
        }
        render();
    }




    window.filterByStatus = (todo, status) => {

        const filterBys = (x, status) => {
            if (status === "all")
                return true;
            else if (status === "complete")
                return x.complete;
            else
                return !x.complete;
        }

        var list = todo.filter((x) => filterBys(x, status)).map((x) => {
            todoLi = () => {
                return `<li id="${x.id}" class="${checkComplete(x.complete)}" onclick="editItem(event)">
                <input name="done-todo" type="checkbox" class="done-todo" ${x.complete ? 'checked' : ""} onclick = "checkItem(event)" >${x.name}</li>`;
            }
            return todoLi();
        });

        return list;
    }
window.editItem = (event)=>{
    console.log(event.target);
     var viewId = $(event.target).attr("id");
    //var text =  $(event.target).text();
    console.log(viewId);
    $(event.target).attr("contentEditable",true)
        .focus()
        .keypress(
        function (event){
            var keycode = event.keyCode?event.keyCode:event.which;
            if(keycode == "13"){
                todoForm.todos.find((item)=>item.id === viewId).name = $(event.target).text();
                console.log( todoForm.todos);
                render();
            }
        }
    )

   // render();

}

    window.showStatus = (currentStatus, status) => {
        if (currentStatus == status) {
            return "selected";
        } else {
            return "";
        }
    }
    window.showTodoList = (status) => {
        todoForm.statusOfList = status;
        render();
    }
    todoList = () => {
        return `<div>
            <input class="input-text" type="text" name="ListItem" data-com.agilebits.onepassword.user-edited="yes">
            <div id="button" onclick = "addItem(event)">Add</div>
        </div>
        <br>
        <ol>
        ${filterByStatus(todoForm.todos, todoForm.statusOfList).join("")}
        </ol>
        <div>
            <ul id="filters">
                <li>
                    <a href="#" data-filter="all" class="${showStatus(todoForm.statusOfList, 'all')}" onclick = "showTodoList('all')" >ALL</a>
                </li>
                <li>
                    <a href="#" data-filter="active" class="${showStatus(todoForm.statusOfList, 'active')}" onclick = "showTodoList('active')">Active</a>
                </li>
                <li>
                    <a href="#" data-filter="complete" class="${showStatus(todoForm.statusOfList, 'complete')}" onclick = "showTodoList('complete')">Complete</a>
                </li>
            </ul>

        </div>`
    }


    function generateUUID() {
        /*jshint bitwise:false */
        var i,
            random;
        var uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12
                ? 4
                : (i === 16
                    ? (random & 3 | 8)
                    : random)).toString(16);
        }
        return uuid;
    }

    const render = () => {

        $("#todo").html(todoList())



    }
    render();
})


