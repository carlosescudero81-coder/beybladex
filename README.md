# Beyblade X Academy

Version privada de `Spin Academy: Torneo del Verano`, adaptada como experiencia domestica de aprendizaje ambientada en Beyblade X.

## Assets individuales

Ahora la app usa iconos PNG transparentes individuales. No usa sprite sheets ni recorta hojas completas.

Coloca los archivos en:

- Personajes: `assets/personajes/`
- Peonzas: `assets/peonzas/`
- Estadios: `assets/estadios/`
- Fichas de estadios: `assets/estadios_fichas/`
- Torre: `assets/torre/`

Imagen principal de torre:

- `assets/torre/torre_x_del_conocimiento.png`

Si falta alguna imagen individual, la app muestra una tarjeta de fallback: `Imagen pendiente: coloca assets/...`.

## Datos editables

Los datos estan centralizados en `js/assets.js`:

- Personajes: `BEYBLADE_CHARACTERS`
- Peonzas equipables: `BEYBLADE_BEYS`
- Tipos de Bey: `BEY_TYPES`
- Estadios: `BEYBLADE_STADIUMS`
- X Tower de 50 plantas: `X_TOWER_FLOORS`

Cada personaje, peonza y estadio contiene una propiedad `image` con su ruta individual. La app no define configuracion de sprites ni recortes.

## Validaciones

```bash
npm run check
npm test
```

## Nota de uso

Esta version usa nombres reales de Beyblade X para uso personal/privado. No incluye imagenes oficiales descargadas; las imagenes deben ser aportadas manualmente por el usuario.
