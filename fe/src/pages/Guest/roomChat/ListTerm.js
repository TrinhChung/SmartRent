import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
} from "antd";
import "./ListTerm.scss";
import dayjs from "dayjs";
import moment from "moment";
import { AuthContext } from "../../../providers/authProvider";
import {
  createTermContractService,
  updateAcceptCostTermService,
  updateAcceptTimeStartTermService,
  updateTermContractService,
  updateValueCostTermService,
  updateValueTimeStartTermService,
} from "../../../services/RoomChat/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPaperPlane,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import { SocketContext } from "../../../providers/socketProvider";

const ListTerm = ({
  contract,
  open,
  close = () => {},
  fetchContractById = () => {},
}) => {
  const { authUser } = useContext(AuthContext);
  const { socket, fetchNotifyOfUser } = useContext(SocketContext);
  const [formTerm] = Form.useForm();
  const [cost, setCost] = useState(contract?.Cost?.value);
  const [timeStart, setTimeStart] = useState(contract?.TimeStart?.value);
  const [isOpenModalCreateTerm, setIsOpenModalCreateTerm] = useState(false);

  const fetchUpdateTerm = useCallback(
    async ({ termId, accept }) => {
      try {
        const res = await updateTermContractService({
          termId: termId,
          accept: accept,
        });
        if (res.status === 200) {
          fetchContractById();
        }
      } catch (error) {
        if (accept === "1") {
          alert("Không thể chấp thuận!Vui lòng thử lại sau");
        }
        if (accept === "2") {
          alert("Không thể từ chối !Vui lòng thử lại sau");
        }
      }
    },
    [contract]
  );

  const fetchUpdateAcceptCostTerm = useCallback(
    async ({ costId, accept }) => {
      try {
        const res = await updateAcceptCostTermService({
          costId: costId,
          accept: accept,
        });
        if (res.status === 200) {
          fetchContractById();
        }
      } catch (error) {
        if (accept === "1") {
          alert("Không thể chấp thuận!Vui lòng thử lại sau");
        }
        if (accept === "2") {
          alert("Không thể từ chối !Vui lòng thử lại sau");
        }
      }
    },
    [contract]
  );

  const fetchUpdateValueCostTerm = useCallback(
    async ({ costId, value }) => {
      try {
        const res = await updateValueCostTermService({
          costId: costId,
          value: value,
        });
        if (res.status === 200) {
          fetchContractById();
        }
      } catch (error) {
        alert("Không thể cập nhật giá");
      }
    },
    [contract]
  );

  const fetchUpdateAcceptTimeStartTerm = useCallback(
    async ({ timeStartId, accept }) => {
      try {
        const res = await updateAcceptTimeStartTermService({
          timeStartId: timeStartId,
          accept: accept,
        });
        if (res.status === 200) {
          fetchContractById();
        }
      } catch (error) {
        if (accept === "1") {
          alert("Không thể chấp thuận!Vui lòng thử lại sau");
        }
        if (accept === "2") {
          alert("Không thể từ chối !Vui lòng thử lại sau");
        }
      }
    },
    [contract]
  );

  const fetchUpdateValueTimeStartTerm = useCallback(
    async ({ timeStartId, value }) => {
      try {
        const res = await updateValueTimeStartTermService({
          timeStartId: timeStartId,
          value: value,
        });
        if (res.status === 200) {
          fetchContractById();
        }
      } catch (error) {
        alert("Không thể cập nhật giá");
      }
    },
    [contract]
  );

  useEffect(() => {
    setCost(contract?.Cost?.value);
    setTimeStart(contract?.TimeStart?.value);
    console.log(contract);
  }, [contract]);

  useEffect(() => {
    socket.on("update-term", async (data) => {
      await fetchNotifyOfUser();
      await fetchContractById();
    });
  }, [socket, fetchContractById]);

  const CostElement = useMemo(() => {
    return (
      <Row gutter={[8, 8]}>
        <Col>
          <label>Giá (VNĐ)</label>
        </Col>

        {contract?.Cost?.accept === false &&
          contract?.Cost?.value === cost &&
          contract?.Cost?.userId !== authUser.id && (
            <Col>
              <Row
                style={{
                  alignItems: "center",
                  justifyContent: "end",
                }}
                gutter={[2, 2]}
                className="accept-term-button"
                onClick={() => {
                  fetchUpdateAcceptCostTerm({
                    costId: contract?.Cost?.id,
                    accept: true,
                  });
                }}
              >
                <Col>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </Col>
                <Col>
                  <label>Chấp thuận</label>
                </Col>
              </Row>
            </Col>
          )}

        {contract?.Cost?.value !== cost && (
          <Col>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "end",
              }}
              gutter={[2, 2]}
              className="request-term-button"
              onClick={() => {
                fetchUpdateValueCostTerm({
                  costId: contract?.Cost?.id,
                  value: cost,
                });
              }}
            >
              <Col>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Col>
              <Col>
                <label>Yêu cầu thay đổi</label>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    );
  }, [contract, cost]);

  const TimeStartElement = useMemo(() => {
    return (
      <Row gutter={[8, 8]}>
        <Col>
          <label>Ngày bắt đầu thuê</label>
        </Col>
        {contract?.TimeStart?.accept === false &&
          moment(contract?.TimeStart?.value).format("DD-MM-YYYY") ==
            moment(timeStart).format("DD-MM-YYYY") &&
          contract?.TimeStart?.userId !== authUser.id && (
            <Col>
              <Row
                style={{
                  alignItems: "center",
                  justifyContent: "end",
                }}
                gutter={[2, 2]}
                className="accept-term-button"
                onClick={() => {
                  fetchUpdateAcceptTimeStartTerm({
                    timeStartId: contract?.TimeStart?.id,
                    accept: true,
                  });
                }}
              >
                <Col>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </Col>
                <Col>
                  <label>Chấp thuận</label>
                </Col>
              </Row>
            </Col>
          )}
        {moment(contract?.TimeStart?.value).format("DD-MM-YYYY") !==
          moment(timeStart).format("DD-MM-YYYY") && (
          <Col>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "end",
              }}
              gutter={[2, 2]}
              className="request-term-button"
              onClick={() => {
                fetchUpdateValueTimeStartTerm({
                  timeStartId: contract?.TimeStart?.id,
                  value: timeStart,
                });
              }}
            >
              <Col>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Col>
              <Col>
                <label>Yêu cầu thay đổi</label>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    );
  }, [contract, timeStart]);

  return (
    <Modal
      open={open}
      title={
        <label style={{ fontSize: 18, textTransform: "uppercase" }}>
          Danh sách điều khoản
        </label>
      }
      onOk={close}
      onCancel={close}
      width={1175}
      style={{ top: 20 }}
      className="list-term-container"
    >
      <Col style={{ height: 800 }}>
        <Row className="term-item">
          <Col span={12}>
            {CostElement}
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
        </Row>
        <Row className="term-item">
          <Col span={12}>
            {TimeStartElement}
            <Row>
              <DatePicker
                value={dayjs(timeStart)}
                onChange={(value) => {
                  if (value) {
                    setTimeStart(new Date(value));
                  } else {
                    setTimeStart(new Date());
                  }
                }}
                style={{ width: "100%" }}
              />
            </Row>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 10,
          }}
        >
          <Col className="add-rule">Điều khoản bổ sung</Col>
          <Col>
            <Button
              onClick={() => {
                setIsOpenModalCreateTerm(true);
              }}
            >
              Thêm điều khoản mới
            </Button>
          </Col>
        </Row>
        {contract?.Terms?.length > 0 &&
          contract?.Terms.map((term, index) => {
            if (["0", "1"].includes(term?.accept)) {
              return (
                <Row
                  style={{ alignItems: "center", padding: "4px 0" }}
                  id={"term" + index}
                >
                  <Col span={24}>
                    {term?.accept === "0" && term?.userId !== authUser.id && (
                      <Row gutter={[8, 8]}>
                        <Col>Điều khoản mới</Col>
                        <Col>
                          <Row
                            style={{
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                            gutter={[4, 4]}
                            className="accept-term-button"
                            onClick={() => {
                              fetchUpdateTerm({ termId: term.id, accept: "1" });
                            }}
                          >
                            <Col>
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </Col>
                            <Col>
                              <label>Chấp thuận</label>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row
                            style={{
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                            gutter={[4, 4]}
                            className="reject-term-button"
                            onClick={() => {
                              fetchUpdateTerm({ termId: term.id, accept: "2" });
                            }}
                          >
                            <Col>
                              <FontAwesomeIcon icon={faXmarkCircle} />
                            </Col>
                            <Col>
                              <label>Từ chối</label>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )}

                    <Row>{"- " + term.content}</Row>
                  </Col>
                </Row>
              );
            }
          })}
      </Col>
      <Modal
        open={isOpenModalCreateTerm}
        title={
          <label style={{ fontSize: 18, textTransform: "uppercase" }}>
            Thêm điều khoản mới
          </label>
        }
        onOk={async () => {
          const termValue = formTerm.getFieldValue("name-term");
          if (termValue?.length > 0) {
            const data = { value: termValue, contractId: contract.id };
            const res = await createTermContractService(data);
            if (res.status === 200) {
              setIsOpenModalCreateTerm(false);
              formTerm.resetFields();
              fetchContractById();
            }
          }
        }}
        onCancel={() => {
          formTerm.resetFields();
          setIsOpenModalCreateTerm(false);
        }}
        className="list-term-container"
      >
        <Form form={formTerm}>
          <Form.Item name="name-term">
            <Input.TextArea placeholder="Thêm điều khoản mới" />
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};

export default ListTerm;
