import React, { useContext, useMemo } from "react";
import { useState, useCallback, useEffect } from "react";
import { Modal, Button, Steps } from "antd";
import { statusRent, steps } from "../../../const/index";
import { checkListTermAccept } from "../../../util/commonFunc";
import { AuthContext } from "../../../providers/authProvider";
import { getScAddressService, signContractService } from "../../../services/SC";
import { toast } from "react-toastify";
import ListTerm from "./ListTerm";

import CreateSC from "./CreateSC";
import { getReAddressService } from "../../../services/SC/index";

const StepSign = ({
  contract,
  open,
  close = () => {},
  fetchContractById = () => {},
}) => {
  const { reAbi, signer } = useContext(AuthContext);
  const { authUser } = useContext(AuthContext);

  const renterSignContract = useCallback(async () => {
    try {
      if (contract?.id) {
        const res = await signContractService({ contractId: contract.id });
        if (res.status === 200) {
          fetchContractById(contract?.id);
          toast.success("Ký hợp đồng thành công");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }, [contract]);

  const sellerCreateSmartContract = useCallback(async () => {}, [contract]);

  const groupButton = useMemo(() => {
    if (authUser?.role === "2") {
      if (contract.status === "7") {
        const buttonGr = [
          <Button key="back" onClick={close}>
            Đóng
          </Button>,
          <Button key="back">Tạo hợp đồng</Button>,
        ];
        return buttonGr;
      }
    }
    if (authUser?.role === "1") {
      if (
        contract.status === "3" &&
        contract?.TimeStart?.accept === true &&
        contract?.Cost?.accept === true &&
        checkListTermAccept(contract?.Term)
      ) {
        const buttonGr = [
          <Button key="back" onClick={close}>
            Đóng
          </Button>,
          <Button
            key="back"
            onClick={async () => {
              await renterSignContract();
            }}
          >
            Ký kết
          </Button>,
        ];
        return buttonGr;
      }
      if (contract.status === "8") {
        const buttonGr = [
          <Button key="back" onClick={close}>
            Đóng
          </Button>,
          <Button
            key="back"
            onClick={async () => {
              await renterSignContract();
            }}
          >
            Ký kết hợp đồng
          </Button>,
        ];

        return buttonGr;
      }
    }
  }, [contract]);

  return (
    <Modal
      open={open}
      title={
        <label style={{ fontSize: 18, textTransform: "uppercase" }}>
          {statusRent[Number(contract?.status ? contract?.status : "3")].title}
        </label>
      }
      onOk={close}
      onCancel={close}
      width={1175}
      footer={groupButton}
      style={{ top: 20 }}
      className="list-term-container"
    >
      {["7", "8"].includes(contract?.status) && (
        <Steps
          items={steps}
          current={
            statusRent[Number(contract?.status ? contract?.status : "3")].step
          }
        />
      )}
      {contract?.status === "3" && (
        <ListTerm contract={contract} fetchContractById={fetchContractById} />
      )}
      {contract?.status === "7" && <CreateSC contract={contract} />}
      {contract?.status === "5" && <div>Tạo điều khoản</div>}
    </Modal>
  );
};

export default StepSign;
