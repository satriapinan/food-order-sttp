import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
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

  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  const toLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    console.log("Count has changed: ", count);
  }, [count]);

  return (
    <Typography>
      Ini Halaman Example - {value} -{searchParams.get("id")}
    </Typography>
  );
}

export default ExamplePages;
