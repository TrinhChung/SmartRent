import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from "react";
import {
  getScAddressService,
  getReAbiService,
  getScAbiService,
} from "../../services/SC";
import { ethers } from "ethers";
import { updateWalletService } from "../../services/User/index";
import { getReAddressService } from "../../services/SC/index";

export const SmartContractContext = createContext();

export const SmartContractProvider = ({ children }) => {
  const [scAddress, setScAddress] = useState("");
  const [reAddress, setReAddress] = useState("");
  const [reAbi, setReAbi] = useState("");
  const [scAbi, setScAbi] = useState("");
  const [signer, setSigner] = useState(null);
  const [scInstance, setScInstance] = useState(null);
  const [reInstance, setReInstance] = useState(null);

  const fetchReAddressService = async () => {
    try {
      const res = await getReAddressService();
      if (res.status === 200) {
        setReAddress(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const provider = useMemo(() => {
    if (window?.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    } else {
      return null;
    }
  }, [window?.ethereum]);

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

  const fetchScAbi = async () => {
    try {
      const res = await getScAbiService();
      if (res.status === 200) {
        setScAbi(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchScAddressService = async () => {
    try {
      const res = await getScAddressService();
      if (res.status === 200) {
        setScAddress(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectAccountSc = useCallback(
    async (user, loginMe = () => {}) => {
      if (window?.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const s = await provider.getSigner();
          setSigner(s);
          const address = accounts?.length > 0 ? accounts[0] : null;
          if (user?.wallet && String(user.wallet) !== String(address)) {
            fetchUpdateWallet(address, loginMe);
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

  const fetchUpdateWallet = async (address, loginMe = () => {}) => {
    try {
      const res = await updateWalletService({ wallet: address });
      if (res.status === 200) {
        loginMe();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectAccountSc();
    fetchReAbi();
    fetchScAbi();
    fetchScAddressService();
    fetchReAddressService();
  }, []);

  useEffect(() => {
    if (signer && reAbi && reAddress) {
      const instance = new ethers.Contract(reAddress, reAbi, signer);
      setReInstance(instance);
    } else {
      setReInstance(null);
    }
  }, [reAddress, reAbi, signer]);

  useEffect(() => {
    if (signer && scAbi && scAddress) {
      const instance = new ethers.Contract(scAddress, scAbi, signer);
      setScInstance(instance);
    } else {
      setScInstance(null);
    }
  }, [scAddress, scAbi, signer]);

  return (
    <SmartContractContext.Provider
      value={{
        scAddress,
        reAbi,
        signer,
        provider,
        reAddress,
        reInstance,
        scInstance,
        connectAccountSc,
      }}
    >
      {children}
    </SmartContractContext.Provider>
  );
};
