<?php
	require 'class.phpmailer.php';

	$cfg = array();
	$cfg['exts'] = array('jpg', 'png');
	$cfg['mimes'] = array('image/jpeg', 'image/png');
	$cfg['maxsize'] = 10000000;
	$cfg['page_url'] = 'http://sebastiensim.github.io/scrapyourcar/';
	$cfg['page_email'] = 'noreply@scrap.com';
	$cfg['page_emailname'] = 'Scrap Contact Form';
	$cfg['page_mailto'] = 'wsbastian@gmail.com';

	if (isset($_POST['gs_name']) && isset($_POST['gs_icnumber']) && isset($_POST['gs_tel']) && isset($_POST['gs_email']) && isset($_POST['gs_vnumber']) && isset($_FILES['gs_photos']) && isset($_POST['gs_date'])){
		$photos = array();
		foreach($_FILES['gs_photos'] as $fkey => $fouter) foreach($fouter as $fnum => $f) $photos[$fnum][$fkey] = $f;

		//Validation
		$msg = '';
		if (strlen($_POST['gs_name']) < 3) $msg .= '<li>Name must be at least 3 characters long</li>';
		if (strlen($_POST['gs_icnumber']) != 9) $msg .= '<li>Ic number must be exactly 9 characters</li>';
		if (!is_numeric($_POST['gs_tel'])) $msg .= '<li>Phone number should be only digits</li>';
		if (!filter_var($_POST['gs_email'], FILTER_VALIDATE_EMAIL))	$msg .= '<li>Email supplied appears to be incorrect</li>';
		if (count($photos) < 5) $msg .= '<li>You need to attach at least 5 files</li>';
		if (strtotime($_POST['gs_date']) < strtotime(date('d-m-Y'))) $msg .= '<li>Scrap date must be today or in future</li>';
		if ($msg != '') printError($msg);

		//Preparing data, uploading files
		do{
			$uid = dechex(time()) . dechex(rand(0,15));
			$location = 'scraps/' . $uid . '/';
		} while (file_exists($location));
		mkdir($location);
		$filelocs = uploadFiles($location, $photos);

		$content = "Name: {$_POST['gs_name']}\n"
					."IC Number: {$_POST['gs_icnumber']}\n"
					."Contact Number: {$_POST['gs_tel']}\n"
					."Email: {$_POST['gs_email']}\n"
					."Vehicle Number: {$_POST['gs_vnumber']}\n"
					."Scrap Date: {$_POST['gs_date']}\n"
					."Unique ID: {$uid}\n";

		$file = fopen($location . 'data.txt' , 'w');
		fwrite($file, $content);
		fclose($file);

		$htmlcontent = str_replace("\n", "<br>", $content);
		$altcontent = $content;
		foreach ($filelocs as $fl){
			$htmlcontent .= "<img src='{$cfg['page_url']}{$fl}' alt='image'/>";
			$altcontent .= "Image Link:{$cfg['page_url']}{$fl} \n";
		}

		$mail = new PHPMailer;
		$mail->SMTPDebug = 3;
		$mail->From = $cfg['page_email'];
		$mail->FromName = $cfg['page_emailname'];
		$mail->addAddress($cfg['page_mailto']);
		$mail->isHTML(true);
		$mail->Subject = 'Scrap Contact Form';
		$mail->Body = $htmlcontent;
		$mail->AltBody = $altcontent;
		$mail->send();
		$ret = array();
		$ret['state'] = 'Success';
		echo json_encode($ret);
		exit;
	}
	else{
		printError('<li>Please fill all the fields.</li>');
	}

	function printError($e){
		$ret = array();
		$ret['state'] = 'Error';
		$ret['msg'] = 'There were some erorrs: <ul>' . $e . '</ul>';
		echo json_encode($ret);
		exit;
	}

	function removeFolder($location){
		array_map('unlink', glob("{$location}*.*"));
		rmdir($location);
	}

	function uploadFiles($location, $files){
		global $cfg;
		if(!empty($files)){
			$file_links = array();
			foreach ($files as $file){
				if ($file['error'] == 0){
					$filename = basename($file['name']);
					$ext = substr($filename, strrpos($filename, '.') + 1);
					if (in_array($ext, $cfg['exts']) && in_array($file['type'], $cfg['mimes'])){
						if ($file['size'] < $cfg['maxsize']){
							$newname = $location . $filename;
							while (file_exists($newname)) $newname = $location . rand(0,999) . '_' . $filename;
							if (move_uploaded_file($file['tmp_name'], $newname)){
								$file_links[] = $newname;
							}
							else{
								removeFolder($location);
								printError('<li>There was an error while uploading photos</li>');
							}
						}
						else{
							removeFolder($location);
							printError('<li>Max file size is' . floor($cfg['maxsize'] / 1000000) . 'Mb</li>');
						}
					}
					else{
						removeFolder($location);
						printError('<li>Incorrect file type, only .jpg and .png are allowed</li>');
					}
				}
				else{
					removeFolder($location);
					printError('<li>There was an error while uploading photos</li>');
				}
			}
			return $file_links;
		}
	}
?>
