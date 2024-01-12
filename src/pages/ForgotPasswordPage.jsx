import React, { useState } from "react";
import ForgotPasswordForm from "../components/ForgotPassswordForm";
import LogoSadam from "../assets/img/logo-sadam.png";
import Hero1 from "../assets/img/loginpage/fpasshero.png";
import Hero2 from "../assets/img/loginpage/fpassnew.png";

const ForgotPasswordPage = () => {
  const [emailSentMessage, setEmailSentMessage] = useState("");
  const [heroImage, setHeroImage] = useState(Hero1);
  const handleEmailSent = () => {
    // Implement logic for handling email sent
    setEmailSentMessage("Email terkirim dengan berhasil!");
  };

  const handleFormReset = () => {
    // Implement logic for resetting the form
    setEmailSentMessage(""); // Reset the emailSentMessage
  };

  return (
    <div className="ForgotPasswordPage">
      <div className="d-flex flex-column flex-md-row fpasspage">
        <div className="fpass d-flex flex-column align-items-left py-5">
          <img src={LogoSadam} alt="hero-img" className="d-inline-block" />
          <h1 className="">{emailSentMessage || "Ganti Kata Sandi 🔐"}</h1>

          {emailSentMessage ? (
            <p>
              Belum menerima email balasan?
              <span className="resend-link" onClick={handleFormReset}>
                Kirim Ulang
              </span>
            </p>
          ) : (
            <ForgotPasswordForm
              onEmailSent={handleEmailSent}
              onFormReset={handleFormReset}
            />
          )}
        </div>
        <img src={heroImage} alt="hero-img" className="img-fluid col-md-6 mt-3 mt-md-0" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
