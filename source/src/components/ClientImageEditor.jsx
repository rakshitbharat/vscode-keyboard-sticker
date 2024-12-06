"use client";
import dynamic from "next/dynamic";

// Dynamically import ImageEditor with no SSR
const ImageEditor = dynamic(() => import("./ImageEditor"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "20px", textAlign: "center" }}>
      Loading editor...
    </div>
  ),
});

const ClientImageEditor = ({ onSave, initialImage }) => {
  return <ImageEditor onSave={onSave} initialImage={initialImage} />;
};

export default ClientImageEditor;
