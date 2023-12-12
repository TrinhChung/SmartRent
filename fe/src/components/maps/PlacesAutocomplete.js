import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Col, Input, Row, Popover } from "antd";
import "./Map.scss";

const PlacesAutocomplete = ({ setPosition = () => {} }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setPosition({ lat, lng });
  };

  return (
    <Col span={24}>
      <Row>
        <Popover
          style={{ width: "100%" }}
          content={
            status === "OK" && (
              <Col>
                {data.map(({ place_id, description }) => {
                  return (
                    <Row
                      className="address-suggestion"
                      key={place_id}
                      onClick={() => handleSelect(description)}
                    >
                      {description}
                    </Row>
                  );
                })}
              </Col>
            )
          }
          title="Title"
          trigger="click"
          open={status === "OK"}
          placement="bottomLeft"
          arrow={false}
        >
          <Input
            style={{ width: "100%" }}
            placeholder="Tìm kiếm địa điểm mong muốn tại đây"
            value={value}
            disabled={!ready}
            allowClear={true}
            onChange={(e) => {
              setValue(e?.target?.value);
            }}
          />
        </Popover>
      </Row>
      {value && (
        <>
          <Row style={{ paddingTop: 10, fontWeight: "bold" }}>
            Thông tin chi tiết
          </Row>
          <Row>
            <Col style={{ width: 120 }}>Địa chỉ:</Col>
            <Col>{value}</Col>
          </Row>
        </>
      )}
    </Col>
  );
};

export default PlacesAutocomplete;
