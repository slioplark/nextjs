"use client";

import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import styles from "./login.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <TextField
          name="email"
          type="email"
          label="電子郵件"
          focused
          required
          fullWidth
          autoComplete="username"
        />
        <TextField
          name="password"
          type={showPassword ? "text" : "password"}
          label="密碼"
          focused
          required
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                    onClick={() => setShowPassword((visible) => !visible)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          autoComplete="current-password"
        />
        <FormControlLabel
          label="保持登入"
          control={<Checkbox name="remember" />}
        />
        {notice && (
          <Alert role="status" severity="info">
            登入服務尚未連接。請先設定驗證 API。
          </Alert>
        )}
        <Button type="submit" variant="contained" fullWidth>
          登入工作台
        </Button>
      </Stack>
      <p className={styles.formFootnote}>
        登入即表示你同意依照組織的存取與安全規範使用工作台。
      </p>
    </form>
  );
}
