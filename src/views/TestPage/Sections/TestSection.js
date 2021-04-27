import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function TestSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Test bed</h2>
        </div>
        {/* This is where we will add components  */}
        <Button
          color="default"
          href="https://demos.creative-tim.com/material-kit-react/#/documentation/tutorial"
          target="_blank"
        >
          Materialize Documentation
        </Button>
        <Card style={{ width: "20rem" }}>
          <CardBody>
            <h4 className={classes.cardTitle}>Card Title</h4>
            <h6 className={classes.cardSubtitle}>Card Subtitle</h6>
            <p>
              None to self: ask back-end how to stick one of those graphs in
              here...
            </p>
            <a
              href="#pablo"
              className={classes.cardLink}
              onClick={(e) => e.preventDefault()}
            >
              Card link
            </a>
            <a
              href="#pablo"
              className={classes.cardLink}
              onClick={(e) => e.preventDefault()}
            >
              Another link
            </a>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
