function mostrarSeccion(idSeccion, evento) {
  // Oculta todas las secciones
  document.querySelectorAll('.seccion-principal').forEach(function(seccion) {
    seccion.classList.remove('activo');
  });

  // Quita la clase activo de todos los enlaces
  document.querySelectorAll('.enlace-navegacion').forEach(function(enlace) {
    enlace.classList.remove('activo');
  });

  // Muestra la sección seleccionada
  document.getElementById(idSeccion).classList.add('activo');

  // Marca el enlace como activo
  if (evento && evento.target) {
    evento.target.classList.add('activo');
  }
}

// Mensaje toast de bienvenida
window.addEventListener('DOMContentLoaded', function() {
  const toast = document.getElementById('toast-bienvenida');
  if (toast) {
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000); // 3 segundos
  }
});

// Efecto visual al hacer clic en la portada
document.addEventListener('DOMContentLoaded', function() {
  const portada = document.querySelector('.imagen-portada');
  if (portada) {
    portada.addEventListener('click', function(e) {
      portada.style.boxShadow = '0 0 24px 8px #870654';
      setTimeout(() => {
        portada.style.boxShadow = '';
      }, 600);
    });
  }
});

// Botón "Volver arriba"
document.addEventListener('DOMContentLoaded', function() {
  const btnArriba = document.getElementById('btnArriba');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      btnArriba.style.display = 'block';
    } else {
      btnArriba.style.display = 'none';
    }
  });
  btnArriba.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Vibración al tocar enlaces importantes (solo móviles)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.enlace-navegacion, .btn-donacion').forEach(function(el) {
    el.addEventListener('click', function() {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(80);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Variables globales
  let controlOriginal = document.getElementById('control-xbox');
  let controles = [];
  let maxControles = 30; // O el número que quieras
  let estaVolando = true;
  let velocidadBase = 0.015;

  function crearControl(elemento, esOriginal = false) {
    return {
      elemento: elemento,
      t: Math.random() * Math.PI * 2,
      centroX: esOriginal ? 50 : 30 + Math.random() * 40,
      centroY: esOriginal ? 50 : 30 + Math.random() * 40,
      radioX: 15 + Math.random() * 15,
      radioY: 8 + Math.random() * 12,
      velocidadX: 0.2 + Math.random() * 0.3,
      velocidadY: 0.3 + Math.random() * 0.3,
      offsetX: Math.random() * Math.PI * 2,
      offsetY: Math.random() * Math.PI * 2,
      factorVelocidad: 0.8 + Math.random() * 0.4
    };
  }

  controlOriginal.style.left = '50vw';
  controlOriginal.style.top = '50vh';
  controles.push(crearControl(controlOriginal, true));

  function moverControl(controlObj) {
    if (!estaVolando) return;

    controlObj.t += velocidadBase * controlObj.factorVelocidad;

    const x = Math.max(5, Math.min(95, 
      controlObj.centroX + controlObj.radioX * Math.cos(controlObj.t * controlObj.velocidadX + controlObj.offsetX)
    ));
    const y = Math.max(5, Math.min(95, 
      controlObj.centroY + controlObj.radioY * Math.sin(controlObj.t * controlObj.velocidadY + controlObj.offsetY)
    ));
    
    controlObj.elemento.style.left = `${x}vw`;
    controlObj.elemento.style.top = `${y}vh`;
    
    const dx = -controlObj.radioX * controlObj.velocidadX * Math.sin(controlObj.t * controlObj.velocidadX + controlObj.offsetX);
    const dy = controlObj.radioY * controlObj.velocidadY * Math.cos(controlObj.t * controlObj.velocidadY + controlObj.offsetY);
    const angulo = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    
    controlObj.elemento.style.transform = `rotate(${angulo}deg)`;
  }

  function animar() {
    controles.forEach(controlObj => moverControl(controlObj));
    if (estaVolando) requestAnimationFrame(animar);
  }

  function agregarEventListeners(control) {
    control.addEventListener('click', function(e) {
      e.stopPropagation();
      estaVolando = !estaVolando;
      if (estaVolando) animar();
    });

    control.addEventListener('dblclick', function(e) {
      e.preventDefault();
      const controlesACrear = Math.min(2, maxControles - controles.length);
      if (controlesACrear === 0) {
        console.log(`Máximo de ${maxControles} controles alcanzado`);
        return;
      }
      for (let i = 0; i < controlesACrear; i++) {
        const nuevoControl = controlOriginal.cloneNode(true);
        nuevoControl.id = `control-xbox-${controles.length}`;
        const baseX = 20 + Math.random() * 60;
        const baseY = 20 + Math.random() * 60;
        const offsetX = i === 1 ? (Math.random() - 0.5) * 20 : 0;
        const offsetY = i === 1 ? (Math.random() - 0.5) * 20 : 0;
        const posicionX = Math.max(15, Math.min(85, baseX + offsetX));
        const posicionY = Math.max(15, Math.min(85, baseY + offsetY));
        nuevoControl.style.left = `${posicionX}vw`;
        nuevoControl.style.top = `${posicionY}vh`;
        document.body.appendChild(nuevoControl);
        const nuevoControlObj = crearControl(nuevoControl, false);
        controles.push(nuevoControlObj);
        agregarEventListeners(nuevoControl);
      }
      console.log(`${controlesACrear} control(es) creado(s). Total: ${controles.length}/${maxControles}`);
    });
  }

  agregarEventListeners(controlOriginal);
  animar();
});





