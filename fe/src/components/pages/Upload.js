import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadFileToSessionService } from "../../services/UploadFile/index";
import { Col, Image, Row } from "antd";
import "./Upload.scss";

const Upload = ({
  idInput,
  setFiles = () => {},
  height = 80,
  width = 80,
  isShowFile = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [filesView, setFilesView] = useState([]);

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
      setFiles([]);
    }
  };

  return (
    <Row style={{ gap: 10 }}>
      <Col className="upload-component">
        <label
          className="label-upload"
          style={{ height: height, width: width }}
          for={idInput}
        >
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
        </label>
        <input
          type="file"
          id={idInput}
          multiple
          onChange={uploadMultipleFiles}
          accept="image/*, application/pdf"
          style={{ display: "none" }}
        />
      </Col>
      {isShowFile &&
        filesView.length > 0 &&
        filesView.map((img) => {
          return (
            <Col>
              <Image src={img?.url} style={{ height: height, width: width }} />
            </Col>
          );
        })}
    </Row>
  );
};

export default Upload;
