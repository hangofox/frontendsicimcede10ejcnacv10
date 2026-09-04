//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService;
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
public class HistorialMaqPesadApoyObrRedMitigGestRiesgDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService historialMaqPesadApoyObrRedMitigGestRiesgDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialMaqPesadApoyObrRedMitigGestRiesgDesastService.contarTotalRegistros(idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES MAQ PESAD APOY OBR RED MITIG GEST RIESG DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO>> listarHistorialesMaqPesadApoyObrRedMitigGestRiesgDesastLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialMaqPesadApoyObrRedMitigGestRiesgDesastService.listarHistorialesMaqPesadApoyObrRedMitigGestRiesgDesast(idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES MAQ PESAD APOY OBR RED MITIG GEST RIESG DESAST CON QUERY PARAMS:
    @GetMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO>> listarHistorialesMaqPesadApoyObrRedMitigGestRiesgDesastListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialMaqPesadApoyObrRedMitigGestRiesgDesastService.listarHistorialesMaqPesadApoyObrRedMitigGestRiesgDesastPag(pageable, idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialMaqPesadApoyObrRedMitigGestRiesgDesast(@RequestBody HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO){
        System.out.println(historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO);
        return historialMaqPesadApoyObrRedMitigGestRiesgDesastService.crearHistorialMaqPesadApoyObrRedMitigGestRiesgDesast(historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/{idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialMaqPesadApoyObrRedMitigGestRiesgDesastbyId(@PathVariable Long idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast){
        return historialMaqPesadApoyObrRedMitigGestRiesgDesastService.consultarHistorialMaqPesadApoyObrRedMitigGestRiesgDesastporId(idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/numeroRegistro/{numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialMaqPesadApoyObrRedMitigGestRiesgDesastbyNumReg(@PathVariable String numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast){
        return historialMaqPesadApoyObrRedMitigGestRiesgDesastService.consultarHistorialMaqPesadApoyObrRedMitigGestRiesgDesastporNumReg(numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialMaqPesadApoyObrRedMitigGestRiesgDesast(@RequestBody HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO){
        return historialMaqPesadApoyObrRedMitigGestRiesgDesastService.actualizarHistorialMaqPesadApoyObrRedMitigGestRiesgDesast(historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/{idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialMaqPesadApoyObrRedMitigGestRiesgDesast(@PathVariable Long idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast){
        return historialMaqPesadApoyObrRedMitigGestRiesgDesastService.eliminarHistorialMaqPesadApoyObrRedMitigGestRiesgDesast(idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast);
    }
}
