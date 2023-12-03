import { Card, Col, Layout, Row, Skeleton, Table, Typography } from "antd";
import Search from "antd/es/input/Search";
import Headers from "../components/Headers";
import { Content } from "antd/es/layout/layout";
import ModalAddPelanggan from "../components/PelangganModalAdd";
import Siders from "../components/Siders";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addAllPelanggan, getAllPelanggan } from "../redux/slice/PelangganSlice";
import PosandApi from "../api/PosandApi";
import PelangganDetail from "../components/PelangganDetail";

const Pelanggan = () => {
  const dataPelanggan = useSelector(getAllPelanggan);
  const [dataSearched, setDataSearched] = useState([]);
  const dispatch = useDispatch();

  const getDataPelanggan = async () => {
    const response = await PosandApi.get(`/pelanggan`, {
      headers: {
        "access-token": Cookies.get("access-token"),
      },
    }).catch((err) => {
      console.log(err);
    });
    dispatch(addAllPelanggan(response.data.data));
  };

  const handleSearch = (value) => {
    if (value.length === 0) {
      setDataSearched([]);
    } else {
      dataPelanggan.filter((pelanggan) => {
        if (pelanggan.nama.toLowerCase().includes(value.toLowerCase())) {
          setDataSearched((e) => [...e, pelanggan]);
        }
      });
    }
  };

  useEffect(() => {
    if (dataSearched.length === 0) {
      getDataPelanggan();
    } else {
      dispatch(addAllPelanggan(dataSearched));
    }
  }, [dataSearched]);

  return (
    <Layout>
      <Siders />
      <Layout>
        <Headers />
        <Content
          style={{
            margin: "20px 16px 0",
            overflow: "initial",
            padding: 20,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          <Card title={<Typography.Title style={{ fontSize: 20 }}>Data Pelanggan</Typography.Title>} bordered={false}>
            <Row gutter={[0, { xs: 20 }]} style={{ marginBottom: 30 }}>
              <Col xs={{ span: 24 }} sm={{ span: 14 }} md={{ span: 14 }} lg={{ span: 18 }} xl={{ span: 18 }}>
                <ModalAddPelanggan />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 10 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Search placeholder="Search ..." enterButton onSearch={(value) => handleSearch(value)} allowClear />
              </Col>
            </Row>
            {dataPelanggan.length == 0 ? (
              <Skeleton active />
            ) : (
              <Table
                style={{
                  marginTop: 30,
                }}
                bordered={true}
                rowKey="id_pelanggan"
                columns={[
                  {
                    title: "Avatar",
                    key: "id_pelanggan",
                    align: "center",
                    render: (_, record) => {
                      return <PelangganDetail id_pelanggan={record.id_pelanggan} />;
                    },
                  },
                  {
                    title: "Nama",
                    dataIndex: "nama",
                  },
                  {
                    title: "Alamat",
                    dataIndex: "alamat",
                    align: "center",
                  },
                  {
                    title: "Kontak",
                    dataIndex: "kontak",
                    align: "center",
                  },
                ]}
                dataSource={dataPelanggan}
                pagination={{
                  position: ["none"],
                  pageSize: 1000,
                }}
                scroll={{
                  y: 350,
                }}
              />
            )}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Pelanggan;
