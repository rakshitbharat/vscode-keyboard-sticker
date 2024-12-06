import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOS, setSelectedConfig } from "@/store/slices/keyboardSlice";
import { stickerRegistry } from "@/data/stickerConfigs";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import Lottie from "lottie-react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: ${(props) =>
    props.theme.background.includes("#FFFFFF") ? "#333333" : "#FFFFFF"};
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 1rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = motion(styled.h1`
  font-size: 3.5rem;
  margin-bottom: 3rem;
  background: ${(props) => props.theme.brand.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 800;
  letter-spacing: -1.5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter",
    sans-serif;
  animation: ${scaleIn} 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
`);

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  & > * {
    animation: ${slideIn} 0.5s ease-out forwards;
    opacity: 0;
  }

  & > *:nth-child(1) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.4s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.5s;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const FilterLabel = styled.div`
  font-size: 0.9rem;
  color: ${(props) =>
    props.theme.background.includes("#FFFFFF") ? "#666666" : "#888888"};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const FilterButton = motion(styled(animated.button)`
  padding: 0.75rem 2rem;
  min-width: 120px;
  border: ${(props) =>
    props.theme.background.includes("white")
      ? props.$active
        ? "none"
        : "1px solid #E5E5E7"
      : `2px solid ${props.$active ? props.theme.accent.primary : "#3d3d3d"}`};
  background: ${(props) =>
    props.theme.background.includes("white")
      ? props.$active
        ? props.theme.accent.primary
        : "#F5F5F7"
      : props.$active
      ? `linear-gradient(135deg, 
          ${props.theme.accent.primary}26, 
          ${props.theme.accent.secondary}26)`
      : "transparent"};
  color: ${(props) =>
    props.theme.background.includes("white")
      ? props.$active
        ? "#FFFFFF"
        : "#666666"
      : props.$active
      ? props.theme.accent.primary
      : "#FFFFFF"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  font-size: 1rem;
  font-weight: ${(props) =>
    props.theme.background.includes("white") ? "500" : "400"};
  text-shadow: none;
  box-shadow: ${(props) =>
    props.theme.background.includes("white")
      ? props.$active
        ? "0 2px 4px rgba(0, 0, 0, 0.1)"
        : "0 1px 2px rgba(0, 0, 0, 0.05)"
      : "0 4px 6px rgba(0, 0, 0, 0.1)"};

  &:hover {
    border-color: ${(props) =>
      props.theme.background.includes("white")
        ? "#D1D1D3"
        : props.theme.accent.primary};
    background: ${(props) =>
      props.theme.background.includes("white")
        ? props.$active
          ? props.theme.accent.primary
          : "#EBEBED"
        : `linear-gradient(
            135deg,
            ${props.theme.accent.primary}1a,
            ${props.theme.accent.secondary}1a
          )`};
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${(props) =>
      props.theme.background.includes("white")
        ? props.$active
          ? "0 4px 8px rgba(0, 0, 0, 0.15)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)"
        : "0 6px 8px rgba(0, 0, 0, 0.2)"};
  }

  &:active {
    transform: translateY(1px) scale(0.98);
    transition: all 0.1s ease-out;
    box-shadow: ${(props) =>
      props.theme.background.includes("white")
        ? props.$active
          ? "0 1px 2px rgba(0, 0, 0, 0.1)"
          : "0 1px 1px rgba(0, 0, 0, 0.05)"
        : "0 2px 4px rgba(0, 0, 0, 0.1)"};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:focus::after {
    opacity: 0.2;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.2;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.1;
    }
    100% {
      transform: scale(1);
      opacity: 0.2;
    }
  }
`);

const ConfigContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;

  & > * {
    animation: ${slideIn} 0.5s ease-out forwards;
    opacity: 0;
  }

  & > *:nth-child(1) {
    animation-delay: 0.7s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.8s;
  }
`;

const ConfigItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) =>
    props.theme.background.includes("#FFFFFF") ? "#666666" : "#bbbbbb"};
`;

const ConfigKey = styled.span`
  background: ${(props) => props.theme.sectionBg};
  padding: 0.6rem 1rem;
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter",
    sans-serif;
  border: 1px solid
    ${(props) =>
      props.theme.background.includes("#FFFFFF") ? "#E5E5E5" : "#3d3d3d"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${(props) =>
    props.theme.background.includes("#FFFFFF") ? "#333333" : "inherit"};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15),
      0 1px 0 rgba(255, 255, 255, 0.1) inset;
  }

  ${(props) =>
    props.children.match(/[⌘⌥⌃⇧]/) &&
    `
    font-size: 1.4rem;
    font-weight: 400;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-1px) scale(1.05);
    }
    `}
`;

const ThemeTransitionWrapper = styled.div`
  transition: all 0.3s ease-in-out;
`;

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const buttonVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const Header = () => {
  const dispatch = useDispatch();
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const selectedConfig = useSelector((state) => state.keyboard.selectedConfig);

  const osOptions = [
    { id: "mac", label: "macOS" },
    { id: "windows", label: "Windows" },
    { id: "ubuntu", label: "Ubuntu" },
  ];

  console.log("stickerRegistry:", stickerRegistry);
  console.log("selectedConfig:", selectedConfig);

  const configOptions = [
    { id: "vscodePurple", label: "VSCode Purple" },
    { id: "vscodeBlue", label: "VSCode Blue" },
  ];

  const titleProps = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 20 },
  });

  const filterProps = useSpring({
    from: { opacity: 0, transform: "translateX(-30px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    delay: 200,
    config: { tension: 280, friction: 20 },
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <HeaderContainer>
        <animated.div style={titleProps}>
          <Title
            animate={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            VSCode Keyboard Stickers
          </Title>
        </animated.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOS + selectedConfig}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <animated.div style={filterProps}>
              <FilterSection>
                <FilterGroup>
                  <FilterLabel>Operating System</FilterLabel>
                  <FilterContainer>
                    {osOptions.map((os, index) => (
                      <FilterButton
                        key={os.id}
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        transition={{ delay: index * 0.1 }}
                        $active={selectedOS === os.id}
                        onClick={() => dispatch(setSelectedOS(os.id))}
                      >
                        {os.label}
                      </FilterButton>
                    ))}
                  </FilterContainer>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel>Sticker Theme</FilterLabel>
                  <FilterContainer>
                    {configOptions.map((config) => (
                      <FilterButton
                        key={config.id}
                        $active={selectedConfig === config.id}
                        onClick={() => dispatch(setSelectedConfig(config.id))}
                      >
                        {config.label}
                      </FilterButton>
                    ))}
                  </FilterContainer>
                </FilterGroup>
              </FilterSection>
            </animated.div>
          </motion.div>
        </AnimatePresence>

        <ConfigContainer>{/* ... rest of the component ... */}</ConfigContainer>
      </HeaderContainer>
    </motion.div>
  );
};

export default Header;
