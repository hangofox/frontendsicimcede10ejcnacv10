//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoContratoSeguroInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoContratoSeguroInfraestructuraService;
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
* @Since 01/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class TipoContratoSeguroInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoContratoSeguroInfraestructuraService tipoContratoSeguroInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //1. CONTADORES DE REGISTROS FILTRADOS.
    //CONTAR TOTAL DE REGISTROS (CON FILTROS OPCIONALES POR KEYWORD/ID DE TIPO CONTRATO SEGURO INFRAESTRUCTURA):
    @GetMapping("/tiposContratosSegurosInfraestructuras/count")
    public ResponseEntity<Long> contarTotalTiposContratosSegurosInfraestructuras(
            @RequestParam(required = false) Long idTipoContratoSeguroInfraestructura,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(tipoContratoSeguroInfraestructuraService.contarTotalRegistros(idTipoContratoSeguroInfraestructura, keyword), HttpStatus.OK);
    }
    
    //1. LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //LISTAR REGISTROS (CON FILTROS OPCIONALES POR KEYWORD/ID DE TIPO CONTRATO SEGURO INFRAESTRUCTURA):
    @GetMapping("/tiposContratosSegurosInfraestructuras/lista")
    public ResponseEntity<List<TipoContratoSeguroInfraestructuraDTO>> listarTiposContratosSegurosInfraestructurasLista(
            @RequestParam(required = false) Long idTipoContratoSeguroInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "id") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoContratoSeguroInfraestructuraService.listarTiposContratosSegurosInfraestructuras(idTipoContratoSeguroInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //1. LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //LISTAR REGISTROS CON PAGINACIÓN (CON FILTROS OPCIONALES POR KEYWORD/ID DE TIPO CONTRATO SEGURO INFRAESTRUCTURA):
    @GetMapping("/tiposContratosSegurosInfraestructuras/listaPag")
    public ResponseEntity<Slice<TipoContratoSeguroInfraestructuraDTO>> listarTiposContratosSegurosInfraestructurasListaPag(
            @RequestParam(required = false) Long idTipoContratoSeguroInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "id") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoContratoSeguroInfraestructuraService.listarTiposContratosSegurosInfraestructurasPag(pageable, idTipoContratoSeguroInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposContratosSegurosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoContratoSeguroInfraestructura(@RequestBody TipoContratoSeguroInfraestructuraDTO tipoContratoSeguroInfraestructuraDTO){
        System.out.println(tipoContratoSeguroInfraestructuraDTO);
        return tipoContratoSeguroInfraestructuraService.crearTipoContratoSeguroInfraestructura(tipoContratoSeguroInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposContratosSegurosInfraestructuras/{idTipoContratoSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoContratoSeguroInfraestructurabyId(@PathVariable Long idTipoContratoSeguroInfraestructura){
        return tipoContratoSeguroInfraestructuraService.consultarTipoContratoSeguroInfraestructuraporId(idTipoContratoSeguroInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposContratosSegurosInfraestructuras/nombre/{nombreTipoContratoSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoContratoSeguroInfraestructurabyNombre(@PathVariable String nombreTipoContratoSeguroInfraestructura){
        return tipoContratoSeguroInfraestructuraService.consultarTipoContratoSeguroInfraestructuraporNombre(nombreTipoContratoSeguroInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposContratosSegurosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoContratoSeguroInfraestructura(@RequestBody TipoContratoSeguroInfraestructuraDTO tipoContratoSeguroInfraestructuraDTO){
        return tipoContratoSeguroInfraestructuraService.actualizarTipoContratoSeguroInfraestructura(tipoContratoSeguroInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposContratosSegurosInfraestructuras/{idTipoContratoSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoContratoSeguroInfraestructura(@PathVariable Long idTipoContratoSeguroInfraestructura){
        return tipoContratoSeguroInfraestructuraService.eliminarTipoContratoSeguroInfraestructura(idTipoContratoSeguroInfraestructura);
    }
}
