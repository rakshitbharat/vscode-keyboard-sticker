import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOS } from "@/store/slices/keyboardSlice";

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  background: ${(props) => props.theme.brand.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  letter-spacing: -1px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 2rem;
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
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-family: "SF Mono", "Fira Code", monospace;
  border: 1px solid #3d3d3d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
  font-weight: 500;
`;

const Header = () => {
  const dispatch = useDispatch();
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);

  const osOptions = [
    { id: "mac", label: "macOS" },
    { id: "windows", label: "Windows" },
    { id: "ubuntu", label: "Ubuntu" },
  ];

  const configurations = {
    mac: [
      { key: "⌘", description: "Command" },
      { key: "⌥", description: "Option" },
      { key: "⌃", description: "Control" },
      { key: "⇧", description: "Shift" },
    ],
    windows: [
      { key: "Win", description: "Windows" },
      { key: "Alt", description: "Alt" },
      { key: "Ctrl", description: "Control" },
      { key: "Shift", description: "Shift" },
    ],
    ubuntu: [
      { key: "Super", description: "Super" },
      { key: "Alt", description: "Alt" },
      { key: "Ctrl", description: "Control" },
      { key: "Shift", description: "Shift" },
    ],
  };

  const handleOSChange = (osId) => {
    dispatch(setSelectedOS(osId));
  };

  return (
    <HeaderContainer>
      <Title>VSCode Keyboard Shortcuts</Title>
      <FilterContainer>
        {osOptions.map((os) => (
          <FilterButton
            key={os.id}
            $active={selectedOS === os.id}
            onClick={() => handleOSChange(os.id)}
          >
            {os.label}
          </FilterButton>
        ))}
      </FilterContainer>
      <ConfigContainer>
        {configurations[selectedOS].map((config, index) => (
          <ConfigItem key={index}>
            <ConfigKey>{config.key}</ConfigKey>
            <span>{config.description}</span>
          </ConfigItem>
        ))}
      </ConfigContainer>
    </HeaderContainer>
  );
};

export default Header;
