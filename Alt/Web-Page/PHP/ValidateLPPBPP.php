<?php
// define variables and set to empty values
$first_nameErr = $last_nameErr = $middle_initialErr = $service_addressErr = $cityErr = $stateErr = $zipErr = $emailErr = $account_numberErr = $phone1Err = $phone2Err = $program_choiceErr = $agreementErr = ""; 
$first_name = $last_name = $middle_initial = $service_address = $city = $state = $zip = $email = $account_number = $phone1 = $phone2 = $program_choice = $agreement = ""; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	//should be able to handle validation
	if (empty($_POST["first_name"])) {
		$first_nameErr = "First Name is Required";
	} else {
	$first_name = user_input($_POST["first_name"]);
		if (!preg_match("/^[a-zA-Z ]*$/",first_name)) {
			$first_nameErr = "Only letters and white space allowed";
		}
	}
	
	//should be able to handle validation
	if (empty($_POST["last_name"])) {
		$last_nameErr = "Last Name is Required";
	} else {
	$last_name = user_input($_POST["last_name"]);
		if (!preg_match("/^[a-zA-Z ]*$/",last_name)) {
			$last_nameErr = "Only letters and white space allowed";
		}
	}
	
	// should be able to handle validation 
	if (empty($_POST["middle_initial"])) {
		$middle_initialErr = "";
	} else {
	$middle_initial = user_input($_POST["middle_initial"]);
		if (!preg_match("/^[a-zA-Z ]*$/",middle_initial)) {
			$middle_initialErr = "Only letters and white space allowed";
	
	}
	
	//should be able to handle validation
	if (empty($_POST["service_address"])) {
		$service_addressErr = "Service Address Required";
	} else {
	$service_address = user_input($_POST["service_address"]);
		if (!preg_match("/^[a-zA-Z0-9 ]*$/",service_address)) {
			$service_addressErr = "Only letters, numbers, and white space allowed";
		}
	}
	// should be good to handle validation
	if (empty($_POST["city"])) {
		$cityErr = "City is Required";
	} else {
	$city = user_input($_POST["city"]);
		if (!preg_match("/^[a-zA-Z ]*$/",city)) {
			$cityErr = "Only letters and white space allowed";
		}
	}
	
	//still needs completion
	
	if (empty($_POST["state"])) {
		$stateErr = "State is Required";
	} else {
	$state = user_input($_POST["state"]);
	}
	
	// should be able to handle 5 digit zipcodes
	if (empty($_POST["zip"])) {
		$zipErr = "Zip Code Required"
	} else {
	$zip = user_input($_POST["zip"]);
		if (!preg_match("/^[0-9 ]{5}$/",zip)) {
			$zipErr = "Only numbers allowed";
		}
	}
	
	// should be able to handle emails 
	if (empty($_POST["email"])) {
		$emailErr = "Email is Required"
	} else {
	$email = user_input($_POST["email"]);
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
			$emailErr = "Valid email is Required"
		}
	}
	//should be good to cover 7 & 8 digit input as well as 11 & 12 character input
	if (empty($_POST["account_number"])) {
		$account_numberErr = "Account Number is Required";
	} else {
	$account_number = user_input($_POST["account_number"]);
		if(preg_match("/^([0-9]{7,8})(-[0-9]{3})*$/",account_number)) {
			$account_numberErr = "Account Number Invalid";
		}
	
	}
	//should be able to handle validation
	if (empty($_POST["phone1"])) {
		$phone1Err = "Phone Number Required";
	} else {
	$phone1 = user_input($_POST["phone1"]);
		if(preg_match("/^([0-9]{3}-[0-9]{3}-[0-9]{4})|([0-9]{10})|\([0-9]{3}\)[0-9]{7}$/", $phone1)) {
		  // $phone is valid
		}
	}
	//should be able to handle validation
	if (empty($_POST["phone2"])) {
		$phone2Err = "";
	} else {	
	$phone2 = user_input($_POST["phone2"]);
			if(preg_match("/^([0-9]{3}-[0-9]{3}-[0-9]{4})|([0-9]{10})|\([0-9]{3}\)[0-9]{7}$/", $phone2)) {
		  // $phone is valid
		}
	}
	
	// still need to be done 
	if (empty($_POST["program_choice"])) {
		$program_choiceErr = "Program is Required"
	} else {
	$program_choice = user_input($_POST["program_choice"]);
	}
	//still need to be  done 
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
	