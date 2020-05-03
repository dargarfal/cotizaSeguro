//Cotizador
class CSeguro{

    constructor(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
    }

    Cotizando(){
        /*
            1-Americano - 1.15
            2-Asiatico - 1.05
            3-Europeo - 1.35
        */
        let cantidad;
        const base = 2000;
    
        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }   
        
        let porciento;
    
        porciento = (max - this.anio) * 3;
        cantidad = cantidad - (cantidad * porciento / 100);
    
        if(this.tipo === 'basico'){
            cantidad = cantidad * 1.30;
        }else{
            cantidad = cantidad * 1.50;
        }
        
        return cantidad;
    
    }

}


//todo lo que se muestra
class Interfaz{

    mostrarError(mensaje, tipo){
        const div = document.createElement('div');

        if(tipo === 'error'){
            div.classList.add('mensaje', 'error');
        }else{
            div.classList.add('mensaje', 'correcto');
        }

        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function(){
                document.querySelector('.mensaje').remove();
        }, 3000);

    }

    
}


//--------------------------------------------------------------
/*if(document.querySelector('#resultado').children.length > 0){
    document.querySelector('#resultado').removeChild();
};*/

const formulario = document.querySelector('#cotizar-seguro');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //Leer marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //Leer anio seleccionada
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //Lee el valor del Radio Buttom
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //Crear instancia de interfaz

    const interfaz = new Interfaz();

    //Comprobar que los campos esten todos llenos
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        interfaz.mostrarError('Faltan datos', 'error');
    }else{
    
    //Limpiar resultado anteriores
    const limpiar = document.querySelector('#resultado div');
    if(limpiar != null){
        limpiar.remove(); 
    }

    //Instaciar seguro y mostrar interfaz
    const seguro = new CSeguro(marcaSeleccionada, anioSeleccionado, tipo);

    const cantidad = seguro.Cotizando();

    console.log(cantidad);
    
    interfaz.mostrarError('Cotizando...', 'correcto');

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    
    let marca;
    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break;
    }   

    const contenido = document.createElement('div');
    contenido.innerHTML = ` <p class='header'>TU RESUMEN</p>
                            <p>Marca: ${marca}</p>
                            <p>Año: ${anioSeleccionado}</p>
                            <p>Tipo: ${tipo}</p>
                            <p>Total: $${cantidad}</p>`;
                           
    setTimeout(() => {
        spinner.style.display = 'none';
        document.querySelector('#resultado').appendChild(contenido);
    }, 2000);                      
    
    }
});


const max = new Date().getFullYear(),
      min = max - 20;

const selectAnios = document.querySelector('#anio');

for(let i=max; i>min;i--){
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectAnios.appendChild(option);
}
