window.onload = () => {
    // Crear tarjetas
    // crearTarjetas(filosofos)
    crearTarjetas(filosofos); 

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click', crearNuevaTarjeta); 
    
    document.querySelectorAll('.sort-options .sort-btn')[0].addEventListener('click', ordenarNombreAZ);
    document.querySelectorAll('.sort-options .sort-btn')[1].addEventListener('click', ordenarNombreZA);
    
    document.querySelector('.save-btn').addEventListener('click', guardarTarjetas);
    document.querySelector('.load-btn').addEventListener('click', cargarTarjetas);

    eliminarTarjetaEstatica();
}

function eliminarTarjetaEstatica() {
    let tarjeta = document.querySelector('.cards-container .card');
    if (tarjeta) {
        tarjeta.remove();
    }
}

/**
 * Crea y añade un conjunto de tarjetas de filósofos al contenedor.
 *  - Un array de objetos filósofo o un único objeto filósofo.
 */
function crearTarjetas(filosofos) {
    // const filosofosArray = Array.isArray(filosofos) ? filosofos : [filosofos];
    const contenedor = document.querySelector('.cards-container');

    filosofos.forEach((filosofo) => {
        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        
        let botonEliminar = document.createElement('span');
        botonEliminar.classList.add('botonEliminar');
        botonEliminar.innerHTML = '&#10006;'; 
        botonEliminar.addEventListener('click', function() {
            tarjeta.remove();
        });
        tarjeta.append(botonEliminar);
        
        // Creamos imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.pais.bandera; 
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        imagen.src = filosofo.imagen; 
        tarjeta.append(imagen);

        // Creamos caja de información
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);
        
        // Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);
        
        // Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo); // Lo añadimos a info, no directamente al body

        // Añadimos info del país a filaInfo
        let infoPaisDiv = document.createElement('div');
        infoPaisDiv.classList.add('info-pais');
        // Icono de bandera
        let imgBandera = document.createElement('img');
        imgBandera.src = filosofo.pais.bandera;
        imgBandera.alt = `Bandera de ${filosofo.pais.nombre}`;
        infoPaisDiv.append(imgBandera);
        // Nombre del país
        let spanPais = document.createElement('span');
        spanPais.classList.add('pais');
        spanPais.innerHTML = ` ${filosofo.pais.nombre}`;
        infoPaisDiv.append(spanPais);
        filaInfo.append(infoPaisDiv); // Añadido a filaInfo

        // Añadimos info de la corriente a filaInfo
        let infoCorrienteDiv = document.createElement('div');
        infoCorrienteDiv.classList.add('info-corriente');
        infoCorrienteDiv.innerHTML = `<span>Corriente: </span><span class="corriente">${filosofo.corriente}</span>`;
        filaInfo.append(infoCorrienteDiv); // Añadido a filaInfo

        // Añadimos info del arma a filaInfo
        let infoArmaDiv = document.createElement('div');
        infoArmaDiv.classList.add('info-arma');
        infoArmaDiv.innerHTML = `<span>Arma: </span><span class="arma">${filosofo.arma}</span>`;
        filaInfo.append(infoArmaDiv); // Añadido a filaInfo
        
        // Añadimos caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades); // Añadido a info
        
        // Añadimos una a una las habilidades
        for (let infoHabilidad of filosofo.habilidades) {
            // Caja de habilidad
            let cajaHabilidad = document.createElement('div');
            cajaHabilidad.classList.add('skill');
            habilidades.append(cajaHabilidad);
            
            // 1.Icono de habilidad (usamos un placeholder ya que no se especifica un icono real)
            let iconoHabilidad = document.createElement('img');
            iconoHabilidad.src = "https://via.placeholder.com/16"; // Placeholder
            iconoHabilidad.alt = `Icono de ${infoHabilidad.habilidad}`;
            cajaHabilidad.append(iconoHabilidad);
            
            // 2.Etiqueta de habilidad
            let etiquetaHabilidad = document.createElement('span');
            etiquetaHabilidad.classList.add('skill-name'); // Corregido a 'skill-name'
            etiquetaHabilidad.innerHTML = infoHabilidad.habilidad;
            cajaHabilidad.append(etiquetaHabilidad);
            
            // 3.Barra de habilidad
            let barraHabilidad = document.createElement('div');
            barraHabilidad.classList.add('skill-bar');
            let nivelHabilidad = document.createElement('div');
            nivelHabilidad.classList.add('level'); // Corregido a 'level'
            
            // Cálculo del ancho: nivel (1-4) * 25% = ancho (25%-100%)
            nivelHabilidad.style.width = (infoHabilidad.nivel * 25) + '%';
            
            barraHabilidad.append(nivelHabilidad);
            cajaHabilidad.append(barraHabilidad);
        }

        // Añadimos tarjeta creada al contenedor de tarjetas
        contenedor.append(tarjeta);
    });
}

/**
 * Ordena las tarjetas por nombre del filósofo de A a Z y las vuelve a renderizar.
 */
function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let contenedor = document.querySelector('.cards-container');

    // 1. Eliminar todas las tarjetas del contenedor
    contenedor.innerHTML = ''; // Eliminar totes les targetes de l'array 'tarjeta'

    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    // 2. Afegir 'tarjetasOrdenadas' al contenidor de cards
    tarjetasOrdenadas.forEach(tarjeta => {
        contenedor.append(tarjeta);
    });
}

/**
 * Ordena las tarjetas por nombre del filósofo de Z a A y las vuelve a renderizar.
 */
function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let contenedor = document.querySelector('.cards-container');

    // 1. Eliminar todas las tarjetas del contenedor
    contenedor.innerHTML = '';

    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        // Invertir el resultado de localeCompare
        return nombre2.localeCompare(nombre1); 
    });

    // 2. Añadir 'tarjetasOrdenadas' al contenedor de cards
    tarjetasOrdenadas.forEach(tarjeta => {
        contenedor.append(tarjeta);
    });
}

/**
 * Crea una nueva tarjeta a partir de los datos del formulario.
 * @param {Event} event - El evento del click.
 */
function crearNuevaTarjeta(event) {
    event.preventDefault();

    // Recoger los valores del formulario
    let nombre = document.querySelector('.create-card-form .nombre').value;
    let imagen = document.querySelector('.create-card-form .foto').value;
    let paisNombre = document.querySelector('.create-card-form .pais').value;
    let bandera = document.querySelector('.create-card-form .bandera').value;
    let corriente = document.querySelector('.create-card-form .corriente').value;
    let arma = document.querySelector('.create-card-form .arma').value;
    
    // Recoger las 4 habilidades. Nota: El HTML tiene 4 inputs con class="skills"
    let habilidadesForm = document.querySelectorAll('.create-card-form .skills');
    let habilidades = [];

    // Habilidades predefinidas (asumiendo el mismo orden que en el formulario original)
    const nombresHabilidades = ["Sabiduría", "Oratoria", "Lógica", "Innovación"]; 

    habilidadesForm.forEach((input, index) => {
        const nivel = parseInt(input.value);
        if (!isNaN(nivel) && nivel >= 1 && nivel <= 10) { // Validación básica
             // El nivel se escala a base 4 para que la barra no sea muy corta o larga
            const nivelEscalado = Math.round(nivel / 2.5); // Escala de 1-10 a 1-4
            habilidades.push({
                habilidad: nombresHabilidades[index],
                nivel: nivelEscalado
            });
        }
    });

    // Crear el objeto filósofo
    let nuevoFilosofo = {
        nombre: nombre,
        imagen: imagen,
        pais: {
            nombre: paisNombre,
            bandera: bandera
        },
        corriente: corriente,
        arma: arma,
        habilidades: habilidades
    };

    // Crear y añadir la tarjeta
    crearTarjetas(nuevoFilosofo);
    
    // Limpiar el formulario
    document.querySelector('.create-card-form form').reset(); 
}

/**
 * Parsea los elementos DOM de las tarjetas a un formato de objeto filósofo.
 * @param {Array<HTMLElement>} tarjetas - Un array de elementos DOM con la clase .card.
 * @returns {Array<Object>} Un array de objetos filósofo.
 */
function parsearTarjetas(tarjetas){
    let filosofosParseados = [];
    for (let tarjeta of tarjetas){
        let filosofo = {};
        
        // Info principal
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.corriente = tarjeta.querySelector('.info-corriente .corriente').innerHTML;
        filosofo.arma = tarjeta.querySelector('.info-arma .arma').innerHTML;

        // País
        filosofo.pais = {};
        filosofo.pais.nombre = tarjeta.querySelector('.info-pais .pais').innerHTML.trim();
        filosofo.pais.bandera = tarjeta.querySelector('.info-pais img').src;
        
        // Habilidades
        filosofo.habilidades = [];
        let habilidadesDOM = tarjeta.querySelectorAll('.skill');
        for (let habilidadDOM of habilidadesDOM) {
            let habilidadParaGuardar = {};
            habilidadParaGuardar.habilidad = habilidadDOM.querySelector('.skill-name').innerHTML;
            
            // Calcular el nivel a partir del estilo de ancho de la barra de nivel (base 4)
            let nivelEstilo = habilidadDOM.querySelector('.level').style.width;
            let anchoPorcentaje = parseFloat(nivelEstilo.replace('%', ''));
            // Convierte el porcentaje de ancho (25%, 50%, 75%, 100%) a nivel (1, 2, 3, 4)
            habilidadParaGuardar.nivel = Math.round(anchoPorcentaje / 25); 
            
            filosofo.habilidades.push(habilidadParaGuardar);
        }
        
        filosofosParseados.push(filosofo); // Completar funció: añadir el filósofo al array
    }
    return filosofosParseados;
}


/**
 * Guarda las tarjetas actuales en el localStorage.
 */
function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas', JSON.stringify(parsearTarjetas(tarjetas)));
    alert('Tarjetas guardadas correctamente en el almacenamiento local.');
}


/**
 * Carga las tarjetas guardadas en el localStorage y las renderiza.
 */
function cargarTarjetas() {
    let tarjetasGuardadas = localStorage.getItem('tarjetas');
    if (tarjetasGuardadas) {
        // 1. Limpiar el contenedor actual
        document.querySelector('.cards-container').innerHTML = '';
        
        // 2. Parsear y crear las nuevas tarjetas
        let filosofosCargados = JSON.parse(tarjetasGuardadas);
        crearTarjetas(filosofosCargados);
        alert('Tarjetas cargadas correctamente desde el almacenamiento local.');
    } else {
        alert('No hay tarjetas guardadas en el almacenamiento local.');
    }
}

// Array de datos iniciales
const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]