import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // Lấy tất cả user ngoại trừ user đang đăng nhập
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    // Lấy tham số "id" từ req.params và đổi tên nó thành userToChatId.
    // Đây là id của người dùng mà bạn muốn trò chuyện cùng.
    const { id: userToChatId } = req.params;

    // Lấy id của người dùng hiện tại từ req.user, được gán thông qua middleware xác thực.
    const myId = req.user._id;

    // Truy vấn cơ sở dữ liệu để tìm tất cả tin nhắn giữa hai người:
    // - Trường hợp 1: Người gửi (senderId) là người dùng hiện tại (myId) và người nhận (receiverId) là userToChatId.
    // - Trường hợp 2: Người gửi là userToChatId và người nhận là myId.
    // Sử dụng toán tử $or của MongoDB để kết hợp hai điều kiện trên.
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    // Lấy text và image từ req.body
    const { text, image } = req.body;
    // Lấy id của người nhận từ req.params
    const { id: receiverId } = req.params;
    // Lấy id của người gửi từ req.user, được gán thông qua middleware xác thực.
    const senderId = req.user._id;

    let imageUrl;
    // Nếu có ảnh, upload ảnh lên Cloudinary và lấy URL trả về
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Tạo một tin nhắn mới và lưu vào cơ sở dữ liệu
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
