"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Addresses", [
      {
        address:
          "Dự án Lumiere Riverside, Đường Xa Lộ Hà Nội, Phường An Phú, Quận 2, Hồ Chí Minh",
        lat: "10.8024129867554",
        lng: "106.745101928711",
      },
      {
        address:
          "Dự án Vinhomes Golden River Ba Son, Phố Tôn Đức Thắng, Phường Bến Nghé, Quận 1, Hồ Chí Minh",
        lat: "10.7841062545776",
        lng: "106.703651428223",
      },
      {
        address:
          "Dự án Lumiere Riverside, Đường Xa Lộ Hà Nội, Phường An Phú, Quận 2, Hồ Chí Minh",
        lat: "10.8042144775391",
        lng: "106.749519348145",
      },
      {
        address:
          "Dự án Sunrise City, Đường Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, Hồ Chí Minh",
        lat: "10.7386236190796",
        lng: "106.70059967041",
      },
      {
        address:
          "Dự án Vinhomes Golden River Ba Son, Phố Tôn Đức Thắng, Phường Bến Nghé, Quận 1, Hồ Chí Minh",
        lat: "10.7841062545776",
        lng: "106.703651428223",
      },
      {
        address:
          "Dự án Lumiere Riverside, Đường Xa Lộ Hà Nội, Phường An Phú, Quận 2, Hồ Chí Minh",
        lat: "10.8024129867554",
        lng: "106.745101928711",
      },
      {
        address:
          "Lumiere Riverside, 628A, Đường Xa Lộ Hà Nội, Phường An Phú, Quận 2, Hồ Chí Minh",
        lat: "10.8024129867554",
        lng: "106.745101928711",
      },
      {
        address:
          "Dự án Sunrise City, Đường Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, Hồ Chí Minh",
        lat: "10.73862361907959",
        lng: "106.70059967041016",
      },
      {
        address:
          "Dự án Sunrise City, Đường Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, Hồ Chí Minh",
        lat: "10.7386236190796",
        lng: "106.70059967041",
      },
      {
        address:
          "Dự án Vinhomes Golden River Ba Son, Phố Tôn Đức Thắng, Phường Bến Nghé, Quận 1, Hồ Chí Minh",
        lat: "10.7825384140015",
        lng: "106.707504272461",
      },
      {
        address:
          "Dự án Vinhomes Grand Park, Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh",
        lat: "10.841423034668",
        lng: "106.840118408203",
      },
      {
        address:
          "Dự án Vinhomes Grand Park quận 9, Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh",
        lat: "10.841423034668",
        lng: "106.840118408203",
      },
      {
        address:
          "Dự án Vinhomes Grand Park, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh",
        lat: "10.841423034668",
        lng: "106.840118408203",
      },
      {
        address:
          "Dự án Vinhomes Grand Park, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh",
        lat: "10.841423034668",
        lng: "106.840118408203",
      },
      {
        address: "Dự án Vinhomes Ocean Park Gia Lâm, Huyện Gia Lâm, Hà Nội",
        lat: "21.002415",
        lng: "105.96411",
      },
      {
        address:
          "Dự án Vinhomes Central Park, Đường Điện Biên Phủ, Phường 22, Bình Thạnh, Hồ Chí Minh",
        lat: "10.7949285507202",
        lng: "106.720741271973",
      },
      {
        address:
          "Dự án Vinhomes Golden River Ba Son, Phố Tôn Đức Thắng, Phường Bến Nghé, Quận 1, Hồ Chí Minh",
        lat: "10.7825384140015",
        lng: "106.707504272461",
      },
      {
        address:
          "Dự án Eco Green Sài Gòn, Đường Nguyễn Văn Linh, Phường Tân Thuận Tây, Quận 7, Hồ Chí Minh",
        lat: "10.7503509521484",
        lng: "106.723175048828",
      },
      {
        address:
          "Dự án Akari City Nam Long, Đường Võ Văn Kiệt, Phường An Lạc, Bình Tân, Hồ Chí Minh",
        lat: "10.72211742401123",
        lng: "106.61175537109375",
      },
      {
        address:
          "Dự án Masteri West Heights, Phường Tây Mỗ, Nam Từ Liêm, Hà Nội.",
        lat: "21.0062065124512",
        lng: "105.737075805664",
      },
      {
        address: "Đường Tô Vĩnh Diện, Phường 6, Đà Lạt, Lâm Đồng",
        lat: "11.9569868",
        lng: "108.4240713",
      },
      {
        address: "Đường Bùi Thị Xuân, Phường 2, Tân Bình, Hồ Chí Minh",
        lat: "10.7699949",
        lng: "106.6886078",
      },
      {
        address: "Đường 7, Phường An Lạc A, Bình Tân, Hồ Chí Minh",
        lat: "10.7517002",
        lng: "106.6180417",
      },
      {
        address: "Đường Hoàng Hoa Thám, Phường 5, Phú Nhuận, Hồ Chí Minh",
        lat: "10.8093925",
        lng: "106.684931",
      },
      {
        address:
          "Ngõ 397, Đường Phạm Văn Đồng, Phường Xuân Đỉnh, Bắc Từ Liêm, Hà Nội",
        lat: "21.0730776",
        lng: "105.7857525",
      },
      {
        address: "Đường Âu Cơ, Phường Kinh Bắc, Bắc Ninh, Bắc Ninh",
        lat: "21.1907472",
        lng: "106.061598",
      },
      {
        address: "24/46, Phố Phương Mai, Phường Phương Mai, Đống Đa, Hà Nội",
        lat: "21.0012748",
        lng: "105.8393044",
      },
      {
        address: "Đường Nguyễn Thị Nhỏ, Phường 14, Quận 5, Hồ Chí Minh",
        lat: "10.7533257",
        lng: "106.6507645",
      },
      {
        address: "Số 371, Đường Thống Nhất, Phường 11, Gò Vấp, Hồ Chí Minh",
        lat: "10.8392368",
        lng: "106.6652956",
      },
      {
        address:
          "Số 12, Ngõ 1197, Đường Giải Phóng, Phường Thịnh Liệt, Hoàng Mai, Hà Nội",
        lat: "20.9754287",
        lng: "105.8409325",
      },
      {
        address: "Đường Lê Hồng Phong, Phường Phú Hòa, Thủ Dầu Một, Bình Dương",
        lat: "10.9760566",
        lng: "106.681432",
      },
      {
        address:
          "Đường Huỳnh Văn Nghệ, Phường Phú Lợi, Thủ Dầu Một, Bình Dương",
        lat: "10.9870344",
        lng: "106.6759168",
      },
      {
        address: "Đường Dương Quảng Hàm, Phường 5, Gò Vấp, Hồ Chí Minh",
        lat: "10.8289792",
        lng: "106.6891983",
      },
      {
        address:
          "414/28 Đường Cách Mạng Tháng Tám, Phường 11, Quận 3, Hồ Chí Minh",
        lat: "10.7847437",
        lng: "106.6686984",
      },
      {
        address: "Đường Đỗ Xuân Hợp, Phường Phước Long B, Quận 9, Hồ Chí Minh",
        lat: "10.8151776",
        lng: "106.774778",
      },
      {
        address: "Đường Hùng Vương, Xã Phú Đông, Nhơn Trạch, Đồng Nai",
        lat: "10.7135295",
        lng: "106.8216695",
      },
      {
        address: "173/21 Đường 138, Phường Tân Phú, Quận 9, Hồ Chí Minh",
        lat: "10.8638603",
        lng: "106.8072016",
      },
      {
        address: "Đường 32, Thị trấn Trạm Trôi, Hoài Đức, Hà Nội",
        lat: "21.0686006",
        lng: "105.7102039",
      },
      {
        address: "Xã Cự Khê, Thanh Oai, Hà Nội",
        lat: " 20.9261809007120440",
        lng: "105.7902992482879400",
      },
      {
        address: "Dự án Him Lam Kênh Tẻ, Phường Tân Hưng, Quận 7, Hồ Chí Minh",
        lat: "10.741340637207031",
        lng: "106.69855499267578",
      },
      {
        address:
          "Dự án TSQ Galaxy, Đường Tố Hữu, Phường Vạn Phúc, Hà Đông, Hà Nội",
        lat: "20.984521865844727",
        lng: "105.7755355834961",
      },
      {
        address:
          "Dự án Jamona Home Resort, Đường Quốc Lộ 13, Phường Hiệp Bình Phước, Thủ Đức, Hồ Chí Minh",
        lat: "10.870589256286621",
        lng: "106.71755981445312",
      },
      {
        address:
          "Dự án Valora Fuji, Đường Phước Hữu, Phường Phước Long B, Quận 9, Hồ Chí Minh.",
        lat: "10.8132543563843",
        lng: "106.784523010254",
      },
      {
        address:
          "Dự án Làng Việt Kiều Châu Âu Euroland, Đường Nguyễn Văn Lộc, Phường Mỗ Lao, Hà Đông, Hà Nội",
        lat: "20.9834575653076",
        lng: "105.78564453125",
      },
      {
        address: "Đường Dương Đình Nghệ, Phường Yên Hòa, Cầu Giấy, Hà Nội",
        lat: "21.0215526",
        lng: "105.7878867",
      },
      {
        address: "Xã Vân Canh, Hoài Đức, Hà Nội",
        lat: "21.064477920532227",
        lng: "105.68864440917969",
      },
      {
        address: "Dự án Khu đô thị Lakeview City, Quận 2, Hồ Chí Minh",
        lat: "10.795414",
        lng: "106.77576",
      },
      {
        address:
          "Dự án Vinhomes Ocean Park Gia Lâm, Xã Dương Xá, Gia Lâm, Hà Nội",
        lat: "21.00241470336914",
        lng: "105.964111328125",
      },
      {
        address: "Dự án Vinhomes Marina Cầu Rào 2, Quận Lê Chân, Hải Phòng",
        lat: "20.828154",
        lng: "106.6919",
      },
      {
        address:
          "Dự án Geleximco Lê Trọng Tấn, Đường Lê Trọng Tấn, Phường Dương Nội, Hà Đông, Hà Nội",
        lat: "20.9792404174805",
        lng: "105.74178314209",
      },
      {
        address:
          "Dự án Geleximco Lê Trọng Tấn, Đường Lê Trọng Tấn, Phường Dương Nội, Hà Đông, Hà Nội",
        lat: "20.97924041748047",
        lng: "105.74178314208984",
      },
      {
        address: "Dự án Vinhomes Riverside, Phường Phúc Lợi, Long Biên, Hà Nội",
        lat: "21.0460948944092",
        lng: "105.915542602539",
      },
      {
        address:
          "Dự án Oceanami Luxury Homes and Resort, Đường 44A, Thị trấn Phước Hải, Đất Đỏ, Bà Rịa Vũng Tàu",
        lat: "10.38729190826416",
        lng: "107.25846099853516",
      },
      {
        address:
          "Dự án Khu A - Geleximco Lê Trọng Tấn, Đường Lê Trọng Tấn, Xã An Khánh, Hoài Đức, Hà Nội",
        lat: "21.005868911743164",
        lng: "105.7338638305664",
      },
      {
        address:
          "Dự án Lavila Kiến Á - Nhà Bè, Đường Nguyễn Hữu Thọ, Xã Phước Kiển, Nhà Bè, Hồ Chí Minh",
        lat: "10.69124984741211",
        lng: "106.7212142944336",
      },
      {
        address:
          "Dự án Midori Park, Đường Lý Thái Tổ, Phường Hòa Phú, Thủ Dầu Một, Bình Dương",
        lat: "11.061677932739258",
        lng: "106.68233489990234",
      },
      {
        address:
          "Dự án Khu A - Geleximco Lê Trọng Tấn, Đường Lê Trọng Tấn, Xã An Khánh, Hoài Đức, Hà Nội",
        lat: "21.005868911743164",
        lng: "105.7338638305664",
      },
      {
        address:
          "Dự án Ixora Hồ Tràm , Xã Phước Thuận, Xuyên Mộc, Bà Rịa Vũng Tàu",
        lat: "10.488136291503906",
        lng: "107.45674896240234",
      },
      {
        address:
          "Dự án Ciputra Hà Nội, Đường Lạc Long Quân, Phường Phú Thượng, Tây Hồ, Hà Nội",
        lat: "21.0787032472896",
        lng: "105.801383972168",
      },
      {
        address:
          "Dự án Vinhomes Ocean Park Gia Lâm, Xã Dương Xá, Gia Lâm, Hà Nội",
        lat: "21.00241470336914",
        lng: "105.964111328125",
      },
      {
        address: "Phố Chùa Láng, Phường Láng Thượng, Đống Đa, Hà Nội",
        lat: "21.023229",
        lng: "105.8062465",
      },
      {
        address: "171, Đường Minh Khai, Phường Minh Khai, Hai Bà Trưng, Hà Nội",
        lat: "20.9950928",
        lng: "105.8567517",
      },
      {
        address:
          "Đường Dương Đình Hội, Phường Phước Long B, Thủ Đức, Hồ Chí Minh",
        lat: "10.8646129121408",
        lng: "106.744064314635",
      },
      {
        address: "Đường Lãng Yên, Phường Thanh Lương, Hai Bà Trưng, Hà Nội",
        lat: "21.0088048",
        lng: "105.8659181",
      },
      {
        address: "Đường 21E, Phường Bình Trị Đông B, Bình Tân, Hồ Chí Minh",
        lat: "10.7478932",
        lng: "106.6085003",
      },
      {
        address: "Đường Láng, Phường Ngã Tư Sở, Đống Đa, Hà Nội",
        lat: "21.0044016",
        lng: "105.8180849",
      },
      {
        address: "Đường Lê Văn Thịnh, Phường Cát Lái, Quận 2, Hồ Chí Minh",
        lat: "10.7800227",
        lng: "106.7688294",
      },
      {
        address: "Đường Nguyễn Hoàng, Phường Mỹ Đình 2, Nam Từ Liêm, Hà Nội",
        lat: "21.0312752",
        lng: "105.7744451",
      },
      {
        address: "Đường Tây Sơn, Phường Quang Trung, Đống Đa, Hà Nội",
        lat: "21.0097185",
        lng: "105.8246999",
      },
      {
        address: "Phường Nghĩa Đô, Cầu Giấy, Hà Nội",
        lat: " 21.0469581846625400",
        lng: "105.8027236937563900",
      },
      {
        address:
          "255, Đường Lê Văn Hiến, Phường Hòa Hải, Ngũ Hành Sơn, Đà Nẵng",
        lat: "16.0096674",
        lng: "108.2573805",
      },
      {
        address:
          "755, Đường Nguyễn Văn Linh, Phường Dư Hàng Kênh, Lê Chân, Hải Phòng",
        lat: "20.8347396",
        lng: "106.6833649",
      },
      {
        address: "Đường 58, Phường Đông Phong, Lai Châu, Lai Châu",
        lat: " 22.3774947481262880",
        lng: "103.4864095836017000",
      },
      {
        address: "Đường Đền Lừ, Phường Hoàng Văn Thụ, Hoàng Mai, Hà Nội",
        lat: "20.9849301",
        lng: "105.8578633",
      },
      {
        address:
          "677, Đường Lương Ngọc Quyến, Phường Phan Đình Phùng, Thái Nguyên, Thái Nguyên",
        lat: "21.5842125",
        lng: "105.833914",
      },
      {
        address: "Đường Ký Con, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh",
        lat: "10.7672385",
        lng: "106.6983832",
      },
      {
        address: "Đường Nguyễn Hoàng, Phường Vĩnh Trung, Thanh Khê, Đà Nẵng",
        lat: "16.0599734",
        lng: "108.213527",
      },
      {
        address: "Số 546, Đường Trường Sa, Phường 2, Phú Nhuận, Hồ Chí Minh",
        lat: "10.795176",
        lng: "106.6875908",
      },
      {
        address: "Số 22, Đường Lê Lợi, Phường Nguyễn Trãi, Hà Đông, Hà Nội",
        lat: "20.9685883",
        lng: "105.7798444",
      },
      {
        address: "Đường Nguyễn Văn Linh, Phường Vĩnh Trung, Thanh Khê, Đà Nẵng",
        lat: "21.0289486097874",
        lng: "105.852447225903",
      },
      {
        address: "Phố Trần Đại Nghĩa, Phường Đồng Tâm, Hai Bà Trưng, Hà Nội",
        lat: "20.9974532",
        lng: "105.8460161",
      },
      {
        address: "Đường Nguyễn Duy Trinh, Phường Phú Hữu, Quận 9, Hồ Chí Minh",
        lat: "10.7969462",
        lng: "106.807901",
      },
      {
        address:
          "80/37, Đường Huỳnh Văn Nghệ, Phường 15, Tân Bình, Hồ Chí Minh",
        lat: "10.8300102",
        lng: "106.6380643",
      },
      {
        address:
          "Số 185.13, Đường Minh Khai, Phường Minh Khai, Hai Bà Trưng, Hà Nội",
        lat: "20.9950928",
        lng: "105.8567517",
      },
      {
        address: "Đường Dương Bá Trạc, Phường 1, Quận 8, Hồ Chí Minh",
        lat: "10.7454408",
        lng: "106.6900445",
      },
      {
        address:
          "488/19 Đường Lê Trọng Tấn, Phường Tây Thạnh, Tân Phú, Hồ Chí Minh",
        lat: "10.8072199",
        lng: "106.6235862",
      },
      {
        address:
          "540/9, Đường Cách Mạng Tháng Tám, Phường 11, Quận 3, Hồ Chí Minh",
        lat: "10.7862481861393",
        lng: "106.667408257464",
      },
      {
        address:
          "Ngõ 5/10/2, Đường Tân Nhuệ, Phường Thụy Phương, Bắc Từ Liêm, Hà Nội",
        lat: "21.086337",
        lng: "105.7714386",
      },
      {
        address: "Phường Tân Phong, Quận 7, Hồ Chí Minh",
        lat: "10.7279218352628",
        lng: "106.704350568711",
      },
      {
        address: "Số 15, Phố Bà Triệu, Phường Tràng Tiền, Hoàn Kiếm, Hà Nội",
        lat: "21.0256842",
        lng: "105.8513779",
      },
      {
        address:
          "159C, Đường Đề Thám, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh",
        lat: "10.7649298",
        lng: "106.6949099",
      },
      {
        address: "7A/19/19, Đường Thành Thái, Phường 12, Quận 10, Hồ Chí Minh",
        lat: "10.7721356",
        lng: "106.6652904",
      },
      {
        address: "Đường Lạc Long Quân, Phường Xuân La, Tây Hồ, Hà Nội",
        lat: "21.0610134",
        lng: "105.809127",
      },
      {
        address: "Đường Hồng Hà, Phường Chương Dương Độ, Hoàn Kiếm, Hà Nội",
        lat: "21.0264247",
        lng: "105.8594974",
      },
      {
        address: "Ngõ 87, Đường Phú Đô, Phường Phú Đô, Nam Từ Liêm, Hà Nội",
        lat: "21.0136368",
        lng: "105.7687504",
      },
      {
        address:
          "71/23, Đường Võ Văn Hát, Phường Long Trường, Quận 9, Hồ Chí Minh",
        lat: "10.8158845",
        lng: "106.8075043",
      },
      {
        address: "66/13, Đường Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh",
        lat: "10.8282956845876",
        lng: "106.706696667667",
      },
      {
        address: "Đường Phạm Văn Chiêu, Phường 14, Gò Vấp, Hồ Chí Minh",
        lat: "10.8482095",
        lng: "106.6480933",
      },
      {
        address: "171, Đường Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh",
        lat: "10.8305916",
        lng: "106.705546",
      },
      {
        address: "61 Nguyễn Minh Hoàng, Phường 12, Tân Bình, Hồ Chí Minh",
        lat: "10.8000919",
        lng: "106.6503639",
      },
      {
        address: "Dự án The Global City, Phường An Phú, Quận 2, Hồ Chí Minh",
        lat: "10.801913261413574",
        lng: "106.7647476196289",
      },
      {
        address:
          "Dự án CityLand Park Hills, Đường Phan Văn Trị, Phường 10, Gò Vấp, Hồ Chí Minh",
        lat: "10.8344240188599",
        lng: "106.668067932129",
      },
      {
        address: "Đường Cửu Việt, Thị trấn Trâu Quỳ, Gia Lâm, Hà Nội",
        lat: "21.0086329",
        lng: "105.9369413",
      },
      {
        address:
          "Dự án The Manor Central Park, Đường Nguyễn Xiển, Phường Đại Kim, Hoàng Mai, Hà Nội",
        lat: "20.975292205810547",
        lng: "105.81436920166016",
      },
      {
        address:
          "Dự án Masteri West Heights, Phường Tây Mỗ, Nam Từ Liêm, Hà Nội.",
        lat: "21.006206512451172",
        lng: "105.73707580566406",
      },
      {
        address:
          "Dự án Him Lam Thường Tín, Đường Trần Phú, Thị trấn Thường Tín, Thường Tín, Hà Nội",
        lat: "20.871570587158203",
        lng: "105.86279296875",
      },
      {
        address:
          "Dự án Vision Bình Tân, Trần Đại Nghĩa, Quận Bình Tân, Hồ Chí Minh",
        lat: "10.727779",
        lng: "106.59661",
      },
      {
        address:
          "Dự án Mega Grand World Hà Nội , Xã Nghĩa Trụ, Văn Giang, Hưng Yên",
        lat: "20.951213836669922",
        lng: "105.98468017578125",
      },
      {
        address:
          "Dự án Lakeview City, Đường Song Hành, Phường An Phú, Quận 2, Hồ Chí Minh",
        lat: "10.795413970947266",
        lng: "106.7757568359375",
      },
      {
        address:
          "Dự án Vinhomes Smart City , Đường 70, Phường Tây Mỗ, Nam Từ Liêm, Hà Nội",
        lat: "21.008852005004883",
        lng: "105.7439193725586",
      },
      {
        address: "Dự án The Seasons Lái Thiêu, Thành phố Thuận An, Bình Dương",
        lat: "10.904865",
        lng: "106.69996",
      },
      {
        address:
          "Dự án Vinhomes Ocean Park Gia Lâm, Xã Dương Xá, Gia Lâm, Hà Nội",
        lat: "21.00241470336914",
        lng: "105.964111328125",
      },
      {
        address:
          "Dự án Vinhomes Ocean Park Gia Lâm, Xã Dương Xá, Gia Lâm, Hà Nội",
        lat: "21.0024147033691",
        lng: "105.964111328125",
      },
      {
        address:
          "Dự án KĐT Vạn Phúc City, Đường Quốc Lộ 13, Phường Hiệp Bình Phước, Thủ Đức, Hồ Chí Minh",
        lat: "10.844880104064941",
        lng: "106.71820068359375",
      },
      {
        address:
          "Đại lộ Celadon Boulevard, Đường N1, P. Sơn Kỳ, Q. Tân Phú, TP. HCM",
        lat: "10.8039054870605",
        lng: "106.616683959961",
      },
      {
        address:
          "Dự án The Sun Avenue, Đường 51, Phường An Phú, Quận 2, Hồ Chí Minh",
        lat: "10.788448333740234",
        lng: "106.75196838378906",
      },
      {
        address:
          "Dự án Vinhomes Grand Park, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh",
        lat: "10.841423034667969",
        lng: "106.84011840820312",
      },
      {
        address:
          "Dự án Mega Grand World Hà Nội , Xã Nghĩa Trụ, Văn Giang, Hưng Yên",
        lat: "20.951213836669922",
        lng: "105.98468017578125",
      },
      {
        address:
          "Dự án Mega Grand World Hà Nội , Xã Nghĩa Trụ, Văn Giang, Hưng Yên",
        lat: "20.951213836669922",
        lng: "105.98468017578125",
      },
      {
        address:
          "Dự án Mega Grand World Hà Nội , Xã Nghĩa Trụ, Văn Giang, Hưng Yên",
        lat: "20.951213836669922",
        lng: "105.98468017578125",
      },
      {
        address:
          "Số 68, Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, Hồ Chí Minh",
        lat: "10.7740011",
        lng: "106.7034575",
      },
      {
        address: "Số 2, Phố Thi Sách, Phường Bến Nghé, Quận 1, Hồ Chí Minh",
        lat: "10.777699",
        lng: "106.7052537",
      },
      {
        address: "Đường Đức Diễn, Phường Phúc Diễn, Bắc Từ Liêm, Hà Nội",
        lat: "21.0506718",
        lng: "105.7541526",
      },
      {
        address:
          "Số 243 - 245, Đường Cộng Hòa, Phường 13, Tân Bình, Hồ Chí Minh",
        lat: "10.8024377",
        lng: "106.6416742",
      },
      {
        address: "215 - 217, Phố Giảng Võ, Phường Cát Linh, Đống Đa, Hà Nội",
        lat: "21.0260252",
        lng: "105.823394",
      },
      {
        address: "90/2 Đường Yên Thế, Phường 2, Tân Bình, Hồ Chí Minh",
        lat: "10.8124934",
        lng: "106.6683798",
      },
      {
        address:
          "167 - 169, Đường Điện Biên Phủ, Phường Đa Kao, Quận 1, Hồ Chí Minh",
        lat: "10.7889925",
        lng: "106.6962119",
      },
      {
        address:
          "85, Đường Cách Mạng Tháng Tám, Phường Bến Thành, Quận 1, Hồ Chí Minh",
        lat: "10.7733784",
        lng: "106.6898528",
      },
      {
        address: "Phố Phương Liệt, Phường Phương Liệt, Thanh Xuân, Hà Nội",
        lat: "20.9977508995219",
        lng: "105.839286458969",
      },
      {
        address:
          "80 Đường Lê Thị Trung, Phường Phú Lợi, Thủ Dầu Một, Bình Dương",
        lat: "10.9862586",
        lng: "106.6737822",
      },
      {
        address: "Đường Lạc Long Quân, Phường Bưởi, Tây Hồ, Hà Nội",
        lat: "21.0556973",
        lng: "105.8088033",
      },
      {
        address: "Đường Nguyễn Thái Học, Thị trấn Phùng, Đan Phượng, Hà Nội",
        lat: "21.0887801",
        lng: "105.6564538",
      },
      {
        address:
          "Mỹ Đình Plaza, 138, Phố Trần Bình, Phường Mỹ Đình 2, Nam Từ Liêm, Hà Nội",
        lat: "21.0308399200439",
        lng: "105.77579498291",
      },
      {
        address: "752 Đường Quang Trung, Phường 8, Gò Vấp, Hồ Chí Minh",
        lat: "10.8388835",
        lng: "106.6488544",
      },
      {
        address: "Đường Điện Biên Phủ, Phường 1, Bình Thạnh, Hồ Chí Minh",
        lat: "10.7961184",
        lng: "106.7033711",
      },
      {
        address: "270, Đường Cộng Hòa, Phường 13, Tân Bình, Hồ Chí Minh",
        lat: "10.8024377",
        lng: "106.6416742",
      },
      {
        address: "11/1, Phố Trần Quý Kiên, Phường Dịch Vọng, Cầu Giấy, Hà Nội",
        lat: "21.0375451",
        lng: "105.7919566",
      },
      {
        address:
          "Làng Quốc tế Thăng Long, 72, Đường Trần Đăng Ninh, Phường Dịch Vọng, Cầu Giấy, Hà Nội",
        lat: "21.0402507781982",
        lng: "105.791084289551",
      },
      {
        address:
          "Việt Á Tower, số 09, Đường Duy Tân, Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
        lat: "21.0303535461426",
        lng: "105.785026550293",
      },
      {
        address: "Số 1, Đường 81, Phường Tân Quy, Quận 7, Hồ Chí Minh",
        lat: "10.7401593",
        lng: "106.7061558",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Addresses", null, {});
  },
};
