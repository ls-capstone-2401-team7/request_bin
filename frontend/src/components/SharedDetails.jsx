import helpers from '../services'

const SharedDetails = ({request}) => {
  return (
    <>
    <p>{request.payload.method} {helpers.removeBinFromPath(request.payload.path)} {request.date.toJSON()}</p>
    </>
  )
}

export default SharedDetails