module.exports = {
    tableName: 'peminatan',
    attributes: {
        name: {
            type: 'string',
        },
        abbrev: {
            type:'string',
            unique: true,
        },
        kk_id: {
            model: 'Kk',
            columnName: 'kk_id',
        }
    }
}