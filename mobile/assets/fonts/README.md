# Custom fonts

The app uses **Futura PT** for headings and inputs. To enable it:

1. Add your Futura PT font file to this folder and name it **`FuturaPT-Medium.ttf`** (or `.otf`).
2. In **`App.js`**, uncomment the font line:
   ```js
   const fontMap = {
     'Futura PT': require('./assets/fonts/FuturaPT-Medium.ttf'),
   };
   ```
3. Reload the app. Use `fontFamily: 'Futura PT'` in styles to apply it.

Until the font is loaded, `fontFamily: 'Futura PT'` falls back to the system font.
