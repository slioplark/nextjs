"use client";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function ApiDemoButton() {
  return (
    <Button
      component={Link}
      href="/api-demo"
      variant="contained"
      endIcon={<ArrowForwardRoundedIcon />}
      sx={{ mt: 3 }}
    >
      查看 API 範例
    </Button>
  );
}
