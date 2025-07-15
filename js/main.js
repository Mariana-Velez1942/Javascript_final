const apiURL = "http://localhost:3000/";

function registerUser(e) {
     e.preventDefault(); 
     const fullname = document.getElementById("fullname").value; 
     const email = document.getElementById("email").value; 
     const password = document.getElementById("password").value; 
     const confirm = document.getElementById("confirm").value;
}

if (!fullname || !email || !password || !confirm) 
    return alert("Todos los campos son obligatorios");
if (password !== confirm)
    return alert("Las contraseñas no coinciden");

fetch($,{ apiURL } / users ? email = $:{ email })
    .then(res => res.json())
    .then(users => {
        if (users.length > 0)
            return alert("Este correo ya está registrado");

        const newUser = { fullname, email, password, role: email === "admin@admin.com" ? "admin" : "visitor" };
        fetch($,{ apiURL } / users, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
            .then(() => {
                alert("Registro exitoso");
                window.location.href = "/index/login.html";
            });
    });


function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById("identifier").value;
    const password = document.getElementById("login-password").value;

    fetch($,{ apiURL } / users ? email = $:{ email } & password , $,{ password })
        .then(res => res.json())
        .then(users => {
            if (users.length === 0)
                return alert("Credenciales incorrectas");
            const user = users[0];
            localStorage.setItem("user", JSON.stringify(user));
            if (user.role === "admin") {
                window.location.href = "/admin/createevents";
            } else {
                window.location.href = "/visitor/see_events_inscript.html";
            }
        });
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "/index/login.html";
}

function protectPage() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) window.location.href = "../index/login.html";
}

function showUserInfo() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && document.getElementById("user-info")) {
        document.getElementById("user-info").innerText = Bienvenido, $,{ userfullname , useremail };
    }
}

// ----------------- EVENTOS ----------------- 
function createEvent(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const newEvent = { title, description };

    fetch($,{ apiURL } / events, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
    })
        .then(() => {
            alert("Evento creado correctamente");
            window.location.href = "admin.html";
        });
}

function updateEvent(e) {
    e.preventDefault();
    const id = localStorage.getItem("editId");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    fetch($,{ apiURL } / events / $,{ id }, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    })
        .then(() => {
            localStorage.removeItem("editId");
            alert("Evento actualizado correctamente");
            window.location.href = "admin.html";
        });
}

function populateEditForm() {
    const id = localStorage.getItem("editId");
    if (id) {
        fetch($,{ apiURL } / events / $,{ id })
        .then(res => res.json())
        .then(event => {
            document.getElementById("title").value = event.title;
            document.getElementById("description").value = event.description;
        });
    }
}

function loadEvents() {
    fetch($,{ apiURL } / events)
        .then(res => res.json())
        .then(events => {
            const container = document.getElementById("event-list");
            container.innerHTML = "";
            events.forEach(ev => {
                const card = document.createElement("div");
                card.innerHTML = container.appendChild(card);
            });
        });
}

function editEvent(id) {
    localStorage.setItem("editId", id);
    window.location.href = "createvents.html";
}

function deleteEvent(id) {
    if (!confirm("¿Estás segura de eliminar este evento?"))
        return; fetch($,{ apiURL } / events / $,{ id }, {
            method: "DELETE"
        })    
        .then(() => loadEvents());
}


