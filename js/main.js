
 $(document).ready(function(){
     $('.success').hide();
     $('.failure').hide();
     $('contactForm').submit(function(event){
         event.preventDefault();
         var formData = $(this).serialize();
         $.post('mail.php','formData',status);
          function status(data){
              if(data == 'pass'){
                  window.location.href('../Contacts.html');
                  $('.success').show();
              }
              else{
                  window.location.href('../Contacts.html');
                  $('.failure').show();

              }
          }

     });

});
