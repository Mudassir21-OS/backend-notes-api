const fs = require('fs/promises');
const path = require('path');

const dataDirectory = path.join(__dirname, '..', 'data');
const storageFile = path.join(dataDirectory, 'notes.json');

async function ensureStorageFile() {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(storageFile);
  } catch (error) {
    const starterNotes = [
      {
        id: 1,
        title: 'First note',
        content: 'This note was loaded from the JSON persistence file.'
      }
    ];
    await saveNotes(starterNotes);
  }
}

async function loadNotes() {
  await ensureStorageFile();

  try {
    const rawData = await fs.readFile(storageFile, 'utf8');
    const notes = JSON.parse(rawData);

    if (!Array.isArray(notes)) {
      throw new Error('Storage file must contain an array of notes.');
    }

    return notes;
  } catch (error) {
    if (error instanceof SyntaxError) {
      const backupFile = `${storageFile}.bak`;
      await fs.copyFile(storageFile, backupFile).catch(() => null);
      await saveNotes([]);
      return [];
    }

    throw error;
  }
}

async function saveNotes(notes) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(storageFile, JSON.stringify(notes, null, 2), 'utf8');
}

function getNextId(notes) {
  if (notes.length === 0) {
    return 1;
  }

  return Math.max(...notes.map((note) => note.id)) + 1;
}

module.exports = {
  loadNotes,
  saveNotes,
  getNextId,
  storageFile
};
