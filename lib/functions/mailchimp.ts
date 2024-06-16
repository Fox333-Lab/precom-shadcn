export function MailChimpHandler(email: string) {
  const { MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID } = process.env;
  const DATACENTER = MAILCHIMP_API_KEY?.split("-")[1];
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
  const data = {
    email_address: email,
    status: "subscribed",
  };
  const base64ApiKey = Buffer.from(`apikey:${MAILCHIMP_API_KEY}`).toString(
    "base64"
  );
  const headers = {
    Authorization: `Basic ${base64ApiKey}`,
    "Content-Type": "application/json",
  };
  return { url, data, headers };
}
