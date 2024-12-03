function resetPasswordEmailTemplate(url: string) {

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - QuickCart</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reset Your Password</h1>
        <p>Hello,</p>
        <p>We received a request to reset your password for your QuickCart account. If you didn't make this request, you can ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <p>
            <a href="${url}" class="button">Reset Password</a>
        </p>
        <p>Or copy and paste this URL into your browser:</p>
        <p>${url}</p>
        <p>This link will expire in 30 minutes for security reasons.</p>
        <p>If you have any questions or concerns, please contact our support team.</p>
        <p>Best regards,<br>The QuickCart Team</p>
    </div>
</body>
</html>`

};

export default resetPasswordEmailTemplate