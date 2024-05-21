import Swal from 'sweetalert2'

export function showSuccessMessage(title, message) {
    Swal.fire({
        icon: "success",
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 2000,
        confirmButtonColor: "#0d6efd"
    });
}

export function showFailedMessage(title, message) {
    Swal.fire({
        icon: "warning",
        title: title,
        text: message,
        timer: 4000,
        confirmButtonColor: "#0d6efd"
    });
}

export function showErrorMessage(title, message, error) {
    Swal.fire({
        icon: "error",
        title: title,
        text: message,
        footer: JSON.parse(JSON.stringify(error)).message,
        timer: 4000,
        confirmButtonColor: "#0d6efd"
    });
}

export function showConfirmationMessage(action) {
    Swal.fire({
        title: "Estas seguro de realizar esta acción?",
        text: "Podrás revertirla luego :)",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!"
    }).then((result) => {
        if (result.isConfirmed) {
            return action();
        }
    });
}

export function showConfirmationMessageHorario(action) {
    Swal.fire({
        title: "Estas seguro de eliminar este horario?",
        text: "Esta acción es permanente y no podrás revertirla luego",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!"
    }).then((result) => {
        if (result.isConfirmed) {
            return action();
        }
    });
}