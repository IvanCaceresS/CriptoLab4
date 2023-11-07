// ==UserScript==
// @name         Descifrar y Mostrar Mensajes Cifrados
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Descifrar y mostrar mensajes cifrados
// @author       Iván Cáceres Satorres
// @match        https://cripto.tiiny.site/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {
    'use strict';
    const firstParagraph = document.querySelector('body > p');

    if (firstParagraph) {
        const text = firstParagraph.textContent;
        const llave = text.match(/[A-Z]/g).join('');

        const encryptedMessages = document.querySelectorAll('div[id$="="], div[class^="M"]');

        console.log(`La llave es: ${llave}`);

        console.log(`Los mensajes cifrados son: ${encryptedMessages.length}`);

        function descifrarID(cifrado, llave) {
            try {
                const llaveBytes = CryptoJS.enc.Utf8.parse(llave);

                const cifradoBytes = CryptoJS.enc.Base64.parse(cifrado);

                const descifradoBytes = CryptoJS.TripleDES.decrypt({
                    ciphertext: cifradoBytes,
                }, llaveBytes, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                });

                const descifrado = descifradoBytes.toString(CryptoJS.enc.Utf8);

                return descifrado;
            } catch (error) {
                console.error('Error al descifrar el mensaje:', error);
                return 'Error al descifrar';
            }
        }

        const mensajesDescifradosContainer = document.createElement('div');
        firstParagraph.parentNode.insertBefore(mensajesDescifradosContainer, firstParagraph.nextSibling);

        encryptedMessages.forEach((message, index) => {
            const cifrado = message.id;
            const descifrado = descifrarID(cifrado, llave);

            console.log(`${cifrado} = ${descifrado}`);

            const mensajeDescifradoP = document.createElement('p');
            mensajeDescifradoP.textContent = `${descifrado}`;
            mensajesDescifradosContainer.appendChild(mensajeDescifradoP);
        });
    } else {
        console.log('No se encontró un primer párrafo dentro del elemento <p>.');
    }
})();
