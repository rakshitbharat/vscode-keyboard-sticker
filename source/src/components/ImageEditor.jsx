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
  const [fabricInstance, setFabricInstance] = useState(null);

  // Load Fabric.js
  useEffect(() => {
    const loadFabric = async () => {
      try {
        const fabricModule = await import("fabric");
        fabric = fabricModule.fabric;
        setFabricInstance(fabric);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load Fabric.js:", error);
      }
    };

    loadFabric();
  }, []);

  // Initialize canvas after Fabric is loaded
  useEffect(() => {
    if (isLoading || !fabricInstance || !canvasRef.current) return;

    const canvas = new fabricInstance.Canvas(canvasRef.current, {
      width: 400,
      height: 400,
      backgroundColor: "#9c27b0",
    });

    editorRef.current = canvas;

    // Load initial image if provided
    if (initialImage) {
      fabricInstance.Image.fromURL(initialImage, (img) => {
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
  }, [isLoading, initialImage, fabricInstance]);

  const addText = () => {
    if (!fabricInstance || !editorRef.current) return;
    const text = new fabricInstance.IText("Edit me", {
      left: 100,
      top: 100,
      fill: "white",
      fontSize: 20,
    });
    editorRef.current.add(text);
    editorRef.current.setActiveObject(text);
  };

  const addShape = (type) => {
    if (!fabricInstance || !editorRef.current) return;
    let shape;
    switch (type) {
      case "circle":
        shape = new fabricInstance.Circle({
          radius: 30,
          fill: "white",
          left: 100,
          top: 100,
        });
        break;
      case "rect":
        shape = new fabricInstance.Rect({
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
    if (!file || !editorRef.current || !fabricInstance) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (!result) return;

      fabricInstance.Image.fromURL(result, (img) => {
        // Calculate scale to fit the canvas while maintaining aspect ratio
        const scale = Math.min(
          (editorRef.current.width * 0.8) / img.width,
          (editorRef.current.height * 0.8) / img.height
        );

        img.scale(scale);

        // Center the image
        img.set({
          left: (editorRef.current.width - img.width * scale) / 2,
          top: (editorRef.current.height - img.height * scale) / 2,
        });

        editorRef.current.add(img);
        editorRef.current.setActiveObject(img);
        editorRef.current.renderAll();
      });
    };
    reader.readAsDataURL(file);

    // Reset the input so the same file can be selected again
    e.target.value = "";
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
