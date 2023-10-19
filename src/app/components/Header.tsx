"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";


const pages = ["Lorem İpsum", "Lorem İpsum", "Lorem İpsum"];
const settings = ["Profil", "İlanlarım", "Hesap Ayarları", "Çıkış"];



function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  
  const pathname = usePathname();



  const appBarStyle = {
    background: '#ffffff',
    marginBottom: pathname === '/' ? 0 : '50px',
    
  };
  
  return (
    <AppBar position="static" sx={appBarStyle}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
         <Link href={"/"}>
            <Image src="/image/new-logo.png" width={170} height={45} alt="single logo"/>
          </Link>
          

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#000000",
                    display: "block",
                    fontWeight: "600",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  {page}
                </Button>
              </>
            ))}
          </Box>
{/* Icons is here */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}
          >
            <Box>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="default"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon htmlColor="default" />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="default"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon htmlColor="default" />
                </Badge>
              </IconButton>
            </Box>

            <Tooltip title="Open settings" >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Mehmet Akcan"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
                <Typography  sx={{  color: "#000000", paddingLeft: "10px" , flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  Hoşgeldiniz,{" "}
                  <span style={{ fontWeight: "600" }}>Mehmet Akcan</span>
                </Typography>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                  sx={{ px: 5 }}
                >
                  <Typography textAlign="center" fontWeight={600}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Burger menu is here */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Box style={{ backgroundColor: "#f07818" }}>
        <br></br>
      </Box>
    </AppBar>
  );
}
export default Header;
