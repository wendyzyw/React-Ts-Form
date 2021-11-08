
import { Button } from "@mui/material"
import { useState } from 'react';
import { RequestFormModal } from "../request-form-modal/RequestFormModal";

const LandingPage = () => {
    const [ modalOpen, setModalOpen ] = useState(false);

    return (
        <div id="main-content">
            <div className="row">
                <h1>A better way </h1>
                <h1>to enjoy every day. </h1>
                <p>Be the first to know when we launch.</p>
                <Button
                    variant="contained"
                    className="button-fullwidth"
                    onClick={() => setModalOpen(true)}
                >
                    Request an invite
                </Button>
            </div>
            <RequestFormModal modalOpen={modalOpen} setModalOpen={setModalOpen} /> 
        </div>
    );
}

export default LandingPage;