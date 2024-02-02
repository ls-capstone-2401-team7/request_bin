const EndpointHeader = ({ binPath }) => {
  console.log(window.location.hostname)

  const endpoint = `https://www.alex-bair.com/api/endpoints/${binPath}`;

  const copyHandler = () => {
    navigator.clipboard.writeText(endpoint)
  }

  return (
    <div className="endpoint-header">
      <button className="copy_style" onClick={copyHandler}>Copy </button>
      <span> Endpoint: { endpoint }</span>
    </div>
  )
}

export default EndpointHeader