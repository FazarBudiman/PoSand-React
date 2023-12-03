import { Button, Skeleton, Table, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteKaryawan, getAllKaryawan } from "../redux/slice/KaryawanSlice";
import PosandApi from "../api/PosandApi";
import Cookies from "js-cookie";
import KaryawanDetail from "./KaryawanDetail";

const KaryawanTable = () => {
  const dataKaryawan = useSelector(getAllKaryawan);
  const dispatch = useDispatch();

  const handleDeleteKaryawan = async (id) => {
    try {
      const response = await PosandApi.delete(`/karyawan/'${id}'`, {
        headers: {
          "access-token": Cookies.get("access-token"),
        },
      });
      message.success(response.data.message, 2);
      setTimeout(() => {
        dispatch(deleteKaryawan(id));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {dataKaryawan.length === 0 ? (
        <Skeleton active />
      ) : (
        <Table
          bordered={true}
          columns={[
            {
              title: "Nama",
              dataIndex: "nama",
              sorter: (a, b) => a.nama.localeCompare(b.nama),
            },
            {
              title: "Status",
              dataIndex: "status",
              align: "center",
              filters: [
                {
                  text: "Aktif",
                  value: 1,
                },
                {
                  text: "Tidak Aktif",
                  value: 0,
                },
              ],
              onFilter: (value, status) => status.status === value,
              render: (status) => (status === true || status === 1 ? <Tag color="blue">Aktif</Tag> : <Tag color="red">Tidak Aktif</Tag>),
            },
            {
              title: "Action",
              key: "id_karyawan",
              align: "center",
              render: (_, record) => (
                <Button.Group>
                  <KaryawanDetail id_karyawan={record.id_karyawan} />
                  <Button danger onClick={() => handleDeleteKaryawan(record.id_karyawan)}>
                    Delete
                  </Button>
                </Button.Group>
              ),
            },
          ]}
          dataSource={dataKaryawan}
          pagination={{
            position: ["none"],
            pageSize: 1000,
          }}
          scroll={{
            y: 350,
          }}
          rowKey="id_karyawan"
        />
      )}
    </>
  );
};
export default KaryawanTable;
