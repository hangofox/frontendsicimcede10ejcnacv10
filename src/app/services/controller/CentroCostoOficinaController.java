//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CentroCostoOficinaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CentroCostoOficinaService;
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
* @Since 18/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class CentroCostoOficinaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CentroCostoOficinaService centroCostoOficinaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/centrosCostosOficinas/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCentroCostoOficina,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreOficina
    ) {
        return new ResponseEntity<>(centroCostoOficinaService.contarTotalRegistros(idCentroCostoOficina, keyword, siglaoAcronimoUnidadMilitar, nombreOficina), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS CENTROS COSTOS DE LAS OFICINAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/centrosCostosOficinas/lista")
    public ResponseEntity<List<CentroCostoOficinaDTO>> listarCentrosCostosOficinasLista(
            @RequestParam(required = false) Long idCentroCostoOficina,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreOficina,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(centroCostoOficinaService.listarCentrosCostosOficinas(idCentroCostoOficina, keyword, siglaoAcronimoUnidadMilitar, nombreOficina, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR CENTROS DE COSTOS DE LAS OFICINAS CON QUERY PARAMS:
    @GetMapping("/centrosCostosOficinas/listaPag")
    public ResponseEntity<Slice<CentroCostoOficinaDTO>> listarCentrosCostosOficinasListaPag(
            @RequestParam(required = false) Long idCentroCostoOficina,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreOficina,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(centroCostoOficinaService.listarCentrosCostosOficinasPag(pageable, idCentroCostoOficina, keyword, siglaoAcronimoUnidadMilitar, nombreOficina, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/centrosCostosOficinas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/centrosCostosOficinas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCentroCostoOficina(@RequestBody CentroCostoOficinaDTO centroCostoOficinaDTO){
        System.out.println(centroCostoOficinaDTO);
        return centroCostoOficinaService.crearCentroCostoOficina(centroCostoOficinaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/centrosCostosOficinas/{idCentroCostoOficina}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCentroCostoOficinabyId(@PathVariable Long idCentroCostoOficina){
        return centroCostoOficinaService.consultarCentroCostoOficinaporId(idCentroCostoOficina);
    }
    
    //LEER CONSULTA DE REGISTRO POR CENTRO DE COSTO Y NOMBRE DE LA OFICINA:
    @GetMapping("/centrosCostosOficinas/centroCosto/{centroCostoOficina}/{nombreOficina}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCentroCostoOficinaporCentroYNombreOficina(@PathVariable String centroCostoOficina, @PathVariable String nombreOficina) {
        return centroCostoOficinaService.consultarCentroCostoOficinaporCentroCostoyNombreOficina(centroCostoOficina, nombreOficina);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/centrosCostosOficinas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/centrosCostosOficinas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCentroCostoOficina(@RequestBody CentroCostoOficinaDTO centroCostoOficinaDTO){
        return centroCostoOficinaService.actualizarCentroCostoOficina(centroCostoOficinaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/centrosCostosOficinas/{idCentroCostoOficina}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCentroCostoOficina(@PathVariable Long idCentroCostoOficina){
        return centroCostoOficinaService.eliminarCentroCostoOficina(idCentroCostoOficina);
    }
}
