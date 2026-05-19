#!/usr/bin/env python3
from PIL import Image
import os

# Ruta del archivo PNG
png_path = os.path.join('public', 'Contels_OPS.Perfil.png')
ico_path = os.path.join('public', 'favicon.ico')

# Abrir la imagen PNG
img = Image.open(png_path)

# Crear favicon ICO con múltiples tamaños (estándar)
sizes = [(16, 16), (32, 32), (64, 64)]
ico_images = []

for size in sizes:
    resized = img.resize(size, Image.Resampling.LANCZOS)
    
    # Convertir a RGB si tiene transparencia
    if resized.mode == 'RGBA':
        background = Image.new('RGB', resized.size, (255, 255, 255))
        background.paste(resized, mask=resized.split()[3])
        resized = background
    
    ico_images.append(resized)

# Guardar como ICO con múltiples tamaños
ico_images[0].save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (64, 64)])

print(f"✅ favicon.ico multi-size creado: {ico_path}")
file_size = os.path.getsize(ico_path)
print(f"📊 Tamaño: {file_size} bytes")
print(f"✅ Favicon listo para producción en Vercel")
