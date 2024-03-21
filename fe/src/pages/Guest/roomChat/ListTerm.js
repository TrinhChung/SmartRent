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
import { toast } from "react-toastify";

const ListTerm = ({ contract, fetchContractById = () => {} }) => {
  const { authUser } = useContext(AuthContext);
  const [formTerm] = Form.useForm();
  const [cost, setCost] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [isOpenModalCreateTerm, setIsOpenModalCreateTerm] = useState(false);

  const fetchUpdateTerm = useCallback(
    async ({ termId, accept, value = null }) => {
      try {
        const res = await updateTermContractService({
          termId: termId,
          accept: accept,
          value: value,
        });
        if (res.status === 200) {
          fetchContractById(contract?.id);
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
    [contract, fetchContractById]
  );

  useEffect(() => {
    if (contract?.Terms?.length > 0) {
      contract.Terms.map((term) => {
        if (term.type === "cost") {
          setCost({ ...term, newValue: Number(term?.value) });
        }
        if (term.type === "timeStart") {
          setTimeStart({ ...term, newValue: term?.value });
        }
      });
    }
  }, [contract]);

  const CostElement = useMemo(() => {
    return (
      <Row gutter={[8, 8]}>
        <Col>
          <label>Với mức giá (VNĐ)/ Tháng</label>
        </Col>

        {cost?.accept === "0" &&
          Number(cost?.value) === Number(cost?.newValue) &&
          cost?.userId !== authUser.id && (
            <Col>
              <Row
                style={{
                  alignItems: "center",
                  justifyContent: "end",
                }}
                gutter={[2, 2]}
                className="accept-term-button"
                onClick={async () => {
                  await fetchUpdateTerm({
                    termId: cost?.id,
                    accept: "1",
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

        {Number(cost?.value) !== Number(cost?.newValue) && (
          <Col>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "end",
              }}
              gutter={[2, 2]}
              className="request-term-button"
              onClick={async () => {
                await fetchUpdateTerm({
                  termId: cost?.id,
                  costId: cost?.id,
                  value: cost?.newValue,
                  accept: "0",
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
  }, [cost?.id, cost?.value, cost?.accept, cost?.newValue]);

  const TimeStartElement = useMemo(() => {
    return (
      <Row gutter={[8, 8]}>
        <Col>
          <label>Hợp đồng có hiệu lực từ ngày</label>
        </Col>
        {timeStart?.accept === "0" &&
          moment(timeStart?.value).format("DD-MM-YYYY") ==
            moment(timeStart?.newValue).format("DD-MM-YYYY") &&
          timeStart?.userId !== authUser.id && (
            <Col>
              <Row
                style={{
                  alignItems: "center",
                  justifyContent: "end",
                }}
                gutter={[2, 2]}
                className="accept-term-button"
                onClick={() => {
                  fetchUpdateTerm({
                    termId: timeStart?.id,
                    accept: "1",
                    value: null,
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
        {moment(timeStart?.value).format("DD-MM-YYYY") !==
          moment(timeStart?.newValue).format("DD-MM-YYYY") && (
          <Col>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "end",
              }}
              gutter={[2, 2]}
              className="request-term-button"
              onClick={() => {
                fetchUpdateTerm({
                  termId: timeStart?.id,
                  value: timeStart?.newValue,
                  accept: "0",
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
  }, [timeStart?.id, timeStart?.newValue, timeStart?.value, timeStart?.accept]);

  return (
    <Col style={{ height: 800 }}>
      <Row>
        Sau khi thống nhất, hai bên quyết định các điều khoản hợp đồng thuê nhà
        như sau.
      </Row>
      <Row className="add-rule">※ Điều 1</Row>
      <Row>
        - Bên A cho bên B thuê nhà tại địa chỉ{" "}
        {contract?.RealEstate?.Address?.address} diện tích{" "}
        {contract?.RealEstate?.acreage} (m2)
      </Row>
      <Row className="term-item" style={{ paddingBottom: 5, paddingTop: 4 }}>
        <Col span={12}>
          {CostElement}
          <Row>
            <InputNumber
              step={500000}
              min={0}
              value={cost?.newValue}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Giá thuê theo tháng"
              style={{ width: "100%" }}
              onChange={(value) => {
                setCost({ ...cost, newValue: value });
              }}
            />
          </Row>
        </Col>
      </Row>
      <Row>
        Tiền thuê sẽ được thanh toán vào ngày {moment(timeStart).format("DD")}{" "}
        hàng tháng.
      </Row>
      <Row className="term-item" style={{ padding: "4px 0" }}>
        <Col span={12}>
          {TimeStartElement}
          <Row>
            <DatePicker
              value={dayjs(timeStart?.newValue)}
              onChange={(value) => {
                if (value) {
                  setTimeStart({ ...timeStart, newValue: new Date(value) });
                } else {
                  setTimeStart({ ...timeStart, newValue: new Date() });
                }
              }}
              style={{ width: "100%" }}
            />
          </Row>
        </Col>
      </Row>
      <Row>
        - Tiền cọc khi thuê nhà của bên B sẽ là
        {" " + String(cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        VNĐ. Số tiền này sẽ lưu trữ trong hợp đồng thông minh và sẽ được hoàn
        trả cho bên B sau khi chấm dứt hợp đồng đúng kì hạn. Nếu bên B chấm dứt
        hợp đồng trước thời hạn số tiền này sẽ được bồi thường cho bên A.
      </Row>
      <Row className="add-rule">※ Điều 2</Row>
      <Row>- Bên A có trách nhiệm bàn giao đầy đủ bất động sản cho bên B.</Row>
      <Row>
        - Cả bên A và B có trách nhiệm tuân thủ các quy định bên B đã đặt ra
      </Row>
      <Row>
        Sau khi hết thời hạn {12} tháng hai bên có thể tiếp tục đàm phán ký lại
        hợp đồng để có thể phù hợp với thị trường.
      </Row>
      <Row
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Col className="add-rule">※ Điều khoản bổ sung</Col>
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
          if (["0", "1"].includes(term?.accept) && term?.type === "other") {
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
            const data = {
              content: termValue,
              value: null,
              contractId: contract.id,
            };
            const res = await createTermContractService(data);
            if (res.status === 200) {
              setIsOpenModalCreateTerm(false);
              formTerm.resetFields();
              fetchContractById(contract?.id);
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
    </Col>
  );
};

export default ListTerm;
