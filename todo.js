// todo yu eklemek için formu seçmeliyiz
const form = document.querySelector("#todo-form");
//inputları eklemek için input seçme
const todoInput = document.querySelector("#todo");
//todo ul elementi içine eklenecek
const todoList = document.querySelector(".list-group");
//alert eklemek için
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

//filter input
const filter = document.querySelector("#filter");

const clearButton = document.querySelector("#clear-todos");

eventListeners();   // Sayfa açıldığında element seçimine göre çalışır

function eventListeners(){ // Tüm event Listenerlar
    form.addEventListener("submit",addTodo);    //todo ekleme
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);     //Sayfa yüklenince oluşan event listener
    secondCardBody.addEventListener("click",deleteTodo);
}

function addTodo(e){
    const newTodo = todoInput.value.trim();     //trim baştaki ve sonraki boşlukları siler

    if(newTodo === ""){
        showAlert("danger","Lütfen bir todo giriniz..");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Ekleme işlemi başarili..");
    }
    //tekrardan syfaya yönlenmesin diye default özelliği yıkma
    e.preventDefault();
}

function addTodoToUI(newTodo){  //String değeri list item olarak ekler
    //List item oluşturma
    const newListItem = document.createElement("li");       
    newListItem.className = "list-group-item d-flex justify-content-between";
    //Link oluşturma
    const newLink = document.createElement("a");
    newLink.href = "#";
    newLink.className = "delete-item";
    newLink.innerHTML = "<i class = 'fa fa-remove'></i>";

    newListItem.appendChild(document.createTextNode(newTodo));  //text node olarak ekleme
    newListItem.appendChild(newLink);

    //List itemi todoList e ekleme
    todoList.appendChild(newListItem);
    //Input boşaltma
    todoInput.value="";
}
function showAlert(type,message){
    //Alert oluşturma
    const newAlert = document.createElement("div");
    newAlert.className=`alert alert-${type}`;
    newAlert.textContent = message;

    firstCardBody.appendChild(newAlert);
    //setTimout ile elementi belli bir süre gösterip yok etme
    setTimeout(function(){
        newAlert.remove();
    },2000);
}
//local storage ile bağlantı kurma
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
//local storage a eleman ekleme
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){      //e.target ile nereye basıldığını buluruz.
        e.target.parentElement.parentElement.remove();      //2 yukarı çıkarak seçilen elementi silme
        deleteFromLocalStorage(e.target.parentElement.parentElement);
        showAlert("success","Todo başarı ile silindi..");
    }  
}
function deleteFromLocalStorage(deleteTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);      //Belirtilen indexten itibaren 1 eleman silinecek
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));    //local storage güncelleme
}