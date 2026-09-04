//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.InfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.InfraestructuraService;
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
* @Since 24/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class InfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private InfraestructuraService infraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/infraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(infraestructuraService.contarTotalRegistros(idInfraestructura, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS INFRAESTRUCTURAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/infraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<InfraestructuraDTO>> listarInfraestructurasLista(
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(infraestructuraService.listarInfraestructuras(idInfraestructura, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR INFRAESTRUCTURAS CON QUERY PARAMS:
    @GetMapping("/infraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<InfraestructuraDTO>> listarInfraestructurasListaPag(
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(infraestructuraService.listarInfraestructurasPag(pageable, idInfraestructura, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/infraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/infraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearInfraestructura(@RequestBody InfraestructuraDTO infraestructuraDTO){
        System.out.println(infraestructuraDTO);
        return infraestructuraService.crearInfraestructura(infraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/infraestructuras/{idInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarInfraestructurabyId(@PathVariable Long idInfraestructura){
        return infraestructuraService.consultarInfraestructuraporId(idInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO INVENTARIO Y NUMERO ACTIVO FIJO (CAMPOS ÚNICOS COMBINADOS):
    @GetMapping("/infraestructuras/numeroInventario/{numeroInventarioInfraestructura}/numeroActivoFijo/{numeroActivoFijoInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPOS ÚNICOS COMBINADOS.
    public RespuestaDTO consultarInfraestructuraporNumeroInventarioNumeroActivoFijo(@PathVariable String numeroInventarioInfraestructura, @PathVariable String numeroActivoFijoInfraestructura) {
        return infraestructuraService.consultarInfraestructuraporNumeroInventarioNumeroActivoFijo(numeroInventarioInfraestructura, numeroActivoFijoInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/infraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/infraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarInfraestructura(@RequestBody InfraestructuraDTO infraestructuraDTO){
        return infraestructuraService.actualizarInfraestructura(infraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/infraestructuras/{idInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarInfraestructura(@PathVariable Long idInfraestructura){
        return infraestructuraService.eliminarInfraestructura(idInfraestructura);
    }
}
