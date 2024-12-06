export const generateThemeFile = (theme) => {
  const themeContent = `
export default {
  id: "${theme.id}",
  name: "${theme.name}",
  description: "${theme.description}",
  author: "${theme.author}",
  version: "${theme.version}",
  styles: {
    mac: {
      style: {
        backgroundColor: "rgba(156, 39, 176, 0.9)",
        color: "#FFFFFF",
        fontSize: "0.6em",
        padding: "1px 3px",
        borderRadius: "3px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
      position: "top-right",
    },
    windows: {
      // ... similar styles
    },
    ubuntu: {
      // ... similar styles
    },
  },
  layout: {
    mac: ${generateLayoutConfig(theme.osConfigs.mac.stickers, "mac")},
    windows: ${generateLayoutConfig(
      theme.osConfigs.windows.stickers,
      "windows"
    )},
    ubuntu: ${generateLayoutConfig(theme.osConfigs.ubuntu.stickers, "ubuntu")},
  },
};
`;

  return themeContent;
};

function generateLayoutConfig(stickers, os) {
  return JSON.stringify(
    Object.entries(stickers).reduce(
      (acc, [key, data]) => ({
        ...acc,
        [key]: {
          ...data,
          path:
            data.type === "image"
              ? `/themes/${theme.id}/${os}/${key}.png`
              : undefined,
        },
      }),
      {}
    ),
    null,
    2
  );
}
