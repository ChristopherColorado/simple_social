const sequelize = require("../config/connection");

const syncModels = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Unable to synchronize the models:", err);
    process.exit(1);
  }
};

syncModels();
