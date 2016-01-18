
 $(document).ready(function(){

     $('#nav_menu').change(function(event){
         if($(event.target).val != ""){
             window.location.href=$(event.target).val();
         }

     });



});
