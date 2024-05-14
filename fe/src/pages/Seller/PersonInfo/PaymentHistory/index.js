import React, { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row, Button, Modal, Input } from "antd";
import { SmartContractContext } from "../../../../providers/scProvider";

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
      } else {
        alert("Value too big");
      }
    } catch (error) {
      console.log("Widthdraw error", error);
    }
  };

  const deposit = async () => {
    try {
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
      const fetchedBalance = await scInstance.balanceOf();
      setBalance(fetchedBalance);
      console.log("Hi");
    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  useCallback(() => {
    if (scInstance) {
      fetchBalance();
    }
  }, [scInstance]);

  return (
    <Col>
      <Row className="text_title">Lịch sử giao dịch</Row>
      <Row>YOUR CURRENT BALANCE IN THIS WEB: {balance} ETH;</Row>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setActiveModal("widthdraw");
        }}
      >
        WidthDraw
      </Button>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setActiveModal("deposit");
        }}
      >
        Deposit
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Col>
          <Row>Amount</Row>
          <Row>
            <Col>
              <Input type="number" value={inputValue} onChange={handleChange} />
            </Col>
          </Row>
        </Col>
      </Modal>
    </Col>
  );
};

export default PaymentHistory;
