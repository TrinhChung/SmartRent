import React, { useState } from "react";
import { Col, Row, Input, Form, Image } from "antd";
import Upload from "../../../components/pages/Upload";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useJsApiLoader } from "@react-google-maps/api";
import MapCustom from "../../../components/maps/MapCustom";
import PlacesAutocomplete from "../../../components/maps/PlacesAutocomplete";
import "./NewPost.scss";

const NewPost = () => {
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["drawing", "places"],
  });
  const [form] = Form.useForm();
  const [description, setDescription] = useState(false);
  const [listImg, setListImg] = useState([]);
  const [position, setPosition] = useState({
    lat: 21.0469701,
    lng: 105.8021347,
  });

  return (
    <Col span={24} className="home-container new-post">
      <Row className="text_title">Tạo bài đăng</Row>
      {isLoaded && (
        <Form
          layout="vertical"
          form={form}
          style={{
            width: "100%",
            paddingTop: 16,
          }}
        >
          <Row>
            <Form.Item style={{ width: "100%" }}>
              <Row style={{ width: "100%" }}>
                <Col
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  xs={24}
                  xl={6}
                >
                  <Row>
                    <Form.Item
                      label="Tên tòa nhà"
                      name="nameRealEstate"
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="Tên tòa nhà" />
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item
                      label="Địa chỉ"
                      name="address"
                      style={{ width: "100%" }}
                    >
                      <PlacesAutocomplete setPosition={setPosition} />
                    </Form.Item>
                  </Row>
                </Col>
                <Col xs={24} xl={18}>
                  <Row style={{ justifyContent: "end" }}>
                    <MapCustom position={position} setPosition={setPosition} />
                  </Row>
                </Col>
              </Row>
            </Form.Item>
          </Row>
          <Row></Row>
          <Row>
            <Form.Item
              label="Ảnh tòa nhà"
              name="imgRealEstate"
              style={{ width: "100%" }}
            >
              <Row style={{ width: "100%", gap: 8 }}>
                <Upload
                  idInput="upload-img-real-estate"
                  setFiles={setListImg}
                />
                {listImg.length > 0 &&
                  listImg.map((img) => {
                    return (
                      <Col>
                        <Image
                          src={img?.url}
                          style={{ height: 80, width: 80 }}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Mô tả"
              name="description"
              style={{ width: "100%" }}
            >
              <MarkdownEditor
                value={description}
                onChange={(value) => {
                  setDescription(value);
                }}
                height="200px"
                enablePreview={true}
              />
            </Form.Item>
          </Row>
          <Row>Attributes</Row>
          <Row>Create Room</Row>
        </Form>
      )}
    </Col>
  );
};

export default NewPost;
