import Horario from '../routers/coordinador/Horario';
import PeriodoAcademico from '../routers/coordinador/PeriodoAcademico';
import Docente from '../routers/coordinador/Docente';
import Ambiente from '../routers/coordinador/Ambiente';
import Programa from '../routers/coordinador/Programa';
import Competencia from '../routers/coordinador/Competencia';

export const coordinador_routes = [
    {
        path: '/horarios',
        element: <Horario />
    },
    {
        path: '/periodos-academicos',
        element: <PeriodoAcademico />
    },
    {
        path: '/docentes',
        element: <Docente />
    },
    {
        path: '/ambientes',
        element: <Ambiente />
    },
    {
        path: '/programas',
        element: <Programa />
    },
    {
        path: '/competencias',
        element: <Competencia />
    }
];

export const coordinador_pages = ["Horarios", "Periodos Académicos", "Docentes", "Ambientes", "Programas", "Competencias"];
export const coordinador_icons = ["bx-calendar-week", "bx-calendar", "bx-group", "bx-buildings", "bx-book", "bx-book-content"];