"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useStyles: any = makeStyles(() => ({
  root: {
    color: "#000000",
    fontWeight: "500",
    
  },

  registerText: {
    color: "#f07818",
    fontWeight: "600",
  },

  loginTextTitle: {
    fontSize: "50px",
    fontWeight: "600",
  },

  subtitleText: {
    fontSize: "35px",
    fontWeight: "600",
  },

  titleBox: {
    padding: "12px",
  },

  createAccountText: {
    marginTop: "5%",
  },

  registerImage: {
    position: "relative",
    top: "30%",
    left: "-50%",
    marginBottom: "150px",
  },

  forgotPasswordText: {
    fontSize: "12px",
  },

  submitBtn: {
    color: "#ffffffff",
    backgroundColor: "#f07818",
    textTransform: "capitalize",
    borderRadius: "20px",
    width: "40%",
    padding: "12px 24px 12px 24px",
    "&:hover": {
      backgroundColor: "#e50012A0",
    },
  },

  labelInputStyle: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "15px",

      "&:focus": {
        color: "#0000",
        backgroundColor: "red",
      },
    },
    "&MuiInputBase-input": {
      backgroundColor: "red",
    },
  },

  labelStyle: {
    "& .MuiInputBase-input": {
      borderRadius: "15px",
    },
  },

  submitBtnBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    alignContent: "center",
  },

  formSideBox: {
    background: "#ffffffff",
    borderRadius: "20px",

    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },

  registerTitleText: {
    fontSize: "24px",
    fontWeight: "600",
  },

  errorInputMessage: {
    fontSize: "12px!important",
    color: "red",
  },
}));

type FormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required("E-Posta zorunlu").email("E-Posta geçersiz"),
  password: yup.string().required("Şifre zorunlu"),
});

export default function KayiOl() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // react Hook Form Validate
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <>
      <Grid container spacing={15} className={classes.root}>
        <Grid
          item
          xs={12}
          md={6}
          display={"flex"}
          alignItems="center"
          justifyContent="center"
          spacing={30}
        >
          <Box className={classes.titleBox}>
            <Typography className={classes.loginTextTitle}>
              Giriş Yapın
            </Typography>
            <Typography className={classes.subtitleText}>
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
            <Box className={classes.createAccountText}>
              <Typography>
                Henüz platform üzerinde bir hesabınız yok ise eğer,
                <br />
                <Link href="/kayit-ol" className={classes.registerText}>
                  buradan kayıt olabilirsiniz!
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid
            container
            spacing={2}
            rowSpacing={2}
            padding={5}
            onSubmit={handleSubmit(onSubmit)}
            className={classes.formSideBox}
          >
            <Grid item xs={12} md={12}>
              <Box
                alignContent={"center"}
                display={"flex"}
                justifyContent={"center"}
                marginBottom={"2%"}
              >
                <Typography className={classes.registerTitleText}>
                  Giriş Yap
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="mail">
                  E-Posta <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <OutlinedInput
                  style={{ borderRadius: "20px" }}
                  id="mail"
                  className={classes.labelInputStyle}
                  endAdornment={
                    <InputAdornment position="end">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  }
                  label="E-Posta *"
                  {...register("email")}
                />
                {errors.email && (
                  <FormHelperText>
                    <Typography className={classes.errorInputMessage}>
                      {errors.email.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="password">
                  Şifre <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <OutlinedInput
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  style={{ borderRadius: "20px" }}
                  className={classes.labelInputStyle}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Şifre *"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Box className={classes.submitBtnBox}>
                <Button
                  size="large"
                  variant="contained"
                  className={classes.submitBtn}
                  onClick={handleSubmit(onSubmit)}
                >
                  Giriş Yap
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
