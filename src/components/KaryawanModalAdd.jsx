import { Button, Form, Input, Modal, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addKaryawan } from "../redux/slice/KaryawanSlice";
import { v4 as uuid } from "uuid";
import PosandApi from "../api/PosandApi";
import Cookies from "js-cookie";

const ModalAddKaryawan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAddKaryawan] = Form.useForm();
  const dispatch = useDispatch();

  const validateMessage = {
    required: "Kolom ${label} harus diisi",
  };

  const submitKaryawan = async (value) => {
    const newKaryawan = { id_karyawan: uuid(), ...value };
    try {
      const response = await PosandApi.post(`/karyawan`, newKaryawan, {
        headers: {
          "access-token": Cookies.get("access-token"),
        },
      });
      message.success(response.data.message, 2);
      dispatch(addKaryawan(newKaryawan));
      setTimeout(() => {
        formAddKaryawan.resetFields();
        setIsModalOpen(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button icon={<FaPlus />} onClick={() => setIsModalOpen(true)}>
        Tambah Karyawan
      </Button>
      <Modal footer={[]} style={{ top: 10, overflowY: "auto", maxHeight: "96vh", padding: 10 }} title="Tambah karyawan" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <Form layout="horizontal" onFinish={submitKaryawan} form={formAddKaryawan} validateMessages={validateMessage}>
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
            <Select
              style={{ width: 120 }}
              options={[
                { value: 1, label: "Aktif" },
                { value: 0, label: "Tidak Aktif" },
              ]}
            />
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

export default ModalAddKaryawan;
