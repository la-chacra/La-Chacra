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
    case EnProceso = "EnProceso";
    case Finalizado = "Finalizado";
    case Cancelado = "Cancelado";
}