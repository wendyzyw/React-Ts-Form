import styled from '@emotion/styled'

const StyledFooter = styled.footer`
    position: fixed; 
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    min-height: 100px;
    background-color: #fff;
`;


const Footer = () => {
    return (
        <StyledFooter>
            <p>Some footer text here</p>
            <p>Some other footer text here</p>
        </StyledFooter>
    );
}

export default Footer;