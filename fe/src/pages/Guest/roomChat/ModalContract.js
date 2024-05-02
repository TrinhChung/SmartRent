import { Modal } from "antd";
import React, { memo, useRef } from "react";
import "./Contract/Contract.scss";
import Contract from "./Contract/Contract";

const ModalContract = ({ contract, open = false, handleCancel = () => {} }) => {
  const targetRef = useRef();
  return (
    <Modal
      open={open}
      footer={false}
      onCancel={() => {
        handleCancel();
      }}
      width={1175}
      style={{ top: 20, height: 900, overflowY: "scroll" }}
    >
      <Contract contract={contract} refContract={targetRef} />
    </Modal>
  );
};

export default memo(ModalContract);
