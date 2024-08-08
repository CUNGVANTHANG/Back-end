## Using

## Config

- Vào https://firebase.google.com/. Vào **Project settings**

<img src="https://github.com/user-attachments/assets/95bee1ac-76db-40cc-a7b2-fd28e8c8ca6a" width="500px" >

- Chúng ta cần phải cài đặt thư viện firebase vào dự án

```
npm install firebase
```

- Copy đoạn code trong phần tutorial ở phía dưới

```js
const firebaseConfig = {
  apiKey: "AIzaSyCIrq3jrqeSHOOC-J_g31FLbHh9fhRXtTo",
  authDomain: "chat-app-ca301.firebaseapp.com",
  projectId: "chat-app-ca301",
  storageBucket: "chat-app-ca301.appspot.com",
  messagingSenderId: "365404581577",
  appId: "1:365404581577:web:4d0135bfb9eb4819852718",
  measurementId: "G-E5G4FTZGEC"
};
```

- Ta config trong file `config.js`

```js
import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIrq3jrqeSHOOC-J_g31FLbHh9fhRXtTo",
  authDomain: "chat-app-ca301.firebaseapp.com",
  projectId: "chat-app-ca301",
  storageBucket: "chat-app-ca301.appspot.com",
  messagingSenderId: "365404581577",
  appId: "1:365404581577:web:4d0135bfb9eb4819852718",
  measurementId: "G-E5G4FTZGEC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;
```

- Ta vào phần **Authentication** trong firebase

<img src="https://github.com/user-attachments/assets/5fde0fd5-9f28-4970-8c3d-d4c8e5f33817" width="500px" >

Tiếp theo ta vào trang https://developers.facebook.com/, rồi tạo ứng dụng. Sau khi tạo xong ta vào phần **Cài đặt ứng dụng** -> **Thông tin cơ bản**

<img src="https://github.com/user-attachments/assets/44af4ce8-287e-43f3-b3f2-8c4ec2592c8f" width="300px" >

<img src="https://github.com/user-attachments/assets/5a6293a8-c618-437e-9946-33d2f4759178" width="600px" >

Xong đó vào lấy **ID ứng dụng** và **Khóa bí mật của ứng dụng** paste vào đây

<img src="https://github.com/user-attachments/assets/c6ab3011-d501-474a-b9f3-8c71a3e1c14f" width="500px" >

Đồng thời copy URI này. Vào phần **Trường hợp sử dụng** để chỉnh sửa

<img src="https://github.com/user-attachments/assets/35e0a68d-e267-4c61-95fe-f827be2e6308" width="500px" >

<img src="https://github.com/user-attachments/assets/9f6b706b-809e-43d6-852c-50dda7b95eb3" width="400px" >

Vào **URI chuyển hướng OAuth hợp lệ** paste ra

<img src="https://github.com/user-attachments/assets/0def4d3a-7770-4f74-9b5b-f0146d4d92d8" width="500px" >

Đến khi hiển thị như này là **thành công**

<img src="https://github.com/user-attachments/assets/41e053a8-cb1c-4d64-ab78-2817f4487f94" width="300px" >
