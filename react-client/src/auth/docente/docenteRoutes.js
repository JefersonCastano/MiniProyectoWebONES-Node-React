import HorarioDocente from '../../views/docente/HorarioDocente';
import InfoDocente from '../../views/docente/InfoDocente';

export const docente_routes = [
    {
        path: '/informacion-personal',
        element: <InfoDocente />
    },
    {
        path: '/horarios-docente',
        element: <HorarioDocente />
    } 
]

export const docente_pages = ["Información Personal", "Horarios"];
export const docente_icons = ["bx-user-pin", "bx-calendar-week"];