import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { Formik, Form, Field } from "formik";
import useAuth from "../contexts/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  accountName: "",
  password: "",
};

export default function Login() {
  const classes = useStyles();

  const { login } = useAuth();

  const handleSubmit = async (values) => {
    try {
      await login(values.accountName, values.password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {() => {
            return (
              <Form>
                <Field
                  name="accountName"
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  autoFocus
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
}
