(() => {
  const terminal = document.getElementById('terminal-demo');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!terminal || !form || !input || !output) return;

  const commands = {
    ayuda: { text: 'Explora con proyectos, experiencia, habilidades o contacto. Escribe limpiar para empezar de nuevo.' },
    proyectos: { text: 'Casos de despliegue en AKS, automatización Azure y Plataforma Docker Lab.', label: 'Explorar proyectos →', href: 'proyectos.html' },
    experiencia: { text: 'Soporte avanzado, infraestructura cloud, despliegues y automatización.', label: 'Ver experiencia →', href: 'experiencia.html' },
    habilidades: { text: 'Azure, AKS, Kubernetes, Helm, Linux, monitoreo y automatización.', label: 'Ver perfil completo →', href: 'experiencia.html' },
    contacto: { text: 'Conversemos sobre oportunidades de Cloud Operations e infraestructura.', label: 'Ir a contacto →', href: '#contacto' }
  };

  function run(value) {
    const command = value.trim().toLocaleLowerCase('es');
    if (!command) return;
    output.replaceChildren();
    if (command === 'limpiar' || command === 'clear') return;
    const result = commands[command === 'help' ? 'ayuda' : command];
    const line = document.createElement('p');
    line.className = 'terminal-result-command';
    line.textContent = '$ ' + command;
    const answer = document.createElement('p');
    answer.textContent = result ? result.text : 'Comando no reconocido. Escribe ayuda para ver las opciones.';
    output.append(line, answer);
    if (result && result.href) {
      const link = document.createElement('a');
      link.href = result.href;
      link.textContent = result.label;
      output.append(link);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    run(input.value);
    input.value = '';
  });
  terminal.querySelectorAll('[data-command]').forEach((button) => {
    button.addEventListener('click', () => run(button.dataset.command));
  });
  terminal.hidden = false;
})();
