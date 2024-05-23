import React from 'react'
import { useState, useRef } from 'react';
import HorarioForm from './forms/HorarioForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ModalBS from './Bootstrap/ModalBS';
import { get, set } from 'react-hook-form';
import { useCommonHorarioContext } from './CommonHorarioContext';


const HorarioComponent = () => {

    const { state, states, horario, setHorario, franjaActual, setFranjaActual, datosHorario } = useCommonHorarioContext();

    const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hours = ['07:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 am', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm'];

    const [closeModal, setCloseModal] = useState(false);
    const colorMapRef = useRef(new Map());
    const usedColorsRef = useRef(new Set());

    const currentHour = (x) => x + 6;

    const handleSelectCell = (col, row) => {
        const franja = getFranja(col, row);
        if (franja) {
            setFranjaActual({...franja, state: 'existing', franja_dia: col});
        } else {
            setFranjaActual({
                franja_dia: col,
                franja_hora_inicio: currentHour(row),
                state: 'new'
            });
        }
    }

    const getFranja = (col, row) => {
        const dia = horario.horario_franjas?.find(dia => dia.franja_dia === col);
        const franja = dia?.franjas.find(franja => franja.franja_hora_inicio <= currentHour(row) && franja.franja_hora_fin > currentHour(row));
        if (franja) return franja;
    }
    const deleteFranja = () => {
        const newHorario = {
            ...datosHorario, 
            horario_franjas: horario.horario_franjas.map(dia => {
                if (dia.franja_dia === franjaActual.franja_dia) {
                    return {
                        ...dia,
                        franjas: dia.franjas.filter(franja => franja.franja_hora_inicio !== franjaActual.franja_hora_inicio)
                    };
                }
                return dia;
            })
        };
        return newHorario;
    }

    const handleDeleteFranja = () => {
        const newHorario = deleteFranja();
        setHorario(newHorario);
        setCloseModal(true);
    }
    
    function getRandomPastelColor() {
        const r = Math.floor((Math.random() * 127) + 127); // 127-254
        const g = Math.floor((Math.random() * 127) + 127); // 127-254
        const b = Math.floor((Math.random() * 127) + 127); // 127-254
        return `rgb(${r}, ${g}, ${b})`;
    }

    const getColorForMateria = (id) => {
        const colorMap = colorMapRef.current;
        if (!colorMap.has(id)) {
            // Si no tiene un color asignado, generar uno y asignarlo
            colorMap.set(id, getRandomPastelColor());
        }
        return colorMap.get(id);
    };

    const getColor = (id) => {
        const colorMap = colorMapRef.current;
        const usedColors = usedColorsRef.current;
        if (!colorMap.has(id)) {
            const availableColors = Array.from({ length: 16 }, (_, i) => i + 1).filter(i => !usedColors.has(i));
            if(availableColors.length === 0) {
                return 'color-default';
            }
            const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
            colorMap.set(id, "color-" + randomColor);
            usedColors.add(randomColor);
        }
        return colorMap.get(id);
    };

    return (
        <div className="col-md-11 p-0 mb-3">
            <div className="container text-center">
                <div className="row col-12">
                    {[...Array(7)].map((_, colIndex) => (
                        <div className="col p-0" key={colIndex}>
                            {[...Array(16)].map((_, rowIndex) => {
                                const cellNumber = colIndex * 16 + rowIndex + 1;
                                const franja = getFranja(colIndex, rowIndex);
                                return (
                                    <div key={cellNumber}
                                        className={`
                    ${colIndex === 0 || rowIndex === 0 ? '' : 'border'}
                    ${rowIndex === 0 && 'mb-2'}   
                    ${rowIndex === 0 && ![0, 1, 6].includes(colIndex) ? 'week-days' : ''}
                    ${rowIndex === 0 && colIndex === 1 ? 'monday' : ''}
                    ${rowIndex === 0 && colIndex === 6 ? 'friday' : ''}`}
                                        style={{ height: '32px' }}>
                                        {
                                            colIndex === 0 && hours[rowIndex - 1]
                                        }
                                        {
                                            rowIndex === 0 && weekDays[colIndex - 1]
                                        }
                                        {
                                            (rowIndex !== 0 && colIndex !== 0) &&

                                            <ModalBS closeModal={closeModal} setCloseModal={setCloseModal} >
                                                <button type="button" className={`p-0 border-0 franja-cell ${franja? getColor(franja.competencia_id) : 'color-0'}`}
                                                    disabled={[states.new, states.blocked].includes(state) || (state == states.consulting && !franja)}
                                                    onClick={() => { handleSelectCell(colIndex, rowIndex) }} > {franja && franja.competencia.competencia_nombre}</button>
                                                <div >
                                                    <button type="button" className="btn btn-outline-danger btn-sm d-flex align-items-center ms-auto" onClick ={handleDeleteFranja}>
                                                        <i className="bi bi-trash3 fs-5 "></i>
                                                    </button>
                                                </div>
                                                <HorarioForm deleteFranja = {deleteFranja}/>
                                            </ModalBS>
                                        }

                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HorarioComponent