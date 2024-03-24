import React, { useContext, useMemo } from "react";
import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { convertVndToEth } from "../../../util/commonFunc";
import "./Deposit.scss";
import { SmartContractContext } from "../../../providers/scProvider";

const Deposit = ({ contract }) => {
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
            Hợp đồng thông minh đã được tạo
          </Row>
          <Row>Hãy thanh toán để hoàn tất quá trình ký kết hợp đồng</Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row className="text_title">Hóa đơn</Row>
          <Row className="description">
            ・Số tiền bạn cần thanh toán là:
            {" " +
              String(cost?.value).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              "VNĐ tương ứng với "}
            {String(convertVndToEth(cost?.value)).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ) + " Wei ETH"}
          </Row>
          <Row className="note">
            ※ Khoản tri trả chưa bao gồm chi phí thanh toán
          </Row>
          <Row className="description">
            ・Số tiền này chỉ có chi phí đặt cọc tiền thuê nhà.
          </Row>
          <Row className="description">
            ・Số tiền này sẽ được hoàn khi kết thúc hợp đồng đúng thời hạn. Tiền
            đặt cọc sẽ được lữu trữ trong hợp đồng tại địa chỉ
            <a
              target="_blank"
              href={"https://testnet.bscscan.com/address/" + scAddress}
            >
              Smart Contract
            </a>
            .
          </Row>
          <Row className="description">
            ・Để tiết kiệm chi phí thanh toán. Bạn có thể thanh toán nhiều tháng
            trong một lần thanh toán.
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Deposit;
