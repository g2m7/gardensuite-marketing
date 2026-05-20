const shareUrl = 'https://gardensuite.in/w/face-weight-499';
const productUrl =
	'https://gardensuite.in/products/attendance?utm_source=whatsapp&utm_medium=direct&utm_campaign=face_weight_demo&utm_content=price_v5';
const imageUrl = 'https://gardensuite.in/og/face-attendance-weight-price-v5.jpg';

export function GET() {
	const html = `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Face Attendance + Leaf Weight from Rs. 499/month | GardenSuite</title>
	<meta name="description" content="For tea gardens. Face attendance and smart leaf weighing from Rs. 499/month.">
	<link rel="canonical" href="${shareUrl}">
	<meta property="og:type" content="website">
	<meta property="og:url" content="${shareUrl}">
	<meta property="og:title" content="Face Attendance + Leaf Weight from Rs. 499/month">
	<meta property="og:description" content="For tea gardens. One worker, one record. Built by Sarbani Associates.">
	<meta property="og:image" content="${imageUrl}">
	<meta property="og:image:secure_url" content="${imageUrl}">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:image:width" content="1080">
	<meta property="og:image:height" content="1080">
	<meta property="og:image:alt" content="GardenSuite face attendance and smart leaf weighing from Rs. 499/month">
	<meta property="og:site_name" content="GardenSuite">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Face Attendance + Leaf Weight from Rs. 499/month">
	<meta name="twitter:description" content="For tea gardens. One worker, one record. Built by Sarbani Associates.">
	<meta name="twitter:image" content="${imageUrl}">
	<meta http-equiv="refresh" content="1;url=${productUrl}">
</head>
<body style="font-family: Arial, sans-serif; background: #eef8f1; color: #111; margin: 0; padding: 40px;">
	<h1>Face attendance + leaf weight</h1>
	<p><strong>Starts from Rs. 499/month*</strong></p>
	<p><a href="${productUrl}">See GardenSuite demo</a></p>
	<script>setTimeout(function(){ window.location.href = ${JSON.stringify(productUrl)}; }, 700);</script>
</body>
</html>`;

	return new Response(html, {
		headers: {
			'content-type': 'text/html; charset=utf-8',
			'cache-control': 'no-store, max-age=0'
		}
	});
}
