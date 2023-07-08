import { Button } from "reactstrap";
import {BiPowerOff} from "react-icons/bi"
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = () =>{
        localStorage.clear();
        navigate("/login");
    }
    return ( 
        <Button onClick={handleClick} className="logout">
            <BiPowerOff/>
        </Button>
     );
}
 
export default Logout;