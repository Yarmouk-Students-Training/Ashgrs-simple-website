const { sequelize, user } = require("./models")
async function connect(){
    await sequelize.sync({force: true})
}
connect()
    .then(res => console.log(res))
    .catch(err => console.log(err))