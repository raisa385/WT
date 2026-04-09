// 1. Event listener for form submission
document.getElementById('student-form').addEventListener('submit', addStudent);
 
// 2. Add student function
function addStudent(event) {
    event.preventDefault(); // Prevent page reload
 
    // 3. Get student name from input
    let addButton = document.getElementById('add-button');
    addButton.disabled = true;

    document.getElementById('student-name').addEventListener('input', function () {
        if(this.value.trim()===''){addButton.disabled = true;}else{addButton.disabled = false}});

    let studentName = document.getElementById('student-name').value;
    let studentID = document.getElementById('student-id').value;
 
    if (studentName === '') {
        alert('Please enter a student name');
        return;
    }

    if (studentID === '') {
        alert('Please enter a student ID');
        return;
    }

    // 4. Create new list item
    let li = document.createElement('li');
    li.classList.add('student-item');
 
    // 5. Create span to show student name
    let span = document.createElement('span');
    span.textContent = studentID+" - "+studentName;
 
    // 6. Create Edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn-edit');
    editButton.addEventListener('click', function () {
        editStudent(li, span);
        updateCount();
    });
 
    // 6. Create Delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn-delete');
    deleteButton.addEventListener('click', function () {
        deleteStudent(li);
        updateCount();
    });

    let attendance = document.createElement('input');
    attendance.type = 'checkbox';
    attendance.classList.add('present-checkbox');
    attendance.addEventListener('change', function () {
        if (this.checked) {
            li.classList.add('present');
        } else {
            li.classList.remove('present');
        }
        attendanceCount();
    });
  
    // Put span and buttons inside li
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    li.appendChild(attendance);
 
    // 7. Add li to the student list
    document.getElementById('student-list').appendChild(li);
 
    // Clear input field
    document.getElementById('student-name').value = '';
    document.getElementById('student-id').value = '';

    updateCount();
}//------------------------------------------------------------------

//SORT
function sortAZ(){
    let list = document.getElementById('student-list');
    let students = Array.from(list.querySelectorAll('.student-item'));

    students.sort((a,b)=>{
        let A = a.querySelector('span').textContent.toLowerCase();
        let B = b.querySelector('span').textContent.toLowerCase();
        return A.localeCompare(B);
    });
    students.forEach(student=> list.appendChild(student));
}

 //SORT BUTTNW
    let sortButton = document.createElement('button');
    sortButton.textContent = 'Sort A-Z';
    sortButton.addEventListener('click',sortAZ);
    document.body.appendChild(sortButton);

//STUDENT SEARCH
document.getElementById('search-student').addEventListener('input',function(){
    let searchText= this.value.toLowerCase();
    let students = document.querySelectorAll('.student-item');

    students.forEach(student=>{
        let studentText = student.querySelector('span').textContent.toLowerCase();
        if(studentText.includes(searchText)){student.style.display='';}else{student.style.display = 'none';}
    });
});
//STUDENT COUNT
function updateCount(){
    let count = document.querySelectorAll('.student-item').length;
    document.getElementById('student-count').textContent="Total students: "+count;
}

//ATTENDANCE
function attendanceCount() {
    let present = document.querySelectorAll('.student-item.present').length;
    let total = document.querySelectorAll('.student-item').length;
    let absent = total - present;
    document.getElementById('attendance-count').textContent = "Present: " + present + ", Absent: " + absent;
}
 
// 8. Delete a student
function deleteStudent(studentElement) {
    let confirmDel = confirm("Are you sure you want to remove this student?");
    if(confirmDel){
        studentElement.remove();
        updateCount();
        attendanceCount();
    }   
}
 
// 9. Edit a student's name
function editStudent(studentElement, studentNameElement) {
    let currentText = studentNameElement.textContent;
    let parts = currentText.split(" - ");
    let currentID = parts[0];
    let currentName = parts[1];
    let newName = prompt("Enter new Name:", currentName);
    let newID = prompt("Enter new ID:", currentID);

    if (newID !== null && newID !== '' && newName !== null && newName !== '') {
        studentNameElement.textContent = newID + " - " + newName;
    }
}
 
// 10. Change list style (highlight)
function changeListStyle() {
    let students = document.querySelectorAll('.student-item');
    students.forEach(student => {
        student.classList.toggle('highlight');
    });
}
 
// 11. Add Highlight button dynamically
let changeStyleButton = document.createElement('button');
changeStyleButton.textContent = 'Highlight Students';
changeStyleButton.addEventListener('click', changeListStyle);
document.body.appendChild(changeStyleButton);

//HIGHLIGHT FIRST STUDENT
function highlightFirst()
{
    let students = document.querySelectorAll('.student-item');
    students.forEach(student=>{
        student.classList.remove('top-student');
    });
    
    if(students.length>0){students[0].classList.add('top-student');}
}

let highlightButton = document.createElement('button');
highlightButton.textContent = 'Highlight First Student';
highlightButton.addEventListener('click', highlightFirst);
document.body.appendChild(highlightButton);