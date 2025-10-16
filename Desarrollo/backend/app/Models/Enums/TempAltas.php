<?php

namespace App\Models\Enums;


/**
 * Enum TemporadasAltas
 *
 * Representa las distintas temporadas altas utilizadas en la aplicación.
 * Cada caso del enum debe ser un string que identifica una temporada alta
 * (por ejemplo para ajustar precios, disponibilidad o aplicar reglas específicas).
 *
 * Propósitos comunes:
 * - Determinar recargos o políticas especiales en reservas durante temporada alta.
 * - Filtrar o agrupar recursos (ofertas, eventos, inventario) por temporada.
 * - Evitar el uso de cadenas dispersas y mejorar la seguridad de tipos.
 * 
 * @package App\Models\Enums
 */
enum TemporadasAltas: string {
    case VacacionesVerano = 'VacacionesVerano';
    case VacacionesInvierno = 'VacacionesInvierno';
    case Turismo = 'Turismo';
    case FiestasFinAno = 'FiestasFinAno';
}
