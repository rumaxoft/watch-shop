export default function ({
  name,
  id,
  deliveryType,
  shippingAddress,
  paymentMethod,
  productsList,
  itemsPrice,
  shippingPrice,
  totalPrice,
}) {
  return `
<!doctype html>
<html>

<head>
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Simple Transactional Email</title>
	<style>
		/* -------------------------------------
        INLINED WITH htmlemail.io/inline
    ------------------------------------- */
		/* -------------------------------------
        RESPONSIVE AND MOBILE FRIENDLY STYLES
    ------------------------------------- */
		@media only screen and (max-width: 620px) {
			table[class=body] h1 {
				font-size: 28px !important;
				margin-bottom: 10px !important;
			}

			table[class=body] p,
			table[class=body] ul,
			table[class=body] ol,
			table[class=body] td,
			table[class=body] span,
			table[class=body] a {
				font-size: 16px !important;
			}

			table[class=body] .wrapper,
			table[class=body] .article {
				padding: 10px !important;
			}

			table[class=body] .content {
				padding: 0 !important;
			}

			table[class=body] .container {
				padding: 0 !important;
				width: 100% !important;
			}

			table[class=body] .main {
				border-left-width: 0 !important;
				border-radius: 0 !important;
				border-right-width: 0 !important;
			}

			table[class=body] .btn table {
				width: 100% !important;
			}

			table[class=body] .btn a {
				width: 100% !important;
			}

			table[class=body] .img-responsive {
				height: auto !important;
				max-width: 100% !important;
				width: auto !important;
			}
		}

		/* -------------------------------------
        PRESERVE THESE STYLES IN THE HEAD
    ------------------------------------- */
		@media all {
			.ExternalClass {
				width: 100%;
			}

			.ExternalClass,
			.ExternalClass p,
			.ExternalClass span,
			.ExternalClass font,
			.ExternalClass td,
			.ExternalClass div {
				line-height: 100%;
			}

			.apple-link a {
				color: inherit !important;
				font-family: inherit !important;
				font-size: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
				text-decoration: none !important;
			}

			#MessageViewBody a {
				color: inherit;
				text-decoration: none;
				font-size: inherit;
				font-family: inherit;
				font-weight: inherit;
				line-height: inherit;
			}

			.btn-primary table td:hover {
				background-color: #34495e !important;
			}

			.btn-primary a:hover {
				background-color: #34495e !important;
				border-color: #34495e !important;
			}
		}
	</style>
</head>

<body class=""
	style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size:20px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
	<span class="preheader"
		style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This
		is preheader text. Some clients will show this text as a preview.</span>
	<table border="0" cellpadding="0" cellspacing="0" class="body"
		style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
		<tr>
			<td style="font-family: sans-serif; font-size:20px; vertical-align: top;">&nbsp;</td>
			<td class="container"
				style="font-family: sans-serif; font-size:20px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
				<div class="content"
					style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

					<!-- START CENTERED WHITE CONTAINER -->
					<table class="main"
						style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

						<!-- START MAIN CONTENT AREA -->
						<tr>
							<td class="wrapper"
								style="font-family: sans-serif; font-size:20px; vertical-align: top; box-sizing: border-box; padding: 20px;">
								<table border="0" cellpadding="0" cellspacing="0"
									style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
									<tr>
										<p style="font-family: sans-serif; font-size:20px; vertical-align: top;">
										<p
											style="font-family: sans-serif; font-size: 24px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
											<b>${name},</b> вы оформили заказ в магазине
											WATCH-EXPERT
										</p>
										<table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"
											style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
											<tbody>
												<tr>
													<td align="center"
														style="font-family: sans-serif; font-size:20px; vertical-align: top; padding-bottom: 15px;">
														<img src="cid:email-order" alt="email-confirmation" width="300"
															height="300" border="0"
															style="border:0; outline:none; text-decoration:none; margin-top:32px; display:block;">
													</td>
												</tr>
											</tbody>
										</table>
										<h3>Детали заказа</h3>
										<p
											style="font-family: sans-serif; font-size:20px; font-weight: normal; margin: 0; Margin-bottom: 15px; margin-top: 32px;">
											<strong>Номер заказа:&nbsp; </strong>
											<span>
												${id}
											</span>
											<br>
											<strong>Тип доставки:&nbsp; </strong>
											<span>
												${deliveryType}
											</span>
											<br>
											<strong>Адрес доставки:&nbsp; </strong>
											<span>
												${shippingAddress}
											</span>
											<br>
											<strong>Тип оплаты:&nbsp; </strong>
											<span>
												${paymentMethod}
											</span>
											<br>
											<strong>Товары:</strong>
											${productsList}
											<br>
											<strong>Стоимость товаров:&nbsp; </strong>
											<span>
												${itemsPrice}
											</span>
											<br>
											<strong>Стоимость доставки:&nbsp; </strong>
											<span>
												${shippingPrice}
											</span>
											<br>
											<strong>Итого:&nbsp; </strong>
											<span>
												${totalPrice}
											</span>
										</p>
										<p
											style="font-family: sans-serif; font-size:20px; font-weight: normal; margin: 0; Margin-bottom: 15px; margin-top: 32px;">
										</p>
										<p
											style="font-family: sans-serif; font-size:20px; font-weight: normal; margin: 0; margin-top: 32px; Margin-bottom: 15px;">
											В ближайшее время с вами свяжется менеджер для подтверждения заказа.
										</p>
										<p
											style="font-family: sans-serif; font-size:20px; font-weight: normal; margin: 0; margin-top: 32px; Margin-bottom: 15px;">
											Другой пользователь мог указать неправильный адрес электронной почты по ошибке. Если Вы
											не ожидали получения этого письма, пожалуйтесь на него.
										</p>
										<p
											style="font-family: sans-serif; font-size:20px; font-weight: normal; border-top:#74ce9e 1px solid; margin: 0; padding-top: 8px; margin-top: 32px; Margin-bottom: 15px;">
											Это письмо сформировано автоматически. Пожалуйста, не отвечайте на этот адрес электронной почты.
										</p>
									  </table>
							</td>
						</tr>
						<!-- END MAIN CONTENT AREA -->
					</table>
					<p <!-- START FOOTER -->
					<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
						<table border="0" cellpadding="0" cellspacing="0"
							style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
							<tr>
								<td class="content-block"
									style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
									<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">WATCH-EXPERT, г.
										Краснодар</span>
								</td>
							</tr>
						</table>
					</div>
					<!-- END FOOTER -->
					<!-- END MAIN CONTENT AREA -->
					<!-- END CENTERED WHITE CONTAINER -->
				</div>
				<p <!-- START FOOTER -->
			<td style="font-family: sans-serif; font-size:20px; vertical-align: top;">&nbsp;</td>
			<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
				style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
		<tr>
			<td class="content-block"
				style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
				<!-- END FOOTER -->
				Краснодар</span>
			</td>
		</tr>
	</table>






	<!-- END CENTERED WHITE CONTAINER -->
	</div>
	</td>
	<td style="font-family: sans-serif; font-size:20px; vertical-align: top;">&nbsp;</td>
	</tr>
	</table>
</body>

</html>

  `
}
