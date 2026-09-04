//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService;
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
public class HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService historialTipoPersonalApoyObrRedMitigGestRiesgDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.contarTotalRegistros(idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES TIPOS PERSONAL APOY OBR RED MITIG GEST RIESG DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO>> listarHistorialesTiposPersonalApoyObrRedMitigGestRiesgDesastLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.listarHistorialesTiposPersonalApoyObrRedMitigGestRiesgDesast(idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES TIPOS PERSONAL APOY OBR RED MITIG GEST RIESG DESAST CON QUERY PARAMS:
    @GetMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO>> listarHistorialesTiposPersonalApoyObrRedMitigGestRiesgDesastListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.listarHistorialesTiposPersonalApoyObrRedMitigGestRiesgDesastPag(pageable, idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast(@RequestBody HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO){
        System.out.println(historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO);
        return historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.crearHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast(historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/{idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastbyId(@PathVariable Long idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast){
        return historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.consultarHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastporId(idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastbyNumReg(@RequestParam(required = false) String numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast){
        return historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.consultarHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastporNumReg(numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast(@RequestBody HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO){
        return historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.actualizarHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast(historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/{idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast(@PathVariable Long idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast){
        return historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.eliminarHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast(idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast);
    }
}
