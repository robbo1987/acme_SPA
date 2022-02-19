const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_spa"
);

const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

const Things = sequelize.define("thing", {
  name: {
    type: Sequelize.DataTypes.STRING,
  }
});




app.get( '/api/things', async(req,res,next) => {
try{
     res.send(await Things.findAll())

}

catch(ex) {
  next(ex)
}
})
const init = async () => {
  try {
    console.log("data seeded");
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    } )
    await sequelize.sync({ force: true });
    await Things.create({ name: "foo" });
    await Things.create({ name: "bar" });
    await Things.create({ name: "baz" });
  } catch (ex) {
    console.log(ex);
  }
};

init();
