const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_spa"
);

const Things = sequelize.define("thing", {
  name: {
    type: Sequelize.DataTypes.STRING,
  }
});

const init = async () => {
  try {
    console.log("hello world");
    await sequelize.sync({ force: true });
    await Things.create({ name: "foo" });
    await Things.create({ name: "bar" });
    await Things.create({ name: "baz" });
  } catch (ex) {
    console.log(ex);
  }
};

init();
