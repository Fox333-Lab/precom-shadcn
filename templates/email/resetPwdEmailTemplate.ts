export const resetPasswordEmailTemplate = (to: string, url: string) => {
  console.log("in ActivateEmailTemplate");
  return `<div><span>Welcome to the Thrivology community! We&#39;re thrilled to have you here. Our commitment is to provide you with expert health guidance, valuable tips, and the latest in wellness trends.</span>
  </div>
  <div><span><br /></span>
  </div>
  <div><span>At Thrivology, we believe that every individual deserves a healthy, thriving life. Our mission is to empower you with the best resources and insights, whether you&#39;re starting on your health journey or looking to elevate it.</span>
  </div>
  <div><span><br /></span>
  </div>
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <th valign="top" align="left" style="padding: 30px 0px 0px 0px; text-align: left; font-weight: normal; line-height: 1;">
        <!--[if mso]>
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="left" style="border-collapse: separate; border-spacing: 0;">
        <tr>
          <td valign="middle" align="center" style="border-radius: 61px 61px 61px 61px; background-color: #000000; text-align:center; color: #ffffff; padding: 14px 19px 14px 19px; mso-padding-left-alt: 0; margin-left:19px;" bgcolor="#000000">
            <a class="pc-font-alt" style="display: inline-block; text-decoration: none; font-variant-ligatures: normal; font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: -0.2px; text-align: center; color: #ffffff;" href="https://designmodo.com/postcards" target="_blank">New button</a>
          </td>
        </tr>
      </table>
      <![endif]-->
        <!--[if !mso]><!-- -->
        <a style="display: inline-block; box-sizing: border-box; border-radius: 61px 61px 61px 61px; background-color: #000000; padding: 14px 19px 14px 19px; font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: -0.2px; color: #ffffff; vertical-align: top; text-align: center; text-align-last: center; text-decoration: none; -webkit-text-size-adjust: none;" href="https://designmodo.com/postcards" target="_blank">New button</a>
        <!--<![endif]-->
      </th>
    </tr>
  </table>`;
};
