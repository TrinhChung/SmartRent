import HouseData from"./HouseData"
import foto from "./foto.png" 

const houses = [
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
  {name: 'Cozy Cottage',address: '123 Main Street',image: foto,},
];

const Negotiate = () => {
    return (
    <div>
      <p style={{ fontSize:'30px', fontWeight: 'bold' }}>LIST OF NEGOTIATING ROOMS</p>
      {houses.map((house, index) => (
        <HouseData key={index} house={house} />
      ))}
    </div>
    );
}
export default Negotiate;