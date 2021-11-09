
import { RequestFormModal } from "../request-form-modal/RequestFormModal";
import styled from '@emotion/styled'
import backgroundImg from '../../assets/pictures/background.jpg';

const Container = styled.div`
    background-image: url(${backgroundImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    min-height: 100vh;
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Paragraph = styled.p`
    margin: 20px;
`;

const H1 = styled.h1`
    font-size: 50px
`;


const LandingPage = () => {

    return (
        <div id="main-content">
            <Container>
                <H1>A better way </H1>
                <H1>to enjoy every day. </H1>
                <Paragraph>Be the first to know when we launch.</Paragraph>
                <RequestFormModal /> 
            </Container>
        </div>
    );
}

export default LandingPage;