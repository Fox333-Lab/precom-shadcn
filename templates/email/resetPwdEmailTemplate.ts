export const resetPasswordEmailTemplate = (to, url) => {
  console.log("in ActivateEmailTemplate");
  return `<!DOCTYPE html>
      <html>
      <head>
      <title>Page Title</title>
      </head>
      <body>
      
      <p>Please reset your account password with email address ${to} using the below reset link</p>
      <p>${url}</p>
      
      </body>
      </html>`;
};
