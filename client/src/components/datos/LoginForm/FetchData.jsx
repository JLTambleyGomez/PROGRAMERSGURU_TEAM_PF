import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FetchData({token}) {
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        nickName: "",
        image: "",
        email: "",
        password: "",
      });
      const fetchData = async (token) => {
        const response = await axios.get("http://localhost:3001/loginWithGoogle", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const { user_id, name, picture, email } = response.data.userData;
        setUserData({
          ...userData,
          id: user_id,
          name: name,
          nickName: name.split(" ")[0],
          image: picture,
          email: email,
          password: token,
        });
      };
      
    //   let token = sessionStorage.getItem("accessToken");
      useEffect(() => {
        if (token) {
          fetchData(token);
        }
      }, [token]);
      const navigate = useNavigate();
return (
    <>{navigate("/HomePage")}</>
)
}
export default FetchData;