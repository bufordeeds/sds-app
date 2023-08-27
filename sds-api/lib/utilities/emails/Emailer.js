const nodemailer = require('nodemailer');

const fs = require('fs');
const _ = require('lodash');

const helpers = require('../helpers');

const template_confirm = fs.readFileSync('./lib/utilities/emails/template_confirm_email.html', 'utf8');
const template_confirm_change = fs.readFileSync('./lib/utilities/emails/template_confirm_email_change.html', 'utf8');
const template_invite_new = fs.readFileSync('./lib/utilities/emails/template_invite_new_user.html', 'utf8');
const template_invite_existing = fs.readFileSync('./lib/utilities/emails/template_invite_existing_user.html', 'utf8');
const template_order_confirmation = fs.readFileSync('./lib/utilities/emails/template_order_confirmation.html', 'utf8');
const template_reset_password = fs.readFileSync('./lib/utilities/emails/template_reset_password.html', 'utf8');
const template_notify_delegate_access = fs.readFileSync('./lib/utilities/emails/template_notify_delegate_access.html', 'utf8');



// var transport = nodemailer.createTransport({
//    host: "smtp.mailtrap.io",
//    port: 2525,
//    auth: {
//       user: "ce41c3c27780f2",
//       pass: "dee31c28f44b84"
//    }
// });



// transport.sendMail({
//    from: 'test@test.org',
//    to: 'motoi@espy.ai',
//    subject: 'Test',
//    text: 'This is a test message',
// })











class Emailer {
   constructor() {
      this._transporter = nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: process.env.EMAIL_PORT,
         secureConnection: true,
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
         }
      });

      this._template_confirm = template_confirm;
      this._template_confirm_change = template_confirm_change;
      this._template_invite_new = template_invite_new;
      this._template_invite_existing = template_invite_existing;
      this.template_notify_delegate_access = template_notify_delegate_access;
      this._template_order_confirmation = template_order_confirmation;
      this._template_reset_password = template_reset_password;
   }// constructor()

   /**
    *
    * @param to   : str, email address to send to
    * @param name : str, name of person
    * @param email_code : str, confirmation code
    * @param pw_code    : str, password reset code
    */
   async send_email_confirmation({to, email_code, pw_code, name, }){

      let link = process.env.WEB_APP_BASE_URL + `/confirm?email=${to}&email_code=${email_code}&pw_reset_code=${pw_code}&new_acct=yes`

      let html = this._template_confirm.replace('CONFIRMATION_LINK', encodeURI(link))

      let year = new Date();
      year = year.getFullYear().toString();
      html = html.replace(/CURRENT_YEAR/g, year);

      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         subject: 'SDS Account Confirmation',
         html: html,
      });

      return res;
   }




   async reset_password({to,  pw_code, }){

      let link = process.env.WEB_APP_BASE_URL + `/resetPassword?email=${to}&pw_reset_code=${pw_code}`

      let html = this._template_reset_password.replace('PASSWORD_RESET_LINK', encodeURI(link))

      let year = new Date();
      year = year.getFullYear().toString();
      html = html.replace(/CURRENT_YEAR/g, year);

      let res = this._transporter.sendMail({
         // from: 'Service Dog Standards<no-reply@servicedogstandards.org>',
         from: 'no-reply@servicedogstandards.org', //todo verify that this works in production
         to: to,
         subject: 'SDS Password Reset',
         html: html,
      });

      return res;
   }










   /**
    * email sent when user changes their email address
    *
    * @param to        : str, current email address of user
    * @param new_email : str, email address to change to
    * @param code      : str, confirmation code
    * @param user_id   : str, user's id
    */
   async send_email_change_confirmation({to, new_email, code, user_id }){

      let link = process.env.WEB_APP_BASE_URL + `/confirmEmailChange?user_id=${user_id}&code=${code}&email=${new_email}`

      let html = this._template_confirm_change.replace('CONFIRMATION_LINK', encodeURI(link))
      html = html.replace('NEW_EMAIL_ADDRESS', new_email)

      let year = new Date();
      year = year.getFullYear().toString();
      html = html.replace(/CURRENT_YEAR/g, year);



      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         subject: 'SDS Email Change Confirmation',
         html: html,
      });

      return res;
   }










   /**
    *
    *
    * @param to   : str, email address to send to
    * @param code : str, confirmation code for email
    * @param inviter_email : str, email of person who invited this user
    */


   /**
    * sent when a user is invited to join by another user
    *
    * @param to            : string, email address of invited user
    * @param email_code          : string, code to confirm email
    * @param pw_code       : string, code to rest password
    * @param invite_type   : string, type of invite (Trainer, Handler)
    * @param inviter_email : string, email of the inviting user
    * @param inviter_name  : string, name of the inviting user
    *
    */
   async send_invite_new_user({to, email_code, pw_code, invite_type, inviter_email, inviter_name, dog_id}){

      let link = process.env.WEB_APP_BASE_URL + `/confirm?email=${to}&email_code=${email_code}&pw_reset_code=${pw_code}`;

      let html = this._template_invite_new.replace('CONFIRMATION_LINK', encodeURI(link));

      html = html.replace(/INVITING_USER_EMAIL/g, inviter_email);
      html = html.replace(/INVITING_USER_NAME/g, inviter_name);
      html = html.replace(/TRAINER_HANDLER/g, invite_type);

      // html = html.replace(/ONE_TIME_PASSWORD/, pass);


      let year = new Date();
      year = year.getFullYear().toString();
      html = html.replace(/CURRENT_YEAR/g, year);


      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         subject: 'SDS Registration Invitation',
         html: html,
      });

      return res;
   }


   /**
    *
    * @param to   : str, email address to send to
    * @param code : str, confirmation code
    * @param inviter_email : str, email of person who invited this user
    * @param invite_type : str, 'Trainer' | 'Hander'
    */
   async send_invite_existing_user({to, inviter_email, inviter_name, invite_type, dog_name, dog_id}){

      let link = process.env.WEB_APP_BASE_URL + `/acceptDog?email=${to}&dog_id=${dog_id}`

      let html = this._template_invite_existing.replace('CONFIRMATION_LINK', encodeURI(link));

      html = html.replace(/INVITING_USER_EMAIL/g, inviter_email);
      html = html.replace(/INVITING_USER_NAME/g, inviter_name);
      html = html.replace(/TRAINER_HANDLER/g, invite_type);
      html = html.replace(/SERVICE_DOG_NAME/g, dog_name);

      let year = new Date();
      year = year.getFullYear().toString();
      html = html.replace(/CURRENT_YEAR/g, year);

      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         subject: `SDS ${invite_type} Invitation`,
         html: html,
      });

      return res;
   }





   async send_notify_delegated_access({to, inviter_email, inviter_name,  }){

      let link = process.env.WEB_APP_BASE_URL + `/delegateAccess`

      let html = this.template_notify_delegate_access.replace('CONFIRMATION_LINK', encodeURI(link));

      html = html.replace(/INVITING_USER_EMAIL/g, inviter_email);
      html = html.replace(/INVITING_USER_NAME/g, inviter_name);



      let year = new Date();
      year = year.getFullYear().toString();
      html = html.replace(/CURRENT_YEAR/g, year);

      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         subject: `SDS Delegated Access`,
         html: html,
      });

      return res;
   }







   async send_order_confirmation({to, order, user}){


      let html = this._template_order_confirmation;



      let year = new Date();
      year = year.getFullYear().toString();
      html = html.replace(/CURRENT_YEAR/g, year);


      let order_txt = '';



      //**** add Track Oder button, if registered user ******************************************
      let html_btn = '';
      if (order.user_id != null){
         let tracking_link = process.env.WEB_APP_BASE_URL+'/orders?order_id='+ order._id.toString();
         html_btn = `
                           <tr style="padding: 0;">
                           <td align="center" valign="middle">
                              <table border="0" cellpadding="0" cellspacing="0"
                                     class="button-block is-small"
                                     style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0; mso-table-rspace: 0; table-layout: auto; border-spacing: 0; border-collapse: separate; padding: 0;">
                                 <tr style="padding: 0;">
                                    <td align="center" valign="middle" class="button"
                                        style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;  mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word; -webkit-hyphens: auto; -ms-hyphens: auto; hyphens: auto; border-collapse: collapse !important; border-radius: 0px; padding: 5px 25px;"
                                        bgcolor="#5fafe1">
                                       <a href="${tracking_link}"
                                          style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fff !important; display: block; font-size: 14px; font-weight: 500; text-decoration: none;">
                                          Track Order
                                       </a>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
         `;
      }

      html = html.replace('TRACK_ORDER_BUTTON_HTML', html_btn);



      //***** add top level details ******************************************

      let html_details = `
         <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div style="padding-right: 20px">
               <div style="font-weight: 600">
                  Ship To
               </div>
               ${order.customer_info.name} <br>
               ${order.customer_info.address.street1} <br>
               ${order.customer_info.address.city},
                ${order.customer_info.address.state} 
                ${order.customer_info.address.zip}
            </div>

            <div>              
            </div>
         </div>
      `;

      html = html.replace('CUSTOMER_ADDRESS', html_details);

      //***** add individual items ******************************************
      for (let i of order.items){
         order_txt += `
               <tr >
                  <td>
                     ${i.description}
                  </td>
                  <td style="text-align: center">
                     ${i.number}
                  </td>
                  <td style="text-align: right">
                     ${helpers.fmt_number(i.price, {places:2, prefix:'$'})}
                  </td>
               </tr>
         `;
      }


      let sh = _.get(order, 'easypost.rate_selected.list_rate', null);

      if (sh !== null){
         order_txt += `
               <tr >
                  <td>
                     Shipping & Handling
                  </td>
                  <td style="text-align: center">                     
                  </td>
                  <td style="text-align: right">
                     ${helpers.fmt_number(sh, {places:2, prefix:'$'})}
                  </td>
               </tr>
         `;

      }


      let order_total = helpers.fmt_number(order.order_total, {places:2, prefix:'$'});

      html = html.replace('ORDERED_ITEMS', order_txt);
      html = html.replace('ORDER_TOTAL', order_total);




      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         subject: `SDS Order Confirmation`,
         html: html,
      });


      return res;
   }





   // async send_order_confirmation({to, order}){
   //
   //    let link = process.env.WEB_APP_BASE_URL + `/orders`
   //
   //
   //
   //    let txt = 'Thanks for your order. \n\n';
   //
   //    txt += 'Order Details:\n';
   //
   //    for (let i of order.items){
   //       txt += i.description + ' | Price: ' + helpers.fmt_number(i.price, {places:2, prefix:'$'}) +'\n';
   //    }
   //
   //    let res = this._transporter.sendMail({
   //       from: 'no-reply@servicedogstandards.org',
   //       to: to,
   //       subject: `SDS Order Confirmation`,
   //       text: txt,
   //    });
   //
   //    return res;
   // }



   send_donation_confirmation({to, donation}){



      let txt = `Thanks for your donation of ${donation.amount}! \n\n`;





      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         subject: `SDS Donation Confirmation`,
         text: txt,
      });

      return res;
   }





   contact_us_form({email, first_name, last_name, phone, company, type, message,}){


      let to = process.env.TO_EMAIL_CONTACT_US;

      let txt = 'New Contact us form from ServiceDogStandards.org\n\n';

      txt += `First Name: ${first_name}\n`;
      txt += `Last Name: ${last_name}\n`;
      txt += `Email: ${email}\n`;
      txt += `Phone: ${phone}\n`;
      txt += `Company: ${company}\n`;
      txt += `Type: ${type}\n\n`;

      txt += `Message: ${message}\n`;


      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         // cc: email,
         subject: `Contact Us Form`,
         text: txt,
      });




      //email the user as well

      txt = `Here is a copy of your message to Service Dog Standards. If your message requires a reply, we will get back to you within one business day \n\n` + txt;
      this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: email,
         subject: `Contact Us Form`,
         text: txt,
      });


      return res;
   }



   flag_report({flagger_name, flagger_email, flagger_message, flagged_name, flagged_sds_num }){


      let to = process.env.TO_EMAIL_CONTACT_US;

      let txt = 'New Flag report\n\n';

      txt += `Flagged User: ${flagged_name}\n`;
      txt += `Flagged SDS Num: ${flagged_sds_num}\n`;

      txt += `Flagger's Name: ${flagger_name}\n`;
      txt += `Flagger's Email: ${flagger_email}\n`;

      txt += `Message: ${flagger_message}\n`;


      let res = this._transporter.sendMail({
         from: 'no-reply@servicedogstandards.org',
         to: to,
         // cc: flagger_email,
         subject: `Flag Report`,
         text: txt,
      });

      return res;
   }




}//class Email


module.exports = Emailer;



if (require.main === module && true) {
   async function test(){
      require('env2')('.env-dev');

      let email = new Emailer();



      try{
         let res = await email.send_email_confirmation({to: 'ebc@espy.ai', name: 'John', code: 'ljklkjkljkl'})
      }
      catch (e) {
         console.error(e)
      }


   }


   test();

} // end testing code


