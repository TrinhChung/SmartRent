import { memo, useContext, useState, useCallback } from "react";
import {
  Col,
  Row,
  Avatar,
  Input,
  Form,
  Button,
  Select,
  DatePicker,
} from "antd";
import { AuthContext } from "../../../../providers/authProvider";
import PlacesAutocomplete from "../../../../components/maps/PlacesAutocomplete";
import MapCustom from "../../../../components/maps/MapCustom";
import { useJsApiLoader } from "@react-google-maps/api";
import dayjs from "dayjs";

const Profile = () => {
  const [libraries] = useState(["drawing", "places"]);
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: libraries,
  });
  const { authUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [position, setPosition] = useState(
    form.getFieldValue("location")
      ? form.getFieldValue("location")
      : {
          lat: 21.0469701,
          lng: 105.8021347,
        }
  );

  const setAddress = useCallback(
    (name) => {
      form.setFieldsValue({ address: name });
    },
    [form, position]
  );

  const connectAccountSc = async () => {
    if (window?.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Col span={24}>
      <Form
        form={form}
        initialValues={{ gender: "1", birthday: dayjs(), maritalStatus: "1" }}
      >
        <Row className="info-basic" gutter={[8, 8]}>
          <Col>
            <Form.Item>
              <label for="input-avatar">
                <Avatar
                  shape="square"
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                    cursor: "pointer",
                  }}
                  size={200}
                  src={
                    authUser.File
                      ? process.env.REACT_APP_HOST_BE + "/" + authUser.File?.url
                      : null
                  }
                >
                  {authUser.File ? null : authUser.fullName}
                </Avatar>
              </label>

              <input
                id="input-avatar"
                type="file"
                style={{ display: "none" }}
              />
            </Form.Item>
          </Col>
          <Col xxl={16}>
            <Row gutter={[8, 0]}>
              <Col span={11}>
                <Form.Item name="firstName" className="input-profile">
                  <Input placeholder="Nhập họ" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item name="lastName" className="input-profile">
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item className="input-profile" name="email">
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item className="input-profile" name="phoneNumber">
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item className="input-profile" name="gender">
                  <Select
                    options={[
                      { label: "Nam", value: "1" },
                      { label: "Nữ", value: "2" },
                    ]}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item className="input-profile" name="birthday">
                  <DatePicker
                    placeholder="Ngày sinh"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item className="input-profile" name="maritalStatus">
                  <Select
                    options={[
                      { label: "Độc thân", value: "1" },
                      { label: "Đã kết hôn", value: "2" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            {isLoaded && (
              <Row>
                <Col span={22}>
                  <Form.Item name="address" style={{ width: "100%" }}>
                    <PlacesAutocomplete
                      setPosition={(position) => {
                        setPosition(position);
                        form.setFieldsValue({ location: position });
                      }}
                      isShowDetail={false}
                      setAddress={setAddress}
                      addressInitial={form.getFieldValue("address")}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Col>
          <Col>
            <Row>
              <Button
                onClick={() => {
                  connectAccountSc();
                }}
              >
                Kết nối tới ví MetaMask
              </Button>
            </Row>
            <Row>Số dư</Row>
          </Col>
        </Row>
        {isLoaded && (
          <Row>
            <Col span={8}>
              <MapCustom
                position={position}
                setPosition={(position) => {
                  setPosition(position);
                  form.setFieldsValue({ location: position });
                }}
              />
            </Col>
            <Col span={16}>
              <Form.Item name="location" valuePropName="location">
                <Row style={{ justifyContent: "end" }}></Row>
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row style={{ paddingTop: 12 }}>
          <Button>Save</Button>
        </Row>
      </Form>
    </Col>
  );
};

export default memo(Profile);
