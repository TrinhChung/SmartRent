import {
  memo,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
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
import { uploadFileToSessionService } from "../../../../services/UploadFile/index";
import { updateUserInfoService } from "../../../../services/User";
import { toast } from "react-toastify";
import SignaturePad from "react-signature-pad-wrapper";
import { getSignByIdService } from "../../../../services/User/index";

const Profile = () => {
  const [libraries] = useState(["drawing", "places"]);
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: libraries,
  });
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [wallets, setWallets] = useState([
    { label: authUser?.wallet, value: authUser?.wallet },
  ]);
  const [position, setPosition] = useState(
    form.getFieldValue("location")
      ? form.getFieldValue("location")
      : {
          lat: 21.0469701,
          lng: 105.8021347,
        }
  );
  const [filesView, setFilesView] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const signature = useRef(null);

  const setAddress = useCallback(
    (name) => {
      form.setFieldsValue({ address: name });
    },
    [form, position]
  );

  const initialValuesForm = useMemo(() => {
    return {
      gender: authUser?.gender,
      birthday: dayjs(authUser?.birthday ? authUser?.birthday : null),
      maritalStatus: authUser?.maritalStatus,
      firstName: authUser?.firstName,
      lastName: authUser?.lastName,
      email: authUser?.email,
      phoneNumber: authUser?.phoneNumber,
      location: {
        lat: parseFloat(authUser?.Address?.lat),
        lng: parseFloat(authUser?.Address?.lng),
      },
      wallet: authUser?.wallet,
      address: authUser?.Address?.address,
    };
  }, [authUser]);

  const fetchSignatureById = async (id) => {
    try {
      const res = await getSignByIdService(id);
      if (res?.data?.sign) {
        signature.current.clear();
        signature.current.fromDataURL(res.data?.sign);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authUser?.Address) {
      setPosition({
        lat: parseFloat(authUser?.Address?.lat),
        lng: parseFloat(authUser?.Address?.lng),
      });
    }
    if (authUser?.signatureId) {
      fetchSignatureById(authUser?.signatureId);
    }
  }, [authUser]);

  const connectAccountSc = useCallback(async () => {
    if (window?.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          form.setFieldValue("wallet", accounts[0]);
          setWallets(
            accounts.map((account) => {
              return { label: account, value: account };
            })
          );
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }, [window.ethereum]);

  const disconnectAccountMetaMask = useCallback(async () => {
    try {
      await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });

      const permissions = await window.ethereum.request({
        method: "wallet_getPermissions",
      });
      if (permissions.length === 0) {
        setWallets([]);
        form.setFieldValue("wallet", null);
      } else {
        alert("Chưa có tài khoản nào được kết nối");
      }
    } catch (error) {
      setWallets([]);
      form.setFieldValue("wallet", null);
      alert(error.message);
    }
  }, [window.ethereum]);

  const fetchUpdateUserInfo = useCallback(async (data) => {
    try {
      const res = await updateUserInfoService(data);
      if (res.status === 200) {
        setAuthUser(res.data);
        localStorage.setItem("authUser", JSON.stringify(res.data));
        toast.success("Cập nhật thông tin thành công");
      }
    } catch (error) {
      alert(error.message);
    }
  });

  const listWallets = useMemo(() => {
    return (
      <Col span={7}>
        <Row>
          {wallets.length === 0 ? (
            <Button
              onClick={() => {
                connectAccountSc();
              }}
            >
              Kết nối tới ví Meta Mask
            </Button>
          ) : (
            <Button
              className="button-error"
              onClick={disconnectAccountMetaMask}
            >
              Xóa liên kết tới Meta mask
            </Button>
          )}
        </Row>
        <Form.Item
          name={"wallet"}
          label="Địa chỉ ví"
          className="input-profile"
          rules={[
            {
              required: true,
              message: "Địa chỉ ví không được trống",
            },
          ]}
        >
          <Select options={wallets} style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    );
  }, [wallets]);

  const uploadMultipleFiles = async (e) => {
    const listFile = Array.from(e.target.files);
    if (listFile.length > 0) {
      const formData = new FormData();
      var check = true;
      for (let i = 0; i < listFile.length; i++) {
        if (listFile[i]?.size / 1024 / 1024 > 2) {
          check = false;
        }
        formData.append("file", listFile[i]);
      }

      if (!check) {
        e.preventDefault();
        alert(`Do not upload files larger than 2mb`);
        return;
      }
      setLoading(true);
      var fileBuilt = listFile.map((file) => {
        return {
          name: file.name,
          key: file.name + "*" + file.size,
          url: window.URL.createObjectURL(file),
        };
      });

      setFiles(fileBuilt);
      form.setFieldValue("avatar", fileBuilt[0]);
      setFilesView(fileBuilt);

      try {
        const res = await uploadFileToSessionService(formData);
        if (res.statusCode === 200) {
          console.log(res.message);
        }
      } catch (error) {
        console.log(error);
        setFiles([]);
      }
      setLoading(false);
    } else {
      form.setFieldValue("avatar", null);
      setFiles([]);
    }
  };

  return (
    <Col span={24}>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValuesForm}
        onFinish={() => {
          const signData = signature?.current?.toDataURL();
          if (signature.current.toData().length === 0) {
            alert("Chữ ký không được trống");
            return;
          }
          const data = { ...form.getFieldsValue(), signData: signData };
          fetchUpdateUserInfo(data);
        }}
      >
        <Row className="info-basic" gutter={[8, 8]}>
          <Col>
            <Form.Item name="avatar" valuePropName="avatar">
              <label for="input-avatar" avatar={files[0]}>
                <Avatar
                  shape="square"
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                    cursor: "pointer",
                  }}
                  size={200}
                  src={
                    filesView.length > 0
                      ? filesView[0].url
                      : authUser.File
                      ? process.env.REACT_APP_HOST_BE + "/" + authUser.File?.url
                      : null
                  }
                >
                  {authUser.File ? null : authUser?.fullName}
                </Avatar>
              </label>

              <input
                id="input-avatar"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={uploadMultipleFiles}
              />
            </Form.Item>
          </Col>
          <Col xxl={13}>
            <Row gutter={[8, 0]}>
              <Col span={11}>
                <Form.Item
                  name="firstName"
                  className="input-profile"
                  rules={[
                    {
                      required: true,
                      message: "Họ không được trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  className="input-profile"
                  rules={[
                    {
                      required: true,
                      message: "Tên không được trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  className="input-profile"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Email không được trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập email" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="input-profile"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Sđt không được trống",
                    },
                  ]}
                >
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
              <Col span={12}>
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
                <Col span={23}>
                  <Form.Item
                    name="address"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Địa chỉ không được trống",
                      },
                    ]}
                  >
                    <PlacesAutocomplete
                      setPosition={(position) => {
                        setPosition(position);
                        form.setFieldsValue({ location: position });
                      }}
                      addressInitial={form.getFieldValue("address")}
                      isShowDetail={false}
                      setAddress={setAddress}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Col>
          {listWallets}
        </Row>
        <Row gutter={[24, 24]}>
          {isLoaded && (
            <Col span={12}>
              <Form.Item name="location" valuePropName="location">
                <MapCustom
                  position={position}
                  setPosition={(position) => {
                    setPosition(position);
                    form.setFieldsValue({ location: position });
                  }}
                  setAddress={setAddress}
                />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Row>Chữ ký</Row>
            <Row style={{ border: "1px solid black" }}>
              <SignaturePad
                options={{
                  minWidth: 1,
                  maxWidth: 1,
                  penColor: "#000000",
                }}
                ref={signature}
              />
            </Row>
            <Row style={{ paddingTop: 10 }}>
              <Button
                onClick={() => {
                  signature.current.clear();
                }}
              >
                Xóa chữ ký
              </Button>
            </Row>
          </Col>
        </Row>
        <Row style={{ paddingTop: 12 }}>
          <Button htmlType="submit">Save</Button>
        </Row>
      </Form>
    </Col>
  );
};

export default memo(Profile);
