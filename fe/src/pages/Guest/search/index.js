import React from "react";
import { Col, Row, Layout, Button } from "antd";
const { Sider, Content } = Layout;

const Search = () => {
  return (
    <Layout className="list-post">
      <Sider className="search-container" width={360}>
        Search
      </Sider>
      <Content className="list-post-body">
        <Row>
          <Col span={24}>Results</Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Search;
