import LoginModal from "./LoginModal/LoginModal";
import OTPModal from "./OTPModal/OTPModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import SuccessModal from "./SuccessModal/SuccessModal";

import { useAuth } from "../../context/AuthContext";
import { sendOTP } from "../../service/authService";

function AuthManager() {
  const auth = useAuth();

  const handleAuthSuccess = () => {
    auth.closeAll();
  };

  return (
    <>
      <LoginModal
        open={auth.loginOpen}
        email={auth.email}
        setEmail={auth.setEmail}
        onClose={auth.closeAll}
      />

      <OTPModal
        open={auth.otpOpen}
        email={auth.email}
        otp={auth.otp}
        setOtp={auth.setOtp}
        onClose={auth.closeAll}
        onResend={() => sendOTP(auth.email)}
        onSuccess={(userData) => {
          if (userData) auth.login(userData);
          handleAuthSuccess();
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
        onFinish={handleAuthSuccess}
      />
    </>
  );
}

export default AuthManager;