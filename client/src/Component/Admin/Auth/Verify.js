// react
import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NotifySuccess, NotifyError } from '../../redux/actions/notify';
import axios from "axios";

const Verify = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = React.useState('');
    console.log(params.id);
    console.log(params.token);

    const verify = () => {
        axios.get(`http://localhost:5000/user/${params.id}/verify/${params.token}`).then(res => {
            setMessage(res.data.message);
            NotifySuccess(res.data.message);
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }
        ).catch(err => {
            setMessage(err.response.data.message);
            NotifyError(err.response.data.message);
            setTimeout(() => {
                navigate('/auth');
            }, 2000);
        }
        )
    };

    return (
        <div style={{
            paddingTop: '66px',
            backgroundImage: 'url(/prabandhak.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100%',
        }} >
            <div style={{
                padding: '20px',
                margin: '20% auto',
                textAlign: 'center',
                width: '50%',
                color: 'white',
                letterSpacing: '5px',
                fontSize: '1rem',
                textTransform: 'uppercase',
            }}>
                <div>
                    <h1>{message ? message : 'Click to Verify'}</h1>
                    <button style={{
                        backgroundColor: 'rgb(20, 44, 75)',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        letterSpacing: '5px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }} onClick={verify}>Verify</button>
                </div>
            </div>
        </div>
    );
}
export default Verify;