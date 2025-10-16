<?php

namespace App\Models\Enums;

/**
 * Enum EstadoReserva
 *
 * Representa los posibles estados de una reserva dentro del dominio de la aplicación.
 * Este enum está respaldado por strings para permitir una persistencia explícita y
 * legible en la base de datos y en APIs.
 *
 * Propósitos:
 * - Centralizar los valores permitidos para el estado de una reserva.
 * - Mejorar la legibilidad y seguridad frente a cadenas mágicas dispersas.
 * - Facilitar validaciones y comparaciones tipadas.
 *
 * Uso típico:
 * - Comparación con el valor string: $modelo->estado === EstadoReserva::PENDIENTE->value
 * - Asignación directa del enum a propiedades tipadas: $reserva->estadoEnum = EstadoReserva::CONFIRMADA
 *
 * Ejemplos de estados esperados:
 * - PENDIENTE   : reserva creada pero no confirmada
 * - CONFIRMADA  : reserva confirmada por el usuario o el sistema
 * - CANCELADA   : reserva cancelada
 * - COMPLETADA  : servicio asociado completado
 *
 *
 * @package App\Models\Enums
 */
enum EstadoReserva : string {
    case PENDIENTE = "Pendiente";
    case CONFIRMADA = "Confirmada";
    case CANCELADA = "Cancelada";
    case FINALIZADA = "Finalizada";
}