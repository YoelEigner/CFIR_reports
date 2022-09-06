import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch
    console.log("Fe")
    dispatch({ type: "RESET" })
    navigate('/login')  
}
export default Logout