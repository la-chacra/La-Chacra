<?php

namespace App\Models\Enums;

// Enum para estado de la reserva
enum EstadoReserva : string {
    case PENDIENTE = "Pendiente";
    case CONFIRMADA = "Confirmada";
    case CANCELADA = "Cancelada";
    case FINALIZADA = "Finalizada";
}