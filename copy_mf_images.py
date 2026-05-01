import shutil
import os

source_dir = r"C:\Users\aluis\.gemini\antigravity\brain\77f9dc2f-a6a4-48df-9d7c-ce7900d2bd9b"
dest_dir = r"c:\Programas\Pagina Web MicroShop\img"

files_to_copy = {
    "mf_telefonia_1777666754727.png": "mf-telefonia.png",
    "mf_reparaciones_1777666779974.png": "mf-reparaciones.png",
    "mf_informatica_1777666801949.png": "mf-informatica.png",
    "mf_papeleria_1777666826330.png": "mf-papeleria.png"
}

for src, dst in files_to_copy.items():
    src_path = os.path.join(source_dir, src)
    dst_path = os.path.join(dest_dir, dst)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied {dst}")
    else:
        print(f"File not found: {src_path}")
