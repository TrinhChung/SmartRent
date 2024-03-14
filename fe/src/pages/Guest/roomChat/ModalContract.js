import { Button, Col, Image, Modal, Row } from "antd";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import generatePDF from "react-to-pdf";
import "./Contract.scss";
import Contract from "./Contract";

const ModalContract = ({ contract, open = false, handleCancel = () => {} }) => {
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
      <Contract contract={contract} />
    </Modal>
  );
};

export default memo(ModalContract);
