import { Card, List, Skeleton, Tag } from "antd";
import ModalUpdatePesananIsDoing from "./PesananUpdateIsDoing";
import { useDispatch, useSelector } from "react-redux";
import { getPesananBelumSelesai, selectedPesanan } from "../redux/slice/PesananSlice";
import Meta from "antd/es/card/Meta";

const PesananBelumSelesai = () => {
  const dataPesanan = useSelector(getPesananBelumSelesai);
  const dispatch = useDispatch();
  const handleSelectedPesanan = (id) => {
    dispatch(selectedPesanan(id));
  };

  return (
    <>
      {dataPesanan.length === 0 ? (
        <Skeleton active />
      ) : (
        <List
          itemLayout="vertical"
          pagination={{ pageSize: 3 }}
          dataSource={dataPesanan}
          renderItem={(pesanan, index) => (
            <Card
              onClick={() => handleSelectedPesanan(pesanan.id_pesanan)}
              style={{ marginBottom: 10 }}
              key={index}
              hoverable
              size="small"
              title={pesanan.nama}
              extra={<ModalUpdatePesananIsDoing idPesanan={pesanan.id_pesanan} total={pesanan.harga} />}
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
      )}
    </>
  );
};
export default PesananBelumSelesai;
