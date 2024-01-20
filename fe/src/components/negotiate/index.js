import "./HouseData"

const houses = [
    {name: 'Cozy Cottage',address: '123 Main Street',image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/314234927.jpg?k=21291418450e2c1802e02864677b7cf811321797b1d36aaa55e1019133f82698&o=&hp=1',},
    {name: 'Cozy Cottage',address: '456 Oak St',image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/314234927.jpg?k=21291418450e2c1802e02864677b7cf811321797b1d36aaa55e1019133f82698&o=&hp=1',},
    {name: 'Cozy Cottage',address: '789 Texas',image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/314234927.jpg?k=21291418450e2c1802e02864677b7cf811321797b1d36aaa55e1019133f82698&o=&hp=1',},
    {name: 'Cozy Cottage',address: '123 Main Street',image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/314234927.jpg?k=21291418450e2c1802e02864677b7cf811321797b1d36aaa55e1019133f82698&o=&hp=1',},
    {name: 'Cozy Cottage',address: '456 Oak St',image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/314234927.jpg?k=21291418450e2c1802e02864677b7cf811321797b1d36aaa55e1019133f82698&o=&hp=1',},
    {name: 'Cozy Cottage',address: '789 Texas',image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/314234927.jpg?k=21291418450e2c1802e02864677b7cf811321797b1d36aaa55e1019133f82698&o=&hp=1',},
];

const Negotiate = () => {
    return (
    <div>
      {houses.map((house, index) => (
        <HouseInfor key={index} house={house} />
      ))}
    </div>
    );
}
export default Negotiate;