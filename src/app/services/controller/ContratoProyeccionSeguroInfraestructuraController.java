//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ContratoProyeccionSeguroInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ContratoProyeccionSeguroInfraestructuraService;
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
* @Since 15/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ContratoProyeccionSeguroInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ContratoProyeccionSeguroInfraestructuraService contratoProyeccionSeguroInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/contratosProyeccionesSegurosinfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idContratoProyeccionSeguroInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura) {
        return new ResponseEntity<>(contratoProyeccionSeguroInfraestructuraService.contarTotalRegistros(idContratoProyeccionSeguroInfraestructura, keyword, idProyeccionSeguroInfraestructura), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS CONTRATOS PROYECCIONES SEGUROS INFRAESTRUCTURAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/contratosProyeccionesSegurosinfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ContratoProyeccionSeguroInfraestructuraDTO>> listarContratosProyeccionesSegurosInfraestructurasLista(
            @RequestParam(required = false) Long idContratoProyeccionSeguroInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(contratoProyeccionSeguroInfraestructuraService.listarContratosProyeccionesSegurosInfraestructuras(idContratoProyeccionSeguroInfraestructura, keyword, idProyeccionSeguroInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR CONTRATOS PROYECCIONES SEGUROS INFRAESTRUCTURAS CON QUERY PARAMS:
    @GetMapping("/contratosProyeccionesSegurosinfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ContratoProyeccionSeguroInfraestructuraDTO>> listarContratosProyeccionesSegurosInfraestructurasListaPag(
            @RequestParam(required = false) Long idContratoProyeccionSeguroInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(contratoProyeccionSeguroInfraestructuraService.listarContratosProyeccionesSegurosInfraestructurasPag(pageable, idContratoProyeccionSeguroInfraestructura, keyword, idProyeccionSeguroInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/contratosProyeccionesSegurosinfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/contratosProyeccionesSegurosinfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearContratoProyeccionSeguroInfraestructura(@RequestBody ContratoProyeccionSeguroInfraestructuraDTO contratoProyeccionSeguroInfraestructuraDTO){
        System.out.println(contratoProyeccionSeguroInfraestructuraDTO);
        return contratoProyeccionSeguroInfraestructuraService.crearContratoProyeccionSeguroInfraestructura(contratoProyeccionSeguroInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/contratosProyeccionesSegurosinfraestructuras/{idContratoProyeccionSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarContratoProyeccionSeguroInfraestructurabyId(@PathVariable Long idContratoProyeccionSeguroInfraestructura){
        return contratoProyeccionSeguroInfraestructuraService.consultarContratoProyeccionSeguroInfraestructuraporId(idContratoProyeccionSeguroInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NÚMERO DE CONTRATO:
    @GetMapping("/contratosProyeccionesSegurosinfraestructuras/numeroContrato/{numeroContratoSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarContratoProyeccionSeguroInfraestructurabyNumeroContrato(@PathVariable String numeroContratoSeguroInfraestructura){
        return contratoProyeccionSeguroInfraestructuraService.consultarContratoProyeccionSeguroInfraestructuraporNumeroContrato(numeroContratoSeguroInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/contratosProyeccionesSegurosinfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/contratosProyeccionesSegurosinfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarContratoProyeccionSeguroInfraestructura(@RequestBody ContratoProyeccionSeguroInfraestructuraDTO contratoProyeccionSeguroInfraestructuraDTO){
        return contratoProyeccionSeguroInfraestructuraService.actualizarContratoProyeccionSeguroInfraestructura(contratoProyeccionSeguroInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/contratosProyeccionesSegurosinfraestructuras/{idContratoProyeccionSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarContratoProyeccionSeguroInfraestructura(@PathVariable Long idContratoProyeccionSeguroInfraestructura){
        return contratoProyeccionSeguroInfraestructuraService.eliminarContratoProyeccionSeguroInfraestructura(idContratoProyeccionSeguroInfraestructura);
    }
}
