import React from "react";
import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { convertVndToEth } from "../../../../util/commonFunc";
import { useMemo, useContext } from "react";
import { SmartContractContext } from "../../../../providers/scProvider";

const Done = ({ contract }) => {
  const { scAddress } = useContext(SmartContractContext);

  const cost = useMemo(() => {
    if (contract?.Terms?.length === 0) {
      return { value: 0 };
    } else {
      const term = contract?.Terms.find((term) => term.type === "cost");
      return term;
    }
  }, [contract]);

  return (
    <Col className="deposit-container" span={24}>
      <Row style={{ justifyContent: "center" }}>
        <Col>
          <Row style={{ justifyContent: "center" }}>
            <FontAwesomeIcon fontSize={60} color="#1677ff" icon={faSignature} />
          </Row>
          <Row
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#1677ff",
              fontStyle: "italic",
            }}
          >
            Quá trình ký kết đã hoàn tất
          </Row>
          <Row>Hãy thanh toán tiền nhà đúng hạn để duy trì hợp đồng</Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row className="text_title">Hóa đơn</Row>
          <Row className="description">
            ・Số tiền bạn cần thanh toán hàng tháng là:
            {" " +
              String(cost?.value).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              "VNĐ tương ứng với "}
            {String(convertVndToEth(cost?.value)).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ) + " Wei ETH"}
          </Row>
          <Row className="note">
            ※ Hãy đảm bảo đủ số dư trong ví để thanh toán tự động tiền thuê nhà
            hàng tháng.
          </Row>
          <Row className="description">
            ・Số tiền này chỉ có chi phí đặt cọc tiền thuê nhà.
          </Row>
          <Row className="description">
            ・Lịch sử giao dịch sẽ được lưu trữ tại địa chỉ
            <a
              target="_blank"
              href={"https://testnet.bscscan.com/address/" + scAddress}
            >
              Smart Contract
            </a>
          </Row>
          <Row className="description">
            ・Sau khi thanh toán hãy nhớ kiểm tra lại lịch sử giao dịch.
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Done;
