import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom"; // ✅ Don't forget this!
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minHeight="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
