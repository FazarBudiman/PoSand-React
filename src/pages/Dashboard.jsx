import { Card, Col, Layout, Row, Skeleton, Space, Statistic, Table, Tag } from "antd";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineShoppingCart, MdOutlineAddShoppingCart } from "react-icons/md";
import { IoPeople, IoShirtOutline } from "react-icons/io5";
import Headers from "../components/Headers";
import { Content } from "antd/es/layout/layout";
import Meta from "antd/es/card/Meta";
import Siders from "../components/Siders";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PosandApi from "../api/PosandApi";

const Dashboard = () => {
  const [dashboardCount, setdashboardCount] = useState([]);
  const [dataKaryawanAktif, setDataKaryawanAktif] = useState([]);
  useEffect(() => {
    PosandApi.get(`/dashboard`, {
      headers: {
        "access-token": Cookies.get("access-token"),
      },
    })
      .then((response) => {
        setdashboardCount(response.data.data[0]);
        setDataKaryawanAktif(response.data.data[1]);
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
          {dashboardCount.length === 0 ? (
            <Skeleton active style={{ padding: 50 }} paragraph={{ rows: 10 }} />
          ) : (
            <>
              <Row>
                <Col xs={{ span: 20 }} sm={{ offset: 1, span: 10 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 8 }} xl={{ span: 5 }}>
                  <Card
                    bordered
                    style={{
                      marginTop: 24,
                    }}
                  >
                    <Meta avatar={<AiOutlineShopping size={28} color="#2A2A2D" />} title="Pesanan Selesai" description={dashboardCount.pesanan_selesai} />
                  </Card>
                </Col>
                <Col xs={{ span: 20 }} sm={{ offset: 1, span: 10 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 8 }} xl={{ span: 5 }}>
                  <Card
                    bordered
                    style={{
                      marginTop: 24,
                    }}
                  >
                    <Meta avatar={<MdOutlineShoppingCart size={28} color="#2A2A2D" />} title="Pesanan Belum Selesai" description={dashboardCount.pesanan_belum_selesai} />
                  </Card>
                </Col>
                <Col xs={{ span: 20 }} sm={{ offset: 1, span: 10 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 8 }} xl={{ span: 5 }}>
                  <Card
                    bordered
                    style={{
                      marginTop: 24,
                    }}
                  >
                    <Meta avatar={<MdOutlineAddShoppingCart size={28} color="#2A2A2D" />} title="Pesanan Baru" description={dashboardCount.pesanan_baru} />
                  </Card>
                </Col>
                <Col xs={{ span: 20 }} sm={{ offset: 1, span: 10 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 8 }} xl={{ span: 5 }}>
                  <Card
                    bordered
                    style={{
                      marginTop: 24,
                    }}
                  >
                    <Meta avatar={<IoShirtOutline size={28} color="#2A2A2D" />} title="Total Pesanan" description={dashboardCount.total_pesanan} />
                  </Card>
                </Col>
              </Row>
              <Row style={{ marginTop: 50 }} justify={"center"}>
                <Col span={6}>
                  <Table
                    dataSource={dataKaryawanAktif}
                    columns={[
                      {
                        title: "No",
                        dataIndex: "no",
                        align: "center",
                      },
                      {
                        title: "Nama",
                        dataIndex: "nama",
                        align: "center",
                      },
                      {
                        title: "Status",
                        dataIndex: "status",
                        align: "center",
                        render: () => <Tag color="#063b86">Aktif</Tag>,
                      },
                    ]}
                  />
                </Col>
                <Col span={14}>
                  <Space direction="vertical">
                    <Card bordered={false} bodyStyle={{ backgroundColor: "#f0f0f0" }} style={{ width: "20em" }}>
                      <Statistic
                        title="Karyawan Aktif"
                        value={dashboardCount.karyawan_aktif}
                        valueStyle={{
                          color: "#063b86",
                        }}
                        prefix={<IoPeople />}
                        suffix="orang"
                      />
                    </Card>
                    <Card bordered={false} bodyStyle={{ backgroundColor: "#f0f0f0" }} style={{ width: "20em" }}>
                      <Statistic
                        title="Karyawan Tidak Aktif"
                        value={dashboardCount.karyawan_tidak_aktif}
                        valueStyle={{
                          color: "#b20709",
                        }}
                        prefix={<IoPeople />}
                        suffix="orang"
                      />
                    </Card>
                  </Space>
                </Col>
              </Row>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
