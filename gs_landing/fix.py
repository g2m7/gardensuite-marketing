import sys

with open('src/routes/temp_home/+page.svelte', 'r') as f:
    content = f.read()

# 1. Fix faint colors
content = content.replace('text-[#52525B]', 'text-[#3F3F46]')
content = content.replace('text-[#71717A]', 'text-[#52525B]')

# 2. Fix narrow max-widths
content = content.replace('max-w-[520px]', 'max-w-3xl')
content = content.replace('max-w-[560px]', 'max-w-3xl')
content = content.replace('max-w-[480px]', 'max-w-2xl')
content = content.replace('max-w-[820px]', 'max-w-4xl')
content = content.replace('max-w-[640px]', 'max-w-3xl')
content = content.replace('max-w-[900px]', 'max-w-5xl')

with open('src/routes/temp_home/+page.svelte', 'w') as f:
    f.write(content)
