import { useState } from "react";
import { Button, Form, Input, Modal, Switch, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllKaryawan, updateKaryawan } from "../redux/slice/KaryawanSlice";
import TextArea from "antd/es/input/TextArea";
import PosandApi from "../api/PosandApi";
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
const KaryawanDetail = ({ id_karyawan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dataKaryawan = useSelector(getAllKaryawan);
  const dataDetailKaryawan = dataKaryawan.find((karyawan) => karyawan.id_karyawan === id_karyawan);
  const [status, setStatus] = useState(dataDetailKaryawan.status);
  const [formKaryawanDetail] = Form.useForm();
  const dispatch = useDispatch();

  const validateMessage = {
    required: "Kolom ${label} harus diisi",
  };

  formKaryawanDetail.setFieldsValue({
    nama: dataDetailKaryawan.nama,
    alamat: dataDetailKaryawan.alamat,
    kontak: dataDetailKaryawan.kontak,
  });

  const handleUpdateKaryawan = (value) => {
    PosandApi.put(`/karyawan/${id_karyawan}`, value, {
      headers: {
        "access-token": Cookies.get("access-token"),
      },
    })
      .then((response) => {
        dispatch(
          updateKaryawan({
            id_karyawan: id_karyawan,
            ...value,
          })
        );
        message.success(response.data.message, 2);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Detail</Button>
      <Modal title="Detail Karyawan" open={isModalOpen} footer={[null]} onCancel={() => setIsModalOpen(false)} width={500} style={{ top: 10 }}>
        <Form layout="horizontal" validateMessages={validateMessage} form={formKaryawanDetail} onFinish={handleUpdateKaryawan}>
          <Form.Item label="Nama" name="nama" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Alamat" name="alamat" rules={[{ required: true }]}>
            <TextArea />
          </Form.Item>
          <Form.Item label="Kontak" name="kontak" rules={[{ required: true }]}>
            <Input prefix="+62" type="number" />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Switch checked={status} onChange={() => setStatus(!status)} />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" key="submit" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default KaryawanDetail;
