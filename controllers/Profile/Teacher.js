// const JWT = require('jsonwebtoken');

const { ThrowError } = require('../../common/Errors')
const Teacher = require('../../schemas/Profile/Teacher')

exports.getTeacherProfile = (req, res, next) => {
    const userId = req.query.userId;
    if (!userId) res.status(400).json({ message: "Invalid userId" });

    Teacher.findById(userId)
        .then(data => {
            res.status(data ? 200 : 404).json({
                result: data ? data : "Requested teacher's profile not found!"
            });
        })
        .catch(err => next(err))
}

exports.patchTeacherProfile = (req, res, next) => {

    const userId = req.query.userId;

    const firstName = req.body.first_Name;
    const lastName = req.body.last_Name;
    const maxLevelClassTeach = req.body.skills?.max_level_class_teach;
    const subjectTeach = req.body.skills?.subject_teach;
    const experience = req.body.experience;
    const studentTeachNumber = req.body.number_of_student_teach;
    const achievement = req.body.achievement;
    const bookPrefrence = req.body.book_prefrence_list;
    const curAddr = req.body.cur_addr;
    const pincode = req.body.pincode;
    const city = req.body.city;
    const state = req.body.state

    if (firstName || lastName || maxLevelClassTeach || subjectTeach || experience || studentTeachNumber || achievement || bookPrefrence || curAddr || pincode || city || state) {
        Teacher.updateOne({ _id: userId }, {
            $set: {
                ...(firstName && { first_Name: firstName }),
                ...(lastName && { last_Name: lastName }),
                skills: {
                    ...(subjectTeach && { subject_teach: subjectTeach }),
                    ...(maxLevelClassTeach && { max_level_class_teach: maxLevelClassTeach })
                },
                ...(experience && { experience: experience }),
                ...(studentTeachNumber && { number_of_student_teach: studentTeachNumber }),
                ...(achievement && { achievement: achievement }),
                ...(bookPrefrence && { book_prefrence_list: bookPrefrence }),
                address: {
                    ...(curAddr && { cur_addr: curAddr }),
                    ...(pincode && { pincode: pincode }),
                    ...(city && { city: city }),
                    ...(state && { state: state }),
                }
            }
        })
            .then(result => {
                if (!(result.matchedCount)) ThrowError("teacher _id not found", 404)
                res.status(201).json({
                    message: 'Updated successfully'
                })
            })
            .catch(error => {
                next(error)
            })
    } else {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}
