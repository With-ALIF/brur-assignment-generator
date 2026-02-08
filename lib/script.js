const generateBtn = document.getElementById('generateBtn');

const logoUrl = 'lib/brur_optimized.png';

function loadImageAsBase64(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = function() {
            resolve('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCI+QlJVUjwvdGV4dD48L3N2Zz4=');
        };
        img.src = url;
    });
}

generateBtn.addEventListener('click', async () => {
    document.getElementById("pCourseTitle").textContent = document.getElementById("courseTitle").value;
    document.getElementById("pCourseCode").textContent = document.getElementById("courseCode").value;
    document.getElementById("pStudentName").textContent = document.getElementById("studentName").value;
    document.getElementById('pAssignmentTitle').innerText = document.getElementById('assignmentTitle').value || "Your Assignment Topic Here";
    document.getElementById("pStudentID").textContent = document.getElementById("studentID").value;
    document.getElementById("pRegNo").textContent = document.getElementById("regNo").value;
    document.getElementById("pYear").textContent = document.getElementById("year").value;
    document.getElementById("pSemester").textContent = document.getElementById("semester").value;
    document.getElementById("pSession").textContent = document.getElementById("session").value;
    document.getElementById("pStudentDept").textContent = document.getElementById("studentDept").value;
    document.getElementById("pTeacherName").textContent = document.getElementById("teacherName").value;
    document.getElementById("pTeacherDesignation").textContent = document.getElementById("teacherDesignation").value;
    document.getElementById("pTeacherDept").textContent = document.getElementById("teacherDept").value;
    
    const rawDate = document.getElementById("subDate").value;
    let formattedDate = "          ";
    if (rawDate) {
        const dateObj = new Date(rawDate);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        formattedDate = dateObj.toLocaleDateString('en-GB', options);
    }
    document.getElementById("pSubDate").textContent = formattedDate;
    
    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;
    
    const printableArea = document.getElementById("printable-area");
    const logoImg = printableArea.querySelector('.logo');
    
    const logoBase64 = await loadImageAsBase64(logoUrl);
    logoImg.src = logoBase64;
    
    printableArea.style.display = "block";
    printableArea.style.position = "absolute";
    printableArea.style.left = "0";
    printableArea.style.top = "0";
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const canvas = await html2canvas(printableArea, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = 297;
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save(`Assignment_${document.getElementById("studentName").value || 'Cover'}.pdf`);
    
    printableArea.style.display = "none";
    printableArea.style.position = "static";
    generateBtn.textContent = 'Download PDF';
    generateBtn.disabled = false;
});