
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: "center",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography
            style={{ textDecoration: "none" }}
            to="/"
            color="white"
            variant="h6"
            component={Link}
            sx={{ flexGrow: 1 }}
          >
            Entry Point
          </Typography>

          <Typography
            component={Link}
            style={{ textDecoration: "none" }}
            color="white"
            marginLeft="40px"
            variant="h6"
            to="/exitpoint"
            sx={{ flexGrow: 1 }}
          >
            Exit Point
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
