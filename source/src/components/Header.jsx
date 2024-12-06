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

const ContributeContent = () => (
  <Stack spacing={3}>
    <Typography variant="h6" color="primary">
      Theme File Structure
    </Typography>
    <Typography>
      When you create a theme, the following structure is automatically
      generated:
    </Typography>
    <Box
      component="pre"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        p: 2,
        borderRadius: 1,
        overflow: "auto",
      }}
    >
      {`src/data/stickerConfigs/
├── your_theme_name.js    # Auto-generated theme config
└── index.js             # Auto-updated with your theme

public/themes/
└── your_theme_name/     # Theme images folder
    ├── mac/            # macOS specific stickers
    ├── windows/        # Windows specific stickers
    └── ubuntu/         # Ubuntu specific stickers`}
    </Box>
    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
      How It Works
    </Typography>
    <Box component="ol" sx={{ pl: 2 }}>
      <li>Create a new theme using the "Create Theme" button</li>
      <li>Theme configuration file is automatically generated</li>
      <li>Upload sticker images for each key</li>
      <li>Images are stored in the public folder by OS</li>
      <li>Theme is automatically registered and ready to use</li>
    </Box>
    <Typography variant="h6" color="primary">
      Contributing Back
    </Typography>
    <Typography>
      After creating your theme, you can contribute it back to the project:
    </Typography>
    <Box component="ol" sx={{ pl: 2 }}>
      <li>Your theme files are already in the correct structure</li>
      <li>Create a fork of the repository</li>
      <li>Copy your theme files to your fork</li>
      <li>Create a pull request</li>
    </Box>
  </Stack>
);

const CreateThemeContent = () => (
  <Stack spacing={3}>
    <Typography color="text.secondary" sx={{ mb: 2 }}>
      Create a new theme and start customizing your keyboard stickers. The theme
      files will be automatically generated in the correct locations.
    </Typography>
    <TextField
      label="Theme Name"
      fullWidth
      required
      helperText="This will be used for file names and folder structure"
      placeholder="e.g., neon_cyberpunk"
    />
    <TextField
      label="Display Name"
      fullWidth
      required
      helperText="How your theme will appear in the dropdown"
      placeholder="e.g., Neon Cyberpunk"
    />
    <TextField
      label="Description"
      fullWidth
      multiline
      rows={2}
      helperText="Brief description of your theme"
      placeholder="A cyberpunk theme with neon accents..."
    />
    <TextField
      label="Author"
      fullWidth
      required
      helperText="Your name or username"
    />
    <Box sx={{ bgcolor: "grey.900", p: 2, borderRadius: 1 }}>
      <Typography variant="subtitle2" color="primary.light" gutterBottom>
        Files that will be created:
      </Typography>
      <Typography
        variant="body2"
        component="pre"
        sx={{ color: "grey.300", m: 0 }}
      >
        {`src/data/stickerConfigs/your_theme_name.js
public/themes/your_theme_name/
├── mac/
├── windows/
└── ubuntu/`}
      </Typography>
    </Box>
  </Stack>
);

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

      {/* Updated Contribute Dialog */}
      <Dialog
        open={showContribute}
        onClose={() => setShowContribute(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            Theme Creation & Contribution Guide
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ContributeContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowContribute(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowContribute(false);
              setShowCreateTheme(true);
            }}
          >
            Create Theme
          </Button>
        </DialogActions>
      </Dialog>

      {/* Updated Create Theme Dialog */}
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
          <CreateThemeContent />
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
