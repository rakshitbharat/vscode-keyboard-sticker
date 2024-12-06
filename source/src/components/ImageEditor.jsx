"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// We'll initialize fabric later in useEffect
let fabric = null;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const CanvasContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const ToolBar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #9c27b0;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled(Button)`
  background: #7b1fa2;
`;

const ImageEditor = ({ onSave, initialImage }) => {
  const canvasRef = useRef(null);
  const editorRef = useRef(null);
  const [activeObject, setActiveObject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Load Fabric.js
  useEffect(() => {
    const loadFabric = async () => {
      try {
        // Dynamic import of fabric
        const fabricModule = await import("fabric");
        fabric = fabricModule.fabric;
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load Fabric.js:", error);
      }
    };

    loadFabric();
  }, []);

  // Initialize canvas after Fabric is loaded
  useEffect(() => {
    if (isLoading || !fabric || !canvasRef.current) return;

    try {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 400,
        height: 400,
        backgroundColor: "#9c27b0",
      });

      editorRef.current = canvas;

      // Load initial image if provided
      if (initialImage) {
        fabric.Image.fromURL(initialImage, (img) => {
          img.scaleToWidth(canvas.width);
          canvas.add(img);
          canvas.centerObject(img);
          canvas.renderAll();
        });
      }

      // Add event listeners
      canvas.on("selection:created", (e) => setActiveObject(e.target));
      canvas.on("selection:cleared", () => setActiveObject(null));

      return () => {
        canvas.dispose();
      };
    } catch (error) {
      console.error("Failed to initialize canvas:", error);
    }
  }, [isLoading, initialImage]);

  const addText = () => {
    if (!fabric || !editorRef.current) return;
    const text = new fabric.IText("Edit me", {
      left: 100,
      top: 100,
      fill: "white",
      fontSize: 20,
    });
    editorRef.current.add(text);
    editorRef.current.setActiveObject(text);
  };

  const addShape = (type) => {
    if (!fabric || !editorRef.current) return;
    let shape;
    switch (type) {
      case "circle":
        shape = new fabric.Circle({
          radius: 30,
          fill: "white",
          left: 100,
          top: 100,
        });
        break;
      case "rect":
        shape = new fabric.Rect({
          width: 60,
          height: 60,
          fill: "white",
          left: 100,
          top: 100,
        });
        break;
      default:
        return;
    }
    editorRef.current.add(shape);
    editorRef.current.setActiveObject(shape);
  };

  const removeSelected = () => {
    if (!editorRef.current || !activeObject) return;
    editorRef.current.remove(activeObject);
    setActiveObject(null);
  };

  const downloadImage = () => {
    if (!editorRef.current) return;
    const dataURL = editorRef.current.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.download = "sticker.png";
    link.href = dataURL;
    link.click();
  };

  const previewOnKey = () => {
    if (!editorRef.current) return;
    const dataURL = editorRef.current.toDataURL({
      format: "png",
      quality: 1,
    });
    onSave?.(dataURL);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editorRef.current) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target?.result, (img) => {
        img.scaleToWidth(editorRef.current.width);
        editorRef.current.add(img);
        editorRef.current.centerObject(img);
        editorRef.current.setActiveObject(img);
        editorRef.current.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  if (isLoading) {
    return <EditorContainer>Loading editor...</EditorContainer>;
  }

  return (
    <EditorContainer>
      <CanvasContainer>
        <canvas ref={canvasRef} />
      </CanvasContainer>

      <ToolBar>
        <FileInput
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
        />
        <UploadButton onClick={() => fileInputRef.current?.click()}>
          Upload Image
        </UploadButton>
        <Button onClick={addText}>Add Text</Button>
        <Button onClick={() => addShape("circle")}>Add Circle</Button>
        <Button onClick={() => addShape("rect")}>Add Rectangle</Button>
        <Button onClick={removeSelected} disabled={!activeObject}>
          Remove Selected
        </Button>
        <Button onClick={downloadImage}>Download</Button>
        <Button onClick={previewOnKey}>Preview on Key</Button>
      </ToolBar>
    </EditorContainer>
  );
};

export default ImageEditor;
