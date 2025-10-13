<?php

namespace App\Models\Enums;

/**
 * Enum Estado
 *
 * Representa los posibles estados de una comanda.
 * Cada valor del enum corresponde a un estado específico en el ciclo de vida de una comanda.
 *
 * @package App\Models\Enums
 */
enum EstadoComanda : string {
    case REALIZADA = "Realizada";
    case EN_PROCESO = "En proceso"; // ← No usarse por ahora
    case CONFIRMADA = "Confirmada";
    case FINALIZADA = "Finalizada";
    case CANCELADA = "Cancelada";
}