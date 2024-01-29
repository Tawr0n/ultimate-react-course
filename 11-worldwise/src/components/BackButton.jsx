import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Button onClick={(e) => {
                e.preventDefault()
                navigate(-1)
            }} type='back'>&larr; Back</Button>
        </div>
    );
};

export default BackButton;
