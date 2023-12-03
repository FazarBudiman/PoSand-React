import { Button, Form, Input, InputNumber, Modal, Row, Space, Steps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PiPantsFill, PiShirtFoldedFill, PiUserPlusFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addPelanggan } from "../redux/slice/PelangganSlice";
import PosandApi from "../api/PosandApi";

const ModalAddPelanggan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataTemp, setDataTemp] = useState([]);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  const validateMessage = {
    required: "Kolom ${label} tidak boleh kosong",
  };

  const next = () => {
    setCurrent(current + 1);
    setDataTemp([...dataTemp, form.getFieldsValue()]);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleAddPelanggan = async () => {
    const values = {
      id_pelanggan: uuid(),
      nama: dataTemp[0].nama,
      alamat: dataTemp[0].alamat,
      kontak: `0${dataTemp[0].kontak.substring(0, 3)}-${dataTemp[0].kontak.substring(3, 7)}-${dataTemp[0].kontak.substring(7, 11)}`,
      lebar_bahu: dataTemp[1].lebarBahu,
      lingkar_dada: dataTemp[1].lingkarDada,
      panjang_baju: dataTemp[1].panjangBaju,
      panjang_lengan: dataTemp[1].panjangLengan,
      lingkar_pinggang: form.getFieldValue("lingkarPinggang"),
      lingkar_pinggul: form.getFieldValue("lingkarPinggul"),
      panjang_celana: form.getFieldValue("panjangCelana"),
      lingkar_paha: form.getFieldValue("lingkarPaha"),
    };
    try {
      const response = await PosandApi.post(`/pelanggan`, values, {
        headers: {
          "access-token": Cookies.get("access-token"),
        },
      });
      message.success(response.data.message, 2);
      dispatch(addPelanggan(values));
      setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const steps = [
    {
      title: (
        <Row style={{ width: "7em" }} align={"middle"}>
          <PiUserPlusFill />
          <span>Data Diri</span>
        </Row>
      ),
      content: (
        <Form layout="horizontal" form={form} onFinish={next} validateMessages={validateMessage}>
          <Form.Item label="Nama" name="nama" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Alamat" name="alamat" rules={[{ required: true }]}>
            <TextArea maxLength={100} showCount />
          </Form.Item>
          <Form.Item label="Kontak" name="kontak" rules={[{ required: true }]}>
            <Input prefix="+62" style={{ width: "20em" }} type="number" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: (
        <Row style={{ width: "8em" }} align={"middle"}>
          <PiShirtFoldedFill />
          <span>Ukuran Baju</span>
        </Row>
      ),
      content: (
        <Form layout="horizontal" form={form} onFinish={next} validateMessages={validateMessage}>
          <Form.Item label="Lebar Bahu" name="lebarBahu" rules={[{ required: true }]}>
            <InputNumber size="middle" type="number" />
          </Form.Item>
          <Form.Item label="Lingkar Dada" name="lingkarDada" rules={[{ required: true }]}>
            <InputNumber size="middle" type="number" />
          </Form.Item>
          <Form.Item label="Panjang Baju" name="panjangBaju" rules={[{ required: true }]}>
            <InputNumber size="middle" type="number" />
          </Form.Item>
          <Form.Item label="Panjang Lengan" name="panjangLengan" rules={[{ required: true }]}>
            <InputNumber size="middle" type="number" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={prev}>Previous</Button>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: (
        <Row style={{ width: "8em" }} align={"middle"}>
          <PiPantsFill />
          <span>Ukuran Celana</span>
        </Row>
      ),
      content: (
        <Form layout="horizontal" form={form} onFinish={handleAddPelanggan} validateMessages={validateMessage}>
          <Form.Item label="Lingkar Pinggang" name="lingkarPinggang" rules={[{ required: true }]}>
            <InputNumber size="middle" type="number" />
          </Form.Item>
          <Form.Item label="Lingkar Pinggul" name="lingkarPinggul" rules={[{ required: true }]}>
            <InputNumber size="middle" type="number" />
          </Form.Item>
          <Form.Item label="Panjang Celana" name="panjangCelana" rules={[{ required: true }]}>
            <InputNumber size="middle" type="number" />
          </Form.Item>
          <Form.Item label="Lingkar Paha" name="lingkarPaha" rules={[{ required: true }]}>
            <InputNumber size="middle" type="number" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={prev}>Previous</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Button icon={<FaPlus />} onClick={() => setIsModalOpen(true)}>
        Tambah Pelanggan
      </Button>
      <Modal footer={[null]} style={{ top: 10, overflowY: "auto", maxHeight: "96vh", padding: 20 }} width={800} title="Tambah Pelanggan" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <Steps items={items} current={current} />
        <div style={{ marginTop: 25 }}>{steps[current].content}</div>
      </Modal>
    </>
  );
};

export default ModalAddPelanggan;
