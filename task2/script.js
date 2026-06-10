// Form Validation

document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let error = document.getElementById("error");

    if (name === "" || email === "" || message === "") {
        error.innerText = "Please fill all fields!";
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
        error.innerText = "Enter a valid email!";
        return;
    }

    error.style.color = "green";
    error.innerText = "Form Submitted Successfully!";
});


// Dynamic To-Do List

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        ${taskText}
        <button onclick="removeTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
}
