import { Avatar, Button, Col, ConfigProvider, Drawer, Grid, Menu, Popover, Row, Tag, message } from "antd";
import { Layout } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FaBars, FaUser } from "react-icons/fa";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import PosandApi from "../api/PosandApi";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const Headers = () => {
  const { xs, sm, md } = useBreakpoint();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const messageApi = message;

  const logOut = async () => {
    try {
      const response = await PosandApi.get(`/user/logout`, {
        headers: {
          "access-token": Cookies.get("access-token"),
        },
      });
      messageApi.success(response.data.message, 2).then(() => {
        Cookies.set("access-token", "");
        window.location.reload();
      });
    } catch (err) {
      messageApi.error(`${err.response.data.message}`, 2);
    }
  };

  return (
    <>
      <Header
        style={{
          padding: "0px 20px",
          backgroundColor: "#ffffff",
          width: "100%",
        }}
      >
        <Row align={"middle"}>
          <Col xs={{ span: 14 }} sm={{ span: 16 }} md={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 20 }}>
            <Tag color="#EF0003" style={{ padding: "10px 30px", fontSize: "20px" }}>
              <b>PoSand</b>
            </Tag>
          </Col>
          {sm && (
            <Col xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 1 }} xl={{ span: 1 }} style={{ display: "flex" }}>
              <Popover
                title="Profile"
                content={<Button onClick={logOut}>Logout</Button>}
                trigger="click"
                open={openProfile}
                onOpenChange={(newOpen) => {
                  setOpenProfile(newOpen);
                }}
                placement="bottomRight"
              >
                <Avatar icon={<FaUser />} />
              </Popover>
            </Col>
          )}

          {((xs && !md) || (sm && !md)) && (
            <Col xs={{ span: 1 }} sm={{ span: 1 }}>
              <Button icon={<FaBars />} onClick={() => setOpenMenu(true)} style={{ display: "flex", alignItems: "center" }}></Button>
            </Col>
          )}
        </Row>
      </Header>

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "#fff",
            },
          },
        }}
      >
        <Drawer title="Menu" onClose={() => setOpenMenu(false)} open={openMenu} placement="top" styles={{ header: { width: "100vw" }, body: { width: "100vw" } }} style={{ height: "100vh" }}>
          <Menu>
            <Link to="/dashboard">
              <Menu.Item icon={<AiOutlineDashboard size={16} to="/" />}>Dashboard</Menu.Item>
            </Link>
            <Link to="/pesanan">
              <Menu.Item icon={<AiOutlineShoppingCart size={16} />}>Pesanan</Menu.Item>
            </Link>
            <Link to="/pelanggan">
              <Menu.Item icon={<BsPeople size={16} />}>Pelanggan</Menu.Item>
            </Link>
            <Link to="/pelanggan">
              <Menu.Item icon={<LiaPeopleCarrySolid size={16} />}>Karyawan</Menu.Item>
            </Link>

            {!sm && (
              <Menu.Item>
                <Button onClick={logOut}>Logout</Button>
              </Menu.Item>
            )}
          </Menu>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default Headers;
