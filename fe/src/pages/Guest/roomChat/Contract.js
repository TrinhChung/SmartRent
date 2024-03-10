import { Button, Col, Modal, Row } from "antd";
import React, { memo, useEffect, useRef, useState } from "react";
import moment from "moment";
import SignaturePad from "react-signature-pad-wrapper";
import "./Contract.scss";
import { getContractByIdService } from "../../../services/RealEstate";

const Contract = ({ id, open = false, handleCancel = () => {} }) => {
  const [contract, setContract] = useState({});
  const signatureSeller = useRef(null);
  const signatureRenter = useRef(null);

  const fetchContractById = async (id) => {
    try {
      const res = await getContractByIdService({ id: id });
      if (res.status === 200) {
        setContract(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContractById(id);
  }, [id]);

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
      <Row className="contract-container">
        <Col span={24}>
          <Row className="national-title">
            <Col>
              <Row className="national">Cộng hòa xã hội chủ nghĩa Việt Nam</Row>
              <Row className="motto">Độc lập - Tự do - Hạnh Phúc</Row>
              <Row style={{ justifyContent: "center" }}>
                -----------------------------------
              </Row>
            </Col>
          </Row>
          <Row className="name-title">Hợp đồng thuê nhà</Row>
          <Row className="date-contract" gutter={[4, 4]}>
            <Col>
              <label style={{ fontSize: 16 }}>Hôm nay, ngày</label>
            </Col>
            <Col>
              <label style={{ fontSize: 16 }}>
                {moment(new Date()).format("DD - MM - YYYY")}
              </label>
            </Col>
            <Col>
              <label style={{ fontSize: 16 }}>chúng tôi gồm có</label>
            </Col>
          </Row>
          <Row className="info-seller">
            <Col span={24}>
              <Row className="partner-title">I. Chủ nhà (Bên A)</Row>
              <Row style={{ paddingLeft: 20 }}>
                <Col span={24}>Ông (bà): {contract?.seller?.fullName}</Col>
                <Col span={4}>
                  Sinh năm: {moment(contract?.seller?.birthday).year()}
                </Col>
                <Col span={8}>Điện thoại: {contract?.seller?.phoneNumber}</Col>
                <Col span={12}>Email: {contract?.seller?.email}</Col>
                <Col span={24}>
                  Địa chỉ: {contract?.seller?.Address?.address}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row className="partner-title">II. Bên thuê nhà (Bên B)</Row>
              <Row style={{ paddingLeft: 20 }}>
                <Col span={24}>Ông (bà): {contract?.renter?.fullName}</Col>
                <Col span={4}>
                  Sinh năm: {moment(contract?.renter?.birthday).year()}
                </Col>
                <Col span={8}>Điện thoại: {contract?.renter?.phoneNumber}</Col>
                <Col span={12}>Email: {contract?.renter?.email}</Col>
                <Col span={24}>
                  Địa chỉ: {contract?.renter?.Address?.address}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row className="partner-title">III. Điều khoản</Row>
              <Row style={{ paddingLeft: 20 }}>
                <Col span={24}>
                  <Row>
                    Sau khi thống nhất, hai bên quyết định các điều khoản hợp
                    đồng thuê nhà như sau.
                  </Row>
                  <Row className="rule">※ Điều 1</Row>
                  <Row>
                    - Bên A cho bên B thuê nhà tại địa chỉ{" "}
                    {contract?.RealEstate?.Address?.address} diện tích{" "}
                    {contract?.RealEstate?.acreage} (m2) với mức giá {10000000}{" "}
                    VNĐ / tháng. Tiền sẽ được thanh toán vào ngày{" "}
                    {moment(new Date()).format("DD")} hàng tháng.
                  </Row>
                  <Row>
                    - Tiền cọc khi thuê nhà của bên B sẽ là: {1000000} VNĐ. Số
                    tiền này sẽ lưu trữ trong hợp đồng thông minh và sẽ được
                    hoàn trả cho bên B sau khi chấm dứt hợp đồng đúng kì hạn.
                    Nếu bên B chấm dứt hợp đồng trước thời hạn số tiền này sẽ
                    được bồi thường cho bên A.
                  </Row>
                  <Row className="rule">※ Điều 2</Row>
                  <Row>
                    - Bên A có trách nhiệm bàn giao đầy đủ bất động sản cho bên
                    B.
                  </Row>
                  <Row>
                    - Cả bên A và B có trách nhiệm tuân thủ các quy định bên B
                    đã đặt ra
                  </Row>
                  <Row>
                    Sau khi hết thời hạn {12} tháng hai bên có thể tiếp tục đàm
                    phán ký lại hợp đồng để có thể phù hợp với thị trường.
                  </Row>
                  <Row className="rule">※ Điều khoản bổ sung</Row>
                  <Row>- Bên A cho phép bên B nuôi động vật</Row>
                  <Row>
                    - Bên B có thể thanh toán tiền hàng tháng bằng Etherum
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row className="partner-title">III. Chữ ký 2 bên</Row>
              <Row style={{ paddingLeft: 20 }}>
                <Col span={12}>
                  <Row>Chữ ký bên A</Row>
                  <Row>
                    <SignaturePad
                      options={{
                        minWidth: 1,
                        maxWidth: 1,
                        penColor: "rgb(66, 133, 244)",
                      }}
                      ref={signatureSeller}
                    />
                  </Row>
                  <Row>
                    <Button
                      onClick={() => {
                        signatureSeller.current.clear();
                      }}
                    >
                      Clear
                    </Button>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>Chữ ký bên B</Row>
                  <Row>
                    <SignaturePad
                      options={{
                        minWidth: 1,
                        maxWidth: 1,
                        penColor: "rgb(66, 133, 244)",
                      }}
                      ref={signatureRenter}
                    />
                  </Row>
                  <Row>
                    <Button
                      onClick={() => {
                        signatureRenter.current.clear();
                      }}
                    >
                      Clear
                    </Button>
                  </Row>
                  <Row
                    onClick={() => {
                      signatureRenter.current.toDataURL();
                    }}
                  >
                    <Button>Save</Button>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(Contract);
