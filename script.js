document.addEventListener("DOMContentLoaded", function () {
    const noteTitleInput = document.getElementById("noteTitle");
    const noteContentInput = document.getElementById("noteContent");
    const saveButton = document.getElementById("saveNote");
    const clearButton = document.getElementById("clearNote");
    const notesList = document.getElementById("notesList");

    // Load saved notes from localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesList.innerHTML = ""; // Clear current list
        notes.forEach((note, index) => {
            const li = document.createElement("li");
            const title = document.createElement("div");
            title.className = "note-title";
            title.textContent = note.title;
            const content = document.createElement("div");
            content.textContent = note.content;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteNote(index);
            });
            li.appendChild(title);
            li.appendChild(content);
            li.appendChild(deleteButton);
            notesList.appendChild(li);
        });
    }

    // Save a new note
    function saveNote() {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();
        if (title && content) {
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.push({ title, content });
            localStorage.setItem("notes", JSON.stringify(notes));
            noteTitleInput.value = "";
            noteContentInput.value = "";
            loadNotes();
        } else {
            alert("Both title and content are required.");
        }
    }

    // Delete a specific note
    function deleteNote(index) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }

    // Clear the input fields
    function clearNote() {
        noteTitleInput.value = "";
        noteContentInput.value = "";
    }

    // Event listeners
    saveButton.addEventListener("click", saveNote);
    clearButton.addEventListener("click", clearNote);

    // Initial load
    loadNotes();
});
