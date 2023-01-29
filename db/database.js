const fs = require("fs");
const util = require("util");
const note = "./db/db.json";
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

class database {

    async getNotes() {
        try {
            const notesRaw = await readFileAsync(note, "UTF8");
            return notesRaw ? JSON.parse(notesRaw) : [];
        }
        catch (error) {
            throw error;
        }
    }

    async addoneNote(data) {
        try {
            await writeFileAsync(note, JSON.stringify(data, null, "\t")).then(() => {
                console.log("new note added successfully");
            });
        }
        catch (error) {
            throw error;
        }
    }

    async dltNote(data) {
        try {
            await writeFileAsync(note, JSON.stringify(data, null, "\t")).then(() => {
                console.log("Note deleted successfully");
            });
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = new database();