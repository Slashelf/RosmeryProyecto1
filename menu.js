document.addEventListener('DOMContentLoaded', () => {
    // XML del menú
    const menuXML = `
      <menu>
        <item name="Inicio" link="index.html">
          <subitem name="Introducción al proyecto" link="index.html" />
          <subitem name="Beneficios de participar" link="#benefits" />
          <subitem name="Política de privacidad" link="#pol" />
          <subitem name="Preguntas frecuentes" link="#preg" />
        </item>
        <item name="Encuesta" link="formulario.html">
          <subitem name="Formulario de opiniones" link="formulario.html" />
          <subitem name="Sección de evaluación" link="#evaluation" />
          <subitem name="Selección de categorías" link="#categories" />
          <subitem name="Confirmación de envío" link="#confirmation" />
        </item>
        <item name="Resultados Globales">
          <subitem name="Estadísticas generales" link="#stats" />
          <subitem name="Tendencias por región" link="#trends" />
          <subitem name="Análisis de satisfacción" link="#analysis" />
          <subitem name="Gráficos descargables" link="#charts" />
        </item>
        <item name="Recursos Financieros">
          <subitem name="Consejos de ahorro" link="recursos.html" />
          <subitem name="Guías para inversiones" link="#investment" />
          <subitem name="Calculadoras financieras" link="#calculators" />
          <subitem name="Videos explicativos" link="#videos" />
        </item>
        <item name="Comunidad">
          <subitem name="Discusión sobre servicios" link="#discussion" />
          <subitem name="Comparación de bancos" link="#comparison" />
          <subitem name="Historias de usuarios" link="#stories" />
          <subitem name="Redes sociales" link="#social" />
        </item>
        <item name="Extras">
          <subitem name="Simulador de préstamos" link="#loan-simulator" />
          <subitem name="Comparador de tarjetas" link="#card-comparator" />
          <subitem name="Tutoriales interactivos" link="#tutorials" />
          <subitem name="Ofertas exclusivas" link="#offers" />
        </item>
        <item name="FAQ">
          <subitem name="Cómo se usan los datos" link="#data-usage" />
          <subitem name="Modificación de respuestas" link="#response-modification" />
          <subitem name="Políticas del proyecto" link="#project-policies" />
          <subitem name="Soporte técnico" link="#support" />
        </item>
        <item name="Contacto">
          <subitem name="Formulario de consultas" link="#queries" />
          <subitem name="Redes sociales" link="#social" />
          <subitem name="Feedback" link="#feedback" />
          <subitem name="Chat en línea" link="#chat" />
        </item>
      </menu>`;
  
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(menuXML, "text/xml");
    const menuList = document.getElementById("menu");
  
    // Función para crear los elementos de menú desde el XML
    const createMenu = (menuData, parentElement) => {
      const items = menuData.querySelectorAll("item");
  
      items.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("menu-item");
  
        const a = document.createElement("a");
        a.textContent = item.getAttribute("name");
        li.appendChild(a);
  
        const submenu = document.createElement("ul");
        submenu.classList.add("submenu");
  
        item.querySelectorAll("subitem").forEach(subitem => {
          const subLi = document.createElement("li");
          const subLink = document.createElement("a");
          subLink.textContent = subitem.getAttribute("name");
          subLink.href = subitem.getAttribute("link");
          subLi.appendChild(subLink);
          submenu.appendChild(subLi);
        });
  
        li.appendChild(submenu);
        parentElement.appendChild(li);
      });
    };
  
    createMenu(xmlDoc, menuList);
  });
  