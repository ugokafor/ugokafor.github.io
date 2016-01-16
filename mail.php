<?php
 function sendMail(){
     if (!empty($_POST['email']) && !empty($_POST['name']) && !empty($_POST['message'])) {
         $email = $_POST['email'];
         $message = $_POST['message'];
         $to = 'nriagudubem@yahoo.com' . ', ';
         $to .= 'nrigudubem@gmail.com';
         $header = 'From:' . $email;
         $subject = 'jabros.com.ng';

         mail($to, $subject, $message, $header);
         if (mail($to, $subject, $message, $header)) {


       redirect();
             return 'pass';
         }
     }
     else{
         echo" there is an error";

     }
 }
sendMail();
 function redirect(){
      header('Location:/Contacts.html');
 }