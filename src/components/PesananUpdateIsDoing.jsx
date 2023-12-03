import { Button, Form, Modal, Select, Spin, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const { Option } = Select;

// eslint-disable-next-line react/prop-types, no-unused-vars
const PesananUpdateIsDoing = ({ idPesanan, total }) => {
  const [showModal, setShowModal] = useState(false);
  const [formUpdatePesananIsDoing] = Form.useForm();
  const [dataKaryawanAktif, setDataKaryawanAktif] = useState([]);

  const handleUpdatePesananIsDoing = (value) => {
    axios
      .put(
        `https://api-posand.netlify.app/.netlify/functions/api/pesanan/is-doing`,
        {
          idPesanan: idPesanan,
          idKaryawan: value.idKaryawan,
          total: total,
        },
        {
          headers: {
            "access-token": Cookies.get("access-token"),
          },
        }
      )
      .then((response) => {
        message.success(response.data.message, 2);
        setShowModal(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataKaryawan = () => {
    axios
      .get(`https://api-posand.netlify.app/.netlify/functions/api/karyawan`, {
        headers: {
          "access-token": Cookies.get("access-token"),
        },
      })
      .then((response) => {
        setDataKaryawanAktif(response.data.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button size="small" type="primary" onClick={() => setShowModal(true)} style={{ fontSize: 12 }}>
        Kerjakan
      </Button>
      <Modal footer={[]} title="Pesanan Dikerjakan" open={showModal} onCancel={() => setShowModal(false)}>
        <Form form={formUpdatePesananIsDoing} onFinish={handleUpdatePesananIsDoing}>
          <Form.Item label="Oleh" name="idKaryawan">
            <Select onClick={getDataKaryawan}>
              {dataKaryawanAktif.length == 0 ? (
                <Spin />
              ) : (
                dataKaryawanAktif.map((e, index) => {
                  if (e.status == 1) {
                    return (
                      <Option value={e.id_karyawan} key={index}>
                        {e.nama}
                      </Option>
                    );
                  }
                })
              )}
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button htmlType="submit" type="primary">
              Kerjakan
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PesananUpdateIsDoing;
