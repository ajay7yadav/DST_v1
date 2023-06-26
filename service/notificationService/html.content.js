const render_template = (content) => {
	let data =`
	<html>
		<head>
			<title></title>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<link rel="preconnect" href="https://fonts.googleapis.com">
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
			<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
			rel="stylesheet">
			<style type="text/css">
			/* CLIENT-SPECIFIC STYLES */
			body,table,td,a {
				-webkit-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%;
				font-family: 'Poppins', sans-serif;
			}
			​table,td {
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
			}
			​img {
				-ms-interpolation-mode: bicubic;
			}
			/* RESET STYLES */
			img {
				border: 0;
				height: auto;
				line-height: 100%;
				outline: none;
				text-decoration: none;
			}
			​table {
				border-collapse: collapse !important;
			}
			​body {
				height: 100% !important;
				margin: 0 !important;
				padding: 0 !important;
				width: 100% !important;
			}
			</style>
		</head>
		<body style="background-color: #E5E5E5; margin: 0 !important; padding: 0 !important;">
			<!-- HIDDEN PREHEADER TEXT -->
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<!-- LOGO -->
			<tr>
				<td align="center" style="padding: 80px 10px 40px 10px;">
				<img src='' alt="">
									</td>
			</tr>
			<tr>
				<td align="center" style="padding: 0px 10px 80px 10px; border-radius: 20px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 700px;">
					<tr>
					<td bgcolor="#ffffff" align="left"
						style="padding:25px 30px; border-radius: 20px; color: #000000; font-family:'Poppins', sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
						<h1 style="font-size: 28px; line-height: 41px; color: #3F2783; text-align: center; letter-spacing: 4px;"> Delo Todo App </h1>
						<p>Dear User, </p>
						<p style="font-size: 26px; line-height: 41px; text-align: center; letter-spacing: 4px;"> ${content} </p>
						<p style="margin-bottom: 5px; font-size: 20px; font-weight: 400; line-height: 24px;"> Thanks, </p>
						<p style="margin: 0; font-size: 20px; font-weight: 400; line-height: 24px;">Delo Team </p>
					</td>
					</tr>
				</table>
				</td>
			</tr>
			</table>
		</body>
	</html>`
	return data;
}

module.exports = { render_template }