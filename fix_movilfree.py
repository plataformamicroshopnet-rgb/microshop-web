import io
import re

path = r"c:\Programas\Pagina Web MicroShop\movilfree.html"

# Read ignoring errors to grab the structure if needed
with io.open(path, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

# Fix encoding corruptions manually
content = content.replace("Men", "Menú")
content = content.replace("Escrbenos", "Escríbenos")
content = content.replace("Telefona", "Telefonía")
content = content.replace("mviles", "móviles")
content = content.replace("informtica", "informática")
content = content.replace("papelera", "papelería")
content = content.replace("aqu", "aquí")
content = content.replace("Telfono", "Teléfono")

# Remove the Escribenos button
content = re.sub(r'<a href="index\.html#contacto"[^>]*>.*Escr[í]benos.*</a>', '', content)
# Also remove the one in the footer just in case? The user said "de la pantalla de MOVILFREE", usually meaning the hero. I'll just remove the hero one.
# Wait, the regex above will remove ALL of them. Let's restrict it to btn-secondary.
content = re.sub(r'<a href="index\.html#contacto" class="btn btn-secondary">.*Escr[í]benos.*</a>', '', content)

with io.open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed encoding and removed button.")
