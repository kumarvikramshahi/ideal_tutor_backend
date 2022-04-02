// const JWT = require('jsonwebtoken');

const { ThrowError } = require('../../common/Errors')
const Teacher = require('../../schemas/Profile/Teacher')

exports.getTeacherList = (req, res, next) => {

    const pincode = req.query.pincode;

    Teacher.find() // { address: { pincode: pincode } }
        .then(data => {
            if (!data.length) ThrowError("Unable to fetch Teacher list.", 404);
            const teacherList = []
            for (let item of data) {
                teacherList.push({
                    first_Name: item.first_Name,
                    last_Name: item.last_Name,
                    profile_Pic: item.profile_Pic,
                    skills: {
                        max_level_class_teach: item.skills?.max_level_class_teach,
                        subject_teach: item.skills?.subject_teach
                    },
                    number_of_student_teach: item.number_of_student_teach,
                    rating_star: item.rating_star,
                    number_of_rating_given: item.number_of_rating_given
                })
            }
            res.status(200).json({ data: teacherList });
        })
        .catch(err => next(err))
}