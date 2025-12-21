const constants = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
}
const questionFormat = [
    {
        category: 'Rules of the road',
        numberOfQn: 3
    },
    {
        category: 'Speed limits',
        numberOfQn: 3
    },
    {
        category: 'Safe driving practices',
        numberOfQn: 1
    },
    {
        category: 'Right of way',
        numberOfQn: 4
    },
    {
        category: 'School buses & emergency vehicles',
        numberOfQn: 2
    },
    {
        category: 'Demerit points & penalties',
        numberOfQn: 3
    },
    {
        category: 'Alcohol, drugs & zero tolerance',
        numberOfQn: 2
    },
    {
        category: 'Licensing & vehicle requirements',
        numberOfQn: 2
    }
]


module.exports = {constants, questionFormat}