//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ParametrosSistemaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ParametrosSistemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 30/07/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ParametrosSistemaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ParametrosSistemaService parametrosSistemaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/parametrosSistema/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idParametrosSistema) {
        return new ResponseEntity<>(parametrosSistemaService.contarTotalRegistros(idParametrosSistema), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/parametrosSistema/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ParametrosSistemaDTO>> listarParametrosSistemaLista(
            @RequestParam(required = false) Long idParametrosSistema,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(parametrosSistemaService.listarParametrosSistema(idParametrosSistema, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/parametrosSistema/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ParametrosSistemaDTO>> listarParametrosSistema(
            @RequestParam(required = false) Long idParametrosSistema,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(parametrosSistemaService.listarParametrosSistemaPag(pageable, idParametrosSistema, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/parametrosSistema")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearParametrosSistema(@RequestBody ParametrosSistemaDTO parametrosSistemaDTO){
        System.out.println(parametrosSistemaDTO);
        return parametrosSistemaService.crearParametrosSistema(parametrosSistemaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/parametrosSistema/{idParametrosSistema}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarParametrosSistemaporId(@PathVariable Long idParametrosSistema){
        return parametrosSistemaService.consultarParametrosSistemaporId(idParametrosSistema);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/parametrosSistema")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarParametrosSistema(@RequestBody ParametrosSistemaDTO parametrosSistemaDTO){
        return parametrosSistemaService.actualizarParametrosSistema(parametrosSistemaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/parametrosSistema/{idParametrosSistema}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarParametrosSistema(@PathVariable Long idParametrosSistema){
        return parametrosSistemaService.eliminarParametrosSistema(idParametrosSistema);
    }
}
