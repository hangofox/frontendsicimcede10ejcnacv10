//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialTipoPersonalApoyAtencPrevEmergDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialTipoPersonalApoyAtencPrevEmergDesastService;
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
public class HistorialTipoPersonalApoyAtencPrevEmergDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialTipoPersonalApoyAtencPrevEmergDesastService historialTipoPersonalApoyAtencPrevEmergDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialTipoPersonalApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialTipoPersonalApoyAtencPrevEmergDesastService.contarTotalRegistros(idHistorialTipoPersonalApoyAtencPrevEmergDesast, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES TIPOS PERSONAL APOY ATENC PREV EMERG DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialTipoPersonalApoyAtencPrevEmergDesastDTO>> listarHistorialesTiposPersonalApoyAtencPrevEmergDesastLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialTipoPersonalApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialTipoPersonalApoyAtencPrevEmergDesastService.listarHistorialesTiposPersonalApoyAtencPrevEmergDesast(idHistorialTipoPersonalApoyAtencPrevEmergDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES TIPOS PERSONAL APOY ATENC PREV EMERG DESAST CON QUERY PARAMS:
    @GetMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialTipoPersonalApoyAtencPrevEmergDesastDTO>> listarHistorialesTiposPersonalApoyAtencPrevEmergDesastListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialTipoPersonalApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialTipoPersonalApoyAtencPrevEmergDesastService.listarHistorialesTiposPersonalApoyAtencPrevEmergDesastPag(pageable, idHistorialTipoPersonalApoyAtencPrevEmergDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialTipoPersonalApoyAtencPrevEmergDesast(@RequestBody HistorialTipoPersonalApoyAtencPrevEmergDesastDTO historialTipoPersonalApoyAtencPrevEmergDesastDTO){
        System.out.println(historialTipoPersonalApoyAtencPrevEmergDesastDTO);
        return historialTipoPersonalApoyAtencPrevEmergDesastService.crearHistorialTipoPersonalApoyAtencPrevEmergDesast(historialTipoPersonalApoyAtencPrevEmergDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast/{idHistorialTipoPersonalApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialTipoPersonalApoyAtencPrevEmergDesastbyId(@PathVariable Long idHistorialTipoPersonalApoyAtencPrevEmergDesast){
        return historialTipoPersonalApoyAtencPrevEmergDesastService.consultarHistorialTipoPersonalApoyAtencPrevEmergDesastporId(idHistorialTipoPersonalApoyAtencPrevEmergDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialTipoPersonalApoyAtencPrevEmergDesastbyNumReg(@RequestParam(required = false) String numRegHistorialTipoPersonalApoyAtencPrevEmergDesast){
        return historialTipoPersonalApoyAtencPrevEmergDesastService.consultarHistorialTipoPersonalApoyAtencPrevEmergDesastporNumReg(numRegHistorialTipoPersonalApoyAtencPrevEmergDesast);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialTipoPersonalApoyAtencPrevEmergDesast(@RequestBody HistorialTipoPersonalApoyAtencPrevEmergDesastDTO historialTipoPersonalApoyAtencPrevEmergDesastDTO){
        return historialTipoPersonalApoyAtencPrevEmergDesastService.actualizarHistorialTipoPersonalApoyAtencPrevEmergDesast(historialTipoPersonalApoyAtencPrevEmergDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesTiposPersonalApoyAtencPrevEmergDesast/{idHistorialTipoPersonalApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialTipoPersonalApoyAtencPrevEmergDesast(@PathVariable Long idHistorialTipoPersonalApoyAtencPrevEmergDesast){
        return historialTipoPersonalApoyAtencPrevEmergDesastService.eliminarHistorialTipoPersonalApoyAtencPrevEmergDesast(idHistorialTipoPersonalApoyAtencPrevEmergDesast);
    }
}
