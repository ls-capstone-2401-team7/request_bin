const EndpointHeader = ({ binPath }) => {
  console.log(window.location.hostname)

  const endpoint = `https://www.alex-bair.com/api/endpoints/${binPath}`;

  const copyHandler = () => {
    navigator.clipboard.writeText(endpoint)
  }

  return (
    <div>
      <p>Endpoint: { endpoint }</p>
      <button onClick={copyHandler}>Copy </button>
    </div>
  )
}

export default EndpointHeader