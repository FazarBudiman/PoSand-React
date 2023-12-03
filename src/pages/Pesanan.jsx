import { Card, Col, Empty, Layout, List, Row, Space, Tabs, Typography } from "antd";
import Siders from "../components/Siders";
import Headers from "../components/Headers";
import { Content } from "antd/es/layout/layout";
import PesananSelesai from "../components/PesananSelesai";
import PesananBelumSelesai from "../components/PesananBelumSelesai";
import PesananDiKerjakan from "../components/PesananDiKerjakan";
import PesananAdd from "../components/PesananAdd";
import PosandApi from "../api/PosandApi";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllPesanan, getSelectedPesanan } from "../redux/slice/PesananSlice";
import Meta from "antd/es/card/Meta";

const Pesanan = () => {
  const dispatch = useDispatch();
  const detailPesanan = useSelector(getSelectedPesanan);

  const getDataPesanan = async () => {
    const response = await PosandApi.get(`/pesanan`, {
      headers: {
        "access-token": Cookies.get("access-token"),
      },
    }).catch((err) => {
      console.log(err);
    });
    dispatch(addAllPesanan(response.data.data));
  };

  useEffect(() => {
    getDataPesanan();
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
            padding: 20,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          <Row style={{ width: "100%", textAlign: "left" }} justify={"space-between"} gutter={[0, { lg: 30 }]}>
            <Col xs={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} md={{ span: 22, order: 1 }} lg={{ span: 22, order: 1 }} xl={{ span: 12, order: 1 }}>
              <Tabs
                tabPosition="left"
                defaultActiveKey="pesanan"
                type="card"
                size="middle"
                items={[
                  {
                    label: "Tambah Pesanan",
                    key: "tambahPesanan",
                    children: <PesananAdd />,
                  },
                  {
                    label: "Pesanan",
                    key: "pesanan",
                    children: <PesananBelumSelesai />,
                  },
                  {
                    label: "Pesanan Dikerjakan",
                    key: "pesananDikerjakan",
                    children: <PesananDiKerjakan />,
                  },
                  {
                    label: "Pesanan Selesai",
                    key: "pesananSelesai",
                    children: <PesananSelesai />,
                  },
                ]}
              />
            </Col>
            <Col xs={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }} md={{ span: 22, order: 2 }} lg={{ span: 22, order: 2 }} xl={{ span: 12, order: 2 }} style={{ display: "flex", justifyContent: "center" }}>
              {detailPesanan.length === 0 ? (
                <Empty />
              ) : (
                <Space align="start" size="middle">
                  <Card
                    style={{
                      width: 250,
                    }}
                    cover={<img alt="example" src={detailPesanan[0].contoh_model} />}
                  >
                    <Meta title={detailPesanan[0].nama} description={`${detailPesanan[0].banyaknya} ${detailPesanan[0].kategori} `} />
                    <p style={{ marginTop: 15 }}>{detailPesanan[0].catatan}</p>
                  </Card>

                  <Space direction="vertical">
                    <List size="small" header={<p>Ukuran Baju</p>} style={{ width: 200 }}>
                      <List.Item>
                        <List.Item.Meta description="Lebar Bahu" />
                        <Typography.Text>{detailPesanan[0].lebar_bahu}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Lingkar Dada" />
                        <Typography.Text>{detailPesanan[0].lingkar_dada}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Panjang Baju" />
                        <Typography.Text>{detailPesanan[0].panjang_baju}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Panjang Lengan" />
                        <Typography.Text>{detailPesanan[0].panjang_lengan}</Typography.Text>
                      </List.Item>
                    </List>
                    <List size="small" header={<p>Ukuran Baju</p>} style={{ width: 200 }}>
                      <List.Item>
                        <List.Item.Meta description="Lebar Bahu" />
                        <Typography.Text>{detailPesanan[0].lebar_bahu}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Lingkar Dada" />
                        <Typography.Text>{detailPesanan[0].lingkar_dada}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Panjang Baju" />
                        <Typography.Text>{detailPesanan[0].panjang_baju}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Panjang Lengan" />
                        <Typography.Text>{detailPesanan[0].panjang_lengan}</Typography.Text>
                      </List.Item>
                    </List>
                  </Space>
                </Space>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Pesanan;
