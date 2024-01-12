import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const data = await req.body;
    const { inquirer_name, email, message, budget } = JSON.parse(data);
    
  if (!inquirer_name || !email || !message) {
    return res.json({
      message: 'Please fill all fields',
      success: false,
    });
  }

  try {
    const sendResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'olawanletemitayo@gmail.com',
      subject: 'New Inquiry',
      html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<style type="text/css">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
    p {
      color: #465054;
      font-family: 'Open Sans', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.875rem;
    }

    a{
      color: #171b40;
      font-family: 'Open Sans', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.875rem;
      margin-top: 1rem;
      text-decoration: underline;
    }
</style>
  <title>New Inquiry Received</title>
</head>
<body style="font-family: 'Open Sans, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #f7f7f7; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
    <div style="padding: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border-radius: 10px; background: #171b40";>Portfolio</div>
    <h2 style="color: #171b40; margin-bottom: 10px;">New Inquiry Received</h2>
    <p>Hello Temitayo,</p>
    <p>We are pleased to inform you of a new inquiry that has been submitted via your contact form. The details are as follows:</p>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
      <p><strong>Inquirer's Name:</strong> ${inquirer_name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
    <a href="https://temmy-portfolio-v2.vercel.app">Go to Website</a><br>
  </div>
</body>
</html>`,
    });
      
    if (sendResponse.data) {
      res.json({
        message: 'Submitted Successfully',
        sucess: 'true',
      });
    }
  } catch (error) {
      console.log(error);
  }
}
