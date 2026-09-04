//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CentroCostoUnidadMilitarDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CentroCostoUnidadMilitarService;
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
public class CentroCostoUnidadMilitarController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CentroCostoUnidadMilitarService centroCostoUnidadMilitarService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/centrosCostosUnidadesMilitares/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCentroCostoUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(centroCostoUnidadMilitarService.contarTotalRegistros(idCentroCostoUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS CENTROS COSTOS UNIDADES MILITARES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/centrosCostosUnidadesMilitares/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<CentroCostoUnidadMilitarDTO>> listarCentrosCostosUnidadesMilitaresLista(
            @RequestParam(required = false) Long idCentroCostoUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(centroCostoUnidadMilitarService.listarCentrosCostosUnidadesMilitares(idCentroCostoUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR CENTROS COSTOS UNIDADES MILITARES CON QUERY PARAMS:
    @GetMapping("/centrosCostosUnidadesMilitares/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<CentroCostoUnidadMilitarDTO>> listarCentrosCostosUnidadesMilitares(
            @RequestParam(required = false) Long idCentroCostoUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(centroCostoUnidadMilitarService.listarCentrosCostosUnidadesMilitaresPag(pageable, idCentroCostoUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/centrosCostosUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCentroCostoUnidadMilitar(@RequestBody CentroCostoUnidadMilitarDTO centroCostoUnidadMilitarDTO) {
        System.out.println(centroCostoUnidadMilitarDTO);
        return centroCostoUnidadMilitarService.crearCentroCostoUnidadMilitar(centroCostoUnidadMilitarDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/centrosCostosUnidadesMilitares/{idCentroCostoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCentroCostoUnidadMilitarporId(@PathVariable Long idCentroCostoUnidadMilitar) {
        return centroCostoUnidadMilitarService.consultarCentroCostoUnidadMilitarporId(idCentroCostoUnidadMilitar);
    }
    
    //LEER CONSULTA DE REGISTRO POR CENTRO DE COSTO Y SIGLA O ACRONIMO DE LA UNIDAD MILITAR:
    @GetMapping("/centrosCostosUnidadesMilitares/centroCosto/{centroCostoUnidadMilitar}/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCentroCostoUnidadMilitarporCentroySiglaoAcronimoUnidadMilitar(@PathVariable String centroCostoUnidadMilitar, @PathVariable String siglaoAcronimoUnidadMilitar) {
        return centroCostoUnidadMilitarService.consultarCentroCostoUnidadMilitarporCentroCostoySiglaoAcronimoUnidadMilitar(centroCostoUnidadMilitar, siglaoAcronimoUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/centrosCostosUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCentroCostoUnidadMilitar(@RequestBody CentroCostoUnidadMilitarDTO centroCostoUnidadMilitarDTO) {
        return centroCostoUnidadMilitarService.actualizarCentroCostoUnidadMilitar(centroCostoUnidadMilitarDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/centrosCostosUnidadesMilitares/{idCentroCostoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCentroCostoUnidadMilitar(@PathVariable Long idCentroCostoUnidadMilitar) {
        return centroCostoUnidadMilitarService.eliminarCentroCostoUnidadMilitar(idCentroCostoUnidadMilitar);
    }
}
