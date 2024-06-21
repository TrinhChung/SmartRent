import { Col, Row } from "antd";
import React, { useCallback, useContext } from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WrapTerm.scss";
import { deleteTermContradictionService } from "../../services/RoomChat";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/authProvider";

const WrapTerm = ({
  term,
  children,
  contradictSelected = [],
  setContradictSelected = () => {},
  fetchContractById = () => {},
}) => {
  const { authUser } = useContext(AuthContext);

  const fetchDeleteContradiction = useCallback(async (id) => {
    try {
      const res = await deleteTermContradictionService({
        termId: id,
      });
      if (res.status === 200) {
        fetchContractById();
      }
    } catch (error) {
      toast.success(error.message);
    }
  }, []);

  if (term?.Contradictions?.length === 0) {
    return (
      <Row
        className="term-item-container"
        key={"list_term_" + term?.id}
        id={"list_term_" + term?.id}
        index={"list_term_" + term?.id}
      >
        {children}
      </Row>
    );
  } else {
    return (
      <Row index={"list_term_" + term?.id} key={"box_term_" + term?.id}>
        <Col span={24}>
          <Row
            className={`term-item-container warning-term ${
              contradictSelected.includes(term?.id) ? "background-waring" : ""
            }`}
            key={"list_term_" + term?.id}
            id={"list_term_" + term?.id}
            onClick={() => {
              const list = term?.Contradictions?.map((contradict) => {
                return contradict?.targetId;
              });
              setContradictSelected(list);
            }}
          >
            {children}
            {term?.type === "other" && term?.userId === authUser?.id && (
              <Col className="delete-term">
                <FontAwesomeIcon
                  onClick={async () => {
                    await fetchDeleteContradiction(term?.id);
                  }}
                  icon={faTrashCan}
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    );
  }
};

export default WrapTerm;
