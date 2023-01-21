const path = __dirname;

const server = require(`${path}/src/app.js`);
const { conn } = require(`${path}/src/db.js`);

const port = process.env.PORT || 3001;
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    // eslint-disable-line no-console
  });
});
