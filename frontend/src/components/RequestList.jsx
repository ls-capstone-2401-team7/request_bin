import RequestLine from "./RequestLine";

const RequestList = ({requests, setSelectedRequest}) => {

  return (
    <ul className="request-list">
      {requests.map( req => {
        return <RequestLine key={req.id} request={req} setSelectedRequest={setSelectedRequest}/>
      })}
    </ul>
  )
}

export default RequestList