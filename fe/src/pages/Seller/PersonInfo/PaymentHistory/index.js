import React, { useCallback, useContext, useEffect,useState } from "react";
import { Col,Row, Button, Modal, Input, Form } from "antd";
import { SmartContractContext } from "../../../../providers/scProvider";


const PaymentHistory = () => {
  const { scInstance } = useContext(SmartContractContext);
  const [balance, setBalance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const showModal = (data) => {
    setActiveModal(data);
    setIsModalOpen(true);
  };

  const withdraw = async () => {
    try {
      if(inputValue < balance) {
        await widthDrawForUser(Number(inputValue));
      }
      else {
        alert("Value too big")
      }      
    } catch (error) {
      console.log("Widthdraw error", error);
    }
  }

  const deposit = async () => {
    try {

    } catch (error) {
      console.log("Deposit error" + error);
    }
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    if(activeModal == "Widthdraw") {
      await withdraw();
    }
    else if(activeModal == "Deposit") {
      await deposit();
    }
    setIsModalOpen(false);
    setConfirmLoading(false);
    setInputValue('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const widthDrawForUser = async (value) => {
    try {
        const res = await scInstance.withdrawPositRenter(value);
    } catch (error) {
      console.log(`WidthDrawError` + error)
    }
  }

  const fetchBalance = async () => {
    try {
      const fetchedBalance = await scInstance.balanceOf();
      setBalance(fetchedBalance);
    } catch (error) {
      console.log('Error fetching balance:', error);
    }
  };

  useCallback(() => {
    if (scInstance) {
      fetchBalance();
    }
  }, [scInstance]);

  return (
    <Col>
      <Row >
        PAYMENT HISTORY
      </Row>
      <Row>
        YOUR CURRENT BALANCE IN THIS WEB: {balance} ETH;
      </Row>
      <Button onClick={showModal("Widthdraw")}>
          WidthDraw
      </Button>
      <Button onClick={showModal("Deposit")}>
        Deposit
      </Button>
      <Modal 
        title="Withdraw ETH" 
        open={isModalOpen} 
        onOk={handleOk} 
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Col>
          <Row>Amount</Row>
          <Row>
          <Col>
              <Input type="number"
                value={inputValue}
                onChange={handleChange}/>
          </Col>
          </Row>
        </Col>
      </Modal>
    </Col>
  )
};

export default PaymentHistory;
