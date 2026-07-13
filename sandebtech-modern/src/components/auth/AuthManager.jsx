import LoginModal from "./LoginModal/LoginModal";
import OTPModal from "./OTPModal/OTPModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import SuccessModal from "./SuccessModal/SuccessModal";

import { useAuth } from "../../context/AuthContext";

function AuthManager() {

    const auth = useAuth();

    return (
        <>

            <LoginModal
                open={auth.loginOpen}
                email={auth.email}
                setEmail={auth.setEmail}
                loading={false}
                onClose={auth.closeAll}
                onContinue={() => {

                    auth.setLoginOpen(false);

                    auth.setOtpOpen(true);

                }}
            />

            <OTPModal
                open={auth.otpOpen}
                email={auth.email}
                otp={auth.otp}
                setOtp={auth.setOtp}
                loading={false}
                onClose={auth.closeAll}
                onResend={() => { }}
                onVerify={() => {

                    auth.setOtpOpen(false);

                    auth.setRegisterOpen(true);

                }}
            />

            <RegisterModal
                open={auth.registerOpen}
                loading={false}
                onClose={auth.closeAll}
                onFinish={(data) => {

                    auth.login(data);

                    auth.setRegisterOpen(false);

                    auth.setSuccessOpen(true);

                }}
            />

            <SuccessModal
                open={auth.successOpen}
                userName={auth.user?.name}
                onFinish={() => {

                    auth.closeAll();

                    auth.executePendingAction();

                }}
            />

        </>
    );
}

export default AuthManager;