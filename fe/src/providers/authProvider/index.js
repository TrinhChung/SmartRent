import { createContext, useEffect, useState, useCallback } from "react";
import { loginMe } from "../../services/Auth";
import { getEstateByRecommendService } from "../../services/RealEstate/index";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setUpdateAuthUser] = useState(null);
  const [listSuggest, setListSuggest] = useState([]);

  const fetchRealEstateRecommend = async () => {
    try {
      const res = await getEstateByRecommendService();
      if (res.status === 200) {
        setListSuggest(
          res.data.map((realEstate) => {
            return {
              name: realEstate.name,
              address: realEstate.Address.address,
              image: realEstate?.realEstateFiles[0]?.url,
              cost: realEstate?.cost,
              acreage: realEstate?.acreage,
              url: `/full-house-view/${realEstate.id}`,
              date: realEstate?.createdAt,
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerLogin = async () => {
    try {
      const res = await loginMe();
      if (res.status === 200) {
        setAuthUser(res.data);
        localStorage.setItem("authUser", JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setAuthUser = async (user) => {
    setUpdateAuthUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userLocal = JSON.parse(localStorage.getItem("authUser"));
    if (userLocal) {
      setAuthUser(userLocal);
    }

    if (!userLocal && token) {
      console.log("Fetch info user");
      handlerLogin();
    }
  }, []);

  useEffect(() => {
    fetchRealEstateRecommend();
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        listSuggest,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
