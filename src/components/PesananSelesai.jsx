import { Card, List, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPesananSelesai, selectedPesanan } from "../redux/slice/PesananSlice";
import Meta from "antd/es/card/Meta";

const PesananSelesai = () => {
  const dataPesananSelesai = useSelector(getPesananSelesai);
  const dispatch = useDispatch();

  const handleSelectedPesanan = (id) => {
    dispatch(selectedPesanan(id));
  };
  return (
    <List
      itemLayout="vertical"
      pagination={{ pageSize: 3 }}
      dataSource={dataPesananSelesai}
      renderItem={(pesanan, index) => (
        <Card
          onClick={() => handleSelectedPesanan(pesanan.id_pesanan)}
          style={{ marginBottom: 10 }}
          key={index}
          hoverable
          size="small"
          title={pesanan.nama}
          actions={[
            <Tag key="harga" color="blue">
              Rp. {pesanan.harga}
            </Tag>,
            <Tag key="tanggal_selesai" color="red">
              {pesanan.tanggal_selesai.substring(0, 10)}
            </Tag>,
          ]}
        >
          <Meta avatar={<span></span>} title={`${pesanan.banyaknya} ${pesanan.kategori}`} description={pesanan.catatan} style={{ fontSize: 12 }} />
        </Card>
      )}
    />
  );
};
export default PesananSelesai;
