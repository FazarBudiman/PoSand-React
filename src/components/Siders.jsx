import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Flex, Grid } from "antd";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const { useBreakpoint } = Grid;

const Siders = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { sm, md } = useBreakpoint();

  return (
    <>
      {sm && md && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            minHeight: "100vh",
            color: "black",
            position: "sticky",
          }}
        >
          <Flex align="flex-end" style={{ margin: "10px 0px 40px" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: "white",
                fontSize: "16px",
              }}
            />
          </Flex>

          <Menu
            mode="inline"
            items={[
              {
                key: "dashboard",
                icon: <AiOutlineDashboard />,
                label: <Link to="/dashboard">Dashboard</Link>,
              },
              {
                key: "pesanan",
                icon: <AiOutlineShoppingCart />,
                label: <Link to="/pesanan">Pesanan</Link>,
              },
              {
                key: "pelanggan",
                icon: <BsPeople />,
                label: <Link to="/pelanggan">Pelanggan</Link>,
              },
              {
                key: "karyawan",
                icon: <LiaPeopleCarrySolid />,
                label: <Link to="/karyawan">Karyawan</Link>,
              },
            ]}
          />
        </Sider>
      )}
    </>
  );
};

export default Siders;
