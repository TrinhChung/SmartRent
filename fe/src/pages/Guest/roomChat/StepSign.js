import React, { useContext, useMemo, useRef } from "react";
import { useState, useCallback } from "react";
import { Modal, Button, Steps, Spin } from "antd";
import { statusRent, steps } from "../../../const/index";
import {
  checkListTermAccept,
  convertBlobToBase64Async,
  convertVndToEth,
  buildParamsCreateSc,
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
import {
  createScService,
  renterPaymentDepositService,
} from "../../../services/SC/index";
import {
  uploadFileToIpfs
} from "../../../services/SC/index"
import Deposit from "./Deposit";
import { ethers } from "ethers";

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
        if (authUser?.SignatureId > 0 && authUser?.wallet) {
          const res = await signContractService({ contractId: contract.id });
          if (res.status === 200) {
            fetchContractById(contract?.id);
            toast.success("Ký hợp đồng thành công");
          }
        } else {
          alert("Hãy cập nhật hồ sơ để tiếp tục");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }, [contract]);

  const fetchCreateSmartContract = async (urlContract) => {
    try {
      if (contract?.id) {
        const res = await createScService({ contractId: contract.id, cid: urlContract });
        if (res.status === 200) {
          toast.success("Tạo hợp đồng thông minh thành công");
          fetchContractById(contract?.id);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRenterPaymentDeposit = useCallback(async () => {
    try {
      if (contract?.id) {
        const res = await renterPaymentDepositService({
          contractId: contract?.id,
        });
        if (res.status === 200) {
          toast.success("Tạo hợp đồng thông minh thành công");
          fetchContractById(contract?.id);
        }
      }
    } catch (error) {
      console.log(error.message);
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
        var urlContract
        const res = await uploadFileToIpfs({file: base64, contractId: contract?.id});

        if (res.status === 200) {
          urlContract = res.data;
        }
        console.log(urlContract);

        const input = buildParamsCreateSc(contract);
        const scNft = await scInstance.mint(
          input.id,
          input.renterAddress,
          input.sellerAddress,
          input.reId,
          input.rentCost,
          input.duration,
          urlContract,
        );
        fetchCreateSmartContract(urlContract);
      } else {
        alert("Không tồn tại SC nft");
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi hệ thống");
    }
  }, [contract, scInstance]);

  const renterDepositContract = useCallback(async () => {
    try {
      const deposit = contract.Terms.find((term) => (term.type = "deposit"));
      const tx = {
        value: String(convertVndToEth(Number(deposit?.value))),
      };
      await scInstance.depositContract(contract?.id, tx);
      await fetchRenterPaymentDeposit();
    } catch (error) {
      console.log(error);
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
              if (authUser?.SignatureId > 0 && authUser?.wallet) {
                sellerCreateSmartContract();
              } else {
                alert("Vui lòng cập nhật đầy đủ thông tin để ký kết");
              }
            }}
          >
            Tạo hợp đồng
          </Button>,
        ];
        return buttonGr;
      }
    }
    if (authUser?.role === "1") {
      if (contract?.status === "3" && checkListTermAccept(contract?.Term)) {
        const buttonGr = [
          <Button key="back" onClick={close}>
            Đóng
          </Button>,
          <Button
            key="back"
            onClick={async () => {
              if (authUser?.SignatureId > 0 && authUser.wallet) {
                await renterSignContract();
              } else {
                alert("Vui lòng cập nhật đầy đủ thông tin để ký kết");
              }
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
              await renterDepositContract();
            }}
          >
            Thanh toán
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
          {contract?.status === "8" && <Deposit contract={contract} />}
        </>
      </Spin>
    </Modal>
  );
};

export default StepSign;
