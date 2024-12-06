import styled from "styled-components";
import ImageEditor from "./ImageEditor";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
`;

const ImageEditorModal = ({ onClose, onSave }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ImageEditor onSave={onSave} />
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageEditorModal;
