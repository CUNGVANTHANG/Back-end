## 1. Using
- Template engine (EJS)
- NodeJS/ExpressJS
- MongoDB (connect using mongoose - CRUD)
- MVC

## 2. Config

![image](https://github.com/user-attachments/assets/11d91abb-f1b2-4730-ab0e-1b5e20307b93)

```env
# .env
MONGODB_URI = mongodb+srv://cungvanthang2k3:k4JfeyQRPs5jpjNb@cluster0.x5cc3dy.mongodb.net/
```

```js
// config/db.js
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
```

```js
// models/Customer.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
```

