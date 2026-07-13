function stripDept(name) {
    return name.replace(/^Department\s+of\s+/i, '').replace(/^History and Archaeology$/, 'History and Archaeology');
}
function buildDeptSelect(selectEl, defaultDept) {
    selectEl.innerHTML = '';
    departmentGroups.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.label;
        group.options.forEach(dept => {
            const opt = document.createElement('option');
            opt.value = dept;
            opt.textContent = dept;
            if (defaultDept && dept === defaultDept) opt.selected = true;
            optgroup.appendChild(opt);
        });
        selectEl.appendChild(optgroup);
    });
}

function populateTeachers(dept) {
    const teacherSelect = document.getElementById('teacherName');
    teacherSelect.innerHTML = '';
    const teachers = teacherData[dept] || [];
    if (teachers.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '-- No teachers found --';
        teacherSelect.appendChild(opt);
        return;
    }
    teachers.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        teacherSelect.appendChild(opt);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const studentDeptEl = document.getElementById('studentDept');
    const teacherDeptEl = document.getElementById('teacherDept');

    buildDeptSelect(studentDeptEl, 'Department of Computer Science and Engineering');
    buildDeptSelect(teacherDeptEl, 'Department of Computer Science and Engineering');


    populateTeachers(teacherDeptEl.value);

    teacherDeptEl.addEventListener('change', () => {
        populateTeachers(teacherDeptEl.value);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const templateSelect = document.getElementById('studentTemplate');
    const saveBtn = document.getElementById('saveStudentBtn');
    const deleteBtn = document.getElementById('deleteStudentBtn');
    const studentNameEl = document.getElementById('studentName');
    const studentIdEl = document.getElementById('studentID');
    const regNoEl = document.getElementById('regNo');
    const yearEl = document.getElementById('year');
    const semesterEl = document.getElementById('semester');
    const sessionEl = document.getElementById('session');
    const studentDeptEl = document.getElementById('studentDept');

    const STORAGE_KEY = 'studentTemplates';

    function getStudentTemplates() {
        try {
            const templates = localStorage.getItem(STORAGE_KEY);
            return templates ? JSON.parse(templates) : [];
        } catch (e) {
            console.error("Error reading from localStorage", e);
            return [];
        }
    }

    function saveStudentTemplates(templates) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }

    function populateTemplateDropdown() {
        const templates = getStudentTemplates();
        templateSelect.innerHTML = '<option value="">-- Select a Student --</option>';
        templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.studentID;
            option.textContent = `${template.studentName} (${template.studentID})`;
            templateSelect.appendChild(option);
        });
    }

    templateSelect.addEventListener('change', () => {
        const selectedId = templateSelect.value;
        if (!selectedId) return;

        const templates = getStudentTemplates();
        const template = templates.find(t => t.studentID === selectedId);

        if (template) {
            studentNameEl.value = template.studentName;
            studentIdEl.value = template.studentID;
            regNoEl.value = template.regNo;
            yearEl.value = template.year;
            semesterEl.value = template.semester;
            sessionEl.value = template.session;
            studentDeptEl.value = template.department;
        }
    });

    saveBtn.addEventListener('click', () => {
        const studentID = studentIdEl.value.trim();
        if (!studentID) {
            alert('Student ID is required to save a template.');
            return;
        }

        const newTemplate = {
            studentName: studentNameEl.value,
            studentID: studentID,
            regNo: regNoEl.value,
            year: yearEl.value,
            semester: semesterEl.value,
            session: sessionEl.value,
            department: studentDeptEl.value,
        };

        let templates = getStudentTemplates();
        const existingIndex = templates.findIndex(t => t.studentID === studentID);

        if (existingIndex > -1) {
            templates[existingIndex] = newTemplate;
        } else {
            templates.push(newTemplate);
        }

        saveStudentTemplates(templates);
        populateTemplateDropdown();
        templateSelect.value = studentID;
        alert(`Student template for ${newTemplate.studentName} has been saved.`);
    });

    deleteBtn.addEventListener('click', () => {
        const selectedId = templateSelect.value;
        if (!selectedId) {
            alert('Please select a template to delete.');
            return;
        }

        let templates = getStudentTemplates();
        const templateToDelete = templates.find(t => t.studentID === selectedId);

        if (confirm(`Are you sure you want to delete the template for ${templateToDelete.studentName}?`)) {
            templates = templates.filter(t => t.studentID !== selectedId);
            saveStudentTemplates(templates);
            populateTemplateDropdown();
            alert('Template deleted successfully.');
        }
    });

    populateTemplateDropdown();
});


const generateBtn = document.getElementById('generateBtn');
const logoUrl = 'lib/brur_optimized.png';

function loadImageAsBase64(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = function () {
            resolve('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCI+QlJVUjwvdGV4dD48L3N2Zz4=');
        };
        img.src = url;
    });
}

generateBtn.addEventListener('click', async () => {
    document.getElementById("pCourseTitle").textContent = document.getElementById("courseTitle").value;
    document.getElementById("pCourseCode").textContent = document.getElementById("courseCode").value;
    document.getElementById("pStudentName").textContent = document.getElementById("studentName").value;
    document.getElementById('pAssignmentTitle').innerText = document.getElementById('assignmentTitle').value || "";
    document.getElementById("pStudentID").textContent = document.getElementById("studentID").value;
    document.getElementById("pRegNo").textContent = document.getElementById("regNo").value;
    document.getElementById("pYear").textContent = document.getElementById("year").value;
    document.getElementById("pSemester").textContent = document.getElementById("semester").value;
    document.getElementById("pSession").textContent = document.getElementById("session").value;
    document.getElementById("pStudentDept").textContent = stripDept(document.getElementById("studentDept").value);
    document.getElementById("pTeacherName").textContent = document.getElementById("teacherName").value;
    document.getElementById("pTeacherDesignation").textContent = document.getElementById("teacherDesignation").value;
    document.getElementById("pTeacherDept").textContent = stripDept(document.getElementById("teacherDept").value);

    const documentType = document.getElementById("documentType").value;
    document.querySelector('.assignment-label').textContent = documentType;

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
        scale: 4,
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