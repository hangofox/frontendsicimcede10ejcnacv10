//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.UnidadMilitarRealizadoraMantenimientoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.UnidadMilitarRealizadoraMantenimientoService;
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
public class UnidadMilitarRealizadoraMantenimientoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private UnidadMilitarRealizadoraMantenimientoService unidadMilitarRealizadoraMantenimientoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/unidadesMilitaresRealizadorasMantenimientos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idUnidadMilitarRealizadoraMantenimiento,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(unidadMilitarRealizadoraMantenimientoService.contarTotalRegistros(idUnidadMilitarRealizadoraMantenimiento, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/unidadesMilitaresRealizadorasMantenimientos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<UnidadMilitarRealizadoraMantenimientoDTO>> listarUnidadesMilitaresRealizadorasMantenimientosLista(
            @RequestParam(required = false) Long idUnidadMilitarRealizadoraMantenimiento,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(unidadMilitarRealizadoraMantenimientoService.listarUnidadesMilitaresRealizadorasMantenimientos(idUnidadMilitarRealizadoraMantenimiento, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS CON QUERY PARAMS:
    @GetMapping("/unidadesMilitaresRealizadorasMantenimientos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<UnidadMilitarRealizadoraMantenimientoDTO>> listarUnidadesMilitaresRealizadorasMantenimientos(
            @RequestParam(required = false) Long idUnidadMilitarRealizadoraMantenimiento,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(unidadMilitarRealizadoraMantenimientoService.listarUnidadesMilitaresRealizadorasMantenimientosPag(pageable, idUnidadMilitarRealizadoraMantenimiento, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/unidadesMilitaresRealizadorasMantenimientos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearUnidadMilitarRealizadoraMantenimiento(@RequestBody UnidadMilitarRealizadoraMantenimientoDTO unidadMilitarRealizadoraMantenimientoDTO) {
        System.out.println(unidadMilitarRealizadoraMantenimientoDTO);
        return unidadMilitarRealizadoraMantenimientoService.crearUnidadMilitarRealizadoraMantenimiento(unidadMilitarRealizadoraMantenimientoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/unidadesMilitaresRealizadorasMantenimientos/{idUnidadMilitarRealizadoraMantenimiento}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarUnidadMilitarRealizadoraMantenimientoportId(@PathVariable Long idUnidadMilitarRealizadoraMantenimiento) {
        return unidadMilitarRealizadoraMantenimientoService.consultarUnidadMilitarRealizadoraMantenimientoportId(idUnidadMilitarRealizadoraMantenimiento);
    }
    
    //LEER CONSULTA DE REGISTRO POR CODIGO DE LA UNIDAD MILITAR REALIZADORA DE MANTENIMIENTO (CAMPO ÚNICO):
    @GetMapping("/unidadesMilitaresRealizadorasMantenimientos/codigo")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarUnidadMilitarRealizadoraMantenimientoporCodigo(
            @RequestParam(required = false) String codigoUnidadMilitarRealizadoraMantenimiento) {
        return unidadMilitarRealizadoraMantenimientoService.consultarUnidadMilitarRealizadoraMantenimientoporCodigo(codigoUnidadMilitarRealizadoraMantenimiento);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/unidadesMilitaresRealizadorasMantenimientos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarUnidadMilitarRealizadoraMantenimiento(@RequestBody UnidadMilitarRealizadoraMantenimientoDTO unidadMilitarRealizadoraMantenimientoDTO) {
        return unidadMilitarRealizadoraMantenimientoService.actualizarUnidadMilitarRealizadoraMantenimiento(unidadMilitarRealizadoraMantenimientoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/unidadesMilitaresRealizadorasMantenimientos/{idUnidadMilitarRealizadoraMantenimiento}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarUnidadMilitarRealizadoraMantenimiento(@PathVariable Long idUnidadMilitarRealizadoraMantenimiento) {
        return unidadMilitarRealizadoraMantenimientoService.eliminarUnidadMilitarRealizadoraMantenimiento(idUnidadMilitarRealizadoraMantenimiento);
    }
}
