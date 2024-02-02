import HeadersAndQuery from './HeadersAndQuery';
import SharedDetails from './SharedDetails';


const RequestDetails = ({ request }) => {

  console.log(Object.entries(request.payload));


/*

Shared details component(Method Path Time)
Header component
QueryParams component (if exists)
Body component (if exists)

*/

  return (
    <div>
      <SharedDetails request={request}/>
      <HeadersAndQuery obj={request.payload.headers}/>
      {request.payload.query && <HeadersAndQuery obj={request.payload.query}/>}
      {request.payload.body && <pre>{JSON.stringify(request.payload.body)}</pre>}
    </div>
  );
};

export default RequestDetails;
