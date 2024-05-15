
const franjasToHorario = (perId, docId, franjas) => {
    const horarioFranjas = franjas.reduce((acc, franja) => {
        const { periodo_id, docente_id, franja_dia, ...rest } = franja.get({ plain: true });
        let existingFranjaDia = acc.find(item => item.franja_dia === franja_dia);
        if (existingFranjaDia) {
            existingFranjaDia.franjas.push(rest);
        } else {
            acc.push({
                franja_dia: franja_dia,
                franjas: [rest]
            });
        }
        return acc;
    }, []);

    return {
        periodo_id: perId,
        docente_id: docId,
        horario_franjas: horarioFranjas
    };
};

const horarioToFranjas = (horario) => {
    const { periodo_id, docente_id, horario_franjas } = horario;
    let franjas = [];

    horario_franjas.forEach(horarioFranja => {
        horarioFranja.franjas.forEach(franja => {
            franjas.push({
                periodo_id: periodo_id,
                docente_id: docente_id,
                franja_dia: horarioFranja.franja_dia,
                ...franja
            });
        });
    });

    return franjas;
};

module.exports = {
    franjasToHorario,
    horarioToFranjas
};