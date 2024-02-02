import { useNavigate } from 'react-router-dom'
import helpers from "../services"

const Home = () => {
  const navigate = useNavigate()

  const newBinHandler = async () => {
    const binPath = await helpers.createBin();
    navigate(`/display/${binPath}`);
  }
  
  return (
    <button onClick={newBinHandler}>
      Create a bin
    </button>
  )
}

export default Home