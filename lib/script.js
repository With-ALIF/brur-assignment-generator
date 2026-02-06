const generateBtn = document.getElementById('generateBtn');

generateBtn.addEventListener('click', () => {
    document.getElementById("pCourseTitle").textContent = 
        document.getElementById("courseTitle").value;

    document.getElementById("pCourseCode").textContent = 
        document.getElementById("courseCode").value;

    document.getElementById("pStudentName").textContent = 
        document.getElementById("studentName").value;

    const assignmentTitle = document.getElementById('assignmentTitle').value;
        document.getElementById('pAssignmentTitle').innerText = assignmentTitle || "Your Assignment Topic Here";

    document.getElementById("pStudentID").textContent = 
        document.getElementById("studentID").value;

    document.getElementById("pRegNo").textContent = 
        document.getElementById("regNo").value;

    document.getElementById("pYear").textContent = 
        document.getElementById("year").value;

    document.getElementById("pSemester").textContent = 
        document.getElementById("semester").value;

    document.getElementById("pSession").textContent = 
        document.getElementById("session").value;

    document.getElementById("pStudentDept").textContent = 
        document.getElementById("studentDept").value;

    document.getElementById("pTeacherName").textContent = 
        document.getElementById("teacherName").value;

    document.getElementById("pTeacherDesignation").textContent = 
        document.getElementById("teacherDesignation").value;

    document.getElementById("pTeacherDept").textContent = 
        document.getElementById("teacherDept").value;

    const rawDate = document.getElementById("subDate").value;
  
    let formattedDate = "Not Set";
    if (rawDate) {
        const dateObj = new Date(rawDate);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        formattedDate = dateObj.toLocaleDateString('en-GB', options);
    }
    
    document.getElementById("pSubDate").textContent = formattedDate;

    document.getElementById("inputForm").style.display = "none";
    document.getElementById("printable-area").style.display = "block";
});


function backToEdit() {
    document.getElementById("printable-area").style.display = "none";
    document.getElementById("inputForm").style.display = "block";
}