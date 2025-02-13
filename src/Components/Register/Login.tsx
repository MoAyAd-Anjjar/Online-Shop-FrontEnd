
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa6'
import { CgPassword } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'
import { useState } from "react"

const Login = ({ User }: { User: (user: any) => void }) => {
    const [username, setUserName] = useState()
    const [userpassward, setUserPassword] = useState()
    const [useremail, setUserEmail] = useState()


    let navigate = useNavigate();

    const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = localStorage.getItem('UserInfo');
        if (user) {
            try {
                const Parseuser = [JSON.parse(user)];
               
                const isExist = Parseuser.some((p: { email: string; password: string; username: string }) => { 
                    return  (p.email===useremail&&
                    p.password===userpassward&&
                    p.username===username)
                }
                );
              
                
                if (isExist) {
                    User(Parseuser)
                    navigate('/Home', { replace: false });
                    return;
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        alert('Invalid credentials');
    };
    return (
        <div className='Register-Container'>
            <form className='Form-Flex' onSubmit={HandleSubmit}>
                <h1>Sign in</h1>
                <span><div className='Icon_login'><FaUser size={"20"} color='rgb(53, 53, 53)'></FaUser>
                </div><input onChange={(e: any) => setUserName(e.target.value)} type="text" placeholder="Username" />
                </span>
                <span>
                    <div className='Icon_login'><CgPassword size={"20"} color='rgb(53, 53, 53)'>
                    </CgPassword></div><input onChange={(e: any) => setUserPassword(e.target.value)} type="password" placeholder="Password" /></span>
                <span>
                    <div className='Icon_login'><MdEmail size={"20"} color='rgb(53, 53, 53)'></MdEmail></div>
                    <input onChange={(e: any) => setUserEmail(e.target.value)} type="email" placeholder="Email" /></span>
                <button type="submit">Login</button>
                <div>
                    <Link to={"/"}>
                        Forget Password?
                    </Link>
                    <Link to={"/Sign_up"}>
                        <br></br>
                        Don't have an account?Create New Account
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default Login
