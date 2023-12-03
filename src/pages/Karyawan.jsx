import { Card, Col, Layout, Row, Typography } from "antd";
import Search from "antd/es/input/Search";
import Headers from "../components/Headers";
import { Content } from "antd/es/layout/layout";
import ModalAddKaryawan from "../components/KaryawanModalAdd";
import Siders from "../components/Siders";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PosandApi from "../api/PosandApi";
import { useDispatch, useSelector } from "react-redux";
import { addAllKaryawan, getAllKaryawan } from "../redux/slice/KaryawanSlice";
import KaryawanTable from "../components/KaryawanTable";

const Karyawan = () => {
  const dataKaryawan = useSelector(getAllKaryawan);
  const dispatch = useDispatch();
  const [dataSeacrhed, setDataSearched] = useState([]);

  const getDataKaryawan = async () => {
    const response = await PosandApi.get(`karyawan`, {
      headers: {
        "access-token": Cookies.get("access-token"),
      },
    }).catch((err) => {
      console.log(err);
    });
    dispatch(addAllKaryawan(response.data.data));
  };

  const handleSearch = (value) => {
    if (value.length === 0) {
      setDataSearched([]);
    } else {
      dataKaryawan.filter((karyawan) => {
        if (karyawan.nama.toLowerCase().includes(value.toLowerCase())) {
          setDataSearched((e) => [...e, karyawan]);
        }
      });
    }
  };

  useEffect(() => {
    if (dataSeacrhed.length === 0) {
      getDataKaryawan();
    } else {
      dispatch(addAllKaryawan(dataSeacrhed));
    }
  }, [dataSeacrhed]);

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
            justifyContent: "flex-start",
          }}
        >
          <Card title={<Typography.Title style={{ fontSize: 20 }}>Data Karyawan</Typography.Title>} bordered={false}>
            <Row
              wrap
              gutter={[0, { xs: 20 }]}
              style={{
                marginBottom: 30,
              }}
            >
              <Col xs={{ span: 24 }} sm={{ span: 14 }} md={{ span: 14 }} lg={{ span: 16 }} xl={{ span: 18 }}>
                <ModalAddKaryawan />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                <Search placeholder="Search ..." enterButton onSearch={handleSearch} allowClear />
              </Col>
            </Row>
            <KaryawanTable />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Karyawan;
