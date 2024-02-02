import RequestLine from "./RequestLine";

const RequestList = ({requests, setSelectedRequest}) => {

  return (
    <ul>
      {requests.map( req => {
        return <RequestLine key={req.id} request={req} setSelectedRequest={setSelectedRequest}/>
      })}
    </ul>
  )
}

export default RequestList