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
          variant="overline"
          color="text.secondary"
          sx={{ px: 1.5, letterSpacing: 1.2 }}
        >
          WORKSPACE
        </Typography>
        <List sx={{ mt: 1 }}>
          {navItems.map(({ label, href, icon: Icon }) => {
            const selected = pathname === href;
            return (
              <ListItemButton
                key={href}
                component={Link}
                href={href}
                selected={selected}
                onClick={() => setMobileOpen(false)}
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
        <Typography variant="caption" color="text.secondary">
          Next.js · MUI · SWR
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          display: { md: "none" },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            aria-label="開啟導覽選單"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography fontWeight={800}>Starter Console</Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="主導覽"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          px: { xs: 2, sm: 3, lg: 5 },
          py: { xs: 10, md: 5 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
