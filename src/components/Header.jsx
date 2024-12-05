import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOS, setSelectedConfig } from "@/store/slices/keyboardSlice";
import { stickerRegistry } from "@/data/stickerConfigs";

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 1rem;
`;

const Title = styled.h1`
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
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const FilterLabel = styled.div`
  font-size: 0.9rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 2rem;
  min-width: 120px;
  border: 2px solid
    ${(props) => (props.$active ? props.theme.accent.primary : "#3d3d3d")};
  background: ${(props) =>
    props.$active
      ? `linear-gradient(135deg, 
          ${props.theme.accent.primary}26, 
          ${props.theme.accent.secondary}26)`
      : "transparent"};
  color: ${(props) => (props.$active ? props.theme.accent.primary : "#ffffff")};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${(props) => props.theme.accent.primary};
    background: linear-gradient(
      135deg,
      ${(props) => `${props.theme.accent.primary}1a`},
      ${(props) => `${props.theme.accent.secondary}1a`}
    );
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ConfigContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ConfigItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #bbbbbb;
`;

const ConfigKey = styled.span`
  background: ${(props) => props.theme.sectionBg};
  padding: 0.6rem 1rem;
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter",
    sans-serif;
  border: 1px solid #3d3d3d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
  font-weight: 600;
  font-size: 1.2rem;

  /* Special styling for icon keys */
  ${(props) =>
    props.children.match(/[⌘⌥⌃⇧]/) &&
    `
    font-size: 1.4rem;
    font-weight: 400;
  `}
`;

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

  return (
    <HeaderContainer>
      <Title>VSCode Keyboard Stickers</Title>
      <FilterSection>
        <FilterGroup>
          <FilterLabel>Operating System</FilterLabel>
          <FilterContainer>
            {osOptions.map((os) => (
              <FilterButton
                key={os.id}
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

      <ConfigContainer>{/* ... rest of the component ... */}</ConfigContainer>
    </HeaderContainer>
  );
};

export default Header;
