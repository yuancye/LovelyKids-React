const express = require("express");
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require("cors");
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());

const FOUR_HUNDRED = 400;
const FIVE_HUNDRED = 500;

app.post('/register', async (req, res) => {
  let data = req.body;
  res.type('text');
  let db;
  try {
    let usernameExists = await isUserNameExists(data.username);
    if (usernameExists) {
      res.status(FOUR_HUNDRED).send('Username already exists.');
    } else {
      db = await getDBConnection();
      let query = `INSERT INTO User (username) VALUES (?)`;
      await db.run(query, [data.username]);
      res.send(`User registered for ${data.username}`);
    }
  } catch (err) {
    res.status(FIVE_HUNDRED).send(`Server error: ${err.message}`);
  } finally {
    if (db) {
      await db.close();
    }
  }
});

app.post('/login', async (req, res) => {
  let input = req.body;
  res.type('text');
  let db;
  try {
    let isUserNameExist =  await isUserNameExists(input.username)
    if (isUserNameExist) {
      let expiryDate = new Date();
      const expireLength = 30;
      expiryDate.setDate(expiryDate.getDate() + expireLength);
      res.cookie('username', input.username, {expires: expiryDate});
      res.send('Success');
    } else {
      res.status(FOUR_HUNDRED).send('Username does not exist.');
    }
  } catch (error) {
    res.status(FIVE_HUNDRED).send('Server error: ' + error.message);
  }
});



async function getDBConnection() {
  const db = await sqlite.open({
    filename: path.join(__dirname, '../db/lovelykids.db'),
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READWRITE
  });
  return db;
};

async function isUserNameExists(username) {
  let db;
  try {
    db = await getDBConnection();
    let query = 'SELECT COUNT(*) as count FROM User WHERE username = ?';
    let row = await db.get(query, [username]);
    return row.count > 0;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (db) {
      await db.close();
    }
  }
}

 const PORT_NUM = 3001;
 const PORT = process.env.PORT || PORT_NUM;
 app.listen(PORT);