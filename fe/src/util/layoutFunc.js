import HomeLayout from "../layouts/HomeLayout";

export const wrapLayout = ({ children, items, isFooter = true }) => {
  return (
    <HomeLayout menu={items} isFooter={isFooter}>
      {children}
    </HomeLayout>
  );
};
