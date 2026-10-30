"use client";

import { api, getErrorMessage } from "@lib/api";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const endpoint = "/api/todos";
type Todo = {
  id: string | number;
  title?: string;
  name?: string;
  [key: string]: unknown;
};
type MutationArg = {
  method: "POST" | "PUT" | "DELETE";
  path: string;
  body?: unknown;
};

async function mutateTodo(_key: string, { arg }: { arg: MutationArg }) {
  if (arg.method === "POST") return api.post<Todo, unknown>(arg.path, arg.body);
  if (arg.method === "PUT") return api.put<Todo, unknown>(arg.path, arg.body);
  return api.delete<unknown>(arg.path);
}

function errorMessage(error: unknown) {
  if (error instanceof Error && error.message.includes("Failed to fetch")) {
    return "無法連線至 API，請確認 NEXT_PUBLIC_API_BASE_URL 與後端服務。";
  }
  return getErrorMessage(error);
}

export default function ApiDemoPage() {
  const [title, setTitle] = useState("New task");
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    endpoint,
    api.get<Todo[]>,
  );
  const {
    trigger,
    isMutating,
    error: mutationError,
  } = useSWRMutation(endpoint, mutateTodo);
  const [message, setMessage] = useState("");

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    try {
      await trigger({ method: "POST", path: endpoint, body: { title } });
      setMessage("POST 已完成，重新載入資料確認結果。");
      await mutate();
    } catch {
      // SWR exposes mutationError for the error panel below.
    }
  }

  async function handleUpdate(todo: Todo) {
    setMessage("");
    try {
      await trigger({
        method: "PUT",
        path: `${endpoint}/${todo.id}`,
        body: {
          ...todo,
          title: `${todo.title ?? todo.name ?? "Task"} (updated)`,
        },
      });
      setMessage(`PUT 已完成：${todo.id}`);
      await mutate();
    } catch {
      // SWR exposes mutationError for the error panel below.
    }
  }

  async function handleDelete(todo: Todo) {
    setMessage("");
    try {
      await trigger({ method: "DELETE", path: `${endpoint}/${todo.id}` });
      setMessage(`DELETE 已完成：${todo.id}`);
      await mutate();
    } catch {
      // SWR exposes mutationError for the error panel below.
    }
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" component="h1" fontWeight={800}>
          API 串接範例
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          GET 由 SWR 讀取與快取；POST、PUT、DELETE 使用共用 API client 與
          useSWRMutation。
        </Typography>
      </Box>
      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Todos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Endpoint: {endpoint}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshRoundedIcon />}
            onClick={() => mutate()}
            disabled={isLoading}
          >
            重新載入
          </Button>
        </Stack>
        <Box
          component="form"
          onSubmit={handleCreate}
          sx={{
            display: "flex",
            gap: 1.5,
            mt: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            label="新增項目名稱"
            size="small"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddRoundedIcon />}
            disabled={isMutating}
            sx={{ flexShrink: 0 }}
          >
            新增 (POST)
          </Button>
        </Box>
        {message && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        {mutationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage(mutationError)}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage(error)}
          </Alert>
        )}
        {isLoading ? (
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ py: 5, justifyContent: "center" }}
          >
            <CircularProgress size={22} />
            <Typography color="text.secondary">正在載入資料…</Typography>
          </Stack>
        ) : data ? (
          data.length === 0 ? (
            <Typography
              color="text.secondary"
              sx={{ py: 4, textAlign: "center" }}
            >
              目前沒有資料。
            </Typography>
          ) : (
            <Stack spacing={1.5} sx={{ mt: 3 }}>
              {data.map((todo, index) => (
                <Paper
                  key={todo.id ?? index}
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    gap: 2,
                    alignItems: { xs: "stretch", sm: "center" },
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={600}>
                      {todo.title ?? todo.name ?? `Item ${todo.id}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {todo.id}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={isMutating}
                      onClick={() => handleUpdate(todo)}
                    >
                      更新 (PUT)
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      disabled={isMutating}
                      onClick={() => handleDelete(todo)}
                    >
                      刪除 (DELETE)
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )
        ) : null}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 3 }}
        >
          此範例預期 API 提供 GET/POST {endpoint} 與 PUT/DELETE {endpoint}/:id。
        </Typography>
      </Paper>
    </Stack>
  );
}
