# Frontend SICIM CEDE10 EJC NAC V1.0

Proyecto base construido con Angular 18 y componentes standalone.

## Instalación y ejecución

1. Descomprima el archivo dentro de `D:\proyectosangular`.
2. Abra CMD o PowerShell en `D:\proyectosangular\frontendsicimcede10ejcnacv10`.
3. Ejecute:

   ```bash
   npm install
   npm start
   ```

4. Abra `http://localhost:4200`.

La primera instalación requiere `npm install`. Después basta con `npm start` mientras exista la carpeta `node_modules`.

## Acceso de demostración

- Usuario: `hernan.nunez`
- Contraseña: cualquier valor no vacío
- CAPTCHA: copie exactamente el código generado en la pantalla

## Organización del Panel de Control

Los componentes de sus opciones están físicamente dentro de:

`src/app/pages/panel-control/`

- `unidades-militares`
- `oficinas`
- `responsables`
- `parametros-sistema`
- `integrantes-documentos`
- `mi-perfil`
- `usuarios`

Cada carpeta contiene los archivos `.html`, `.ts`, `.scss` y `.spec.ts`.

## Organización de DIGEI

El componente `infraestructura` está dentro de:

`src/app/pages/digei/infraestructura/`

y se abre mediante la ruta `/digei/infraestructura`.

## Diseño responsivo

La aplicación, el login y el área autenticada ocupan el ancho completo y una altura mínima equivalente a toda la ventana. El menú se adapta a seis, tres o dos columnas según el tamaño de pantalla y las tarjetas usan rejillas automáticas.

## Configuración de recursos

Los recursos se sirven únicamente desde `src/assets` mediante esta configuración de `angular.json`:

```json
"assets": [
  "src/favicon.svg",
  {
    "glob": "**/*",
    "input": "src/assets",
    "output": "assets"
  }
]
```

La ruta de entrada está dentro de `sourceRoot: "src"`, evitando el error `MissingAssetSourceRootException` relacionado con rutas públicas externas a `src`.

## Node.js

El proyecto no bloquea Node.js 24 porque `.npmrc` mantiene `engine-strict=false`. Angular 18 puede emitir advertencias con versiones de Node posteriores a su matriz oficial, pero la configuración del proyecto no usa una ruta `public` fuera de `src`.

## Logo institucional del cabezote

El cabezote y la pantalla de recuperación de contraseña usan la imagen PNG ubicada en:

`src/assets/images/logo/logo_sicim_01.png`

La referencia utilizada por Angular es:

`assets/images/logo/logo_sicim_01.png`

La imagen mantiene su proporción original y adapta su tamaño para escritorio, tableta y teléfono.

## Revisión de carpetas

Se comprobó que todos los componentes existentes dentro de `src/app/pages` conservan sus archivos `.html`, `.ts`, `.scss` y `.spec.ts`. También se verificó la ubicación de `infraestructura` dentro de `src/app/pages/digei/infraestructura` y de las siete opciones dentro de `src/app/pages/panel-control`.

## Imágenes principales de los módulos

Los accesos y encabezados de DIGEI, DINCO, DIESP, DIPLI y Panel de Control usan las imágenes PNG ubicadas en `src/assets/images`:

- `imagen_digei_01.png`
- `imagen_dinco_01.png`
- `imagen_diesp_01.png`
- `imagen_dipli_01.png`
- `imagen_panel_control_01.png`

Los archivos SVG anteriores de esos cinco módulos fueron eliminados y no quedan referencias activas a ellos en el código fuente.

## Ajuste de imágenes del pie de página

El pie de página utiliza, en este orden y con dimensiones visuales de 58 x 58 píxeles:

1. `imagen_footer_escudo_ejercito_nacional_01.png`
2. `imagen_footer_escudo_bricc_01.png`
3. `imagen_footer_escudo_baicc_01.png`

Los llamados anteriores a `footer-ejercito.svg`, `footer-bandera.svg` y `footer-documento.svg` fueron eliminados.

# frontendsicimcede10ejcnacv10
