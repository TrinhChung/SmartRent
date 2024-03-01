import { useContext, useEffect, useState } from 'react';
import { BellTwoTone } from '@ant-design/icons';
import { Dropdown, Row, Col, Layout} from 'antd';
import "./Notify.scss"
import { useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/authProvider';
import { SocketContext } from "../../providers/socketProvider";
import {
  getNotifyOfUserService,
  handleCreatNotify,
  handleChangeReadState
} from "../../services/Notify"

const { Content } = Layout

export default function NotifyDropDown() {
  const navigate = useNavigate()
  const [notifyList,setNotify] = useState([]);
  const { authUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { pathname } = useLocation();

  useEffect(() => {
    fetchNotifyOfUser();

    socket.on("notification", async (data) => {
      const isRoomChatWithId = `/room-chat/${data.roomChatId}`
      if (isRoomChatWithId !== pathname) {
        var newNotify = {userId: authUser.id, fkId: Number(data.roomChatId), content: `New message from ${data.userId}`, type: "1"};
        await handleCreatNotify(newNotify);
      }
    });

    socket.on("change-read-state", async (notify) => {
      await handleChangeReadState(notify);
    })
    return () => {      
      socket.off("notification");
      socket.off("change-read-state");
    }
  }, [authUser,socket]);

  const fetchNotifyOfUser = async () => {
    try {
      const res = await getNotifyOfUserService(authUser.id);
      if (res.status === 200) {

        setNotify(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const switchToLink = async (notify) => {
    var linkNotify;
    if (notify.type === '1') {
      linkNotify = `/room-chat/${notify.fkId}`
    }
    if(pathname !== linkNotify) {
      navigate(`/room-chat/${notify.fkId}`);
      socket.emit("change-read-state",notify);
    }
  }

  const NotifyPlace = () => {
    return (
    <Col className='notify-header'>
      <Row className='notify-box'>
        <Col span={24}>
        <div style={{ height: '200px', overflowY: 'scroll' }}>
            {notifyList.map((notify,index) => {
             return (
              <Row className="notify-list"  onClick={() =>{switchToLink(notify)}}>
                <Col span={24}>
                  <Row style={{ fontWeight: notify.isRead ? 'normal' : 'bolder' }}>{notify.content}</Row>
                </Col>
              </Row>
             )
            })}
        </div>
        </Col>
      </Row>
    </Col>
  )}

  
  return ( 
  <Dropdown className='notify'
    dropdownRender={NotifyPlace}
    placement="bottomRight" arrow
    trigger={['click']}
  >
      <BellTwoTone
        style={{ fontSize: "20px" }}
        className="color-icon"
      />
  </Dropdown>);
};