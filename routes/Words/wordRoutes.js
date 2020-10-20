const router = require('express').Router();
const Word = require('./models/Word');

router.get('/get-words', (req, res) => {
  Word.find()
    .then((foundWords) => {
      return res.render('main/index', { wordsList: foundWords });
      // return res.json({ foundWords });
    })
    .catch((err) => res.json({ err }));
  // return res.send('All Words Shown here');
});

router.post('/add-word', (req, res) => {
  Word.findOne({ word: req.body.word })
    .then((foundWord) => {
      if (foundWord) {
        return res.send('Word Already Exists');
      } else {
        if (!req.body.word || !req.body.meaning) {
          return res.send('All Inputs Must Be Filled');
        }

        let newWord = new Word({
          word: req.body.word,
          meaning: req.body.meaning
        });

        newWord
          .save()
          .then(() => {
            return res.redirect('/words/get-words');
            // return res.status(200).json({ wordCreated });
          })
          .catch((err) => {
            return res.status(400).json({ message: 'Word Not Created', err });
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: 'Server Error', err });
    });
});

router.get('/add-word', (req, res) => {
  return res.render('main/add-word');
});

module.exports = router;
