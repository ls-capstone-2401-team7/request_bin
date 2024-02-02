import { useNavigate } from 'react-router-dom'
import helpers from "../services"

const Home = () => {
  const navigate = useNavigate()

  const newBinHandler = async () => {
    const binPath = await helpers.createBin();
    navigate(`/display/${binPath}`);
  }
  
  return (
    <>
      <h1>Request Bin</h1>
      <div className='home-page'>

        <button className='copy_style' onClick={newBinHandler}>
          Create a bin
        </button>
      </div>
    </>
  )
}

export default Home