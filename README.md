# Videogames DB
Videogames DB is a video game database that hits the GiantBomb API to search for games that the user owns.
It is implemented as a Single Page App in Express, using Mocha for front-end and backend tests.  It also uses the Sequelize ORM.

Users can search the GiantBomb API for games that they want to add to a collection, add the games to the collection, and view the collection.

To get set up, you will need a `secrets.json` file in the root directory of the project that contains the following:

```js
{
        "api_key": "YOUR GIANT BOMB API KEY"
}
```

You will then need to run:

```
npm install -g sequelize-cli
npm install
npm run db:create
npm run db:migrate
```

You can then run `npm start` to start the server or `npm test` to run all the tests.
