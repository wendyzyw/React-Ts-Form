import Button from '@mui/material/Button';

const LandingPage = () => {
    return (
        <div id="main-content">
            <div className="row">
                <h1>A better way </h1>
                <h1>to enjoy every day. </h1>
                <p>Be the first to know when we launch.</p>
                <Button variant="contained" style={{textTransform: "none", padding: "10px 40px"}}>Request an invite</Button>
            </div>
        </div>
    );
}

export default LandingPage;