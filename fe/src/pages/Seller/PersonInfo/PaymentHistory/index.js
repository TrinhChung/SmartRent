import React, { useCallback, useContext, useEffect,useState } from "react";
import { Col,Row, Button } from "antd";
import { SmartContractContext } from "../../../../providers/scProvider";

const PaymentHistory = () => {
  const { scInstance } = useContext(SmartContractContext);
  const [balance, setBalance] = useState(null);

  const fetchBalance = async () => {
    try {
      const fetchedBalance = await scInstance.balanceOf();
      setBalance(fetchedBalance);
    } catch (error) {
      console.log('Error fetching balance:', error);
    }
  };

  const WidthDraw = async (value) => {
    try {
        const res = await scInstance.withdrawPositRenter(value);
    } catch (error) {
      console.log(`WidthDrawError`)
    }
  }

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
      <Button onClick={WidthDraw}>
      WidthDraw
      </Button>
    </Col>
  )
};

export default PaymentHistory;
