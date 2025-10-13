<?php

namespace App\Models\Enums;



/**
 * Categoria
 *
 * Respaldado por string.
 *
 * Representa categorías del dominio usadas en la aplicación (por ejemplo: categorías de productos,
 * agrupaciones de contenido, etc.). Usar este enum centraliza los valores válidos,
 * evita el uso de cadenas mágicas y mejora la seguridad de tipos al pasar o comparar categorías.
 *
 * Uso típico:
 *   - Usar los casos del enum en lugar de strings crudos.
 *   - Usar comparaciones estrictas, expresiones match o sentencias switch con los casos de Categoria.
 *
 * Archivo: app/Models/Enums/Categoria.php
 *
 * @package App\Models\Enums
 */
enum Categoria : string {
    case Carne = "Carne";
    case Bebida = "Bebida";
    case Aderezos = "Aderezos";
    case Accesorios = "Accesorios";
    case Postres = "Postres";
    case SinValor = "SinValor";
}
