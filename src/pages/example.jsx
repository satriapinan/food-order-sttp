import Typography from "@mui/material/Typography";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";

function ExamplePages() {
  let { value } = useParams();
  let [searchParams] = useSearchParams();

  return (
    <Typography>
      Ini Halaman Example - {value} -{searchParams.get("id")}
    </Typography>
  );
}

export default ExamplePages;
