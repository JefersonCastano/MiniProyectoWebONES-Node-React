import Horario from '../../views/coordinador/Horario';
import PeriodoAcademico from '../../views/coordinador/PeriodoAcademico';
import Docente from '../../views/coordinador/Docente';
import Ambiente from '../../views/coordinador/Ambiente';
import Programa from '../../views/coordinador/Programa';
import Competencia from '../../views/coordinador/Competencia';

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