<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["name"], $_POST["email"], $_POST["message"])) {
        $name = htmlspecialchars($_POST["name"]);
        $email = htmlspecialchars($_POST["email"]);
        $message = htmlspecialchars($_POST["message"]);

        $mail = new PHPMailer(true);

        try {
            $mail->SMTPDebug = 2; // Enable verbose debugging for troubleshooting
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'akilasampathbcg@gmail.com
';
$mail->Password = '20060705AKILA#z'; // Replace with App Password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Use ENCRYPTION_SMTPS instead of STARTTLS
$mail->Port = 465; // Use port 465 for SMTPS

            $mail->setFrom($email, $name);
            $mail->addAddress('akilasampathbcg@gmail.com');
            $mail->Subject = 'New Message from Website';
            $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

            $mail->send();
            echo "Message sent successfully!";
        } catch (Exception $e) {
            echo "Message could not be sent. Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "Please fill in all the required fields.";
    }
} else {
    echo "Invalid request.";
}
?>