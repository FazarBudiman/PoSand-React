import { Card, List, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPesananDikerjakan, selectedPesanan } from "../redux/slice/PesananSlice";
import Meta from "antd/es/card/Meta";
import PesananUpdateIsDone from "./PesananUpdateIsDone";

const PesananDiKerjakan = () => {
  const dataPesananDikerjakan = useSelector(getPesananDikerjakan);
  const dispatch = useDispatch();

  const handleSelectedPesanan = (id) => {
    dispatch(selectedPesanan(id));
  };
  return (
    <List
      itemLayout="vertical"
      pagination={{ pageSize: 3 }}
      dataSource={dataPesananDikerjakan}
      renderItem={(pesanan, index) => (
        <Card
          onClick={() => handleSelectedPesanan(pesanan.id_pesanan)}
          style={{ marginBottom: 10 }}
          key={index}
          hoverable
          size="small"
          title={pesanan.nama}
          extra={<PesananUpdateIsDone idPesanan={pesanan.id_pesanan} />}
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
export default PesananDiKerjakan;
