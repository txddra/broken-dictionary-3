const Word = require('../models/Word');

module.exports = {
  getAllWords: (res, req) => {
    Word.find()
      .then((foundWords) => {
        return res.render('main/index', { wordsList: foundWords });
      })
      .catch((err) => res.json({ err }));
  },
  getSingleWord: (req, res) => {
    Word.findById(req.params.wordId)
      .then((dbWord) => {
        if (dbWord) {
          return res.render('main/single-word', { foundWord: dbWord });
        } else {
          return res.status(400).send('No Word Found');
        }
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ confirmation: 'fail', message: 'Server Error', err });
      });
  },
  getAddWord: (req, res) => {
    return res.render('main/add-word');
  },
  addWord: (req, res) => {
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
              return res.redirect('/api/v1/words/get-words');
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
  },
  updateWord: (req, res) => {
    Word.findById(req.params.wordId)
      .then((foundWord) => {
        if (!foundWord) {
          return res.status(400).send('No Word Found');
        }
        if (!req.body.meaning) {
          return res.status(400).send('All Inputs Must Be Filled');
        }

        foundWord.meaning = req.body.meaning;

        foundWord.save().then(() => {
          return res.redirect(`/api/v1/words/single-word/${req.params.wordId}`);
        });
      })
      .catch((err) => {
        return res.status(500).json({ message: 'Server Error' });
      });
  },
  getUpdateWord: (req, res) => {
    Word.findById(req.params.wordId)
      .then((dbWord) => {
        if (!dbWord) {
          return res.status(400).send('No Word Found');
        }
        return res
          .status(200)
          .render('/main/update-word', { foundWord: dbWord });
      })
      .catch((err) => {
        return res.status(500).json({ message: 'Server Error' });
      });
  },
  deleteWord: (req, res) => {
    Word.findByIdAndDelete(req.params.wordId)
      .then((foundWord) => {
        if (!foundWord) {
          return res.status(400).send('Word Not Found');
        }

        return res.status(200).redirect('/api/v1/words/get-words');
      })
      .catch((err) => {
        return res.status(200).json({ message: 'Server Error' });
      });
  }
};
