import EndpointHeader from "./EndpointHeader";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import helpers from "../services";
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import { socket } from "../socket";

const Bin = () => {
  const { bin_path } = useParams();
  const [requestList, setRequestList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {

    const socketIosetRequestList = (request) => {
      setRequestList(previous => [...previous, request])
    }

    const requestDetails = async () => {
      const list = await helpers.getRequestList(
        bin_path
      );
      setRequestList(list);
    };
    requestDetails();

    socket.emit('binRomm', bin_path)
    socket.on('newRequest', socketIosetRequestList)

    return () => {
      socket.off('newRequest', socketIosetRequestList);
    };
  }, []);

  return (
    <div>
      <EndpointHeader binPath={bin_path}/>
      <div className="container">
        <RequestList requests={requestList} setSelectedRequest={setSelectedRequest}/>
        <div>
        {selectedRequest && <RequestDetails request={selectedRequest}/>}
        </div>
      </div>
    </div>
  );
};

export default Bin;
