let students =
JSON.parse(localStorage.getItem("students")) || [];

displayStudents();

function addStudent(){

    let name =
    document.getElementById("name").value;

    let roll =
    document.getElementById("roll").value;

    let marks =
    document.getElementById("marks").value;

    if(name==="" || roll==="" || marks===""){
        alert("Please fill all fields");
        return;
    }

    let grade = calculateGrade(marks);

    let student = {
        name,
        roll,
        marks,
        grade
    };

    students.push(student);

    saveData();

    document.getElementById("name").value="";
    document.getElementById("roll").value="";
    document.getElementById("marks").value="";

    displayStudents();
}

function calculateGrade(marks){

    marks = Number(marks);

    if(marks>=90) return "A+";
    if(marks>=80) return "A";
    if(marks>=70) return "B";
    if(marks>=60) return "C";
    if(marks>=50) return "D";

    return "F";
}

function displayStudents(){

    let table =
    document.getElementById("studentTable");

    table.innerHTML="";

    students.forEach((student,index)=>{

        let row = `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.marks}</td>
            <td>${student.grade}</td>

            <td>

                <button
                class="edit-btn"
                onclick="editStudent(${index})">
                Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteStudent(${index})">
                Delete
                </button>

            </td>
        </tr>
        `;

        table.innerHTML += row;
    });

    updateDashboard();
}

function deleteStudent(index){

    if(confirm("Delete Student?")){

        students.splice(index,1);

        saveData();

        displayStudents();
    }
}

function editStudent(index){

    let student = students[index];

    let newName =
    prompt("Enter New Name",student.name);

    let newRoll =
    prompt("Enter New Roll",student.roll);

    let newMarks =
    prompt("Enter New Marks",student.marks);

    if(newName && newRoll && newMarks){

        students[index] = {

            name:newName,
            roll:newRoll,
            marks:newMarks,
            grade:calculateGrade(newMarks)
        };

        saveData();

        displayStudents();
    }
}

function searchStudent(){

    let input =
    document.getElementById("search")
    .value
    .toLowerCase();

    let rows =
    document.querySelectorAll("#studentTable tr");

    rows.forEach(row=>{

        let text =
        row.innerText.toLowerCase();

        if(text.includes(input)){
            row.style.display="";
        }
        else{
            row.style.display="none";
        }
    });
}

function updateDashboard(){

    document.getElementById(
    "totalStudents").innerText =
    students.length;

    if(students.length===0){

        document.getElementById(
        "avgMarks").innerText = 0;

        return;
    }

    let total = 0;

    students.forEach(student=>{

        total += Number(student.marks);
    });

    let avg =
    (total/students.length).toFixed(2);

    document.getElementById(
    "avgMarks").innerText = avg;
}

function saveData(){

    localStorage.setItem(
    "students",
    JSON.stringify(students)
    );
}
