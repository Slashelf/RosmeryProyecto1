document.addEventListener('DOMContentLoaded', () => {
    const btnCargarFormulario = document.querySelector('a[href="#form"]');
    const formularioContainer = document.getElementById('formulario-container');
  
    // Cargar el formulario de opiniones cuando se haga clic en el botón
    btnCargarFormulario.addEventListener('click', () => {
      fetch('formulario.html')
        .then(response => response.text())
        .then(data => {
          formularioContainer.innerHTML = data; // Inyecta el HTML del formulario
          const script = document.createElement('script');
          script.src = 'formulario.js'; // Inyectar el script de la lógica del formulario
          document.body.appendChild(script);
        })
        .catch(error => console.error('Error al cargar el formulario:', error));
    });
  });
  