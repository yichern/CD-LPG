const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');

const router = express.Router();

// lesson model
const Lesson = require('../../models/Lesson');
const { response } = require('express');

// @route   POST api/lessons
// @desc    create a lesson
// @access  private
router.post('/', (req, res) => {
  const {
    generation,
    trainingType,
    conduct,
    regulations,
    logistics,
    mostRecent,
    children,
    defaultFiles,
    owner,
  } = req.body;

  if (
    !generation ||
    !trainingType ||
    !conduct ||
    !regulations ||
    !logistics ||
    !mostRecent ||
    // !defaultFiles ||
    !owner
  ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const newLesson = new Lesson({
    generation,
    trainingType,
    conduct,
    regulations,
    logistics,
    mostRecent,
    children,
    defaultFiles,
    owner,
  });
  newLesson
    .save()
    .then((lesson) => res.json(lesson))
    .catch((err) => {
      res.status(400).json({ msg: err._message });
    });
});

// @route   GET api/lessons
// @desc    get all lessons
// @access  public
router.get('/', (req, res) => {
  Lesson.find()
    .sort({ conduct: 1 })
    .then((lessons) => res.json(lessons));
});

// @route   GET api/lessons/:id
// @desc    get one lesson
// @access  public
router.get('/:id', (req, res) => {
  Lesson.findById(req.params.id).then((lesson) => {
    if (lesson) return res.json(lesson);
    return res.status(404).json({ msg: 'Lesson not found' });
  });
});

// @route   DELETE api/lessons/:id
// @desc    delete a lesson
// @access  private
router.delete('/:id', (req, res) => {
  Lesson.findById(req.params.id)
    .then((lesson) => {
      lesson.remove().then(() => {
        res.json({ _id: lesson._id, success: true });
      });
    })
    .catch((err) => res.status(404).json({ msg: 'Cannot delete lesson' }));
});

// @route   PATCH api/lessons/:id
// @desc    edit a lesson
// @access  private
router.patch('/:id', (req, res) => {
  Lesson.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((lesson) => res.json(lesson))
    .catch((err) => res.status(404).json({ msg: 'Cannot delete lesson' }));
});

// @route   POST api/lessons/user
// @desc    add a (child) lesson
// @access  private
router.post('/user', async (req, res) => {
  const { id, owner, meta } = req.body;
  Lesson.findById(id)
    .then((parentLesson) => {
      // update child lesson
      const childLesson = new Lesson(parentLesson);
      childLesson._id = mongoose.Types.ObjectId();
      childLesson.owner = owner;
      childLesson.meta = meta;
      childLesson.isNew = true;
      childLesson.generation = 'child';

      childLesson.save((err) => {
        if (err) throw err;
        return res.json(childLesson);
      });
    })
    .catch((err) => {
      res.status(404).json({ msg: 'Cannot add lesson' });
    });
});

module.exports = router;
