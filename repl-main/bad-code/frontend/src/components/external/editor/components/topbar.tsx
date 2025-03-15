import styled from "@emotion/styled";
import { FaPlay, FaRegBell, FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineCpuChip } from "react-icons/hi2";

const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1e1e1e;
  padding: 0 10px;
  color: white;
  height: 35px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  margin: 0 5px;
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  margin: 0 5px;
  display: flex;
  align-items: center;
  background-color: #373737;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
`;

const Button = styled.button`
  background-color: #2b5b84;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 2px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const TopBar = () => {
  return (
    <TopBarContainer>
      <LeftSection>
        <IconContainer>
          <AiOutlineMenu />
        </IconContainer>
        <TextContainer>PoshImpoliteRadius</TextContainer>
        <TextContainer>
          <HiOutlineCpuChip /> CPU/RAM LIMITS
        </TextContainer>
      </LeftSection>
      <CenterSection>
        <Button>
          <FaPlay /> Run
        </Button>
      </CenterSection>
      <RightSection>
        <IconContainer>
          <FaRegBell />
        </IconContainer>
        <IconContainer>
          <FaUserCircle />
        </IconContainer>
      </RightSection>
    </TopBarContainer>
  );
};

export default TopBar;
