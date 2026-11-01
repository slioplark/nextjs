import ApiDemoButton from "./components/ApiDemoButton";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

const foundations = [
  {
    title: "Next.js App Router",
    description: "以 app 目錄管理頁面與共用版面。",
  },
  { title: "MUI + Icons", description: "使用 Material UI 元件、主題與圖示。" },
  {
    title: "SWR + API Client",
    description: "GET 快取及共用 GET、POST、PUT、DELETE 請求。",
  },
];

export default function HomePage() {
  return (
    <Stack spacing={4}>
      <Box>
        <Chip
          sx={{ mb: 2 }}
          size="small"
          color="primary"
          label="前端起始專案"
        />
        <Typography
          sx={{ fontSize: { xs: 32, md: 42 }, letterSpacing: -1 }}
          variant="h3"
          component="h1"
          fontWeight={800}
        >
          歡迎使用 Starter Console
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 680 }} color="text.secondary">
          基礎框架已備妥。從側邊欄進入 API
          範例，確認資料讀取與寫入流程，再替換成你的實際頁面和後端端點。
        </Typography>
        <ApiDemoButton />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {foundations.map((item) => (
          <Paper
            sx={{ p: 3, borderColor: "divider" }}
            key={item.title}
            variant="outlined"
          >
            <Typography variant="h6" fontWeight={700}>
              {item.title}
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary" variant="body2">
              {item.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Stack>
  );
}
