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
    const submissionTypeEl = document.getElementById('submissionType');
    const submissionTypeWrapper = document.getElementById('submissionTypeWrapper');
    const groupCountWrapper = document.getElementById('groupCountWrapper');
    const groupMemberCountEl = document.getElementById('groupMemberCount');
    const groupActions = document.getElementById('groupActions');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const cardsContainer = document.getElementById('studentCards');
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

    function populateTemplateDropdown(selectEl) {
        if (!selectEl) return;
        const currentVal = selectEl.value;
        const templates = getStudentTemplates();
        selectEl.innerHTML = '<option value="">-- Select a Student --</option>';
        templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.studentID;
            option.textContent = `${template.studentName} (${template.studentID})`;
            selectEl.appendChild(option);
        });
        if (currentVal) selectEl.value = currentVal;
    }

    function updateAllTemplateDropdowns() {
        document.querySelectorAll('.template-select').forEach(sel => populateTemplateDropdown(sel));
    }

    function updateGroupCountSelector(count) {
        if (!groupMemberCountEl) return;
        let option = groupMemberCountEl.querySelector(`option[value="${count}"]`);
        if (!option) {
            option = document.createElement('option');
            option.value = count;
            option.textContent = `${count} Students`;
            groupMemberCountEl.appendChild(option);
        }
        groupMemberCountEl.value = count;
    }

    function removeStudentCard(removeIndex) {
        let entries = getStudentEntries();
        if (entries.length <= 2) {
            alert('A group project must have at least 2 students.');
            return;
        }
        entries.splice(removeIndex, 1);
        renderStudentCards(entries);
    }

    function createStudentCard(index, total) {
        const card = document.createElement('div');
        card.className = 'student-card';

        const isFirst = index === 0;
        const header = document.createElement('div');
        header.className = 'student-card-header';

        const title = document.createElement('div');
        title.className = 'student-card-title';
        title.textContent = total > 1
            ? `Student ${index + 1}${isFirst ? ' (Group Leader)' : ''}`
            : 'Student Details';
        header.appendChild(title);

        if (total > 2) {
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn-remove-member';
            removeBtn.innerHTML = '&times; Remove';
            removeBtn.title = `Remove Student ${index + 1}`;
            removeBtn.addEventListener('click', () => {
                removeStudentCard(index);
            });
            header.appendChild(removeBtn);
        }

        card.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'grid';

        grid.innerHTML = `
            <div class="input-group full-width">
                <label>Student Template:</label>
                <select class="template-select"></select>
                <div class="template-buttons">
                    <button type="button" class="template-btn template-save">Save</button>
                    <button type="button" class="template-btn btn-delete template-delete">Delete</button>
                </div>
            </div>
            <div class="input-group full-width">
                <label>Student's Name:</label>
                <input type="text" class="student-name" placeholder="Alif">
            </div>
            <div class="input-group">
                <label>Student's ID:</label>
                <input type="text" class="student-id" placeholder="1230XXXX">
            </div>
            <div class="input-group">
                <label>Registration Number:</label>
                <input type="text" class="student-reg" placeholder="0000 18xxxx">
            </div>
        `;

        card.appendChild(grid);
        return card;
    }

    function renderStudentCards(customEntries = null) {
        const isGroup = submissionTypeEl.value === 'group';
        let previous = customEntries || getStudentEntries();

        let count;
        if (isGroup) {
            if (submissionTypeWrapper) submissionTypeWrapper.classList.remove('full-width');
            if (groupCountWrapper) groupCountWrapper.style.display = 'block';
            if (groupActions) groupActions.style.display = 'block';

            if (customEntries) {
                count = Math.max(2, customEntries.length);
            } else {
                count = parseInt(groupMemberCountEl.value, 10) || 3;
            }
            updateGroupCountSelector(count);
        } else {
            if (submissionTypeWrapper) submissionTypeWrapper.classList.add('full-width');
            if (groupCountWrapper) groupCountWrapper.style.display = 'none';
            if (groupActions) groupActions.style.display = 'none';
            count = 1;
        }

        cardsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            cardsContainer.appendChild(createStudentCard(i, count));
        }

        cardsContainer.querySelectorAll('.student-card').forEach((card, i) => {
            if (previous[i]) {
                const nameEl = card.querySelector('.student-name');
                const idEl = card.querySelector('.student-id');
                const regEl = card.querySelector('.student-reg');
                if (nameEl) nameEl.value = previous[i].name || '';
                if (idEl) idEl.value = previous[i].id || '';
                if (regEl) regEl.value = previous[i].regNo || '';
            }

            const templateSelect = card.querySelector('.template-select');
            populateTemplateDropdown(templateSelect);

            templateSelect.addEventListener('change', function () {
                const selectedId = this.value;
                if (!selectedId) return;

                const template = getStudentTemplates().find(t => t.studentID === selectedId);
                if (!template) return;

                card.querySelector('.student-name').value = template.studentName;
                card.querySelector('.student-id').value = template.studentID;
                card.querySelector('.student-reg').value = template.regNo;
                yearEl.value = template.year;
                semesterEl.value = template.semester;
                sessionEl.value = template.session;
                studentDeptEl.value = template.department;
            });

            card.querySelector('.template-save').addEventListener('click', () => {
                const nameEl = card.querySelector('.student-name');
                const idEl = card.querySelector('.student-id');
                const regEl = card.querySelector('.student-reg');

                const studentID = idEl.value.trim();
                if (!studentID) {
                    alert('Student ID is required to save a template.');
                    return;
                }

                const newTemplate = {
                    studentName: nameEl.value.trim(),
                    studentID: studentID,
                    regNo: regEl.value.trim(),
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
                updateAllTemplateDropdowns();
                card.querySelector('.template-select').value = studentID;
                alert(`Student template for ${newTemplate.studentName || studentID} has been saved.`);
            });

            card.querySelector('.template-delete').addEventListener('click', () => {
                const selectEl = card.querySelector('.template-select');
                const selectedId = selectEl.value;
                if (!selectedId) {
                    alert('Please select a template to delete.');
                    return;
                }

                const templateToDelete = getStudentTemplates().find(t => t.studentID === selectedId);
                const label = templateToDelete ? templateToDelete.studentName || selectedId : selectedId;

                if (confirm(`Are you sure you want to delete the template for ${label}?`)) {
                    const templates = getStudentTemplates().filter(t => t.studentID !== selectedId);
                    saveStudentTemplates(templates);
                    updateAllTemplateDropdowns();
                    alert('Template deleted successfully.');
                }
            });
        });
    }

    submissionTypeEl.addEventListener('change', () => {
        renderStudentCards();
    });

    if (groupMemberCountEl) {
        groupMemberCountEl.addEventListener('change', () => {
            const targetCount = parseInt(groupMemberCountEl.value, 10) || 3;
            let entries = getStudentEntries();
            while (entries.length < targetCount) {
                entries.push({ name: '', id: '', regNo: '' });
            }
            if (entries.length > targetCount) {
                entries = entries.slice(0, targetCount);
            }
            renderStudentCards(entries);
        });
    }

    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', () => {
            let entries = getStudentEntries();
            if (entries.length >= 15) {
                alert('Maximum 15 students allowed.');
                return;
            }
            entries.push({ name: '', id: '', regNo: '' });
            renderStudentCards(entries);
        });
    }

    renderStudentCards();
});


const generateBtn = document.getElementById('generateBtn');
const logoUrl = 'data:image/png;base64,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';

function getStudentEntries() {
    return Array.from(document.querySelectorAll('#studentCards .student-card')).map(card => ({
        name: card.querySelector('.student-name').value.trim(),
        id: card.querySelector('.student-id').value.trim(),
        regNo: card.querySelector('.student-reg').value.trim(),
    }));
}

const FALLBACK_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCI+QlJVUjwvdGV4dD48L3N2Zz4=';

function loadImageAsBase64(url) {
    return new Promise((resolve) => {
        let settled = false;
        const finish = (value) => {
            if (settled) return;
            settled = true;
            resolve(value);
        };

        const img = new Image();
        img.onload = function () {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                finish(canvas.toDataURL('image/png'));
            } catch (e) {
                console.error('Could not encode logo, using fallback.', e);
                finish(FALLBACK_LOGO);
            }
        };
        img.onerror = function () {
            console.error('Logo failed to load, using fallback.', url);
            finish(FALLBACK_LOGO);
        };

        setTimeout(() => {
            if (!settled) {
                console.error('Logo load timed out, using fallback.', url);
                finish(FALLBACK_LOGO);
            }
        }, 5000);

        img.src = url;
    });
}

generateBtn.addEventListener('click', async () => {
    const students = getStudentEntries();

    if (students.length === 0) {
        alert('No student fields were found. Please reload the page.');
        return;
    }

    const isGroup = document.getElementById("submissionType").value === 'group';

    if (isGroup) {
        const missing = students.findIndex(s => !s.name || !s.id);
        if (missing !== -1) {
            alert(`Please fill in both Name and ID for Student ${missing + 1}.`);
            return;
        }
    } else if (!students[0].name) {
        alert("Please fill in the student's name.");
        return;
    }

    document.getElementById("pCourseTitle").textContent = document.getElementById("courseTitle").value;
    document.getElementById("pCourseCode").textContent = document.getElementById("courseCode").value;
    document.getElementById('pAssignmentTitle').innerText = document.getElementById('assignmentTitle').value || "";
    document.getElementById("pYear").textContent = document.getElementById("year").value;
    document.getElementById("pSemester").textContent = document.getElementById("semester").value;
    document.getElementById("pSession").textContent = document.getElementById("session").value;
    document.getElementById("pStudentDept").textContent = stripDept(document.getElementById("studentDept").value);
    document.getElementById("pTeacherName").textContent = document.getElementById("teacherName").value;
    document.getElementById("pTeacherDesignation").textContent = document.getElementById("teacherDesignation").value;
    document.getElementById("pTeacherDept").textContent = stripDept(document.getElementById("teacherDept").value);

    const individualBlock = document.getElementById("pIndividualBlock");
    const groupTable = document.getElementById("pGroupTable");
    const groupTableBody = document.getElementById("pGroupTableBody");
    groupTableBody.innerHTML = '';

    if (isGroup) {
        individualBlock.style.display = 'none';
        groupTable.style.display = 'table';
        document.getElementById("pSubmittedByHeader").textContent = 'SUBMITTED BY';

        if (students.length > 5) {
            groupTable.className = 'group-table compact-table-mini';
        } else if (students.length > 3) {
            groupTable.className = 'group-table compact-table';
        } else {
            groupTable.className = 'group-table';
        }

        students.forEach((student) => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const idCell = document.createElement('td');
            const regCell = document.createElement('td');

            nameCell.textContent = student.name;
            idCell.textContent = student.id;
            regCell.textContent = student.regNo;

            row.appendChild(nameCell);
            row.appendChild(idCell);
            row.appendChild(regCell);
            groupTableBody.appendChild(row);
        });
    } else {
        individualBlock.style.display = 'block';
        groupTable.style.display = 'none';
        document.getElementById("pSubmittedByHeader").textContent = 'SUBMITTED BY';

        document.getElementById("pStudentName").textContent = students[0].name;
        document.getElementById("pStudentID").textContent = students[0].id;
        document.getElementById("pRegNo").textContent = students[0].regNo;
    }

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

    try {
        if (typeof html2canvas !== 'function') {
            throw new Error('html2canvas did not load. Check your internet connection.');
        }
        if (!window.jspdf || !window.jspdf.jsPDF) {
            throw new Error('jsPDF did not load. Check your internet connection.');
        }

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
        const names = students.map(s => s.name.trim().replace(/\s+/g, '_')).filter(Boolean);
        let filename = 'Assignment_Cover.pdf';
        if (names.length === 1) {
            filename = `Assignment_${names[0]}.pdf`;
        } else if (names.length > 1) {
            const joinedNames = names.slice(0, 3).join('_');
            filename = `Assignment_Group_${joinedNames}${names.length > 3 ? '_and_others' : ''}.pdf`;
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save(filename);
    } catch (err) {
        console.error('PDF generation failed:', err);
        alert(`Could not generate the PDF.\n\n${err && err.message ? err.message : err}`);
    } finally {
        printableArea.style.display = "none";
        printableArea.style.position = "static";
        generateBtn.textContent = 'Download PDF';
        generateBtn.disabled = false;
    }
});