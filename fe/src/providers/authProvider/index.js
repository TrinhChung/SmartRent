import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { loginMe } from "../../services/Auth";
import { updateWalletService } from "../../services/User/index";
import { getReAbiService } from "../../services/SC";
import { ethers } from "ethers";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setUpdateAuthUser] = useState(null);
  const [reAbi, setReAbi] = useState("");
  const [signer, setSigner] = useState(null);
  const provider = useMemo(() => {
    if (window?.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    } else {
      return null;
    }
  }, [window?.ethereum]);

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
    if (user) {
      connectAccountSc(user);
    }
  };

  const fetchReAbi = async () => {
    try {
      const res = await getReAbiService();
      if (res.status === 200) {
        setReAbi(res.data);
      }
    } catch (error) {
      console.log(error);
    }
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
    fetchReAbi();
  }, []);

  const fetchUpdateWallet = async (address) => {
    try {
      const res = await updateWalletService({ wallet: address });
      if (res.status === 200) {
        const user = { ...authUser, wallet: address };
        setAuthUser(user);
        localStorage.setItem("authUser", JSON.stringify(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectAccountSc = useCallback(
    async (user) => {
      if (window?.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const s = await provider.getSigner();
          setSigner(s);
          const address = accounts?.length > 0 ? accounts[0] : null;
          if (String(user.wallet) !== String(address)) {
            fetchUpdateWallet(address);
            // TODO xử lý chưa đúng chưa set lại storage
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Hãy cài đặt Meta Mask extension để sử dụng dịch vụ");
      }
    },
    [window.ethereum]
  );

  return (
    <AuthContext.Provider
      value={{
        authUser,
        reAbi,
        signer,
        provider,
        setAuthUser,
        connectAccountSc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
