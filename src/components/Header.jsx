import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOS } from "@/store/slices/keyboardSlice";

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #bb86fc 0%, #8b55f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 2px solid ${(props) => (props.$active ? "#bb86fc" : "#3d3d3d")};
  background: ${(props) =>
    props.$active ? "rgba(187, 134, 252, 0.1)" : "transparent"};
  color: ${(props) => (props.$active ? "#bb86fc" : "#ffffff")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;

  &:hover {
    border-color: #bb86fc;
    background: rgba(187, 134, 252, 0.05);
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
  background: #2d2d2d;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  border: 1px solid #3d3d3d;
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
