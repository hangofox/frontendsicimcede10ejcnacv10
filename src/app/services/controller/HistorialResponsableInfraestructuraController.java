//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialResponsableInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialResponsableInfraestructuraService;
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
* @Since 14/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class HistorialResponsableInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialResponsableInfraestructuraService historialResponsableInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesResponsablesInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialResponsableInfraestructura,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialResponsableInfraestructuraService.contarTotalRegistros(idHistorialResponsableInfraestructura, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesResponsablesInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialResponsableInfraestructuraDTO>> listarHistorialesResponsablesInfraestructurasLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialResponsableInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialResponsableInfraestructuraService.listarHistorialesResponsablesInfraestructuras(idHistorialResponsableInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesResponsablesInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialResponsableInfraestructuraDTO>> listarHistorialesResponsablesInfraestructurasListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialResponsableInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialResponsableInfraestructuraService.listarHistorialesResponsablesInfraestructurasPag(pageable, idHistorialResponsableInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesResponsablesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialResponsableInfraestructura(@RequestBody HistorialResponsableInfraestructuraDTO historialResponsableInfraestructuraDTO){
        return historialResponsableInfraestructuraService.crearHistorialResponsableInfraestructura(historialResponsableInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesResponsablesInfraestructuras/{idHistorialResponsableInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialResponsableInfraestructurabyId(@PathVariable Long idHistorialResponsableInfraestructura){
        return historialResponsableInfraestructuraService.consultarHistorialResponsableInfraestructuraporId(idHistorialResponsableInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesResponsablesInfraestructuras/numeroRegistro/{numRegHistorialResponsableInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialResponsableInfraestructuraportNumReg(@PathVariable String numRegHistorialResponsableInfraestructura) {
        return historialResponsableInfraestructuraService.consultarHistorialResponsableInfraestructuraporNumReg(numRegHistorialResponsableInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesResponsablesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialResponsableInfraestructura(@RequestBody HistorialResponsableInfraestructuraDTO historialResponsableInfraestructuraDTO){
        return historialResponsableInfraestructuraService.actualizarHistorialResponsableInfraestructura(historialResponsableInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesResponsablesInfraestructuras/{idHistorialResponsableInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialResponsableInfraestructura(@PathVariable Long idHistorialResponsableInfraestructura){
        return historialResponsableInfraestructuraService.eliminarHistorialResponsableInfraestructura(idHistorialResponsableInfraestructura);
    }
}
