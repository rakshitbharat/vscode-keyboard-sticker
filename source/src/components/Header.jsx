import { useState, useMemo, useEffect } from "react";
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
import vscodePurple from "@/data/stickerConfigs/vscodePurple";
import vscodeBlue from "@/data/stickerConfigs/vscodeBlue";

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

const validateThemeName = (name) => {
  const regex = /^[a-z0-9_]+$/;
  if (!regex.test(name)) {
    return "Theme name can only contain lowercase letters, numbers, and underscores";
  }
  if (name.length < 3) {
    return "Theme name must be at least 3 characters long";
  }
  if (name.length > 30) {
    return "Theme name must be less than 30 characters";
  }
  return "";
};

const CreateThemeContent = ({ formData, setFormData, errors }) => (
  <Stack spacing={3}>
    <Typography color="text.secondary" sx={{ mb: 2 }}>
      Create a new theme and start customizing your keyboard stickers. The theme
      files will be automatically generated in the correct locations.
    </Typography>
    <TextField
      label="Theme Name"
      fullWidth
      required
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      error={!!errors.name}
      helperText={
        errors.name || "This will be used for file names (e.g., neon_cyberpunk)"
      }
      placeholder="e.g., neon_cyberpunk"
    />
    <TextField
      label="Display Name"
      fullWidth
      required
      value={formData.displayName}
      onChange={(e) =>
        setFormData({ ...formData, displayName: e.target.value })
      }
      error={!!errors.displayName}
      helperText={
        errors.displayName || "How your theme will appear in the dropdown"
      }
      placeholder="e.g., Neon Cyberpunk"
    />
    <TextField
      label="Description"
      fullWidth
      multiline
      rows={2}
      value={formData.description}
      onChange={(e) =>
        setFormData({ ...formData, description: e.target.value })
      }
      error={!!errors.description}
      helperText={errors.description}
      placeholder="A cyberpunk theme with neon accents..."
    />
    <TextField
      label="Author"
      fullWidth
      required
      value={formData.author}
      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
      error={!!errors.author}
      helperText={errors.author || "Your name or username"}
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
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    description: "",
    author: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [availableThemes, setAvailableThemes] = useState({
    vscodePurple,
    vscodeBlue,
  });

  const osOptions = [
    { id: "mac", label: "macOS" },
    { id: "windows", label: "Windows" },
    { id: "ubuntu", label: "Ubuntu" },
  ];

  // Load themes dynamically
  useEffect(() => {
    const loadThemes = async () => {
      try {
        console.log("Fetching themes...");
        const response = await fetch("/api/themes/list");
        const data = await response.json();
        console.log("Received themes data:", data);

        if (data.themes) {
          setAvailableThemes((prev) => {
            const newThemes = {
              ...prev,
              ...data.themes,
            };
            console.log("Updated themes:", newThemes);
            return newThemes;
          });
        }
      } catch (error) {
        console.error("Error loading themes:", error);
      }
    };

    loadThemes();
  }, []);

  // Generate config options dynamically from available themes
  const configOptions = useMemo(() => {
    console.log("Generating config options from themes:", availableThemes);
    const options = Object.entries(availableThemes)
      .filter(([key]) => {
        const isValid = key !== "defaultConfig" && key !== "types";
        console.log(`Checking key ${key}:`, isValid);
        return isValid;
      })
      .map(([key, theme]) => {
        const option = {
          id: key,
          label: theme.name || key,
        };
        console.log(`Created option for ${key}:`, option);
        return option;
      });

    console.log("Final config options:", options);
    return options;
  }, [availableThemes]);

  const validateForm = () => {
    const newErrors = {};
    const nameError = validateThemeName(formData.name);
    if (nameError) newErrors.name = nameError;
    if (!formData.displayName)
      newErrors.displayName = "Display name is required";
    if (!formData.author) newErrors.author = "Author name is required";
    return newErrors;
  };

  const handleCreateTheme = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const themeId = formData.name;
    const themeData = {
      id: themeId,
      name: formData.displayName,
      description: formData.description,
      author: formData.author,
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
        const data = await response.json();
        console.log("Theme created:", data);
        setShowCreateTheme(false);
        setShowSuccess(true);

        // Force reload of the application to load new modules
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        const error = await response.json();
        setErrors({ submit: error.error || "Failed to create theme" });
      }
    } catch (error) {
      console.error("Error creating theme:", error);
      setErrors({ submit: "Failed to create theme. Please try again." });
    }
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    console.log("Changing theme to:", newTheme);
    dispatch(setSelectedConfig(newTheme));
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
                onChange={handleThemeChange}
                displayEmpty
                renderValue={(value) =>
                  configOptions.find((config) => config.id === value)?.label ||
                  "Select Theme"
                }
              >
                {configOptions.map((config) => {
                  console.log("Rendering theme option:", config);
                  return (
                    <MenuItem key={config.id} value={config.id}>
                      {config.label}
                    </MenuItem>
                  );
                })}
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
          <CreateThemeContent
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateTheme(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateTheme}
            disabled={!formData.name || !formData.author}
          >
            Create Theme
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold" color="success.main">
            Theme Created Successfully!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography>
              Your theme has been created successfully. You can find the files
              at:
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: "grey.900",
                color: "white",
                p: 2,
                borderRadius: 1,
              }}
            >
              {`src/data/stickerConfigs/${formData.name}.js`}
            </Box>
            <Typography>To start customizing your theme:</Typography>
            <ol>
              <li>Open the theme file in your editor</li>
              <li>Modify the styles for each OS</li>
              <li>Add sticker images to the public folder</li>
              <li>Test your changes in the preview</li>
            </ol>
            <Typography color="primary">
              The page will reload in a moment to load your new theme...
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
