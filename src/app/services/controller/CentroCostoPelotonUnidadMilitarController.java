//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CentroCostoPelotonUnidadMilitarDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CentroCostoPelotonUnidadMilitarService;
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
* @Since 25/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class CentroCostoPelotonUnidadMilitarController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CentroCostoPelotonUnidadMilitarService centroCostoPelotonUnidadMilitarService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/centrosCostosPelotonesUnidadesMilitares/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCentroCostoPelotonUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombrePelotonUnidadMilitar) {
        return new ResponseEntity<>(centroCostoPelotonUnidadMilitarService.contarTotalRegistros(idCentroCostoPelotonUnidadMilitar, keyword, nombrePelotonUnidadMilitar), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/centrosCostosPelotonesUnidadesMilitares/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<CentroCostoPelotonUnidadMilitarDTO>> listarCentrosCostosPelotonesUnidadesMilitaresLista(
            @RequestParam(required = false) Long idCentroCostoPelotonUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombrePelotonUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(centroCostoPelotonUnidadMilitarService.listarCentrosCostosPelotonesUnidadesMilitares(idCentroCostoPelotonUnidadMilitar, keyword, nombrePelotonUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/centrosCostosPelotonesUnidadesMilitares/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<CentroCostoPelotonUnidadMilitarDTO>> listarCentrosCostosPelotonesUnidadesMilitares(
            @RequestParam(required = false) Long idCentroCostoPelotonUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombrePelotonUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(centroCostoPelotonUnidadMilitarService.listarCentrosCostosPelotonesUnidadesMilitaresPag(pageable, idCentroCostoPelotonUnidadMilitar, keyword, nombrePelotonUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/centrosCostosPelotonesUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCentroCostoPelotonUnidadMilitar(@RequestBody CentroCostoPelotonUnidadMilitarDTO centroCostoPelotonUnidadMilitarDTO) {
        System.out.println(centroCostoPelotonUnidadMilitarDTO);
        return centroCostoPelotonUnidadMilitarService.crearCentroCostoPelotonUnidadMilitar(centroCostoPelotonUnidadMilitarDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/centrosCostosPelotonesUnidadesMilitares/{idCentroCostoPelotonUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCentroCostoPelotonUnidadMilitarporId(@PathVariable Long idCentroCostoPelotonUnidadMilitar) {
        return centroCostoPelotonUnidadMilitarService.consultarCentroCostoPelotonUnidadMilitarporId(idCentroCostoPelotonUnidadMilitar);
    }
    
    //LEER CONSULTA DE REGISTRO POR CENTRO DE COSTO Y NOMBRE DE PELOTÓN DE LA UNIDAD MILITAR:
    @GetMapping("/centrosCostosPelotonesUnidadesMilitares/centroCosto/{centroCostoPelotonUnidadMilitar}/{nombrePelotonUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCentroCostoPelotonUnidadMilitarporCentroCostoYNombrePelotonUnidadMilitar(@PathVariable String centroCostoPelotonUnidadMilitar, @PathVariable String nombrePelotonUnidadMilitar) {
        return centroCostoPelotonUnidadMilitarService.consultarCentroCostoPelotonUnidadMilitarporNombreYNombrePelotonUnidadMilitar(centroCostoPelotonUnidadMilitar, nombrePelotonUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/centrosCostosPelotonesUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCentroCostoPelotonUnidadMilitar(@RequestBody CentroCostoPelotonUnidadMilitarDTO centroCostoPelotonUnidadMilitarDTO) {
        return centroCostoPelotonUnidadMilitarService.actualizarCentroCostoPelotonUnidadMilitar(centroCostoPelotonUnidadMilitarDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/centrosCostosPelotonesUnidadesMilitares/{idCentroCostoPelotonUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCentroCostoPelotonUnidadMilitar(@PathVariable Long idCentroCostoPelotonUnidadMilitar) {
        return centroCostoPelotonUnidadMilitarService.eliminarCentroCostoPelotonUnidadMilitar(idCentroCostoPelotonUnidadMilitar);
    }
}
