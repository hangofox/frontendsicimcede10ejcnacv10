//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TokenCodigoActivacionRecuperacionContrasenaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/08/2023.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class TokenCodigoActivacionRecuperacionContrasenaController {

    @Autowired//INYECTAMOS EL SERVICIO.
    private TokenCodigoActivacionRecuperacionContrasenaService tokenCodigoActivacionRecuperacionContrasenaService;

    //CONTROLADORES DE CRUDS (GENERAR TOKEN DE CÓDIGO DE ACTIVACIÓN).

    //LEER CONSULTA DE TOKEN DE CÓDIGO DE ACTIVACIÓN POR TIEMPO DE VALIDEZ:
    @GetMapping("/tokensCodigosActivacionRecuperacionContrasena/{tiempoMinutosValidez}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTokenCodigoActivacionRecuperacionContrasenaporTiempoMinutosValidez(@PathVariable Long tiempoMinutosValidez){
        return tokenCodigoActivacionRecuperacionContrasenaService.consultarTokenCodigoActivacionRecuperacionContrasenaporTiempoMinutosValidez(tiempoMinutosValidez);
    }
}
