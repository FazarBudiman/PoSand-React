import { Button, DatePicker, Form, Input, InputNumber, Select, Space, message } from "antd";
import ModalAddPelanggan from "./PelangganModalAdd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const PesananAdd = () => {
  const [formAddPesanan] = Form.useForm();
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [isDataPelangganEmpty, setIsDataPelangganEmpty] = useState(false);

  useEffect(() => {
    if (isDataPelangganEmpty === false) {
      axios
        .get(`https://api-posand.netlify.app/.netlify/functions/api/pelanggan`, {
          headers: {
            "access-token": Cookies.get("access-token"),
          },
        })
        .then((response) => {
          setIsDataPelangganEmpty(true);
          setDataPelanggan([]);
          response.data.data.map((e) => {
            setDataPelanggan((data) => [
              ...data,
              {
                value: e.id_pelanggan,
                label: e.nama,
              },
            ]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const validateMessage = {
    required: "Kolom ${label} tidak boleh kosong",
  };

  const formatter = (value) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parser = (value) => {
    return value.replace(/\$\s?|(,*)/g, "");
  };

  const addPesanan = (value) => {
    const nama = dataPelanggan.find((e) => {
      if (e.value === value.idPelanggan) {
        return e.label;
      }
    });

    const values = {
      ...value,
      nama: nama.label,
    };
    axios
      .post(
        `https://api-posand.netlify.app/.netlify/functions/api/pesanan/`,
        {
          values,
        },
        {
          headers: {
            "access-token": Cookies.get("access-token"),
          },
        }
      )
      .then((response) => {
        formAddPesanan.resetFields();
        message.success(response.data.message, 2);
        window.location.reload();
      })
      .catch((err) => {
        message.error(err.data.message);
        console.log(err);
      });
  };

  return (
    <Form style={{ marginTop: 30, marginBottom: 20 }} form={formAddPesanan} onFinish={addPesanan} validateMessages={validateMessage}>
      <Form.Item label="Nama" name="idPelanggan" rules={[{ required: true }]}>
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Cari Nama Pelanggan"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
          options={dataPelanggan}
        />
      </Form.Item>
      <Form.Item style={{ marginLeft: 60 }}>
        <ModalAddPelanggan />
      </Form.Item>

      <Form.Item label="Contoh Model" name="contohModel" rules={[{ required: true, type: "url" }]}>
        <Input type="url" placeholder="Tautan Contoh Model" />
      </Form.Item>
      <Space direction="horizontal">
        <Form.Item label="Item" name="kategori" rules={[{ required: true, type: "string" }]}>
          <Input placeholder="Kategori" type="text" />
        </Form.Item>
        <Form.Item name="banyaknya" rules={[{ required: true }]}>
          <InputNumber placeholder="Banyaknya" type="number" />
        </Form.Item>
      </Space>
      <Form.Item label="Harga" name="harga" rules={[{ required: true, type: "number" }]}>
        <InputNumber formatter={formatter} addonBefore="Rp" parser={parser} />
      </Form.Item>
      <Form.Item label="Tanggal Selesai" name="tanggalSelesai" rules={[{ required: true, type: "date" }]}>
        <DatePicker format={"DD-MM-YYYY"} />
      </Form.Item>
      <Form.Item label="Catatan" name="catatan" rules={[{ required: true, type: "string" }]}>
        <TextArea />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Tambah Pesanan</Button>
      </Form.Item>
    </Form>
  );
};
export default PesananAdd;
