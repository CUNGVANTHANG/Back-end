## Overview

🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI

🎃 Authentication && Authorization with JWT, save in cookie

👾 Real-time messaging with Socket.io

🚀 Online user status

👌 Global state management with Zustand

Other:

- MongoDB (Lưu trữ dữ liệu)
- Cloudinary (Lưu trữ ảnh)

## Setup

**1. MongoDB**

Tạo project trên https://cloud.mongodb.com/

<image src="https://github.com/user-attachments/assets/01d02c14-0401-4fb2-a5c3-a25b6f762dd7" height="500px" >

Xong đó sử dụng và được lưu trong `.env`

```
MONGODB_URI="mongodb+srv://cungvanthang2k3:<db_password>@cluster0.cnmcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

Check connect bằng cách

```js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed");
  }
};
```

**2. Cloudinary**

Truy cập vào trang https://console.cloudinary.com/

Sau đó copy nội dung này

![image](https://github.com/user-attachments/assets/893722d3-e879-42f1-8dfa-af2480adbc39)

Lưu vào biến môi trường `.env`

```
CLOUDINARY_CLOUD_NAME="dlgkf0o6d"
```

Sau đó vào **Settings**

![image](https://github.com/user-attachments/assets/72ba4966-708c-437e-b181-0d864f9c13a8)

Sau đó chọn **Generate New API Key**. Vào gmail lấy code để **Approve**

![image](https://github.com/user-attachments/assets/6e1373f4-52db-4831-beda-c35fea76fee1)

Sau đó lấy API KEY và API SECRET

```
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```
