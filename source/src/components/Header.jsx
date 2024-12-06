import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Box,
  Fab,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOS, setSelectedConfig } from "@/store/slices/keyboardSlice";

// Styled components using MUI's styled
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  position: "static",
  padding: "1rem 0",
}));

const StyledToolbar = styled(Toolbar)({
  maxWidth: 1200,
  width: "100%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 24px",
});

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  borderRadius: 8,
  minWidth: 150,
  "& .MuiSelect-select": {
    padding: "10px 15px",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
  },
}));

const FloatingButtons = styled(Box)({
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  zIndex: 1000,
});

const Header = () => {
  const dispatch = useDispatch();
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const selectedConfig = useSelector((state) => state.keyboard.selectedConfig);
  const [showContribute, setShowContribute] = useState(false);
  const [showCreateTheme, setShowCreateTheme] = useState(false);
  const [newTheme, setNewTheme] = useState({
    name: "",
    description: "",
    author: "",
  });

  const osOptions = [
    { id: "mac", label: "macOS" },
    { id: "windows", label: "Windows" },
    { id: "ubuntu", label: "Ubuntu" },
  ];

  const configOptions = [
    { id: "vscodePurple", label: "VSCode Purple" },
    { id: "vscodeBlue", label: "VSCode Blue" },
  ];

  const handleCreateTheme = async () => {
    const themeId = `theme_${Date.now()}`;
    const themeData = {
      id: themeId,
      ...newTheme,
      version: "1.0.0",
      osConfigs: {
        mac: { stickers: {} },
        windows: { stickers: {} },
        ubuntu: { stickers: {} },
      },
    };

    try {
      const response = await fetch("/api/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(themeData),
      });

      if (response.ok) {
        setShowCreateTheme(false);
        console.log("Theme created successfully");
      }
    } catch (error) {
      console.error("Error creating theme:", error);
    }
  };

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              background: (theme) => theme.palette.primary.gradient,
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 800,
            }}
          >
            VSCode Keyboard Stickers
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small">
              <StyledSelect
                value={selectedOS}
                onChange={(e) => dispatch(setSelectedOS(e.target.value))}
                displayEmpty
                renderValue={(value) =>
                  osOptions.find((os) => os.id === value)?.label || "Select OS"
                }
              >
                {osOptions.map((os) => (
                  <MenuItem key={os.id} value={os.id}>
                    {os.label}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>

            <FormControl size="small">
              <StyledSelect
                value={selectedConfig}
                onChange={(e) => dispatch(setSelectedConfig(e.target.value))}
                displayEmpty
                renderValue={(value) =>
                  configOptions.find((config) => config.id === value)?.label ||
                  "Select Theme"
                }
              >
                {configOptions.map((config) => (
                  <MenuItem key={config.id} value={config.id}>
                    {config.label}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      <FloatingButtons>
        <Fab
          variant="extended"
          color="primary"
          onClick={() => setShowContribute(true)}
        >
          <GitHubIcon sx={{ mr: 1 }} />
          Contribute
        </Fab>
        <Fab
          variant="extended"
          color="secondary"
          onClick={() => setShowCreateTheme(true)}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create Theme
        </Fab>
      </FloatingButtons>

      {/* Contribute Dialog */}
      <Dialog
        open={showContribute}
        onClose={() => setShowContribute(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            Contributing to VSCode Keyboard Stickers
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Typography variant="h6" color="primary">
              How to Contribute
            </Typography>
            <Typography>
              Contributing to VSCode Keyboard Stickers is easy! Follow these
              steps:
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              <li>Fork the repository on GitHub</li>
              <li>Create a new branch for your theme</li>
              <li>Add your theme configuration and images</li>
              <li>Test your theme locally</li>
              <li>Submit a pull request</li>
            </Box>
            <Typography variant="h6" color="primary">
              Theme Structure
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: "grey.900",
                p: 2,
                borderRadius: 1,
                overflow: "auto",
              }}
            >
              {`your-theme/
├── config.js
└── images/
    ├── mac/
    ├── windows/
    └── ubuntu/`}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowContribute(false)}>Close</Button>
          <Button
            variant="contained"
            href="https://github.com/yourusername/vscode-keyboard-stickers"
            target="_blank"
          >
            View on GitHub
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Theme Dialog */}
      <Dialog
        open={showCreateTheme}
        onClose={() => setShowCreateTheme(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            Create New Theme
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Theme Name"
              fullWidth
              value={newTheme.name}
              onChange={(e) =>
                setNewTheme((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., My Awesome Theme"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newTheme.description}
              onChange={(e) =>
                setNewTheme((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe your theme..."
            />
            <TextField
              label="Author"
              fullWidth
              value={newTheme.author}
              onChange={(e) =>
                setNewTheme((prev) => ({ ...prev, author: e.target.value }))
              }
              placeholder="Your name"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateTheme(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateTheme}
            disabled={!newTheme.name || !newTheme.author}
          >
            Create Theme
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
