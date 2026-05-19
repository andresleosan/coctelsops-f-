#!/usr/bin/env python3
from PIL import Image
import os

# Ruta del archivo PNG
png_path = os.path.join('public', 'Contels_OPS.Perfil.png')
ico_path = os.path.join('public', 'favicon.ico')

# Abrir la imagen PNG
img = Image.open(png_path)

# Redimensionar a tamaño más pequeño para favicon (64x64 máximo para ICO)
img = img.resize((64, 64), Image.Resampling.LANCZOS)

# Convertir a RGB si tiene transparencia
if img.mode == 'RGBA':
    # Crear fondo blanco para eliminar transparencia
    background = Image.new('RGB', img.size, (255, 255, 255))
    background.paste(img, mask=img.split()[3])
    img = background

# Guardar como ICO con optimización
img.save(ico_path, format='ICO', sizes=[(64, 64)])

print(f"✅ favicon.ico optimizado creado: {ico_path}")
print(f"📊 Tamaño: {os.path.getsize(ico_path)} bytes")

# También crear versiones en diferentes tamaños
sizes_for_multiple = [(16, 16), (32, 32), (64, 64)]
for size in sizes_for_multiple:
    resized = img.resize(size, Image.Resampling.LANCZOS)

print(f"✅ Favicon optimizado y listo para Vercel")
