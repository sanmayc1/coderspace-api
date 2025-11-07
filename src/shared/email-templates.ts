export const otpEmailTemplate = (otp: string) => `
<html>
  <body style="color: black;">
    <table
      cellpadding="0"
      cellspacing="0"
      height="100%"
      width="100%"
      border="0"
    >
      <tr>
        <td align="center">
          <div
            style="
              border: #dddcdc 1px solid;
              padding: 30px;
              width: 70%;
              height: 100%;
              border-radius: 20px;
              max-width:500px
            "
          >
            <table>
              <tr>
                <td align="center">
                  <img
                    src="https://res.cloudinary.com/dtfvzlvlj/image/upload/v1758044166/logo_zxho4h.png"
                    alt="logo"
                    style="width: 50%"
                  />
                </td>
              </tr>
            </table>

            <h2 style="text-align: center; padding: 15px">
              Your Verification Code
            </h2>
            <h4 style="text-align: left;">Hi Coder,</h4>
            <p style="font-size: small;  text-align: left;">
              We received a request to verify your account. Please use the
              following One-Time Password (OTP) to complete your verification.
            </p>
            <div
              style="
                background-color: #f0eeee;
                text-align: center;
                border-radius: 10px;
                margin-top: 40px;
              "
            >
              <div style="font-size: 32px; font-weight: 700; padding: 20px; letter-spacing: 10px;">
                ${otp}
              </div>
            </div>

            <p style="text-align: center; font-size: small; margin-top: 25px">
              This OTP is valid for 5 minutes.
            </p>

            <div
              style="
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #777;
                text-align: center;
              "
            >
              © 2025 Coderspace. All rights reserved.<br />
              Need help?
              <a
                href="mailto:sanmayc9@gmail.com"
                style="color: #222; text-decoration: underline"
                >Contact support</a
              >
            </div>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const passwordRestTemplate = (name:string, link:string) => `<html>
  <body style="color: black">
    <table
      cellpadding="0"
      cellspacing="0"
      height="100%"
      width="100%"
      border="0"
    >
      <tr>
        <td align="center">
          <div
            style="
              border: #dddcdc 1px solid;
              padding: 30px;
              width: 70%;
              height: fit-content;
              border-radius: 20px;
              max-width: 500px;
            "
          >
            <table>
              <tr>
                <td align="center">
                  <img
                    src="https://res.cloudinary.com/dtfvzlvlj/image/upload/v1758044166/logo_zxho4h.png"
                    alt="logo"
                    style="width: 50%"
                  />
                </td>
              </tr>
            </table>

            <h2 style="text-align: center; padding: 15px; font-size: x-large">
              Password Reset
            </h2>
            <h4 style="text-align: left; font-size: large">Hi ${name},</h4>
            <p style="font-size: medium; text-align: left">
              We received a request to reset your password. Click the link below
              to set a new password
            </p>
            <table>
              <tr align="center">
                <a href="${link}" target="_blank">
                  <button
                    style="
                      font-size: small;
                      background-color: black;
                      border-radius: 10px;
                      padding: 10px;
                      padding-left: 25px;
                      padding-right: 25px;
                      color: white;
                      margin-top: 10px;
                      margin-bottom: 10px;
                      cursor: pointer;
                    "
                  >
                    Rest Password
                  </button>
                </a>
              </tr>
            </table>

            <p style="text-align: center; font-size: small; margin-top: 25px">
              This link will expire in 10 minutes. If you did not request a
              password reset, please ignore this email.
            </p>

            <div
              style="
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #777;
                text-align: center;
              "
            >
              © 2025 Coderspace. All rights reserved.<br />
              Need help?
              <a
                href="mailto:sanmayc9@gmail.com"
                style="color: #222; text-decoration: underline"
                >Contact support</a
              >
            </div>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
