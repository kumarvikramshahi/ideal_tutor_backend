const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const { ThrowError, CustomizeError } = require('../../common/Errors');
const Teacher = require('../../schemas/Profile/Teacher');
const Student = require('../../schemas/Profile/Student');

module.exports = async (req, resp, next) => {

    const firstName = req.body.first_Name;
    const lastName = req.body.last_Name;
    const email = req.body.email;
    const password = req.body.password;
    const mobileNo = req.body.mobileNo;

    const rememberMe = req.rememberMe || "30d";

    const UserTypeSchema = req.params.userType == "teacher" ? Teacher : Student
    const OtherUserType = req.params.userType == "teacher" ? Student : Teacher

    try {
        let user = await UserTypeSchema.findOne({ mobileNo: mobileNo })
        if (user) ThrowError("user already exists!", 400);
        else {
            user = await OtherUserType.findOne({ mobileNo: mobileNo })
            if (user) ThrowError("user already exists!", 400);
        }
    }
    catch (error) {
        next(error)
    }

    bcrypt.hash(password, 12)
        .then(hashPassword => {
            const newUser = new UserTypeSchema({
                first_Name: firstName,
                last_Name: lastName,
                email: email,
                password: hashPassword,
                mobileNo: mobileNo,
            })
            return newUser.save()
        })
        .then(userData => {
            if (!userData) ThrowError("Internal server error", 500);
            const token = JWT.sign(
                {
                    email: userData?.email,
                    userId: userData?._id.toString()
                },
                'JoEsLineKoCopyKreWoDuniyaKaSbseBraWalaBhosriwalaSamjhaReRandiyaWala',
                { expiresIn: rememberMe }
            )
            resp.status(201).json({
                userId: userData?._id.toString(),
                token: token,
                expiresIn: rememberMe
            })
        })
        .catch(err => {
            next(err)
        })
}
