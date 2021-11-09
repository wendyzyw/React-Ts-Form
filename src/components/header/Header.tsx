import styled from '@emotion/styled'

const StyledHeader = styled.header`
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 90px;
    background-color: #fff;
    z-index: 1000;
    padding: 0 100px; 
`;

const Header = () => {
    return (
        <StyledHeader>
            <h3>BROCCOLI & CO.</h3>
        </StyledHeader>
    );
}

export default Header;