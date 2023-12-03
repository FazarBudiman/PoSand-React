import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PosandApi from "../api/PosandApi";

const Login = () => {
  const messageApi = message;
  const [formLogin] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    formLogin.resetFields();

    try {
      messageApi.loading("Login website ....");

      const response = await PosandApi.post(`/user/login`, {
        username: `${values.username}`,
        password: `${values.password}`,
      });

      messageApi.success("Login Success", 2);
      Cookies.set("access-token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      messageApi.error(`${err.response.data.message}`, 2);
    }
  };
  return (
    <>
      <Row justify={"center"} align={"middle"} style={{ height: "100vh", width: "100vw" }}>
        <Col xs={22} sm={14} md={10} lg={10} xl={8} style={{ display: "flex", justifyContent: "center" }}>
          <Card title="PoSand" bordered style={{ width: "100%" }}>
            <Form
              form={formLogin}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%", marginTop: 20 }} size="large">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Login;
