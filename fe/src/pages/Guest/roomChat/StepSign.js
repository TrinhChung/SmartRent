import React, { useContext, useMemo, useRef } from "react";
import { useState, useCallback } from "react";
import { Modal, Button, Steps, Spin } from "antd";
import { statusRent, steps } from "../../../const/index";
import {
  checkListTermAccept,
  convertBlobToBase64Async,
} from "../../../util/commonFunc";
import { AuthContext } from "../../../providers/authProvider";
import {
  signContractService,
  uploadContractService,
} from "../../../services/SC";
import { toast } from "react-toastify";
import ListTerm from "./ListTerm";
import CreateSC from "./CreateSC";
import { SmartContractContext } from "../../../providers/scProvider";
import moment from "moment";
import generatePDF from "react-to-pdf";

const StepSign = ({
  contract,
  open,
  close = () => {},
  fetchContractById = () => {},
}) => {
  const { authUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { scInstance } = useContext(SmartContractContext);
  const refContract = useRef(null);

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

  const sellerCreateSmartContract = useCallback(async () => {
    try {
      if (scInstance) {
        const time = moment(new Date()).valueOf();
        const pdf = await generatePDF(refContract, {
          filename: time + "_contract.pdf",
        });
        const filePdf = pdf.output("blob");
        const base64 = await convertBlobToBase64Async(
          filePdf,
          "application/pdf"
        );
        const res = await uploadContractService({
          file: base64,
          contractId: contract?.id,
        });
        if (res.statusCode === 200) {
          console.log(res.message);
        }

        // const scNft = await scInstance.mint();
        console.log(base64);
      } else {
        alert("Không tồn tại SC nft");
      }
    } catch (error) {
      toast.error("Lỗi hệ thống");
    }
  }, [contract, scInstance]);

  const groupButton = useMemo(() => {
    if (authUser?.role === "2") {
      if (contract?.status === "7") {
        const buttonGr = [
          <Button key="back" onClick={close}>
            Đóng
          </Button>,
          <Button
            key="back"
            onClick={() => {
              sellerCreateSmartContract();
            }}
          >
            Tạo hợp đồng
          </Button>,
        ];
        return buttonGr;
      }
    }
    if (authUser?.role === "1") {
      if (
        contract?.status === "3" &&
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
      if (contract?.status === "8") {
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
          {statusRent[Number(contract?.status ? contract?.status : "3")]?.title}
        </label>
      }
      onOk={close}
      onCancel={close}
      width={1175}
      footer={groupButton}
      style={{ top: 20 }}
      className="list-term-container"
    >
      <Spin spinning={loading} tip="Đang xử lý">
        <>
          {["7", "8"].includes(contract?.status) && (
            <Steps
              items={steps}
              current={
                statusRent[Number(contract?.status ? contract?.status : "3")]
                  .step
              }
            />
          )}
          {contract?.status === "3" && (
            <ListTerm
              contract={contract}
              fetchContractById={fetchContractById}
            />
          )}
          {contract?.status === "7" && (
            <CreateSC contract={contract} refContract={refContract} />
          )}
          {contract?.status === "5" && <div>Tạo điều khoản</div>}
        </>
      </Spin>
    </Modal>
  );
};

export default StepSign;
