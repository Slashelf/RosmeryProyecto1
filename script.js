document.addEventListener('DOMContentLoaded', () => {
    const btnCargarFormulario = document.querySelector('a[href="#form"]');
    const formularioContainer = document.getElementById('formulario-container');
  
 
    btnCargarFormulario.addEventListener('click', () => {
      fetch('formulario.html')
        .then(response => response.text())
        .then(data => {
          formularioContainer.innerHTML = data; 
          const script = document.createElement('script');
          script.src = 'formulario.js'; 
          document.body.appendChild(script);
        })
        .catch(error => console.error('Error al cargar el formulario:', error));
    });
  });
  