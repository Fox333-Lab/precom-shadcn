import React from "react";

const EmailHeader = (user: string, title: string, contentTemplate: any) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="https://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
   <meta charset="UTF-8" />
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <!--[if !mso]><!-- -->
   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <!--<![endif]-->
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta name="format-detection" content="telephone=no" />
   <meta name="format-detection" content="date=no" />
   <meta name="format-detection" content="address=no" />
   <meta name="format-detection" content="email=no" />
   <meta name="x-apple-disable-message-reformatting" />
   <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:ital,wght@0,200;1,200;0,300;1,300;0,400;1,400;0,600;1,600;0,700;1,700;0,800;1,800;0,900;1,900" rel="stylesheet" />
   <title>Thrivology</title>
   <style>
   html,
           body {
               margin: 0 !important;
               padding: 0 !important;
               min-height: 100% !important;
               width: 100% !important;
               -webkit-font-smoothing: antialiased;
           }
   
           * {
               -ms-text-size-adjust: 100%;
           }
   
           #outlook a {
               padding: 0;
           }
   
           .ReadMsgBody,
           .ExternalClass {
               width: 100%;
           }
   
           .ExternalClass,
           .ExternalClass p,
           .ExternalClass td,
           .ExternalClass div,
           .ExternalClass span,
           .ExternalClass font {
               line-height: 100%;
           }
   
           table,
           td,
           th {
               mso-table-lspace: 0 !important;
               mso-table-rspace: 0 !important;
               border-collapse: collapse;
           }
   
           u + .body table, u + .body td, u + .body th {
               will-change: transform;
           }
   
           body, td, th, p, div, li, a, span {
               -webkit-text-size-adjust: 100%;
               -ms-text-size-adjust: 100%;
               mso-line-height-rule: exactly;
           }
   
           img {
               border: 0;
               outline: 0;
               line-height: 100%;
               text-decoration: none;
               -ms-interpolation-mode: bicubic;
           }
   
           a[x-apple-data-detectors] {
               color: inherit !important;
               text-decoration: none !important;
           }
   
           .pc-gmail-fix {
               display: none;
               display: none !important;
           }
   
           @media (min-width: 621px) {
               .pc-lg-hide {
                   display: none;
               } 
   
               .pc-lg-bg-img-hide {
                   background-image: none !important;
               }
           }
   </style>
   <style>
   @media (max-width: 620px) {
   .pc-project-body {min-width: 0px !important;}
   .pc-project-container {width: 100% !important;}
   .pc-sm-hide {display: none !important;}
   .pc-sm-bg-img-hide {background-image: none !important;}
   .pc-w620-padding-30-0-0-0 {padding: 30px 0px 0px 0px !important;}
   .pc-w620-fontSize-58px {font-size: 58px !important;}
   .pc-w620-itemsSpacings-0-30 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 15px !important;padding-bottom: 15px !important;}
   table.pc-w620-spacing-0-30-0-0 {margin: 0px 30px 0px 0px !important;}
   td.pc-w620-spacing-0-30-0-0,th.pc-w620-spacing-0-30-0-0{margin: 0 !important;padding: 0px 30px 0px 0px !important;}
   .pc-w620-padding-0-0-0-0 {padding: 0px 0px 0px 0px !important;}
   .pc-w620-padding-60-20-10-20 {padding: 60px 20px 10px 20px !important;}
   table.pc-w620-spacing-0-0-0-0 {margin: 0px 0px 0px 0px !important;}
   td.pc-w620-spacing-0-0-0-0,th.pc-w620-spacing-0-0-0-0{margin: 0 !important;padding: 0px 0px 0px 0px !important;}
   
   .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
   .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
   .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
   .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;}
   .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
   .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
   .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
   .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}
   
   .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}
   
   .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
   .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
   .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
   .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
   .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
   .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
   }
   </style>
   <!--[if !mso]><!-- -->
   <style>
   @media all { @font-face { font-family: 'Nunito Sans'; font-style: normal; font-weight: 300; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GiClXvVUj.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GiClXvVUl.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G1ilXvVUj.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G1ilXvVUl.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GMS5XvVUj.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GMS5XvVUl.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: normal; font-weight: 600; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GCC5XvVUj.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GCC5XvVUl.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: normal; font-weight: 800; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVi5XvVUj.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVi5XvVUl.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: normal; font-weight: 200; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVilXvVUj.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVilXvVUl.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: italic; font-weight: 400; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmqP92UpK_Q.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmqP92UpK_I.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: italic; font-weight: 700; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpo8GUpK_Q.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpo8GUpK_I.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: italic; font-weight: 800; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP8GUpK_Q.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP8GUpK_I.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: italic; font-weight: 600; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpR8GUpK_Q.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpR8GUpK_I.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: italic; font-weight: 900; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmom8GUpK_Q.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmom8GUpK_I.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: normal; font-weight: 900; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4Gfy5XvVUj.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4Gfy5XvVUl.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: italic; font-weight: 300; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmrR92UpK_Q.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmrR92UpK_I.woff2') format('woff2'); } @font-face { font-family: 'Nunito Sans'; font-style: italic; font-weight: 200; src: url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP92UpK_Q.woff') format('woff'), url('https://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP92UpK_I.woff2') format('woff2'); } }
   </style>
   <!--<![endif]-->
   <!--[if mso]>
      <style type="text/css">
          .pc-font-alt {
              font-family: Arial, Helvetica, sans-serif !important;
          }
      </style>
      <![endif]-->
   <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
  </head>
  
  <body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #ffffff;" bgcolor="#ffffff">
   <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color:#ffffff;" bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
    <tr>
     <td align="center" valign="top">
      <table class="pc-project-container" style="width: 600px; max-width: 600px;" width="600" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
       <tr>
        <td class="pc-w620-padding-30-0-0-0" style="padding: 20px 0px 20px 0px;" align="left" valign="top">
         <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
          <tr>
           <td valign="top">
            <!-- BEGIN MODULE: Personal Letter -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
             <tr>
              <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                 <td valign="top" class="pc-w620-padding-60-20-10-20" style="padding: 20px 40px 20px 40px; border-radius: 0px; background-color: transparent;" bgcolor="transparent">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td valign="top" style="padding: 0px 0px 60px 0px;">
                     <img src="https://cloudfilesdm.com/postcards/image-17167163581170.png" class="" width="160" height="37" alt="" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width:160px; height: auto; max-width: 100%;" />
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="left" valign="top" style="padding: 0px 0px 40px 0px;">
                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                       <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                        <div class="pc-font-alt pc-w620-fontSize-58px" style="line-height: 107%; letter-spacing: -0.2px; font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; font-size: 62px; font-weight: 200; font-variant-ligatures: normal; color: #000a28; text-align: left; text-align-last: left;">
                         <div><span>${title}</span>
                         </div>
                        </div>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="left" valign="top" style="padding: 0px 0px 0px 0px;">
                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                       <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                        <div class="pc-font-alt" style="line-height: 160%; letter-spacing: 0px; font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; font-variant-ligatures: normal; color: #000a28; text-align: left; text-align-last: left;">
                         <div><span>Hello ${user},</span>
                         </div>
                         <div><span><br /></span>
                         </div>
                         <!--<div><span>Welcome to the Thrivology community! We&#39;re thrilled to have you here. Our commitment is to provide you with expert health guidance, valuable tips, and the latest in wellness trends.</span>
                         </div>
                         <div><span><br /></span>
                         </div>
                         <div><span>At Thrivology, we believe that every individual deserves a healthy, thriving life. Our mission is to empower you with the best resources and insights, whether you&#39;re starting on your health journey or looking to elevate it.</span>
                         </div>
                         <div><span><br /></span>
                         </div>-->
                         ${contentTemplate}
                         <!--<div><span style="font-weight: 700;font-style: normal;line-height: 250%;">Featured Health Tips:</span>
                         </div>
                         <ol style="margin: 0; padding: 0 0 0 20px; list-style: arabic;">
                          <li><span style="font-weight: 700;font-style: normal;">Hydrate Smart:</span><span> Drink at least 8 glasses of water daily. Infuse with lemon or cucumber for added benefits.</span>
                          </li>
                          <li><span style="font-weight: 700;font-style: normal;">Regular Movement:</span><span> A 15-minute walk daily can significantly improve your cardiovascular health.</span>
                          </li>
                          <li><span style="font-weight: 700;font-style: normal;">Balanced Diet:</span><span> Focus on whole foods like vegetables, fruits, and lean proteins for optimum vitality.</span>
                          </li>
                         </ol>
                         <div><span><br /></span>
                         </div>
                         <div><span style="font-weight: 700;font-style: normal;line-height: 250%;">Success Stories</span><span><br/>Read about </span><a href="https://designmodo.com/postcards/" style="text-decoration: none; color: #000a28;"><span style="text-decoration: underline;color: rgb(0, 124, 204);">Mark&#39;s journey from fatigue</span></a><span> to full energy in just 2 months with our tailored wellness program. Your story could be next!</span>
                         </div>
                         <div><span><br /></span>
                         </div>
                         <div><span style="font-weight: 700;font-style: normal;line-height: 250%;">Special Offers</span><span><br/>As a warm welcome, enjoy a 15% discount on our premium wellness package. Use code: WELCOME15 at checkout.</span>
                         </div>-->
                        </div>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
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
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                   <tr>
                    <td valign="top" style="padding: 40px 0px 40px 0px;">
                     <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: auto;">
                      <tr>
                       <!--[if gte mso 9]>
                      <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #cccccc;">&nbsp;</td>
                  <![endif]-->
                       <!--[if !gte mso 9]><!-- -->
                       <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #cccccc;">&nbsp;</td>
                       <!--<![endif]-->
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="left" style="padding: 0px 0px 30px 0px;">
                     <table class="pc-width-hug pc-w620-gridCollapsed-1" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr class="pc-grid-tr-first pc-grid-tr-last">
                       <td class="pc-grid-td-first pc-w620-itemsSpacings-0-30" valign="middle" style="padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 0px;">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0; width: 100%;">
                         <tr>
                          <td align="left" valign="middle">
                           <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                             <td align="left" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td class="pc-w620-spacing-0-30-0-0" valign="top" style="padding: 0px 0px 0px 0px;">
                                 <a class="pc-font-alt" href="https://designmodo.com/postcards/" target="_blank" style="text-decoration: none;">
                                  <img src="https://cloudfilesdm.com/postcards/89120808eeaf345d35614179b0bf4ab3.png" class="" width="20" height="20" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width:20px; height:20px;" alt="" />
                                 </a>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                       <td class="pc-w620-itemsSpacings-0-30" valign="middle" style="padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 15px;">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0; width: 100%;">
                         <tr>
                          <td align="left" valign="middle">
                           <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                             <td align="left" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td class="pc-w620-spacing-0-30-0-0" valign="top" style="padding: 0px 0px 0px 0px;">
                                 <a class="pc-font-alt" href="https://designmodo.com/postcards/" target="_blank" style="text-decoration: none;">
                                  <img src="https://cloudfilesdm.com/postcards/ee6731b3040d45f55f653008923b2b7f.png" class="" width="23" height="23" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width:23px; height:23px;" alt="" />
                                 </a>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                       <td class="pc-w620-itemsSpacings-0-30" valign="middle" style="padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0;">
                         <tr>
                          <td align="left" valign="middle">
                           <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                             <td align="left" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td class="pc-w620-spacing-0-30-0-0" valign="top" style="padding: 0px 0px 0px 0px;">
                                 <a class="pc-font-alt" href="https://designmodo.com/postcards/" target="_blank" style="text-decoration: none;">
                                  <img src="https://cloudfilesdm.com/postcards/1fb26efe0bbf4ca78d19744139fd2a56.png" class="" width="21" height="21" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width:21px; height:21px;" alt="" />
                                 </a>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                       <td class="pc-grid-td-last pc-w620-itemsSpacings-0-30" valign="middle" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0;">
                         <tr>
                          <td align="left" valign="middle">
                           <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                             <td align="left" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td valign="top">
                                 <a class="pc-font-alt" href="https://designmodo.com/postcards/" target="_blank" style="text-decoration: none;">
                                  <img src="https://cloudfilesdm.com/postcards/2dbdd08c3b32db26a0373bf0c4fad206.png" class="" width="20" height="20" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width:20px; height:20px;" alt="" />
                                 </a>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="left" valign="top" style="padding: 0px 0px 20px 0px;">
                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                       <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                        <div class="pc-font-alt" style="line-height: 20px; letter-spacing: -0.2px; font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #000a28; text-align: left; text-align-last: left;">
                         <div><span>Thrivology Co,</span>
                         </div>
                         <div><span>King Street, 2901 Marmara Road, <br/>New‌ York, NY, 11234-1090</span>
                         </div>
                        </div>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                   <tr>
                    <td valign="top" align="left">
                     <div class="pc-font-alt" style="line-height: 24px; letter-spacing: -0.2px; font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #000a28; text-decoration: underline; text-align: left; text-align-last: left;">
                      <div><span style="text-decoration: underline;">Unsubscribe</span>
                      </div>
                     </div>
                    </td>
                   </tr>
                  </table>
                 </td>
                </tr>
               </table>
              </td>
             </tr>
            </table>
            <!-- END MODULE: Personal Letter -->
           </td>
          </tr>
         </table>
        </td>
       </tr>
      </table>
     </td>
    </tr>
   </table>
   <!-- Fix for Gmail on iOS -->
   <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
   </div>
  </body>
  </html>`;
};

export default EmailHeader;
