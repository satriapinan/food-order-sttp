import { Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";

function LoginPage() {
    let { value } = useParams();
    let [searchPrams] = useSearchParams();

    return (
    <Typography>
        Ini Halaman Login - {value} - {searchPrams.get("id")}
        </Typography>
    )
}


export default LoginPage; 