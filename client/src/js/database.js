import { openDB } from "idb";

const initdb = async () =>
  openDB("markupDB", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("markup")) {
        console.log("markup store already exists");
        return;
      }
      db.createObjectStore("markup", { keyPath: "id", autoIncrement: true });
      console.log("markup store created");
    },
  });

/**
 * This method puts the given data to the database.
 * @param {string} content - text to save in the database
 */
export const putDb = async (content) => {
  console.log("PUT to the database");
  const markupDB = await openDB("markupDB", 1);
  const tx = markupDB.transaction("markup", "readwrite");
  const store = tx.objectStore("markup");
  // hard-code to id 1 for now
  const request = store.put({ id: 1, content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

/**
 * This method gets the data from the database.
 * @returns {object} { id, content }
 */
export const getDb = async () => {
  console.log("GET from the database");
  const markupDB = await openDB("markupDB", 1);
  const tx = markupDB.transaction("markup", "readonly");
  const store = tx.objectStore("markup");
  // hard-code to id 1 for now
  const request = store.get(1);
  const result = await request;
  console.log("🚀 - data received from the database");
  return result;
};

initdb();
