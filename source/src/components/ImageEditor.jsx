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
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [ImageEditor, setImageEditor] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    const loadEditor = async () => {
      const tuiImageEditor = await import("tui-image-editor");
      await import("tui-image-editor/dist/tui-image-editor.css");
      setImageEditor(() => tuiImageEditor.default);
    };
    loadEditor();
  }, []);

  useEffect(() => {
    if (!ImageEditor || !containerRef.current) return;

    const options = {
      includeUI: {
        loadImage: {
          path:
            initialImage ||
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
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
    };

    const editor = new ImageEditor(containerRef.current, options);
    setEditorInstance(editor);

    return () => {
      editor.destroy();
      setEditorInstance(null);
    };
  }, [ImageEditor, initialImage]);

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
