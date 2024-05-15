# Treasure-Hunt-Kos
Závěrečný projekt pro Czechitas

Web na adrese: https://treasure-hunt-kos.netlify.app/



Poznámky do budoucna:

Web tvořen pomocí Eleventy a SASS --- nezapomenout zapnout Watch Sass a spustit NPM script Serve, aby se web vygeneroval do _site

index.html je kvůli pořádku v EN, ale má nastaveno ve Front Matter: permalink: "/"  ---tedy se vygeneruje do kořenového adresáře

.gitignore --- velmi důležité, aby se nekopírovala složka node_modules s tisíci soubory na Github

.eleventy.js --- nutné nastavit, aby se do _site posílala složka images, CSS, javascript a případně další věci, které Eleventy jinak automaticky neposílá

Spousta ikonek /bordelu v kořenovém adresáři kvůli faviconě vygenerované na: https://realfavicongenerator.net/
