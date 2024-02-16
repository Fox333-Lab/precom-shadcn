export const ActivateEmailTemplate = (to: string, url: string) => {
  console.log("in ActivateEmailTemplate");
  return `<!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    </head>
    <body>
    
    <p>Please activate your account created with email address ${to} using the below verification link</p>
    <p>${url}</p>
    
    </body>
    </html>`;
};
