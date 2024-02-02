import EndpointHeader from "./EndpointHeader";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import helpers from "../services";
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';

const Bin = () => {
  const { bin_path } = useParams();
  const [requestList, setRequestList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const requestDetails = async () => {
      const list = await helpers.getRequestList(
        bin_path
      );
      setRequestList(list);
    };
    requestDetails();
  }, []);

  return (
    <div>
      <EndpointHeader binPath={bin_path}/>
      <RequestList requests={requestList} setSelectedRequest={setSelectedRequest}/>
      {selectedRequest && <RequestDetails request={selectedRequest}/>}
    </div>
  );
};

export default Bin;
