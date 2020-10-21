const router = require('express').Router();

const {
  getAllWords,
  getSingleWord,
  getAddWord,
  addWord,
  updateWord,
  deleteWord
} = require('./controllers/wordController');

//See all words in the browser
router.get('/get-words', getAllWords);
//Post a word to DB
router.post('/add-word', addWord);

//Get the View for Adding a Word
router.get('/add-word', getAddWord);

//Get View for a single word
router.get('/single-word/:wordId', getSingleWord);

//Get View for updating a word
router.get('/update/:wordId', getUpdateWord);

//Put Updates into DB
router.put('/update/:wordId', updateWord);

//Delete Word from DB
router.delete('/delete/:wordId', deleteWord);

module.exports = route;
