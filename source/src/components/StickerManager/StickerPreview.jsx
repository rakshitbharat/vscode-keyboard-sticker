import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const PreviewItem = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme.keyboardBg};
  padding: 0.5rem;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const StickerPreview = ({ stickers, onRemove }) => {
  return (
    <PreviewGrid>
      <AnimatePresence>
        {Object.entries(stickers).map(([keyName, data]) => (
          <PreviewItem
            key={keyName}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <PreviewImage src={URL.createObjectURL(data.image)} alt={keyName} />
            <RemoveButton
              onClick={() => onRemove(keyName)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </RemoveButton>
          </PreviewItem>
        ))}
      </AnimatePresence>
    </PreviewGrid>
  );
};

export default StickerPreview;
