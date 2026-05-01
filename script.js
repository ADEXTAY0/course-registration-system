let loggedInUser = localStorage.getItem("user");

if (!loggedInUser) {
    window.location.href = "login.html";
}

let selectedCourses = [];
let totalUnits = 0;

function addCourse(course, units) {
    if (!student.name || !student.matric) {
        alert("Please enter your details first");
        return;
    }

    let exists = selectedCourses.find(c => c.name === course);

    if (!exists) {
        selectedCourses.push({ name: course, units: units });

        totalUnits += units;

        localStorage.setItem("courses", JSON.stringify(selectedCourses));
        localStorage.setItem("units", totalUnits);

        displayCourses();
    } else {
        alert("Course already added");
    }
}

function removeCourse(course) {
    let removed = selectedCourses.find(c => c.name === course);

    selectedCourses = selectedCourses.filter(c => c.name !== course);

    totalUnits -= removed.units;

    localStorage.setItem("courses", JSON.stringify(selectedCourses));
    localStorage.setItem("units", totalUnits);

    displayCourses();
}

function displayCourses() {
    const list = document.getElementById("selected-courses");
    const total = document.getElementById("total-units");

    list.innerHTML = "";

    selectedCourses.forEach(course => {
        let li = document.createElement("li");
        li.textContent = `${course.name} (${course.units} units)`;

        let btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.onclick = () => removeCourse(course.name);

        li.appendChild(btn);
        list.appendChild(li);
    });

    total.textContent = totalUnits;
}

let student = {
    name: "",
    matric: ""
};

document.getElementById("student-form").addEventListener("submit", function(e) {
    e.preventDefault();

    student.name = document.getElementById("name").value;
    student.matric = document.getElementById("matric").value;

    localStorage.setItem("student", JSON.stringify(student));

    displayStudent();
});

function displayStudent() {
    const info = document.getElementById("student-info");
    info.innerHTML = `
        Name: ${student.name} <br>
        Matric No: ${student.matric}
    `;
}

window.onload = function() {
    let savedStudent = localStorage.getItem("student");
    let savedCourses = localStorage.getItem("courses");

    if (savedStudent) {
        student = JSON.parse(savedStudent);
        displayStudent();
    }

    if (savedCourses) {
        selectedCourses = JSON.parse(savedCourses);
        displayCourses();
    }
};
let savedUnits = localStorage.getItem("units");

if (savedUnits) {
    totalUnits = parseInt(savedUnits);
}