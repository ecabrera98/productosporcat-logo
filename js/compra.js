
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const direccion = document.getElementById('direccion');
const celular = document.getElementById('celular');
const color = document.getElementById('color');


cargarEventos();

function cargarEventos() {
   
    //cuando se selecciona procesar Compra en Efectivo
    procesarCompraBtn.addEventListener('click', procesarCompra);


}

function procesarCompra() {
    // e.preventDefault();
if (cliente.value === '' || correo.value === '' || direccion.value === ''|| celular.value === ''|| color.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Lo Sentimos...',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 5000
        }).then(function () {
            window.location = "compra.html";
        })
    }
    else {
        
        //aqui se coloca el user id generado en el emailJS
        (function(){
            emailjs.init("user_Q8HH4phboa8veKZfhFP1v");
         })();

        var myform = $("form#procesar-pago");

        myform.submit( (event) => {
            event.preventDefault();

            // Change to your service ID, or keep using the default service
            var service_id = "default_service";
            var template_id = "gmail";
        
            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = '../img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            emailjs.sendForm(service_id, template_id, myform[0])
                .then(() => {
                    cargandoGif.style.display = 'none';
                    document.querySelector('#loaders').appendChild(enviado);

                    setTimeout(() => {
                        enviado.remove();
                        window.location = "catalogos.html";
                    }, 2000);


                }, (err) => {
                    alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                    // myform.find("button").text("Send");
                });

            return false;

        });

    }
}



