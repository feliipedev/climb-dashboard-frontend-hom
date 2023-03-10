import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getNotification } from "../../services/loan";
import { Loan } from "../../pages/SideDish/SideDish";

interface Props {
  lengthTable?: number;
  select: string;
}

const HeaderTable = ({ select, lengthTable }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [notificationDisabledTwo, setNotificationDisabledTwo] = useState(true);
  const [notificationNumberTwo, setNotificationNumberTwo] = useState(0);

  const handleTitleOne = () => {
    navigate("/");
  };

  const handleTitleTwo = () => {
    setNotificationDisabledTwo(true);
    setNotificationNumberTwo(0);
    if (window.location.href.includes("/solicitacoes")) {
      window.location.reload();
    } else {
      navigate("/solicitacoes");
    }
  };

  useEffect(() => {
    if (lengthTable) {
      window.setInterval(async () => {
        const notificationResponse = await getNotification();
        if (notificationResponse.result.loan_count > lengthTable) {
          setNotificationDisabledTwo(false);
          setNotificationNumberTwo(
            notificationResponse.result.loan_count - lengthTable
          );
        }
      }, 30000);
    }
  }, [lengthTable]);

  return (
    <Container select={select}>
      <FlexContainer>
        <Title select={select} onClick={() => handleTitleOne()}>
          Acompanhamento
        </Title>
        <TitleTwo select={select} onClick={() => handleTitleTwo()}>
          Solicitações
          {!notificationDisabledTwo && (
            <NotificationStyled>{notificationNumberTwo}</NotificationStyled>
          )}
        </TitleTwo>
      </FlexContainer>
    </Container>
  );
};

export default HeaderTable;

export const Container = styled.div<{ select: string }>`
  max-width: ${(props) =>
    props.select === "Acompanhamento" ? "1312px" : "1401px"};
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1401px) {
    width: 90%;
  }
`;

const Title = styled.p<{ select: string }>`
  color: ${(props) =>
    props.select === "Acompanhamento"
      ? props.theme.colors.title
      : props.theme.colors.fontColor};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 120%;
  text-decoration: ${(props) =>
    props.select === "Acompanhamento" ? "underline" : "none"};
  margin-top: 43px;
  cursor: pointer;
  position: relative;
`;

const TitleTwo = styled.span<{ select: string }>`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 120%;
  color: ${(props) =>
    props.select === "Solicitações"
      ? props.theme.colors.title
      : props.theme.colors.fontColor};
  margin-top: 43px;
  margin-left: 33px;
  cursor: pointer;
  position: relative;
  text-decoration: ${(props) =>
    props.select === "Solicitações" ? "underline" : "none"};
`;

const NotificationStyled = styled.div`
  width: 16px;
  height: 16px;
  color: black;
  border-radius: 50%;
  background: #edb900;
  font-size: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1px;
  right: -10px;
  font-weight: 600;
`;

export const FlexContainer = styled.div`
  display: flex;
`;
