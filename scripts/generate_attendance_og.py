import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_attendance_og():
    width = 1200
    height = 630
    
    # Base canvas
    img = Image.new('RGBA', (width, height), '#FAFAF7')
    draw = ImageDraw.Draw(img)
    
    # Outer subtle border
    draw.rectangle([0, 0, width - 1, height - 1], outline='#E4E4E7', width=1)
    
    # Decorative subtle accent line at the top
    draw.rectangle([0, 0, width, 4], fill='#1B5E3B')
    
    # Fonts
    font_dir = 'collateral/demo-kit/video/fonts'
    inter_bold = os.path.join(font_dir, 'Inter-600.ttf')
    inter_med = os.path.join(font_dir, 'Inter-500.ttf')
    inter_reg = os.path.join(font_dir, 'Inter-400.ttf')
    
    f_kicker = ImageFont.truetype(inter_bold, 15)
    f_title = ImageFont.truetype(inter_bold, 44)
    f_body = ImageFont.truetype(inter_reg, 21)
    f_bullets = ImageFont.truetype(inter_med, 17)
    f_footer = ImageFont.truetype(inter_reg, 14)
    f_footer_bold = ImageFont.truetype(inter_bold, 14)
    
    # Left content
    left_x = 72
    
    # Kicker
    kicker_text = "TEA OPERATIONS CONTROL · GS FACE"
    draw.text((left_x, 70), kicker_text, fill='#1B5E3B', font=f_kicker)
    
    # Headline (wrapped)
    title_line1 = "Face Attendance &"
    title_line2 = "Smart Leaf Weighing"
    draw.text((left_x, 108), title_line1, fill='#111111', font=f_title)
    draw.text((left_x, 162), title_line2, fill='#111111', font=f_title)
    
    # Subtitle / Body
    body_line1 = "Biometric hazira that helps stop proxy attendance."
    body_line2 = "Bluetooth scales linked directly to verified pluckers."
    draw.text((left_x, 236), body_line1, fill='#52525B', font=f_body)
    draw.text((left_x, 268), body_line2, fill='#52525B', font=f_body)
    
    # Features list
    features = [
        "Works offline in remote garden lines",
        "Freezes scale weight linked to worker face",
        "Syncs directly to estate office muster & payroll"
    ]
    
    bullet_y = 330
    for feat in features:
        # Checkmark icon
        draw.text((left_x, bullet_y), "✓", fill='#1B5E3B', font=f_bullets)
        draw.text((left_x + 24, bullet_y), feat, fill='#27272A', font=f_bullets)
        bullet_y += 38
        
    # Divider line above footer
    draw.line([(left_x, 520), (left_x + 550, 520)], fill='#E4E4E7', width=1)
    
    # Trust Footer
    draw.text((left_x, 542), "Sarbani Associates", fill='#111111', font=f_footer_bold)
    draw.text((left_x + 145, 542), "·  Bagdogra, Siliguri  ·  Serving 20+ Tea Estates Since 2000", fill='#71717A', font=f_footer)
    
    # Right side: Phone Mockup
    phone_shot_path = 'gs_landing/static/screenshots/13_attendance_result_matched.png'
    if os.path.exists(phone_shot_path):
        phone_img = Image.open(phone_shot_path).convert('RGBA')
        
        # Scale phone screenshot to fit height nicely (e.g. height 480px)
        p_w, p_h = phone_img.size
        target_h = 490
        target_w = int(p_w * (target_h / p_h))
        phone_resized = phone_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Add rounded corners to screenshot
        corner_radius = 28
        mask = Image.new('L', (target_w, target_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, target_w, target_h], radius=corner_radius, fill=255)
        
        # Phone position
        phone_x = 800
        phone_y = 70
        
        # Draw shadow behind phone
        shadow = Image.new('RGBA', (target_w + 40, target_h + 40), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.rounded_rectangle([10, 14, target_w + 30, target_h + 34], radius=corner_radius + 4, fill=(0, 0, 0, 26))
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=10))
        img.paste(shadow, (phone_x - 20, phone_y - 10), shadow)
        
        # Device border frame
        frame = Image.new('RGBA', (target_w + 12, target_h + 12), '#18181B')
        frame_mask = Image.new('L', (target_w + 12, target_h + 12), 0)
        ImageDraw.Draw(frame_mask).rounded_rectangle([0, 0, target_w + 12, target_h + 12], radius=corner_radius + 6, fill=255)
        img.paste(frame, (phone_x - 6, phone_y - 6), frame_mask)
        
        # Paste phone screen
        img.paste(phone_resized, (phone_x, phone_y), mask)
        
        # Add a secondary mini badge overlay (e.g. "Weighing Scale Connected")
        scale_badge_w = 210
        scale_badge_h = 58
        scale_badge_x = phone_x - 60
        scale_badge_y = phone_y + target_h - 100
        
        badge_card = Image.new('RGBA', (scale_badge_w, scale_badge_h), '#FFFFFF')
        badge_mask = Image.new('L', (scale_badge_w, scale_badge_h), 0)
        ImageDraw.Draw(badge_mask).rounded_rectangle([0, 0, scale_badge_w, scale_badge_h], radius=14, fill=255)
        
        # Badge shadow
        b_shadow = Image.new('RGBA', (scale_badge_w + 20, scale_badge_h + 20), (0, 0, 0, 0))
        ImageDraw.Draw(b_shadow).rounded_rectangle([6, 8, scale_badge_w + 14, scale_badge_h + 16], radius=16, fill=(0, 0, 0, 20))
        b_shadow = b_shadow.filter(ImageFilter.GaussianBlur(radius=6))
        img.paste(b_shadow, (scale_badge_x - 10, scale_badge_y - 8), b_shadow)
        
        img.paste(badge_card, (scale_badge_x, scale_badge_y), badge_mask)
        
        # Badge text & border
        badge_draw = ImageDraw.Draw(img)
        badge_draw.rounded_rectangle([scale_badge_x, scale_badge_y, scale_badge_x + scale_badge_w, scale_badge_y + scale_badge_h], radius=14, outline='#E4E4E7', width=1)
        
        # Green status dot
        badge_draw.ellipse([scale_badge_x + 16, scale_badge_y + 24, scale_badge_x + 26, scale_badge_y + 34], fill='#1B5E3B')
        
        f_badge_sub = ImageFont.truetype(inter_bold, 11)
        f_badge_main = ImageFont.truetype(inter_bold, 14)
        badge_draw.text((scale_badge_x + 36, scale_badge_y + 13), "BLUETOOTH SCALE", fill='#1B5E3B', font=f_badge_sub)
        badge_draw.text((scale_badge_x + 36, scale_badge_y + 29), "Weight Linked to Face", fill='#111111', font=f_badge_main)

    # Save as WebP and JPG
    out_webp = 'gs_landing/static/og/attendance-media-placeholder.webp'
    out_og_webp = 'gs_landing/static/og/attendance-og-1200x630.webp'
    out_og_jpg = 'gs_landing/static/og/attendance-og-1200x630.jpg'
    
    img_rgb = img.convert('RGB')
    img_rgb.save(out_webp, 'WEBP', quality=90)
    img_rgb.save(out_og_webp, 'WEBP', quality=90)
    img_rgb.save(out_og_jpg, 'JPEG', quality=90)
    
    print(f"Generated {out_webp} ({os.path.getsize(out_webp)} bytes)")
    print(f"Generated {out_og_webp} ({os.path.getsize(out_og_webp)} bytes)")
    print(f"Generated {out_og_jpg} ({os.path.getsize(out_og_jpg)} bytes)")

if __name__ == '__main__':
    create_attendance_og()
