module.exports = {
    tableName: 'master_role',
    attributes: {
        id: {
            type: 'number',
            autoIncrement: true
        },

        role: {
            type: 'string',
            required: true
        }

    }
};
