import { Container } from "@mui/material";
import Keyboard from "./components/Keyboard";

function App() {
  return (
    <Container maxWidth="lg" sx={{ padding: "2rem" }}>
      <Keyboard />
    </Container>
  );
}

export default App;
