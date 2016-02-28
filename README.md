# Videogames DB
[![Circle CI](https://circleci.com/gh/sgottfried/videogames_db/tree/master.svg?style=svg)](https://circleci.com/gh/sgottfried/videogames_db/tree/master)

Videogames DB is a video game database that hits the GiantBomb API to search for games that the user owns.
It is implemented as a Single Page App in Express, using Mocha for front-end and backend tests.  It also uses the Sequelize ORM.

Users can search the GiantBomb API for games that they want to add to a collection, add the games to the collection, and view the collection.

App is currently hosted on Heroku at https://videogames-db.herokuapp.com/.

To get set up, you will need a GiantBomb API key [here](http://www.giantbomb.com/api/).
Then, set up an environment variable like this:

```
echo "export GIANT_BOMB_API_KEY= <YOUR KEY>" >> ~/.bash_profile
```

After starting Postgres, you will then need to run:

```
npm install -g sequelize-cli
npm install
npm run db:create
npm run db:migrate
```

You can then run `npm start` to start the server or `npm test` to run all the tests.
