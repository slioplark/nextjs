"use client";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function ApiDemoButton() {
  return (
    <Button
      sx={{ mt: 3 }}
      href="/api-demo"
      endIcon={<ArrowForwardRoundedIcon />}
      variant="contained"
      component={Link}
    >
      查看 API 範例
    </Button>
  );
}
