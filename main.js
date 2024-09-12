// Definir mi arreglo de cuentas

let cuentas = [
    {nombre: "Persona1", saldo:'200', password: '123'},
    {nombre: "Persona2", saldo:'297', password: '123'},
    {nombre: "Persona3", saldo:'67', password: '123'}
];


// Funcion para iniciar sesion

function login(event) {
    event.preventDefault();

    let usuario = document.getElementById("username").value;
    let contra = document.getElementById("password").value;

    let mensaje = document.getElementById("msj");

    // Busca la cuenta correcta y la graba si la encuentra
    let loggedinAccount = null; 
    for (let i = 0; i < cuentas.length; i++) {
        if (usuario == cuentas[i].nombre && contra == cuentas[i].password) {
            loggedinAccount = cuentas[i]; // Graba la cuenta
            window.location.href = "user.html";
            break;
        }
    }

    if (!loggedinAccount) {
        mensaje.style.color = "red";
        mensaje.innerText = "Error en usuario o contrasena";
    } else {
        // Graba la informacion de la cuenta en localStorage para usarla en la pagina User 
        localStorage.setItem('loggedinAccount', JSON.stringify(loggedinAccount)); 
    }
}

// Funcion checkBalance mejorada
function checkBalance() {
    // Regresa la informacion de la cuenta logged-in del localStorage
    let loggedinAccount = JSON.parse(localStorage.getItem('loggedinAccount'));

    // Chequea si una cuenta ha sido encontrada
    if (loggedinAccount) {
        // Crea un nuevo elemento para mostrar el balance
        let balanceDisplay = document.createElement('p'); 
        balanceDisplay.textContent = "Balance Actual: $" + loggedinAccount.saldo;
        
        // Agregar la pantalla del balance al del area de contenido.
        document.getElementById("content3").appendChild(balanceDisplay); 
    } else {
        // Maneja el caso cuando la informacion de la cuenta no es encontrada
        alert("No se encontro informacion de la cuenta. Por favor ingresa a tu cuenta."); 
    }
}

// Funcion para actualizar o crear la pantalla del balance
function updateBalanceDisplay(balance) {
    let balanceDisplay = document.getElementById("balanceDisplay"); 
    let messageDisplay = document.getElementById("messageDisplay");

    // Limpia cualquier mensaje existente 
    if (messageDisplay) {
        messageDisplay.remove(); 
    }

    if (balanceDisplay) {
        balanceDisplay.textContent = "Balance Actual: $" + balance;
    } else {
        balanceDisplay = document.createElement('p');
        balanceDisplay.id = "balanceDisplay";
        balanceDisplay.textContent = "Balance Actual: $" + balance;
        document.getElementById("content2").appendChild(balanceDisplay);
    }
}

// Funcion que maneja los retiros
function withdraw() {
    let loggedinAccount = JSON.parse(localStorage.getItem('loggedinAccount'));

    if (loggedinAccount) {
        let withdrawAmount = parseFloat(prompt("Introduzca el monto a Retirar:"));

        // Chequea si el usuario presiono "Cancel"
        if (withdrawAmount === null) { 
            return; // Sale de la funcion si "Cancel" es precionado
        }

        if (withdrawAmount > 0 && withdrawAmount <= parseFloat(loggedinAccount.saldo)) {
            loggedinAccount.saldo = parseFloat(loggedinAccount.saldo) - withdrawAmount;
            localStorage.setItem('loggedinAccount', JSON.stringify(loggedinAccount));
            updateBalanceDisplay(loggedinAccount.saldo); 
        } else {
            displayMessage("Monto Invalido a Retirar o Fondos Insuficientes.", "red"); 
        }
    } else {
        displayMessage("No se encontro informacion de la cuenta. Por favor ingresa a tu cuenta.", "red"); 
    }
}

// Funcion que maneja los depositos
function deposit() {
    let loggedinAccount = JSON.parse(localStorage.getItem('loggedinAccount'));

    if (loggedinAccount) {
        let depositAmount = parseFloat(prompt("Introduzca el monto a Depositar:"));

        // Chequea si el usuario presiono "Cancel"
        if (depositAmount === null) { 
            return; // Sale de la funcion si "Cancel" es precionado
        }

        if (depositAmount > 0) {
            loggedinAccount.saldo = parseFloat(loggedinAccount.saldo) + depositAmount;
            localStorage.setItem('loggedinAccount', JSON.stringify(loggedinAccount));
            updateBalanceDisplay(loggedinAccount.saldo); 
        } else {
            displayMessage("Monto Invalido a Retirar o Fondos Insuficientes.", "red"); 
        }
    } else {
        displayMessage("No se encontro informacion de la cuenta. Por favor ingresa a tu cuenta.", "red"); 
    }
}

// Funcion para mostrar mensajes en la pantalla
function displayMessage(message, color) {
    let messageDisplay = document.getElementById("messageDisplay");

    // Limpia cualquier mensaje existente antes de mostrar uno nuevo
    if (messageDisplay) {
        messageDisplay.remove(); 
    }

    messageDisplay = document.createElement('p');
    messageDisplay.id = "messageDisplay";
    messageDisplay.textContent = message;
    messageDisplay.style.color = color;
    document.getElementById("content3").appendChild(messageDisplay); // Agrega a 'content3'
}

// Funcion que maneja la salida
function logout() {
    localStorage.removeItem('loggedinAccount'); // Limpia la informacion de la cuenta del logged-in
    window.location.href = "index.html"; // Regresa a la pantalla principal
}

// Event listeners para los botones
document.getElementById("btnRetirar").addEventListener("click", withdraw);
document.getElementById("btnAgregar").addEventListener("click", deposit);
document.getElementById("btnSalir").addEventListener("click", logout);