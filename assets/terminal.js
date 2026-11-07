(() => {
  const terminal = document.getElementById('terminal-demo');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!terminal || !form || !input || !output) return;

  const commands = {
    ayuda: { text: 'Comandos: ls, ls -l, whoami, pwd, cat perfil, proyectos, experiencia, habilidades, formación, contacto, clear. Usa cd proyectos, cd experiencia, cd formación o cd contacto para navegar.' },
    ls: { text: 'proyectos/  experiencia/  habilidades/  contacto/', label: 'Explorar proyectos →', href: 'proyectos.html' },
    whoami: { text: 'José Díaz · Ingeniero Civil Telemático, soporte avanzado y operaciones cloud.' },
    pwd: { text: '~/portafolio (ubicación simulada)' },
    formacion: { text: 'Formación universitaria, cursos e insignias.', label: 'Ver formación →', href: 'formacion.html' },
    proyectos: { text: 'Casos de despliegue en AKS, automatización Azure y Plataforma Docker Lab.', label: 'Explorar proyectos →', href: 'proyectos.html' },
    experiencia: { text: 'Soporte avanzado, infraestructura cloud, despliegues y automatización.', label: 'Ver experiencia →', href: 'experiencia.html' },
    habilidades: { text: 'Azure, AKS, Kubernetes, Helm, Linux, monitoreo y automatización.', label: 'Ver perfil completo →', href: 'experiencia.html' },
    contacto: { text: 'Conversemos sobre oportunidades de Cloud Operations e infraestructura.', label: 'Ir a contacto →', href: '#contacto' }
  };

  function run(value) {
    const command = value.trim().toLocaleLowerCase('es').replace(/\s+/g, ' ');
    if (!command) return;
    output.replaceChildren();
    if (command === 'limpiar' || command === 'clear') return;
    const aliases = { help: 'ayuda', 'ls -l': 'ls', 'ls -la': 'ls', 'ls -a': 'ls', 'cat perfil': 'whoami', 'cat perfil.txt': 'whoami', 'cat contacto.txt': 'contacto', 'formación': 'formacion', proyecto: 'proyectos' };
    const destinations = { proyectos: 'proyectos.html', proyecto: 'proyectos.html', experiencia: 'experiencia.html', formacion: 'formacion.html', 'formación': 'formacion.html', contacto: '#contacto', inicio: 'index.html' };
    if (command.startsWith('cd ')) {
      const destination = command.slice(3).replace(/^\.\//, '').replace(/\/$/, '');
      if (Object.hasOwn(destinations, destination)) {
        window.location.href = destinations[destination];
        return;
      }
    }
    const key = Object.hasOwn(aliases, command) ? aliases[command] : command;
    const result = Object.hasOwn(commands, key) ? commands[key] : null;
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
