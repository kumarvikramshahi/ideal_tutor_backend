const router = require('express').Router();
// const { body } = require('express-validator');
// const multer = require('multer');
// const uploadFiles = multer({ dest: "incomingFileUpload/" });

const { getTeacherProfile } = require('../controllers/Profile/Teacher');
const { patchTeacherProfile } = require('../controllers/Profile/Teacher');
const { getTeacherList } = require('../controllers/PartialFetch/TeacherList');

// const isAuth = require('../../../utils/is-auth');

// Validation
// body('bookName')
//     .trim()
//     .isLength({ max: 50 })
//     .withMessage("Book name shouldn't exceeds 50 words")
//     .isLength({ min: 1 })
//     .withMessage('Book name should be atleast of 1 word'),
//     body('author')
//         .trim()
//         .isLength({ max: 20 })
//         .withMessage("Author name shouldn't exceeds 20 words")
//         .isLength({ min: 3 })
//         .withMessage("Author name should be atleast of 3 words"),
//     body('genre')
//         .trim()
//         .isLength({ max: 15 })
//         .withMessage("Genre shouldn't exceeds 15 words")
//         .isLength({ min: 3 })
//         .withMessage("Genre should be atleast of 3 words"),

// Auth middleware
// isAuth,

// uploadFiles.single('bookFile'),

router.get('/profile/fetch/teacher/',
    getTeacherProfile
);

router.patch('/profile/edit/teacher/',
    patchTeacherProfile
);

router.get('/fetch/teacherList/', getTeacherList)

module.exports = router;