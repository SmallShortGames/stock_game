import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Icon from "@material-ui/core/Icon";
import People from "@material-ui/icons/People";
import Close from "@material-ui/icons/Close";

import modalStyle from "../../../src/assets/jss/material-kit-react/modalStyle.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";

const useModalStyles = makeStyles(modalStyle);
const useLoginStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function LoginModal() {
  const [modal, setModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const loginClasses = useLoginStyles();
  return (
    <div>
      <div>
        <Button color="rose" round onClick={() => setModal(true)}>
          Login
        </Button>
      </div>
      <React.Fragment>
        <Dialog
          classes={{
            root: modalClasses.center,
            paper: modalClasses.modal,
          }}
          open={modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setModal(false)}
        >
          <Card style={{ margin: "0" }}>
            <form className={loginClasses.form}>
              <div className={loginClasses.cardHeader}>
                <h4 style={{ padding: "50px 0px 0px 0px" }}>Login</h4>
              </div>
              <p className={loginClasses.divider}>
                src\components\Login\LoginModal.js
              </p>
              <CardBody>
                <CustomInput
                  labelText="Username..."
                  id="username"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={loginClasses.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="pass"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={loginClasses.inputIconsColor}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off",
                  }}
                />
              </CardBody>
              <CardFooter className={loginClasses.cardFooter}>
                <Button simple color="primary" size="lg">
                  Forgot Username
                </Button>
                <Button simple color="primary" size="lg">
                  Forgot Password
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
