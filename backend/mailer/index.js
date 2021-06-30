import nodemailer from 'nodemailer'
// import sendgrid from '@sendgrid/mail'
// export default async function main() {
//   try {
//     console.log(
//       process.env.PORT,
//       process.env.MAIL_USERNAME,
//       process.env.MAIL_PASSWORD,
//       process.env.OAUTH_CLIENT_ID,
//       process.env.OAUTH_CLIENT_SECRET
//     )

//     let transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         type: 'OAuth2',
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//         clientId: process.env.OAUTH_CLIENT_ID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//       },
//     })

//     let info = await transporter.sendMail({
//       from: 'info@watch-expert.ru',
//       to: 'maximu.rudenko@gmail.com',
//       subject: 'Hello from gmail ✔',
//       text: 'Hello world?',
//       html: '<b>Hello world?</b>',
//     })

//     console.log('Message sent: %s', info.messageId)
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const sendEmail = async (emailOptions) => {
//   try {
//     console.log(process.env.SENDGRID_API_KEY)
//     sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
//     return await sendgrid.send({
//       from: process.env.EMAIL_FROM,
//       ...emailOptions,
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
//
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.timeweb.ru',
    port: 2525,
    secureConnection: false,
    auth: {
      user: process.env.MAIL_TIMEWEB,
      pass: process.env.MAIL_TIMEWEB_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  })

  return transporter
}

export const sendEmailTimeweb = async (emailOptions) => {
  try {
    const emailTransporter = createTransporter()
    return await emailTransporter.sendMail({
      from: process.env.MAIL_TIMEWEB,
      ...emailOptions,
    })
  } catch (error) {
    console.log(error)
  }
}
