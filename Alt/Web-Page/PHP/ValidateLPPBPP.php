<?php
// define variables and set to empty values
$first_nameErr = $last_nameErr = $middle_initialErr = $service_addressErr = $cityErr = $stateErr = $zipErr = $emailErr = $account_numberErr = $phone1Err = $phone2Err = $program_choiceErr = $agreementErr = ""; 
$first_name = $last_name = $middle_initial = $service_address = $city = $state = $zip = $email = $account_number = $phone1 = $phone2 = $program_choice = $agreement = ""; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	if (empty($_POST["Err"])) {
		$first_nameErr = "First Name is Required";
	} else {
	$first_name = user_input($_POST["first_name"]);
		if (!preg_match("/^[a-zA-Z ]*$/",first_name)) {
			$first_nameErr = "Only letters and white space allowed";
		}
	}
	if (empty($_POST["Err"])) {
		$last_nameErr = "Last Name is Required";
	} else {
	$last_name = user_input($_POST["last_name"]);
		if (!preg_match("/^[a-zA-Z ]*$/",last_name)) {
			$last_nameErr = "Only letters and white space allowed";
		}
	}
	if (empty($_POST["middle_initial"])) {
		$middle_initialErr = "";
	} else {
	$middle_initial = user_input($_POST["middle_initial"]);
	}
	if (empty($_POST["service_address"])) {
		$service_addressErr = "Service Address Required";
	} else {
	$service_address = user_input($_POST["service_address"]);
	}
	if (empty($_POST["city"])) {
		$cityErr = "City is Required";
	} else {
	$city = user_input($_POST["city"]);
	}
	if (empty($_POST["state"])) {
		$stateErr = "State is Required";
	} else {
	$state = user_input($_POST["state"]);
	}
	if (empty($_POST["zip"])) {
		$zipErr = "Zip Code Required"
	} else {
	$zip = user_input($_POST["zip"]);
	}
	if (empty($_POST["email"])) {
		emailErr = "Email is Required"
	} else {
	$email = user_input($_POST["email"]);
	}
	if (empty($_POST["account_number"])) {
		account_numberErr = "Account Number is Required";
	} else {
	$account_number = user_input($_POST["account_number"]);
	}
	if (empty($_POST["phone1"])) {
		phone1Err = "Phone Number Required";
	} else {
	$phone1 = user_input($_POST["phone1"]);
	}
	if (empty($_POST["phone2"])) {
		phone2Err = "";
	} else {	
	$phone2 = user_input($_POST["phone2"]);
	}
	if (empty($_POST["program_choice"])) {
		$program_choiceErr = "Program is Required"
	} else {
	$program_choice = user_input($_POST["program_choice"]);
	}
	if (empty($_POST["agreement"])) {
		$agreementErr = "Agreement must be Checked to Proceed";
	} else {
	$agreement = user_input($_POST["agreement"]);
	}
}

function user_input($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
?>
	$ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ 