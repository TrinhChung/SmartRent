import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Button, Modal, Input } from "antd";
import { SmartContractContext } from "../../../../providers/scProvider";
import { toast } from "react-toastify";
import { convertVndToEth } from "../../../../util/commonFunc";

const PaymentHistory = () => {
  const { scInstance } = useContext(SmartContractContext);
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const withdraw = async () => {
    try {
      if (inputValue < balance) {
        const res = await scInstance.withdrawPositRenter(Number(inputValue));
        if (res === true) {
          toast.success("Rút tiền thành công");
        } else {
          toast.error("Rút tiền thất bại");
        }
      } else {
        alert("Không thể rút nhiều hơn số dư");
      }
    } catch (error) {
      console.log("Widthdraw error", error);
    }
  };

  const deposit = async () => {
    try {
      const tx = {
        value: String(convertVndToEth(Number(inputValue))),
      };
    } catch (error) {
      console.log("Deposit error" + error);
    }
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    if (activeModal === "widthdraw") {
      await withdraw();
    } else if (activeModal === "deposit") {
      await deposit();
    }
    setIsModalOpen(false);
    setConfirmLoading(false);
    setInputValue("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchBalance = async () => {
    try {
      const fetchedBalance = await scInstance.getbalanceOf();
      setBalance(fetchedBalance);
      console.log(fetchedBalance);
    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    console.log(scInstance);
    if (scInstance) {
      fetchBalance();
    }
  }, [scInstance]);

  return (
    <Col>
      <Row className="text_title">Ví của tôi</Row>
      <Row style={{ paddingTop: 12, paddingBottom: 10 }}>
        Số dư trong tài khoản của bạn là: {Number(balance)} Wei;
      </Row>
      <Row gutter={[8, 8]}>
        <Col>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setActiveModal("widthdraw");
            }}
            style={{ minWidth: 120 }}
          >
            Rút tiền
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setActiveModal("deposit");
            }}
            style={{ minWidth: 120 }}
          >
            Nạp tiền
          </Button>
        </Col>
      </Row>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Col>
          <Row>Số tiền (Wei)</Row>
          <Row>
            <Col span={24}>
              <Input
                style={{ width: "100%" }}
                type="number"
                step={1000000}
                value={inputValue}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Col>
      </Modal>
    </Col>
  );
};

export default PaymentHistory;
