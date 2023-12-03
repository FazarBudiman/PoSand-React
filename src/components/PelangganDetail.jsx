import { useState } from "react";
import { Button, Card, Col, List, Modal, Row, Spin, Typography } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getPelangganById, getPelangganByIdSelector } from "../redux/slice/PelangganSlice";

// eslint-disable-next-line react/prop-types
const PelangganDetail = ({ id_pelanggan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const detailPelanggan = useSelector(getPelangganByIdSelector);

  const showModal = () => {
    setIsModalOpen(true);
    dispatch(getPelangganById(id_pelanggan));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} icon={<FaUserAlt />} />

      <Modal title="Detail Pelanggan" open={isModalOpen} footer={[null]} onCancel={handleCancel} width={500} style={{ top: 10 }}>
        {detailPelanggan === null ? (
          <Row justify={"center"} align={"middle"} style={{ height: "30vh" }}>
            <Spin spinning size="large" />
          </Row>
        ) : (
          <Row gutter={[{ md: 20 }, { xs: 20 }]} style={{ marginTop: "3em" }}>
            <Col span={24}>
              <Card title={detailPelanggan.nama} bordered>
                <Card.Meta title={detailPelanggan.kontak} description={detailPelanggan.alamat} />
                <Row style={{ marginTop: 30 }}>
                  <Col span={12}>
                    <List size="small" header={<p>Ukuran Baju</p>}>
                      <List.Item>
                        <List.Item.Meta description="Lebar Bahu" />
                        <Typography.Text>{detailPelanggan.lebar_bahu}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Lingkar Dada" />
                        <Typography.Text>{detailPelanggan.lingkar_dada}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Panjang Baju" />
                        <Typography.Text>{detailPelanggan.panjang_baju}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Panjang Lengan" />
                        <Typography.Text>{detailPelanggan.panjang_lengan}</Typography.Text>
                      </List.Item>
                    </List>
                  </Col>
                  <Col span={12}>
                    <List size="small" header={<p>Ukuran Celana</p>}>
                      <List.Item>
                        <List.Item.Meta description="Lingkar Pinggang" />
                        <Typography.Text>{detailPelanggan.lebar_bahu}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Lingkar Pinggul" />
                        <Typography.Text>{detailPelanggan.lingkar_dada}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Panjang Celana" />
                        <Typography.Text>{detailPelanggan.panjang_celana}</Typography.Text>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta description="Lingkar Paha" />
                        <Typography.Text>{detailPelanggan.lingkar_paha}</Typography.Text>
                      </List.Item>
                    </List>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          // <Row gutter={[{ md: 20 }, { xs: 20 }]} style={{ marginTop: "3em" }}>
          //   <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 12 }} lg={{ span: 14 }} xl={{ span: 14 }}>
          //     <Card bordered style={{ backgroundColor: "wheat", height: 200, display: "flex", alignItems: "center" }}>
          //       <Descriptions
          //         items={[
          //           {
          //             key: 1,
          //             label: "Nama",
          //             children: detailPelanggan.nama,
          //           },
          //           {
          //             key: 2,
          //             label: "Kontak",
          //             children: detailPelanggan.kontak,
          //           },
          //           {
          //             key: 3,
          //             label: "Alamat",
          //             children: detailPelanggan.alamat,
          //           },
          //         ]}
          //         size="middle"
          //         column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
          //       />
          //     </Card>
          //   </Col>

          //   <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 12 }} lg={{ span: 10 }} xl={{ span: 10 }}>
          //     <Card>
          //       <List size="small" style={{ borderBottom: "1px solid black", paddingBottom: 5, marginBottom: 5 }} header={<p>Ukuran Baju</p>}>
          //         <List.Item>
          //           <List.Item.Meta description="Lebar Bahu" />
          //           <Typography.Text>{detailPelanggan.lebar_bahu}</Typography.Text>
          //         </List.Item>
          //         <List.Item>
          //           <List.Item.Meta description="Lingkar Dada" />
          //           <Typography.Text>{detailPelanggan.lingkar_dada}</Typography.Text>
          //         </List.Item>
          //         <List.Item>
          //           <List.Item.Meta description="Panjang Baju" />
          //           <Typography.Text>{detailPelanggan.panjang_baju}</Typography.Text>
          //         </List.Item>
          //         <List.Item>
          //           <List.Item.Meta description="Panjang Lengan" />
          //           <Typography.Text>{detailPelanggan.panjang_lengan}</Typography.Text>
          //         </List.Item>
          //       </List>

          //       <List size="small" header={<p>Ukuran Celana</p>}>
          //         <List.Item>
          //           <List.Item.Meta description="Lingkar Pinggang" />
          //           <Typography.Text>{detailPelanggan.lebar_bahu}</Typography.Text>
          //         </List.Item>
          //         <List.Item>
          //           <List.Item.Meta description="Lingkar Pinggul" />
          //           <Typography.Text>{detailPelanggan.lingkar_dada}</Typography.Text>
          //         </List.Item>
          //         <List.Item>
          //           <List.Item.Meta description="Panjang Celana" />
          //           <Typography.Text>{detailPelanggan.panjang_celana}</Typography.Text>
          //         </List.Item>
          //         <List.Item>
          //           <List.Item.Meta description="Lingkar Paha" />
          //           <Typography.Text>{detailPelanggan.lingkar_paha}</Typography.Text>
          //         </List.Item>
          //       </List>
          //     </Card>
          //   </Col>
          // </Row>
        )}
      </Modal>
    </>
  );
};
export default PelangganDetail;
