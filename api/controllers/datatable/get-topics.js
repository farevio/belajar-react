module.exports = {
    friendlyName: "get topic",

    description: 'mengirim daftar record topic dalam format datatable',

    inputs: {
        draw: {required: true, type: 'number'},
        start: {type: 'number'},
        //length: {type: 'number'},
        search: {type: 'ref'},
        order: {type: 'ref'},
        columns: {type: 'ref'},
    },

    exits: {
        success: {}
    },
    
    fn: async function (inputs, exits) {
        const {
            draw,
            start,
            length,
            "search[value]": searchVal,
        } = inputs;

        const getColumnSearchVal = (name) => {
            this.req.query.keys().find(param => {
                const leftBracket = '\[';
                const rightBracket = '\]';
                const bracket = new RegExp(`${rightBracket}|${leftBracket}`);
                const words = param.split(bracket).filter(word => word != '');
                if (words.length == 2) {
                    if (words[0] == 'columns' && typeof(words[1]) == 'number' && words[2] == 'name') {
                        if (this.req.query[param] == name) {
                            const searchVal = this.req.query()
                        }
                    }
                }
            })
        }

        const getColumnOrder = (columnName) => {
            const columnIndex = columns.findIndex(column => column.name == columnName);
            return order.find(order => order.column == columnIndex);
        }

        const filteredLecturerIds = (await Lecturer.find({
            where: {
                name: {contains: 'search'},
            },
            select: ['id']
        })).map(lecturer => lecturer.id);

        const filteredPeminatanIds = (await Peminatan.find({
            where: {
                or: [
                    {abbrev: search.value},
                    {id: getColumn('peminatan').search ? getColumn('peminatan').search.value : undefined}
                ]
            },
            select: ['id']
        })).map(peminatan => peminatan.id);

        const filteredPeriodIds = (await Period.find({
            where: {
                id: getColumn('period').search ? getColumn('period').search.value : undefined
            },
            select: ['id']
        })).map(period => period.id);
        const sortQuota = getColumnOrder('quota') ? `quota ${getColumnOrder('quota').dir.toUpperCase()}` : undefined;
        const topics = await Topic.find({
            where: {
                or: [
                    {name: {contains: search}},
                    {lecturer: filteredLecturerIds},
                    {peminatan: filteredPeminatanIds},
                    {period: filteredPeriodIds},
                ]
            },
            skip: start,
            limit: length,
            sort: sortQuota
        }).populate('lecturer')
        .populate('peminatan')
        .populate('peminatan');
        const topicsCount = await Topic.count();
        return {
            draw: parseInt(draw),
            recordsTotal: topicsCount,
            recordsFiltered: topics.length,
            data: topics
        }
    }
}