
import { RequestFormModal } from "../request-form-modal/RequestFormModal";

const LandingPage = () => {

    return (
        <div id="main-content">
            <div className="row">
                <h1>A better way </h1>
                <h1>to enjoy every day. </h1>
                <p>Be the first to know when we launch.</p>
                <RequestFormModal /> 
            </div>
        </div>
    );
}

export default LandingPage;