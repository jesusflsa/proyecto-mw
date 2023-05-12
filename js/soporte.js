const preguntas = document.querySelectorAll('.qa_pregunta')

preguntas.forEach(pregunta => {
    pregunta.addEventListener('click', () => {
        pregunta.classList.toggle('arrow');

        let height = 0;
        let respuesta = pregunta.nextElementSibling;
        if (respuesta.clientHeight == 0) {
            height = respuesta.scrollHeight;
        }

        respuesta.style.height = `${height}px`
        
    })
});
