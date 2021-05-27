import React from "react";
import classNames from "classnames";
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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";
import People from "@material-ui/icons/People";
import Check from "@material-ui/icons/Check";

import modalStyle from "../../../src/assets/jss/material-kit-react/modalStyle.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";

const useModalStyles = makeStyles(modalStyle);
const useRegistrationStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function RegistrationModal() {
  const [modal, setModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const registrationClasses = useRegistrationStyles();

  const [checked, setChecked] = React.useState([24, 22]);
  const wrapperDiv = classNames(
    modalClasses.checkboxAndRadio,
    modalClasses.checkboxAndRadioHorizontal
  );
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  return (
    <div>
      <div>
        <Button color="rose" round onClick={() => setModal(true)}>
          Registration
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
            <form className={registrationClasses.form}>
              <div className={registrationClasses.cardHeader}>
                <h4 style={{ padding: "50px 0px 0px 0px" }}>Registration</h4>
              </div>
              <p className={registrationClasses.divider}>
                src\components\Registration\RegistrationModal.js
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
                        <People
                          className={registrationClasses.inputIconsColor}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email
                          className={registrationClasses.inputIconsColor}
                        />
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
                        <Icon className={registrationClasses.inputIconsColor}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off",
                  }}
                />
                <CustomInput
                  labelText="Confirm Password"
                  id="pass"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={registrationClasses.inputIconsColor}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off",
                  }}
                />
                <div className={wrapperDiv}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => handleToggle(22)}
                        checked={checked.indexOf(22) !== -1 ? false : true}
                        checkedIcon={
                          <Check className={registrationClasses.checkedIcon} />
                        }
                        icon={
                          <Check
                            className={registrationClasses.uncheckedIcon}
                          />
                        }
                        registrationClasses={{
                          checked: registrationClasses.checked,
                        }}
                      />
                    }
                    registrationClasses={{ label: registrationClasses.label }}
                    label="I am 18 or older"
                  />
                </div>
              </CardBody>
              <CardFooter className={registrationClasses.cardFooter}>
                <Button simple color="primary" size="lg">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
