"use client";

import type { SvgIconComponent } from "@mui/icons-material";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

const drawerWidth = 252;
const navItems: { label: string; href: string; icon: SvgIconComponent }[] = [
  { label: "總覽", href: "/", icon: DashboardOutlinedIcon },
  { label: "API 範例", href: "/api-demo", icon: ApiOutlinedIcon },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const drawer = (
    <Box sx={{ height: "100%", bgcolor: "background.paper" }}>
      <Toolbar sx={{ px: 3 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            bgcolor: "primary.main",
            mr: 1.5,
          }}
        />
        <Typography variant="subtitle1" fontWeight={800}>
          Starter Console
        </Typography>
      </Toolbar>
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography
          sx={{ px: 1.5, letterSpacing: 1.2 }}
          color="text.secondary"
          variant="overline"
        >
          WORKSPACE
        </Typography>
        <List sx={{ mt: 1 }}>
          {navItems.map(({ label, href, icon: Icon }) => {
            const selected = pathname === href;
            return (
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: selected ? "primary.main" : "text.secondary",
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { bgcolor: "primary.dark" },
                  },
                }}
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                selected={selected}
                component={Link}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: {
                      fontSize: 14,
                      fontWeight: selected ? 700 : 500,
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
      <Box sx={{ position: "absolute", bottom: 20, left: 24, right: 24 }}>
        <Typography color="text.secondary" variant="caption">
          Next.js · MUI · SWR
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        sx={{
          display: { md: "none" },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
        color="inherit"
        position="fixed"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            sx={{ mr: 1 }}
            edge="start"
            onClick={() => setMobileOpen(true)}
            aria-label="開啟導覽選單"
          >
            <MenuIcon />
          </IconButton>
          <Typography fontWeight={800}>Starter Console</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        component="nav"
        aria-label="主導覽"
      >
        <Drawer
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
        <Drawer
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
          open
          variant="permanent"
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          px: { xs: 2, sm: 3, lg: 5 },
          py: { xs: 10, md: 5 },
        }}
        component="main"
      >
        {children}
      </Box>
    </Box>
  );
}
