require('dotenv').config()
const express = require('express')
const app = express()
// const { Sequelize } = require('sequelize');
const { Sequelize, DataTypes,json } = require('sequelize');
 const bcrypt = require('bcrypt');
const {encrypt,middleware2,middleware3 } = require("./middlewares/common");

const port = process.env.PORT || 9090;
console.log(process.env.PORT);

app.use(express.json());//middleware to parse the body
 app.use(middleware2)
app.use(encrypt)

// app.use(middleware2);
app.set('view engine', 'ejs')//to show ejs data

// Option 3: Passing parameters separately (other dialects)
//sequelise connection
const sequelize = new Sequelize(process.env.DATABASE,
  process.env.MYSQLUSERNAME,
  process.env.MYSQLPASSWORD, {
  host: 'localhost',
  dialect: 'mysql'

})

async function connection() {
  const sequelize = new Sequelize(process.env.DATABASE,
    process.env.MYSQLUSERNAME,
    process.env.MYSQLPASSWORD, {
    host: 'localhost',
    dialect: 'mysql'

  })
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return null;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return error;
  }
}

const Assignment = sequelize.define('Assignment', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subject: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING

  }
}, {
  // Other model options go here
});
//create n get operation using mysql n sequelize
//post request

app.post("/api/create",middleware3, async (req, res) => {
  console.log(req.body)
  try {
    const encryptedpass = await bcrypt.hash(req.body.password, 10);

    const subject = await Assignment.create({
      name: "assignment 2",
      subject: "english",
      password: "encryptedpass"
    });
    //want to encrypt password
    res.json({ message: "success", data: subject })
  }
  catch (err) {
    res.json({ message: "error", data: err })
  }

})
//get request
app.get("/api/getAll", async (req, res) => {
  try {
    const subject = await Assignment.findAll()


    res.json({ message: "success", data: subject })
  }
  catch (err) {
    res.json({ message: "error", data: err })
  }

})
// app.use(middleware2)

//update route

app.put("/api/update/:id", async (req, res) => {
  const data = await Assignment.update({ subject: "golang" }, {
    where: {
      id: req.params.id
    }
  });
  res.json({ message: "success", data: data })

})
//delete route
app.delete("/api/delete/:id", async (req, res) => {
  await Assignment.destroy({
    where: {
      id: 7
    }

  });
  res.json({ message: "success" })

})

//ENV file
connection().then(err => {
  if (!err) {
    app.listen(port, () => {
      console.log("Server Running");
    });

  }
  else {
    console.log(err);
  }

})
// module.exports=Assignment;


// app.listen(port, () => {
//     console.log("Server Running");
//   });
// task create whole crud operation with template engine--> we hv to use -ejs to display the data
//for rest crete api



