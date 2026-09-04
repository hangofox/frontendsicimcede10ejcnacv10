//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialMaqPesadApoyAtencPrevEmergDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialMaqPesadApoyAtencPrevEmergDesastService;
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
public class HistorialMaqPesadApoyAtencPrevEmergDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialMaqPesadApoyAtencPrevEmergDesastService historialMaqPesadApoyAtencPrevEmergDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesMaqPesadApoyAtencPrevEmergDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialMaqPesadApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialMaqPesadApoyAtencPrevEmergDesastService.contarTotalRegistros(idHistorialMaqPesadApoyAtencPrevEmergDesast, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES MAQ PESAD APOY ATENC PREV EMERG DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesMaqPesadApoyAtencPrevEmergDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialMaqPesadApoyAtencPrevEmergDesastDTO>> listarHistorialesMaqPesadApoyAtencPrevEmergDesastLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialMaqPesadApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialMaqPesadApoyAtencPrevEmergDesastService.listarHistorialesMaqPesadApoyAtencPrevEmergDesast(idHistorialMaqPesadApoyAtencPrevEmergDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES MAQ PESAD APOY ATENC PREV EMERG DESAST CON QUERY PARAMS:
    @GetMapping("/historialesMaqPesadApoyAtencPrevEmergDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialMaqPesadApoyAtencPrevEmergDesastDTO>> listarHistorialesMaqPesadApoyAtencPrevEmergDesastListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialMaqPesadApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialMaqPesadApoyAtencPrevEmergDesastService.listarHistorialesMaqPesadApoyAtencPrevEmergDesastPag(pageable, idHistorialMaqPesadApoyAtencPrevEmergDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesMaqPesadApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesMaqPesadApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialMaqPesadApoyAtencPrevEmergDesast(@RequestBody HistorialMaqPesadApoyAtencPrevEmergDesastDTO historialMaqPesadApoyAtencPrevEmergDesastDTO){
        System.out.println(historialMaqPesadApoyAtencPrevEmergDesastDTO);
        return historialMaqPesadApoyAtencPrevEmergDesastService.crearHistorialMaqPesadApoyAtencPrevEmergDesast(historialMaqPesadApoyAtencPrevEmergDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesMaqPesadApoyAtencPrevEmergDesast/{idHistorialMaqPesadApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialMaqPesadApoyAtencPrevEmergDesastbyId(@PathVariable Long idHistorialMaqPesadApoyAtencPrevEmergDesast){
        return historialMaqPesadApoyAtencPrevEmergDesastService.consultarHistorialMaqPesadApoyAtencPrevEmergDesastporId(idHistorialMaqPesadApoyAtencPrevEmergDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesMaqPesadApoyAtencPrevEmergDesast/numeroRegistro/{numRegHistorialMaqPesadApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialMaqPesadApoyAtencPrevEmergDesastbyNumReg(@PathVariable String numRegHistorialMaqPesadApoyAtencPrevEmergDesast){
        return historialMaqPesadApoyAtencPrevEmergDesastService.consultarHistorialMaqPesadApoyAtencPrevEmergDesastporNumReg(numRegHistorialMaqPesadApoyAtencPrevEmergDesast);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesMaqPesadApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesMaqPesadApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialMaqPesadApoyAtencPrevEmergDesast(@RequestBody HistorialMaqPesadApoyAtencPrevEmergDesastDTO historialMaqPesadApoyAtencPrevEmergDesastDTO){
        return historialMaqPesadApoyAtencPrevEmergDesastService.actualizarHistorialMaqPesadApoyAtencPrevEmergDesast(historialMaqPesadApoyAtencPrevEmergDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesMaqPesadApoyAtencPrevEmergDesast/{idHistorialMaqPesadApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialMaqPesadApoyAtencPrevEmergDesast(@PathVariable Long idHistorialMaqPesadApoyAtencPrevEmergDesast){
        return historialMaqPesadApoyAtencPrevEmergDesastService.eliminarHistorialMaqPesadApoyAtencPrevEmergDesast(idHistorialMaqPesadApoyAtencPrevEmergDesast);
    }
}
