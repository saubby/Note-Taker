const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");


const show = (elem) => {
    elem.style.display = 'inline';
};

const hide = (elem) => {
    elem.style.display = 'none';
}

let activeNote = {};

const getNotes = () => {
    return $.ajax({
        url: "/api/notes",
        method: "GET",
    });
};


const saveNote = (note) =>
    fetch('/api/notes', {
        method: 'POST',
        data: note,
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });


const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json',
        },
    });

const renderactiveNote = function () {
    hide($savenoteBtn);

    if (activeNote.id) {
        noteTitle.setAttribute('readonly', true);
        noteText.setAttribute('readonly', true);
        noteTitle.value = activeNote.title;
        noteText.value = activeNote.text;
    }
    else {

        $noteTitle.val() = '';
        $noteText.val() = '';
    }
};

const handleNoteSave = function () {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val(),
    };

    saveNote(newNote).then(function () {
        getAndRenderNotes();
        renderActiveNote();
    });
};

const handleNoteDelete = function (event) {
    event.stopPropagation();

    const note = $(this).parent(".list-group-item").data();

    if (activeNote.id === note.id) {
        activeNote = {};
    }

    deleteNote(note.id).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

const handleNoteView = function (e) {
    e.preventDefault();
    activeNote = JSON.parse(e.currentTarget.getAttribute('data-note'));
    renderActiveNote();
};

const handleNewNoteView = function () {
    activeNote = {};
    renderactiveNote();
};


const handleRenderSaveBtn = function () {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        $savenoteBtn.hide();
    }
    else {
        $savenoteBtn.show();
    }
};

const renderNoteList = function (notes) {
    $noteList.empty();

    const noteListItems = [];
    const create$li = function (text, withDeleteButton = true) {
        const $li = $("<li class='list-group-item'>");
        const $span = $("<span>").text(text);
        $li.append($span);

        if (withDeleteButton) {
            const $delBtn = $(
                "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
            );
            $li.append($delBtn);
        }
        return $li;
    };

    if (notes.length === 0) {
        noteListItems.push(create$li('No saved Notes', false));
    }

    notes.forEach(function (note) {
        const $li = create$li(note.title).data(note);
        noteListItems.push($li);
    });

    $noteList.append(noteListItems);
};

const getAndRenderNotes = function () {
    return getNotes().then(renderNoteList);
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

getAndRenderNotes();