import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Col, Input, Row, Popover } from "antd";
import "./Map.scss";
import { useEffect } from "react";

const PlacesAutocomplete = ({
  setPosition = () => {},
  isShowDetail = true,
  setAddress = () => {},
  addressInitial = "",
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    if (addressInitial) {
      setValue(addressInitial, false);
      clearSuggestions();
    }
  }, [addressInitial]);

  const handleSelect = async (address) => {
    setValue(address, false);
    setAddress(address);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
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
              if (!e.target.value || e.target.value.length === 0) {
                setAddress("");
              }
            }}
          />
        </Popover>
      </Row>
      {value && isShowDetail && (
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
