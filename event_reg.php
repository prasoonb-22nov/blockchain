<?php
if(isset($_REQUEST['submit']) && $_REQUEST['submit']=='Register')
{
    $servername = "localhost";
    $username = "blockchain";
    $password = "truefalse";
    $dbname = "blockchain";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $event_name = 'FROM LOCAL TO GLOBAL....';
    $name  = $_REQUEST['name'];
    $email  = $_REQUEST['email'];
    $cat  = $_REQUEST['cat'];
    $reach  = $_REQUEST['reach'];
    $desc  = $_REQUEST['desc'];
    $subs  = $_REQUEST['subs'];

    $sql = "INSERT INTO subscription_list (event_name, name, email, cat, reach, descc, subs)
            VALUES ('$event_name', '$name', '$email', '$cat', '$reach', '$desc', '$subs')";

    if($conn->query($sql) === TRUE)
    {
      $success=true;
    }
    else
    {
        $success=false;
    }

    $conn->close();

}
?>
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <link href="assets/images/favicon.png" rel="icon">
    <link href="assets/images/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700"
          rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
    <!-- Bootstrap CSS File -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.3/css/bootstrap.min.css"
          rel="stylesheet">

    <!-- Libraries CSS Files -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.0/css/ionicons.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="assets/lib/lightbox/css/lightbox.min.css" rel="stylesheet">
    <link href="https://unpkg.com/tippy.js@4/themes/light.css" rel="stylesheet"/>
    <link href="https://unpkg.com/aos@next/dist/aos.css" rel="stylesheet"/>
    <!-- Main Stylesheet File -->
    <link href="assets/css/style.css" rel="stylesheet">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body style="margin: 0 auto; text-align: center;">
  <p><img width="30%" src="image_2020_04_17T05_00_21_439Z.png"></p>
  <?php if(!isset($_REQUEST['submit'])): ?>
  <form method="post" action="">
  <table style="text-align: center;margin: 0 auto">
    <tr>
      <td style="text-align: left;">Name </td><td style="text-align: left;"><input required type="tex" name="name"></td>
    </tr>
    <tr>
      <td style="text-align: left;">Email Id </td><td style="text-align: left;"><input required type="email" name="email"></td>
    </tr>
    <tr>
      <td style="text-align: left;">City </td><td style="text-align: left;"><input required type="text" name=""></td>
    </tr>
    <tr>
      <td style="text-align: left;">Category</td><td style="text-align: left;"><input checked id="cat" type="radio" name="cat" value="1"> Student &nbsp;&nbsp;<input id="cat" value="2" type="radio" name="cat"> Startup&nbsp;&nbsp;<input value="3" type="radio" id="cat" name="cat"> Developer&nbsp;&nbsp;<input value="4" type="radio" id="cat" name="cat"> Professional</td>
    </tr>
    <tr>
      <td style="text-align: left;">How did you hear about us?</td><td style="text-align: left;"><input value="1" checked type="radio" name="reach"> Media &nbsp;&nbsp;<input value="2" type="radio" name="reach"> Internet&nbsp;&nbsp;<input value="3" type="radio" name="reach"> University
    </tr>
    <tr>
      <td style="text-align: left;">Which specific area or use case of blockchain are you most interested in?</td><td style="text-align: left;"><textarea name="desc"></textarea>
    </tr>
    <tr>
      <td style="text-align: left;">Subscribe yourself for BC centre</td><td style="text-align: left;"><input value="1" checked type="radio" name="subs"> Yes &nbsp;&nbsp;<input value="0" type="radio" name="subs"> No
    </tr>
    <tr><td></td><td style="text-align: left;"><input type="submit" name="submit" value="Register"></td></tr>

  </table>
</form>
<?php endif; ?>
<?php if($success): ?>
  <p>Success. You have been registered!</p>
<?php endif; ?>

<!-- <?php if(!$success): ?>
  <p>Failed. Sorry Unable to registered, Please try later</p>
<?php endif; ?> -->


</body>
<style type="text/css">
  td{
    padding: 5px;
  }

  body{
    --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  }
</style>
</html>
