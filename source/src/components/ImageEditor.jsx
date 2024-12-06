"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  background: ${(props) => props.theme.background || "#1e1e1e"};

  .tui-image-editor-container {
    width: 100% !important;
    height: 100% !important;
    min-height: 500px !important;
  }

  .tui-image-editor-main {
    background: ${(props) => props.theme.background || "#1e1e1e"} !important;
  }

  .tui-image-editor-header-logo {
    display: none;
  }

  .tui-image-editor-main-container {
    height: 100% !important;
    top: 0 !important;
  }

  .tui-image-editor-submenu {
    background: ${(props) => props.theme.toolbarBg || "#2d2d2d"} !important;
  }

  .tui-image-editor-menu {
    background: ${(props) => props.theme.toolbarBg || "#2d2d2d"} !important;
  }
`;

const myTheme = {
  "common.bi.image": "", // Remove the default logo
  "common.bisize.width": "0",
  "common.bisize.height": "0",
  "common.backgroundColor": "#1e1e1e",
  "common.border": "0px",

  // Header
  "header.backgroundImage": "none",
  "header.backgroundColor": "transparent",
  "header.border": "0px",

  // Menu
  "menu.normalIcon.path": "#fff",
  "menu.normalIcon.name": "#fff",
  "menu.activeIcon.path": "#9c27b0",
  "menu.activeIcon.name": "#9c27b0",
  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",

  // Submenu
  "submenu.backgroundColor": "#2d2d2d",
  "submenu.partition.color": "#3f3f3f",
  "submenu.normalIcon.path": "#fff",
  "submenu.normalIcon.name": "#fff",
  "submenu.activeIcon.path": "#9c27b0",
  "submenu.activeIcon.name": "#9c27b0",

  // Buttons
  "button.backgroundColor": "#2d2d2d",
  "button.border": "1px solid #3f3f3f",
  "button.color": "#fff",
  "button.activeColor": "#9c27b0",
};

const ImageEditorComponent = ({ onSave, initialImage }) => {
  const containerRef = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    const initializeEditor = async () => {
      try {
        const ImageEditor = (await import("tui-image-editor")).default;
        await import("tui-image-editor/dist/tui-image-editor.css");

        if (!containerRef.current) return;

        // Create a default blank canvas
        const defaultImage =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

        const editor = new ImageEditor(containerRef.current, {
          includeUI: {
            loadImage: {
              path: initialImage || defaultImage,
              name: "image",
            },
            theme: myTheme,
            menu: [
              "crop",
              "flip",
              "rotate",
              "draw",
              "shape",
              "icon",
              "text",
              "mask",
              "filter",
            ],
            initMenu: "filter",
            uiSize: {
              width: "100%",
              height: "100%",
            },
            menuBarPosition: "bottom",
          },
          cssMaxHeight: 700,
          cssMaxWidth: 1000,
          selectionStyle: {
            cornerSize: 20,
            rotatingPointOffset: 70,
          },
          usageStatistics: false,
        });

        setEditorInstance(editor);

        // If there's an initial image, load it
        if (initialImage) {
          editor.loadImage(initialImage);
        }

        return () => {
          editor.destroy();
          setEditorInstance(null);
        };
      } catch (error) {
        console.error("Error initializing editor:", error);
      }
    };

    initializeEditor();
  }, [initialImage]);

  const handleSave = () => {
    if (!editorInstance) return;
    const dataURL = editorInstance.toDataURL();
    onSave?.(dataURL);
  };

  return (
    <EditorContainer>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <button
        onClick={handleSave}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "#9c27b0",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        Save
      </button>
    </EditorContainer>
  );
};

export default ImageEditorComponent;
