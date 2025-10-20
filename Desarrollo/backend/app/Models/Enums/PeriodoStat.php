<?php

namespace App\Models\Enums;

/**
 * Enum Periodo
 *
 * Representa los identificadores de periodo permitidos usados en la aplicación.
 * Es un enum respaldado por string pensado para validación, persistencia y
 * serialización, de modo que los valores de periodo sean consistentes entre capas.
 *
 * Ejemplos de uso:
 *   - Acceder a un caso: Periodo::Verano
 *   - Obtener el valor subyacente: Periodo::Verano->value
 *   - Crear desde un string (lanza ValueError si es inválido): Periodo::from('Verano')
 *
 * Notas de implementación:
 *   - Al ser un enum respaldado por strings, mantener estables las etiquetas/valores
 *     para no romper datos almacenados ni integraciones externas.
 *   - Usar los valores del enum en lugar de strings literales para beneficiarse de
 *     comprobación de tipos y autocompletado en el IDE.
 *
 * @package App\Models\Enums
 */
enum Periodo: string {
    case Verano = 'Verano';
    case Otono = 'Otono';
    case Primavera = 'Primavera';
    case Invierno = "Invierno"; //Agregar tmb en la bd
}