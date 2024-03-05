import { useEffect, useState } from "react";
import HouseData from "./HouseData";
import { Col, Row, Pagination, Empty } from "antd";
import { getBargainByMeService } from "../../../services/RealEstate";

const Negotiate = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);
  const [bargains, setBargains] = useState([]);

  const fetchBargainForMe = async () => {
    try {
      const res = await getBargainByMeService({ page: page });
      if (res.status === 200) {
        setBargains(res?.data?.bargains);
        setTotalPage(res?.data?.totalPages);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchBargainForMe();
  }, []);

  return (
    <Col className="home-container" span={24}>
      <Row style={{ fontSize: "30px", fontWeight: "bold", paddingBottom: 20 }}>
        LIST OF NEGOTIATING ROOMS
      </Row>
      {bargains.length > 0 ? (
        <Row>
          <Col span={24}>
            {bargains.map((house, index) => (
              <HouseData key={index} house={house} />
            ))}
            <Row
              style={{
                paddingTop: 10,
                justifyContent: "center",
                paddingBottom: 20,
              }}
            >
              <Pagination
                current={page}
                onChange={(value) => {
                  setPage(value);
                }}
                total={totalPage}
              />
            </Row>
          </Col>
        </Row>
      ) : (
        <Row style={{ justifyContent: "center" }}>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 200,
            }}
          ></Empty>
        </Row>
      )}
    </Col>
  );
};
export default Negotiate;
