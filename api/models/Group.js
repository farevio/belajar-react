module.exports = {
    attributes: {
        period: {
            columnName: 'period_id',
            model: 'period'
        },
        totalStudents: {
            columnName: 'total_students',
            type: 'number'
        },
        peminatan: {
            columnName: 'peminatan_id',
            model: 'peminatan'
        },
        students: {
            collection: 'student',
            via: 'group',
            through: 'groupstudent'
        },
        topics: {
            collection: 'topic',
            via: 'group',
            through: 'topicselection'
        }
    },
    getIdByStudentId: async function(studentId, periodId) {
        const groupsRecords = await GroupStudent.find({
            where: {
                student: studentId,
            },
            select: ['group']
        }).populate('group')
        .sort('id DESC');
        const groups = groupsRecords.map(record => record.group);
        const groupAtPeriod = groups.find(group => group.period == periodId);
        if (groupAtPeriod) {
            return groupAtPeriod.id;
        }
    }
}

/*
customToJSON: function () {
        let group = this.toObject();
        if (Array.isArray(group.students)) group.students.map(student => {
            const {hashedPassword, newPasswordToken, newPasswordTokenExpiresAt, ...omitted} = student;
            return omitted;
        })
    },
*/