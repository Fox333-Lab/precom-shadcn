import nodemailer from "nodemailer";
import { google } from "googleapis";

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  //MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);
// send email

const sendEmail = async (
  to: string,
  url: string,
  txt: string,
  subject: string,
  template: any
) => {
  console.log("In sendEmail");

  try {
    oauth2Client.setCredentials({
      refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });
    google.options({ auth: oauth2Client });
    console.log("geting oauth2Client access token");
    // const accessToken =
    //   "ya29.a0AfB_byDYG14i-5mJOOeVdjbRRlbe1KG2vN8aCjme1T5ipwA_5Isb_517Qri4GRJhQA7rsViJ-HxjAFYSfX8UQFgy5oe_hgRBTFOIKWpNdn8ReUQ_gBjz5ugV060D0pMd5wRy0iROu7lUMGMrHu5VF_zHwFG8ocskNgbmaCgYKAXcSARESFQGOcNnCZwWwiTDX989ivV1-Cn_87w0171";

    // const accessToken = await new Promise((resolve, reject) => {
    //   oauth2Client.getAccessToken((err, token) => {
    //     if (err) {
    //       console.log("failed to get access token");
    //       reject();
    //     }
    //     //   else {
    //     resolve(token);
    //     //   }
    //   });
    // });

    const accessToken = await oauth2Client.getAccessToken();

    console.log("access token : ", accessToken);
    console.log(
      "access accessToken.token?.toString() : ",
      accessToken.token?.toString()
    );
    console.log("creating nodemailer transport");
    console.log(
      "need to check mail sending functionality in personal system having security issues here"
    );
    // need to check mail sending functionality in personal system having security issues here
    return;
    // const smtpTransporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     type: "OAuth2",
    //     user: SENDER_EMAIL_ADDRESS,
    //     clientId: MAILING_SERVICE_CLIENT_ID,
    //     clientSecret: MAILING_SERVICE_CLIENT_SECRET,
    //     refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
    //     accessToken,
    //   },
    // });

    const smtpTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken: accessToken.token?.toString(),
      },
    });

    console.log("after createTeansport");
    const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: to,
      subject: subject,
      html: template(to, url),
    };

    console.log("before smtpTransport.sendMail");
    smtpTransporter.sendMail(mailOptions, (err, infos) => {
      if (err) {
        console.log("send mail error : ", err);
        return err;
      }
      console.log("infos : ", infos);
      return infos;
    });
  } catch (err) {
    console.log("errrrororor : ", err);
  }
};

export default sendEmail;
