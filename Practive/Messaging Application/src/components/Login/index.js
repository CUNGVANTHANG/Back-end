import React from "react";
import { Row, Col, Typography, Button } from "antd"; // Bố cục trong antd được chia thành 24 cột, flex box
// import { auth } from "../../firebase/config";

const { Title } = Typography;

export default function Login() {
  const handleFbLogin = () => {
    // auth.signInWithPopup();
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
