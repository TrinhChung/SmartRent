import React, { useContext, useEffect, useState } from "react";
import { Button, Col, DatePicker, Input, InputNumber, Modal, Row } from "antd";
import "./ListTerm.scss";
import dayjs from "dayjs";
import moment from "moment";
import { AuthContext } from "../../../providers/authProvider";

const ListTerm = ({ contract, open, close = () => {} }) => {
  const { authUser } = useContext(AuthContext);
  const [cost, setCost] = useState(contract?.Cost?.value);
  const [timeStart, setTimeStart] = useState(contract?.TimeStart?.value);

  useEffect(() => {
    setCost(contract?.Cost?.value);
    setTimeStart(contract?.TimeStart?.value);
  }, [contract]);

  return (
    <Modal
      open={open}
      title={
        <label style={{ fontSize: 18, textTransform: "uppercase" }}>
          Danh sách điều khoản
        </label>
      }
      onOk={() => {}}
      onCancel={close}
      width={1175}
      style={{ top: 20 }}
      className="list-term-container"
    >
      <Col style={{ height: 800 }}>
        <Row className="term-item">
          <Col span={12}>
            <label>Giá (VNĐ)</label>
            <Row>
              <InputNumber
                step={500000}
                min={0}
                value={cost}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                placeholder="Giá thuê theo tháng"
                style={{ width: "100%" }}
                onChange={(value) => {
                  setCost(value);
                }}
              />
            </Row>
          </Col>
          <Col style={{ alignItems: "center" }}>
            <Row gutter={[8, 8]}>
              {contract?.Cost?.accept === false &&
                contract?.Cost?.userId !== authUser.id && (
                  <Col>
                    <Button>Chấp thuận</Button>
                  </Col>
                )}

              {contract?.Cost?.value !== cost && (
                <Col>
                  <Button>Yêu cầu thay đổi</Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Row className="term-item">
          <Col span={12}>
            <label>Ngày bắt đầu thuê</label>
            <Row>
              <DatePicker
                value={dayjs(timeStart)}
                onChange={(value) => {
                  setTimeStart(value);
                }}
                style={{ width: "100%" }}
              />
            </Row>
          </Col>
          <Col style={{ alignItems: "center" }}>
            <Col style={{ alignItems: "center" }}>
              <Row gutter={[8, 8]}>
                {contract?.TimeStart?.accept === false &&
                  contract?.TimeStart?.userId !== authUser.id && (
                    <Col>
                      <Button>Chấp thuận</Button>
                    </Col>
                  )}
                {moment(contract?.TimeStart?.value).format("DD-MM-YYYY") !==
                  moment(timeStart).format("DD-MM-YYYY") && (
                  <Col>
                    <Button>Yêu cầu thay đổi</Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <Col className="add-rule">Điều khoản bổ sung</Col>
          <Col>
            <Button>Thêm điều khoản mới</Button>
          </Col>
        </Row>
      </Col>
    </Modal>
  );
};

export default ListTerm;
