// const JWT = require('jsonwebtoken');

const { ThrowError } = require('../../common/Errors')
const Student = require('../../schemas/Profile/Student')

exports.getStudentList = (req, res, next) => {

    const pincode = req.query.pincode;

    Student.find() // { address: { pincode: pincode } }
        .then(data => {
            if (!data.length) ThrowError("Unable to fetch Student list.", 404);
            const studentList = []
            for (let item of data) {
                studentList.push({
                    _id: item._id,
                    first_Name: item.first_Name,
                    last_Name: item.last_Name,
                    mobileNo: item.mobileNo,
                    profile_Pic: item.profile_Pic
                })
            }
            res.status(200).json({ data: studentList });
        })
        .catch(err => next(err))
}