//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CentroCostoCompaniaUnidadMilitarDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CentroCostoCompaniaUnidadMilitarService;
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
public class CentroCostoCompaniaUnidadMilitarController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CentroCostoCompaniaUnidadMilitarService centroCostoCompaniaUnidadMilitarService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/centrosCostosCompaniasUnidadesMilitares/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCentroCostoCompaniaUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar) {
        return new ResponseEntity<>(centroCostoCompaniaUnidadMilitarService.contarTotalRegistros(idCentroCostoCompaniaUnidadMilitar, keyword, nombreCompaniaUnidadMilitar), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/centrosCostosCompaniasUnidadesMilitares/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<CentroCostoCompaniaUnidadMilitarDTO>> listarCentrosCostosCompaniasUnidadesMilitaresLista(
            @RequestParam(required = false) Long idCentroCostoCompaniaUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(centroCostoCompaniaUnidadMilitarService.listarCentrosCostosCompaniasUnidadesMilitares(idCentroCostoCompaniaUnidadMilitar, keyword, nombreCompaniaUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/centrosCostosCompaniasUnidadesMilitares/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<CentroCostoCompaniaUnidadMilitarDTO>> listarCentrosCostosCompaniasUnidadesMilitares(
            @RequestParam(required = false) Long idCentroCostoCompaniaUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(centroCostoCompaniaUnidadMilitarService.listarCentrosCostosCompaniasUnidadesMilitaresPag(pageable, idCentroCostoCompaniaUnidadMilitar, keyword, nombreCompaniaUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/centrosCostosCompaniasUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCentroCostoCompaniaUnidadMilitar(@RequestBody CentroCostoCompaniaUnidadMilitarDTO centroCostoCompaniaUnidadMilitarDTO) {
        System.out.println(centroCostoCompaniaUnidadMilitarDTO);
        return centroCostoCompaniaUnidadMilitarService.crearCentroCostoCompaniaUnidadMilitar(centroCostoCompaniaUnidadMilitarDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/centrosCostosCompaniasUnidadesMilitares/{idCentroCostoCompaniaUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCentroCostoCompaniaUnidadMilitarporId(@PathVariable Long idCentroCostoCompaniaUnidadMilitar) {
        return centroCostoCompaniaUnidadMilitarService.consultarCentroCostoCompaniaUnidadMilitarporId(idCentroCostoCompaniaUnidadMilitar);
    }
    
    //LEER CONSULTA DE REGISTRO POR CENTRO DE COSTO Y NOMBRE DE LA COMPAÑIA DE LA UNIDAD MILITAR:
    @GetMapping("/centrosCostosCompaniasUnidadesMilitares/centroCosto/{centroCostoCompaniaUnidadMilitar}/{nombreCompaniaUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCentroCostoCompaniaUnidadMilitarporNombreYNombreCompaniaUnidadMilitar(@PathVariable String centroCostoCompaniaUnidadMilitar, @PathVariable String nombreCompaniaUnidadMilitar) {
        return centroCostoCompaniaUnidadMilitarService.consultarCentroCostoCompaniaUnidadMilitarporNombreYNombreCompaniaUnidadMilitar(centroCostoCompaniaUnidadMilitar, nombreCompaniaUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/centrosCostosCompaniasUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCentroCostoCompaniaUnidadMilitar(@RequestBody CentroCostoCompaniaUnidadMilitarDTO centroCostoCompaniaUnidadMilitarDTO) {
        return centroCostoCompaniaUnidadMilitarService.actualizarCentroCostoCompaniaUnidadMilitar(centroCostoCompaniaUnidadMilitarDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/centrosCostosCompaniasUnidadesMilitares/{idCentroCostoCompaniaUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCentroCostoCompaniaUnidadMilitar(@PathVariable Long idCentroCostoCompaniaUnidadMilitar) {
        return centroCostoCompaniaUnidadMilitarService.eliminarCentroCostoCompaniaUnidadMilitar(idCentroCostoCompaniaUnidadMilitar);
    }
}
