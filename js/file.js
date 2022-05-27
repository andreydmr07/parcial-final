var infoForm = {}

//agregar usuario
function SignIn() {

    var contraseñajson
    var contraseñaobj
    var contraseña

    txtemail = document.getElementById("txtemail").value;
    txtpassword = document.getElementById("txtpassword").value;



    fetch(`http://localhost:3001/hotel/${txtemail}`)
        .then(response => response.json())
        .then(data => contraseñajson = data)
        .then(() => console.log(contraseñajson))
        .catch(error => (console.log('Usuario o contraseña incorrectos')))

    setTimeout(() => {

        contraseñaobj = JSON.parse(JSON.stringify(contraseñajson))

        console.log(contraseñaobj[0].password)



        contraseña = contraseñaobj[0].password
        if (txtpassword == contraseña) {
            alert('Inicio de sesión exitoso')
            window.location.replace('../html/crud.html')
            alert('Inicio de sesión exitoso')


        } else {
            alert('Usuario o contraseña incorrectos')
        }





    }, 1500)


}


function add_pedido() {

    txttipohab = document.getElementById('txttipohab').value
    txtusuarioid = document.getElementById('txtusuarioid').value
    txttiempo = document.getElementById('txttiempo').value
    txtfechaped = document.getElementById('txtfechaped').value
    tablacrud = document.getElementById('tablacrud').getElementsByTagName('tbody')[0]
    divtabla = document.getElementById('divtabla')

    var infoForm = {}


    if (txttipohab == 0 || txtusuarioid == 0 || txttiempo == 0 || txtfechaped == 0) {
        alert('Llene todos los campos')
    } else {
        infoForm['txttipohab'] = txttipohab
        infoForm['txtusuarioid'] = txtusuarioid
        infoForm['txttiempo'] = txttiempo
        infoForm['txtfechaped'] = txtfechaped

        var nuevaFila = tablacrud.insertRow(tablacrud.lenght)


        //Insertar en la tabla
        cell1 = nuevaFila.insertCell(0)
        cell1.innerHTML = infoForm.txttipohab

        cell2 = nuevaFila.insertCell(1)
        cell2.innerHTML = infoForm.txtusuarioid
        cell3 = nuevaFila.insertCell(2)
        cell3.innerHTML = infoForm.txttiempo
        cell4 = nuevaFila.insertCell(3)
        cell4.innerHTML = infoForm.txtfechaped

        cell5 = nuevaFila.insertCell(4)
        cell5.innerHTML = `<div class="text-center">
                                <a class= "btn btn-warning " onClick="onEdit(this)">Editar</a>
                                <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>
                           </div>`
        divtabla.style.display = ''
        document.getElementById('form').reset()

    }

}
function onEdit(td) {

    selectedRow = td.parentElement.parentElement;

    document.getElementById("txttipohab").value = selectedRow.cells[1].innerHTML;
    document.getElementById("txtusuarioid").value = selectedRow.cells[2].innerHTML;
    document.getElementById("txttiempo").value = selectedRow.cells[3].innerHTML;
    document.getElementById("txtfechaped").value = selectedRow.cells[4].innerHTML;




}

function actualizar_pedido(infoForm) {

    if (txttipohab == 0 || txtusuarioid == 0 || txttiempo == 0 || txtfechaped == 0) {
        alert('Llene todos los campos')
    } else {

        txttipohab = document.getElementById('txttipohab').value
        txtusuarioid = document.getElementById('txtusuarioid').value
        txttiempo = document.getElementById('txttiempo').value
        txtfechaped = document.getElementById('txtfechaped').value

        infoForm['txttipohab'] = txttipohab
        infoForm['txtusuarioid'] = txtusuarioid
        infoForm['txttiempo'] = txttiempo
        infoForm['txtfechaped'] = txtfechaped

        var nuevaFila = tablacrud.insertRow(tablacrud.lenght)


        //Insertar en la tabla
        cell1 = nuevaFila.insertCell(0)
        cell1.innerHTML = infoForm.txttipohab

        cell2 = nuevaFila.insertCell(1)
        cell2.innerHTML = infoForm.txtusuarioid
        cell3 = nuevaFila.insertCell(2)
        cell3.innerHTML = infoForm.txttiempo
        cell4 = nuevaFila.insertCell(3)
        cell4.innerHTML = infoForm.txtfechaped

        cell5 = nuevaFila.insertCell(4)
        cell5.innerHTML = `<div class="text-center">
                                <a class= "btn btn-warning " onClick="onEdit(this)">Editar</a>
                                <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>
                           </div>`
        divtabla.style.display = ''
        document.getElementById('form').reset()
    }

}
function onDelete(td) {

    if (confirm('¿Estás seguro de esto? Al borrarlo, perderás la información')) {

        row = td.parentElement.parentElement;
        tablacrud.deleteRow(row.Index);




        var num = tablacrud.rows.length;
        
        if (num == 1) {
            divtabla.style.display = 'none'; // ocultar
        }

    }

}
function enviardatos() {

    var rowstabla = tablacrud.rows.length
    var arrdatos = {}
    for (let i = 0; i < rowstabla; i++) {
        for (let j = 0; j < 4; j++) {
            arrdatos[j] = tablacrud.rows[i].cells.item(j).innerHTML

        }

    }

    var arrdatosSize = Object.keys(arrdatos).length


    console.log(arrdatos)
    console.log("Tamaño obj materias: " + arrdatosSize)





    const parametros = {
        
        id_habitacion: arrdatos[0],
        id_usuario: arrdatos[1],
        tiempo: arrdatos[2] + " días",
        fecha: arrdatos[3]

    }
    console.log(parametros)

    
    const options = {
        method: 'POST',
        body: JSON.stringify(parametros),
        headers: {
            'Content-Type': 'application/json'


        }
    }

    
    fetch('http://localhost:3001/hotel/pedido', options)

        .then(response => response.json())
    alert('Su pedido ya se encuentra registrado')

    divtabla.style.display = 'none'





}
