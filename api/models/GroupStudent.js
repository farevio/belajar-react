module.exports = {
    tableName: 'group_student',
    attributes: {
        group: {
            columnName: "group_id",
            model: 'group'
        },
        student: {
            columnName: "student_id",
            model: "student",
        }
    }
};
