// const JWT = require('jsonwebtoken');

const { ThrowError } = require('../../common/Errors')
const Student = require('../../schemas/Profile/Student')

exports.getStudentProfile = (req, res, next) => {
    const userId = req.query.userId;
    const mobileNo = req.query.mobileNo;
    if (!userId && !mobileNo) res.status(400).json({ message: "Invalid request" });

    Student.findOne(userId ? { _id: userId } : { mobileNo: mobileNo })
        .then(data => {
            if (!data) ThrowError("student's profile not found!", 404);
            if (userId) res.status(200).json({ result: data });
            if (mobileNo) {
                const userData = {
                    _id: data._id,
                    first_Name: data.first_Name,
                    last_Name: data.last_Name,
                    mobileNo: data.mobileNo,
                    profile_Pic: data.profile_Pic
                }
                res.status(200).json({ result: userData });
            }
        })
        .catch(err => next(err))
}

exports.patchStudentProfile = async (req, resp, next) => {

    const userId = req.query.userId;

    const firstName = req.body.first_Name;
    const lastName = req.body.last_Name;
    const educationLevel = req.body.education_level;
    const degree = req.body.degree;
    const curAddr = req.body.cur_addr;
    const pincode = req.body.pincode;
    const city = req.body.city;
    const state = req.body.state;

    try {
        const result = await Student.updateOne({ _id: userId }, {
            $set: {
                ...(firstName && { first_Name: firstName }),
                ...(lastName && { last_Name: lastName }),
                educational_details: {
                    ...(educationLevel && { education_level: educationLevel }),
                    ...(degree && { degree: degree }),
                },
                address: {
                    ...(curAddr && { cur_addr: curAddr }),
                    ...(pincode && { pincode: pincode }),
                    ...(city && { city: city }),
                    ...(state && { state: state }),
                }
            }
        })
        if (!(result.matchedCount)) ThrowError("student _id not found", 404)
        resp.status(200).json({
            message: 'Updated successfully'
        })
    }
    catch (err) {
        next(err)
    }

}
