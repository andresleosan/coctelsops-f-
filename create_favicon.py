#!/usr/bin/env python3
from PIL import Image
import os

# Ruta del archivo PNG
png_path = os.path.join('public', 'Contels_OPS.Perfil.png')
ico_path = os.path.join('public', 'favicon.ico')

# Abrir la imagen PNG
img = Image.open(png_path)

# Redimensionar a tamaño estándar de favicon (256x256)
img = img.resize((256, 256), Image.Resampling.LANCZOS)

# Guardar como ICO
img.save(ico_path, format='ICO')

print(f"✅ favicon.ico creado exitosamente en: {ico_path}")
print(f"📊 Tamaño: {os.path.getsize(ico_path)} bytes")
