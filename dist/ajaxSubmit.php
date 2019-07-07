<?php


$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

echo($name);
echo($email);
echo($message);


$header = "From:" . $email . "\r\n";
$header .= "X-Mailer: PHP /" . phpversion() . "\r\n";
$header .= "Mime Version: 1.0 \r\n";
$header .= "Content Type: text/plain";

$comment = "This message has been sent by " . $name .  "\r\n";
$comment .= "E-mail it´s: ". $email .  "\r\n";
$comment .= 'He´s message is: ' . $message .  "\r\n";

$for =  "kurkowski.m.a@gmail.com";
$subject = "Contact from website";

echo('<br>'.$header.'<br>');
print phpinfo();

mail($subject, utf8_decode($comment), $header );
mail($for,$subject,$comment);

echo json_encode(array(
		'Message' => sprintf("Your message has been sent %s", $name)
));
