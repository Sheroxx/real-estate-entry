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
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Adınız zorunlu"),
  surname: yup.string().required("Soyad zorunlu"),
  phone: yup.string().required("Telefon numarası zorunlu"),
  email: yup.string().required("E-Posta zorunlu").email("E-Posta geçersiz"),
  password: yup
    .string()
    .required("Şifre zorunlu")
    .min(8, "En az 8 karakter içermelidir")
    .max(16, "En fazla 16 karakter içermelidir")
    .matches(/[a-z]/, "En az 1 küçük harf içermelidir")
    .matches(/[A-Z]/, "En az 1 büyük harf içermelidir")
    .matches(/[!@#$%^&*]/, "En az 1 özel karakter içermelidir"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "şifreler uyuşmuyor")
    .required("Şifre onayı zorunlu"),
  userType: yup
    .string()
    .required("Lütfen sahip olmak istediğiniz rolünüzü seçiniz"),
});

export default function KayiOl() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isMinLength, setIsMinLength] = React.useState(false);
  const [isMaxLength, setIsMaxLength] = React.useState(false);
  const [hasLowercase, setHasLowercase] = React.useState(false);
  const [hasUppercase, setHasUppercase] = React.useState(false);
  const [hasSpecialChar, setHasSpecialChar] = React.useState(false);
  const [passwordHave, setPasswordHave] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

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
    if (data.password !== data.confirmPassword) {
      alert("Şifreler uyuşmuyor. Lütfen kontrol edin.");
      return;
    }
    // Verileri işleme koyma
    console.log(data);
  };

  const handlePasswordChange = (event: any) => {
    const password = event.target.value;
    setIsMinLength(password.length >= 8);
    setIsMaxLength(password.length <= 16);
    setHasLowercase(/[a-z]/.test(password));
    setHasUppercase(/[A-Z]/.test(password));
    setHasSpecialChar(/[!@#$%^&*]/.test(password));
    setPasswordHave(password.length >= 1);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  // const handlePasswordBlur = () => {
  //   setPasswordFocused(false);
  // };

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
              Kayıt Olun
            </Typography>
            <Typography className={classes.subtitleText}>
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
            <Box className={classes.createAccountText}>
              <Typography>
                Platform üzerinde bir hesabınız var ise eğer,
                <br />
                <Link href="/giris" className={classes.registerText}>
                  buradan giriş yapabilirsiniz!
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
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
                  Kayıt Ol
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="name">
                  Adınız <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <OutlinedInput
                  {...register("name")}
                  style={{ borderRadius: "20px" }}
                  id="name"
                  className={classes.labelInputStyle}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  label="Adınız *"
                />
                {errors.name && (
                  <FormHelperText>
                    <Typography className={classes.errorInputMessage}>
                      {errors.name.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="surname">
                  Soyadınız <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <OutlinedInput
                  {...register("surname")}
                  style={{ borderRadius: "20px" }}
                  id="surname"
                  className={classes.labelInputStyle}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  label="Soyadınız *"
                />
                {errors.surname && (
                  <FormHelperText>
                    <Typography className={classes.errorInputMessage}>
                      {errors.surname.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="phone">
                  Telefon <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <OutlinedInput
                  {...register("phone")}
                  type="number"
                  style={{ borderRadius: "20px" }}
                  id="phone"
                  className={classes.labelInputStyle}
                  endAdornment={
                    <InputAdornment position="end">
                      <LocalPhoneIcon />
                    </InputAdornment>
                  }
                  label="Telefon *"
                />
                {errors.phone && (
                  <FormHelperText>
                    <Typography className={classes.errorInputMessage}>
                      {errors.phone.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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
                  onFocus={handlePasswordFocus}
                  // onBlur={handlePasswordBlur}
                  onChange={handlePasswordChange}
                />

                {errors.password && (
                  <FormHelperText>
                    <Typography className={classes.errorInputMessage}>
                      {errors.password.message}
                    </Typography>
                  </FormHelperText>
                )}
                {isMinLength &&
                isMaxLength &&
                hasLowercase &&
                hasUppercase &&
                hasSpecialChar ? (
                  <Typography
                    className={classes.errorInputMessage}
                    style={{ color: "green", marginTop: "10px" }}
                  >
                    ✔️ Şifre gereksinimleri karşılanıyor
                  </Typography>
                ) : null}
                {passwordFocused &&
                !isMinLength &&
                !isMaxLength &&
                !hasLowercase &&
                !hasUppercase &&
                !hasSpecialChar ? (
                  <Typography
                    className={classes.errorInputMessage}
                    style={{ color: "red", marginTop: "10px" }}
                  >
                    ⚠️ Şifre gereksinimleri karşılamıyor
                  </Typography>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="confirmPassword">
                  Şifre Onayla <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <OutlinedInput
                  {...register("confirmPassword", { required: true })}
                  id="confirmPassword"
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
                  label="Şifre Onayla *"
                />
                {errors.confirmPassword && (
                  <FormHelperText>
                    <Typography className={classes.errorInputMessage}>
                      {errors.confirmPassword.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="userType">
                  Sahip olmak istediğiniz rolü seçin
                </InputLabel>
                <Select
                  labelId="userType"
                  id="userType"
                  value={age}
                  {...register("userType", { required: true })}
                  label="Sahip olmak istediğiniz rolü seçin"
                  onChange={handleChange}
                  className={classes.labelInputStyle}
                >
                  <MenuItem value={"buyer"}>Alıcı</MenuItem>
                  <MenuItem value={"seller"}>Satıcı</MenuItem>
                </Select>
                {errors.userType && (
                  <FormHelperText>
                    <Typography className={classes.errorInputMessage}>
                      {errors.userType.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              {!isMinLength && passwordHave && (
                <Typography
                  className={classes.errorInputMessage}
                  style={{ color: "red" }}
                >
                  ⚠️ En az 8 karakter olmalıdır
                </Typography>
              )}
              {!isMaxLength && passwordHave && (
                <Typography
                  className={classes.errorInputMessage}
                  style={{ color: "red" }}
                >
                  ⚠️ En fazla 16 karakter olmalıdır
                </Typography>
              )}
              {!hasLowercase && passwordHave && (
                <Typography
                  className={classes.errorInputMessage}
                  style={{ color: "red" }}
                >
                  ⚠️ En az 1 küçük harf içermelidir
                </Typography>
              )}
              {!hasUppercase && passwordHave && (
                <Typography
                  className={classes.errorInputMessage}
                  style={{ color: "red" }}
                >
                  ⚠️ En az 1 büyük harf içermelidir
                </Typography>
              )}
              {!hasSpecialChar && passwordHave && (
                <Typography
                  className={classes.errorInputMessage}
                  style={{ color: "red" }}
                >
                  ⚠️ En az 1 özel karakter içermelidir
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <Box className={classes.submitBtnBox}>
                <Button
                  size="large"
                  variant="contained"
                  className={classes.submitBtn}
                  onClick={handleSubmit(onSubmit)}
                  disabled={
                    !isMinLength ||
                    !isMaxLength ||
                    !hasLowercase ||
                    !hasUppercase ||
                    !hasSpecialChar
                  }
                >
                  Kayıt Ol
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
