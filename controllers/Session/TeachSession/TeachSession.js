// const JWT = require('jsonwebtoken');

const { ThrowError } = require('../../../common/Errors')
const TeachSession = require('../../../schemas/TeachingSession')
const Student = require('../../../schemas/Profile/Student')
const Teacher = require('../../../schemas/Profile/Teacher')

exports.postTeachSession = (req, resp, next) => {

    const teacherId = req.body.tid;
    const bookedBy = req.body.booked_by_id;
    const isGrpStudy = req.body.is_grp_study;
    const sIds = isGrpStudy ? req.body.s_ids : [bookedBy];
    const sessionType = req.body.sess_type;
    const startDate = req.body.start_date;
    const endDate = req.body.end_data;
    const subjectTeach = req.body.sub_teach;
    const isTeacherVisit = req.body.is_teacher_visit;
    const totalSessionCharge = req.body.total_charge;
    const paymentMode = [req.body.pay_mode];
    const paymentId = req.body.pay_id ? [req.body.pay_id] : null;

    const newTeachSession = TeachSession({
        tid: teacherId,
        booked_by_id: bookedBy,
        is_grp_study: isGrpStudy,
        ...(sIds && { s_ids: sIds }),
        sess_type: sessionType,
        start_date: startDate,
        end_data: endDate,
        status: paymentMode !== 'cod' && !paymentId ? "pending" : 'scheduled',
        sub_teach: subjectTeach,
        is_teacher_visit: isTeacherVisit,
        total_charge: totalSessionCharge,
        pay_modes: paymentMode,
        ...(paymentId && { pay_ids: paymentId })
    })

    newTeachSession.save()
        .then(async (data) => {
            if (!data) ThrowError("Internal server error", 500)
            let studentCount = 0;

            const updateResult = await Teacher.updateOne({ _id: teacherId }, { $push: { teach_sessions: data._id } })
            if (!(updateResult.matchedCount)) ThrowError(`Invalid teacher Id`, 400);
            if (!(updateResult.modifiedCount)) ThrowError("Internal Server Error", 500);

            for (let item of sIds) {
                const result = await Student.updateOne({ _id: item }, { $push: { teach_sessions: data._id } })
                if (!(result.matchedCount)) ThrowError(`Invalid s_Id[${studentCount}]`, 400);
                if (!(result.modifiedCount)) ThrowError("Internal Server Error", 500);
                studentCount++;
            }

            resp.status(201).json({
                message: "session generated and its ID added to " + studentCount + " student's profile.",
                data: data
            })
        })
        .catch(err => next(err))
}

exports.patchTeachSession = (req, res, next) => {
    const sesId = req.body.ses_id
    const sIds = req.body.s_ids;
    const isGrpStudy = req.body.is_grp_study;
    const sessionType = req.body.sess_type;
    const startDate = req.body.start_date;
    const endDate = req.body.end_data;
    const status = req.body.status;
    const subjectTeach = req.body.sub_teach;
    const isTeacherVisit = req.body.is_teacher_visit;
    const paymentMode = req.body.pay_mode;
    const paymentId = req.body.pay_id;

    TeachSession.updateOne({ _id: sesId }, {
        $set: {
            ...((isGrpStudy == true || isGrpStudy == false) && { is_grp_study: isGrpStudy }),
            ...(sessionType && { sess_type: sessionType }),
            ...(startDate && { start_date: startDate }),
            ...(endDate && { end_data: endDate }),
            ...(subjectTeach && { sub_teach: subjectTeach }),
            ...(isTeacherVisit != null && isTeacherVisit != undefined && { is_teacher_visit: isTeacherVisit }),
            ...(status && { status: status })
        }
    })
        .then(result => {
            if (!(result.matchedCount)) ThrowError("ses_id not found", 404)
            res.status(200).json({
                message: "Updated successfully!"
            })
        })
        .catch(err => next(err))
}

exports.fetchTeachSession = (req, res, next) => {
    const sesId = req.query.ses_id;

    TeachSession.findOne({ _id: sesId })
        .then(data => data)
        .catch(err => next(err))
}

// delete for cancelled sessions and also delete it from student's & teacher's teach sessions.

// exports.deleteTeachSession = (req, res, next) => {
//     const sesId = req.query.ses_id;

//     TeachSession.findOneAndDelete({ _id: sesId })
//         .then(result => {

//             // const updateResult = await Teacher.updateOne({ _id: result.tid},)

//             if (!result) ThrowError("Server Error", 500);
//             res.status(200).json({
//                 message: "sesion deleted successfully!"
//             })
//         })
//         .catch(err => next(err))
// }
