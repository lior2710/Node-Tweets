module.exports = {
    development: { /// Docker
        dialect: 'postgres',
        username: 'docker',
        password: 'docker',
        database: 'tweets_db_1',
        host: 'db',
        port: '5432',
    },
    test: {
        dialect: 'postgres',
        username: '',
        password: '',
        database: 'tweets_test',
        host: 'db',
        port: '5434',
    },
};
