// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'test_imedicine',
      user:     'postgres',
      password: 'esquilow12'
    },
   
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
      tableName: 'knex_migrations'
    },

    seeds: {
      directory: `${__dirname}/src/database/seeds`
    },
    useNullAsDefault: true,
    
  },


   
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
   
};
