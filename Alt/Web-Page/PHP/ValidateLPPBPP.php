<?php
// define variables and set to empty values
$first_nameErr = $last_nameErr = $middle_initialErr = $service_addressErr = $cityErr = $stateErr = $zipErr = $emailErr = $account_numberErr = $phone1Err = $phone2Err = $program_choiceErr = $agreementErr = ""; 
$first_name = $last_name = $middle_initial = $service_address = $city = $state = $zip = $email = $account_number = $phone1 = $phone2 = $program_choice = $agreement = ""; 


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$first_name = user_input($_POST["first_name"]);
	$last_name = user_input($_POST["last_name"]);
	$middle_initial = user_input($_POST["middle_initial"]);
	$service_address = user_input($_POST["service_address"]);
	$city = user_input($_POST["city"]);
	$zip = user_input($_POST["zip"]);
	$account_number = user_input($_POST["account_number"]);
	$ = user_input($_POST["first_name"]);
	$ = user_input($_POST["first_name"]);
	$ = user_input($_POST["first_name"]);
	$ = user_input($_POST["first_name"]);
	$ = user_input($_POST["first_name"]);
	
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}





echo "<h2>Your Input:</h2>";
echo $state;
echo "<br>";
echo $program_choice;
echo "<br>";
echo $email;
echo "<br>";
echo $agreement;
echo "<br>";
echo $first_name;
echo "<br>";
echo $last_name
echo "<br>";
echo $middle_initial
echo "<br>";
echo $service_address
echo "<br>";
echo $account_number
echo "<br>";
echo $city
echo "<br>";
echo $zip
?>
	