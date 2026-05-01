# MicroShop Web

Web corporativa de MicroShop Salamanca.

## Estructura

```
├── index.html              # Home
├── tiendas-movistar.html   # Tiendas Movistar
├── o2.html                 # Tienda O2
├── telefonica-empresas.html # Telefónica Empresas
├── movilfree.html          # MovilFree
├── css/style.css           # Diseño completo
├── js/main.js              # Animaciones, contadores, menú móvil
├── img/                    # Imágenes
├── server.js               # Servidor Express (Railway)
└── package.json
```

## Deploy en Railway

1. Subir este directorio a un repositorio GitHub
2. Crear nuevo proyecto en Railway → conectar repo
3. Railway detecta automáticamente Node.js
4. El servidor sirve los archivos estáticos en el puerto asignado

## Formulario de contacto

Actualmente el formulario está configurado con Formspree (pendiente activar).
Para activarlo:
1. Regístrate en https://formspree.io
2. Crea un formulario y copia el ID
3. En `index.html`, busca `action="https://formspree.io/f/XXXXXXXX"` y sustituye `XXXXXXXX` por tu ID real
