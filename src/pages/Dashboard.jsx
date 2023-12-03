import { Card, Col, Layout, Row, Skeleton } from "antd";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineShoppingCart, MdOutlineAddShoppingCart } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";
import Headers from "../components/Headers";
import { Content } from "antd/es/layout/layout";
import Meta from "antd/es/card/Meta";
import Siders from "../components/Siders";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [pesananCount, setPesananCount] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api-posand.netlify.app/.netlify/functions/api/dashboard`, {
        headers: {
          "access-token": Cookies.get("access-token"),
        },
      })
      .then((response) => {
        setPesananCount(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Siders />
      <Layout>
        <Headers />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          {pesananCount.length === 0 ? (
            <Skeleton active />
          ) : (
            <Row>
              <Col xs={{ span: 20 }} sm={{ offset: 1, span: 10 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 8 }} xl={{ span: 5 }}>
                <Card
                  bordered
                  style={{
                    marginTop: 24,
                  }}
                >
                  <Meta avatar={<AiOutlineShopping size={28} color="#2A2A2D" />} title="Pesanan Selesai" description={pesananCount[0]} />
                </Card>
              </Col>
              <Col xs={{ span: 20 }} sm={{ offset: 1, span: 10 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 8 }} xl={{ span: 5 }}>
                <Card
                  bordered
                  style={{
                    marginTop: 24,
                  }}
                >
                  <Meta avatar={<MdOutlineShoppingCart size={28} color="#2A2A2D" />} title="Pesanan Belum Selesai" description={pesananCount[1]} />
                </Card>
              </Col>
              <Col xs={{ span: 20 }} sm={{ offset: 1, span: 10 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 8 }} xl={{ span: 5 }}>
                <Card
                  bordered
                  style={{
                    marginTop: 24,
                  }}
                >
                  <Meta avatar={<MdOutlineAddShoppingCart size={28} color="#2A2A2D" />} title="Pesanan Baru" description={pesananCount[2]} />
                </Card>
              </Col>
              <Col xs={{ span: 20 }} sm={{ offset: 1, span: 10 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 8 }} xl={{ span: 5 }}>
                <Card
                  bordered
                  style={{
                    marginTop: 24,
                  }}
                >
                  <Meta avatar={<IoShirtOutline size={28} color="#2A2A2D" />} title="Total Pesanan" description={pesananCount[3]} />
                </Card>
              </Col>
            </Row>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
