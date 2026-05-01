import io
path = r"c:\Programas\Pagina Web MicroShop\movilfree.html"

try:
    with io.open(path, "r", encoding="utf-8") as f:
        content = f.read()
except UnicodeDecodeError:
    with io.open(path, "r", encoding="latin-1") as f:
        content = f.read()

target = '<a href="index.html#contacto" class="btn btn-secondary">✉️ Escríbenos</a>'
if target in content:
    content = content.replace(target, '')
    
    with io.open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Target string not found in file")
