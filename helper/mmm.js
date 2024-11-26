// // استيراد مكتبة Nodemailer
// var nodemailer = require('nodemailer');

// // إعداد وسيلة الإرسال (Transporter)
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'hakeem515kom@gmail.com', // بريد المرسل
//     pass: '@Abd0930112994
//     '           // كلمة المرور أو "كلمة مرور التطبيقات"
//   }
// });

// // إعداد خيارات البريد الإلكتروني
// var mailOptions = {
//   from: 'hakeem515kom@gmail.com',                // بريد المرسل
//   to: 'abdulrahmanhaythamx.@gmail.com',          // بريد المستلم
//   subject: 'رسالة تجريبية باستخدام Node.js',    // عنوان البريد
//   text: 'مرحبًا عبد الرحمن، هذه رسالة تم إرسالها باستخدام Node.js و Nodemailer!' // محتوى البريد
// };

// // إرسال البريد الإلكتروني
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log('خطأ أثناء الإرسال: ', error);
//   } else {
//     console.log('تم إرسال البريد بنجاح: ' + info.response);
//   }
// });
// // 