import { Button, Popconfirm, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

// eslint-disable-next-line no-unused-vars, react/prop-types
const PesananUpdateIsDone = ({ idPesanan }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const updatePesanan = () => {
    axios
      .put(
        `https://api-posand.netlify.app/.netlify/functions/api/pesanan/is-done/${idPesanan}`,
        {},
        {
          headers: {
            "access-token": Cookies.get("access-token"),
          },
        }
      )
      .then((response) => {
        window.location.reload();
        message.success(response.data.message, 2);
        setShowConfirm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Popconfirm
      title="Pesanan Selesai"
      open={showConfirm}
      onCancel={() => setShowConfirm(false)}
      onConfirm={(item) => updatePesanan(item)}
      description="Apakah pesanan ini sudah selesai?"
      okText="Yes"
      cancelText="No"
      style={{ fontSize: 12 }}
    >
      <Button size="small" type="primary" style={{ fontSize: 12 }} onClick={() => setShowConfirm(true)}>
        Selesai
      </Button>
    </Popconfirm>
  );
};
export default PesananUpdateIsDone;
