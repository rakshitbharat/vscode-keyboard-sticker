import { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const UploadArea = styled(motion.div)`
  border: 2px dashed
    ${(props) => (props.isDragging ? props.theme.accent.primary : "#666")};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.isDragging ? `${props.theme.accent.primary}0a` : "transparent"};
`;

const Input = styled.input`
  display: none;
`;

const ImageUploader = ({ onUpload, constraints, positions }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files || e.target.files;
    if (!files?.length) return;

    const file = files[0];

    // Validate file
    if (
      !constraints.formats.some((format) =>
        file.name.toLowerCase().endsWith(format)
      )
    ) {
      alert("Invalid file format");
      return;
    }

    if (file.size > constraints.maxSize) {
      alert("File too large");
      return;
    }

    // Validate dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => (img.onload = resolve));

    if (
      img.width !== constraints.dimensions.width ||
      img.height !== constraints.dimensions.height
    ) {
      alert(
        `Image must be ${constraints.dimensions.width}x${constraints.dimensions.height}px`
      );
      return;
    }

    onUpload(file);
  };

  return (
    <UploadArea
      isDragging={isDragging}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Input
        ref={inputRef}
        type="file"
        accept={constraints.formats.join(",")}
        onChange={handleDrop}
      />
      <p>Drop image here or click to upload</p>
      <small>
        {constraints.dimensions.width}x{constraints.dimensions.height}px, max{" "}
        {Math.round(constraints.maxSize / 1024)}KB
      </small>
    </UploadArea>
  );
};

export default ImageUploader;
