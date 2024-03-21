import { Button, Col, Image, Modal, Row } from "antd";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import generatePDF from "react-to-pdf";
import "./Contract.scss";

const Contract = ({ contract, refContract }) => {
  return (
    <Col span={24} style={{ paddingTop: 16 }}>
      <Row>
        <button
          onClick={async () => {
            const time = moment(new Date()).valueOf();
            await generatePDF(refContract, {
              filename: time + "_contract.pdf",
            });
          }}
        >
          Download PDF
        </button>
      </Row>
      <Row className="contract-container" ref={refContract}>
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
                  {contract?.Terms?.length > 0 &&
                    contract?.Terms?.map((term, index) => {
                      if (
                        term.accept === "1" &&
                        ["cost", "deposit", "timeStart", "deadline"].includes(
                          term.type
                        )
                      ) {
                        return <Row key={index}>{"- " + term.content}</Row>;
                      }
                    })}
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
                  {contract?.Terms?.length > 0 &&
                    contract?.Terms?.map((term, index) => {
                      if (term.accept === "1" && term.type === "other") {
                        return <Row key={index}>{"- " + term.content}</Row>;
                      }
                    })}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row className="partner-title">III. Chữ ký 2 bên</Row>
              <Row style={{ paddingLeft: 20 }}>
                <Col span={12}>
                  <Row style={{ justifyContent: "center" }}>Chữ ký bên A</Row>
                  <Row>
                    <Image
                      preview={false}
                      src={contract?.seller?.Signature?.sign}
                    />
                  </Row>
                </Col>
                <Col span={12}>
                  <Row style={{ justifyContent: "center" }}>Chữ ký bên B</Row>
                  <Image
                    preview={false}
                    src={contract?.renter?.Signature?.sign}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default memo(Contract);
