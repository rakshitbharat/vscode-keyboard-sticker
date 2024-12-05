import { Container } from "@mui/material";
import Keyboard from "@/components/Keyboard";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ padding: "2rem" }}>
      <Keyboard />
    </Container>
  );
}
