import { useEffect, useState } from "react";
import HouseData from "./HouseData";
import { Col, Row, Pagination, Empty } from "antd";
import { getContractByMeService } from "../../../services/RealEstate";

const Negotiate = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);
  const [contracts, setContracts] = useState([]);

  const fetchContractForMe = async () => {
    try {
      const res = await getContractByMeService({ page: page });
      if (res.status === 200) {
        setContracts(res?.data?.contracts);
        setTotalPage(res?.data?.totalPages);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchContractForMe();
  }, []);

  return (
    <Col className="home-container" style={{ paddingTop: 20 }} span={24}>
      <Row style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: 10 }}>
        LIST OF NEGOTIATING ROOMS
      </Row>
      {contracts.length > 0 ? (
        <>
          <Row gutter={[24, 24]} style={{ paddingBottom: 20 }}>
            {contracts.map((house, index) => (
              <HouseData key={index} house={house} />
            ))}
          </Row>
          {totalPage > 10 && (
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
          )}
        </>
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
