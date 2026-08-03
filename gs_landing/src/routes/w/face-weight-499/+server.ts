const shareUrl = 'https://gardensuite.in/w/face-weight-499';
const productUrl =
	'https://gardensuite.in/products/attendance?utm_source=whatsapp&utm_medium=direct&utm_campaign=face_weight_demo&utm_content=workflow';
const imageUrl = 'https://gardensuite.in/mis-dashboard-1400.webp';

export function GET() {
	const html = `<!doctype html>
<html lang="en-IN">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Tea Garden Attendance System - Face & Weighing | GardenSuite</title>
	<meta name="description" content="Face attendance and smart leaf weighing for tea gardens. Link worker identity, hazira, and leaf weight in one offline workflow.">
	<link rel="canonical" href="${shareUrl}">
	<meta property="og:type" content="website">
	<meta property="og:url" content="${shareUrl}">
	<meta property="og:title" content="Face attendance + leaf weight for tea gardens">
	<meta property="og:description" content="One worker, one record. Works offline. Built and supported by Sarbani Associates.">
	<meta property="og:image" content="${imageUrl}">
	<meta property="og:image:secure_url" content="${imageUrl}">
	<meta property="og:image:type" content="image/webp">
	<meta property="og:image:alt" content="GardenSuite daily dashboard for tea garden attendance and leaf weight">
	<meta property="og:site_name" content="GardenSuite">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Face attendance + leaf weight for tea gardens">
	<meta name="twitter:description" content="One worker, one record. Works offline. Built and supported by Sarbani Associates.">
	<meta name="twitter:image" content="${imageUrl}">
	<meta http-equiv="refresh" content="1;url=${productUrl}">
</head>
<body style="font-family: Arial, sans-serif; background: #eef8f1; color: #111; margin: 0; padding: 40px;">
	<h1>Face attendance + leaf weight</h1>
	<p>Worker face, hazira, and leaf weight stay linked in one record.</p>
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
