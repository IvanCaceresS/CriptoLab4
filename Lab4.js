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

    //BORRANDO TODA LA PAGINA PARA HACER OTRA
    const body = document.body;
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    setTimeout(function() {
        const pElement = document.createElement('p');
        const nuevoTexto = "En una tranquila aldea al pie de las montañas, vivía un anciano llamado Samuel. Samuel era conocido en la comunidad por sus historias mágicas y consejos sabios. Todos los atardeceres, se reunían niños y adultos en la plaza del pueblo para escuchar sus cuentos sobre mundos lejanos y criaturas místicas. Sus historias inspiraban a los habitantes y llenaban sus corazones de asombro y esperanza. La magia de Samuel no radicaba solo en sus relatos, sino en la forma en que conectaba a la comunidad, uniendo generaciones y recordándoles la belleza de la imaginación.En una tranquila aldea al pie de las montañas, vivía un anciano llamado Samuel. Samuel era conocido en la comunidad por sus historias mágicas y consejos sabios. Todos los atardeceres, se reunían niños y adultos en la plaza del pueblo para escuchar sus cuentos sobre mundos lejanos y criaturas místicas. Sus historias inspiraban a los habitantes y llenaban sus corazones de asombro y esperanza. La magia de Samuel no radicaba solo en sus relatos, sino en la forma en que conectaba a la comunidad, uniendo generaciones y recordándoles la belleza de la imaginación.En una tranquila aldea al pie de las montañas, vivía un anciano llamado Samuel. Samuel era conocido en la comunidad por sus historias mágicas y consejos sabios. Todos los atardeceres, se reunían niños y adultos en la plaza del pueblo para escuchar sus cuentos sobre mundos lejanos y criaturas místicas. Sus historias inspiraban a los habitantes y llenaban sus corazones de asombro y esperanza. La magia de Samuel no radicaba solo en sus relatos, sino en la forma en que conectaba a la comunidad, uniendo generaciones y recordándoles la belleza de la imaginación.En una tranquila aldea al pie de las montañas, vivía un anciano llamado Samuel. Samuel era conocido en la comunidad por sus historias mágicas y consejos sabios. Todos los atardeceres, se reunían niños y adultos en la plaza del pueblo para escuchar sus cuentos sobre mundos lejanos y criaturas místicas. Sus historias inspiraban a los habitantes y llenaban sus corazones de asombro y esperanza. La magia de Samuel no radicaba solo en sus relatos, sino en la forma en que conectaba a la comunidad, uniendo generaciones y recordándoles la belleza de la imaginación.";
        pElement.textContent = nuevoTexto;
        body.appendChild(pElement);

        // Crea un elemento padre
        const divPadre = document.createElement('div');
        divPadre.id = 'miDivPadre'; // Puedes asignar un ID si lo deseas
        document.body.appendChild(divPadre);

        for (let i = 1; i <= 10; i++) {
            const nuevoDiv = document.createElement('div');
            nuevoDiv.className = `MX${i}`;

            // Asigna el ID correspondiente a cada div
            const ids = [
                'TE0AdZXc4zg=',
                'Wk7fQbYB1Ro=',
                'fKa/2sDtbiU=',
                'gHhwu6XI14M=',
                'EC9NYSkz6Nu2gIt82RT2Yw==',
                'ljPVS22NPCg=',
                'jcokBcBZ2X0=',
                'T8g+2mvYeTY=',
                'CixLg/DzoW4=',
                'ylLKs+ZBVdw='
            ];

            // Verifica que haya un ID correspondiente y asígnalo
            if (ids[i - 1]) {
                nuevoDiv.id = ids[i - 1];
            }

            divPadre.appendChild(nuevoDiv);
        }

    }, 2000); // Espera 2 segundos (2000 milisegundos) antes de continuar

    //FIN DE BORRANDO TODA LA PAGINA PARA HACER OTRA

    setTimeout(function() {
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
    }, 2000); // Espera 2 segundos (2000 milisegundos) antes de continuar
})();
