//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialDemeritoYDesgasteEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialDemeritoYDesgasteEquipoIngenieroService;
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
* @Since 30/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class HistorialDemeritoYDesgasteEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialDemeritoYDesgasteEquipoIngenieroService historialDemeritoYDesgasteEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesDemeritosYDesgastesEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialDemeritoYDesgasteEquipoIngeniero,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialDemeritoYDesgasteEquipoIngenieroService.contarTotalRegistros(idHistorialDemeritoYDesgasteEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesDemeritosYDesgastesEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialDemeritoYDesgasteEquipoIngenieroDTO>> listarHistorialesDemeritosYDesgastesEquiposIngenieroLista(
            @RequestParam(required = false) Long idHistorialDemeritoYDesgasteEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialDemeritoYDesgasteEquipoIngenieroService.listarHistorialesDemeritosYDesgastesEquiposIngenieros(idHistorialDemeritoYDesgasteEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesDemeritosYDesgastesEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialDemeritoYDesgasteEquipoIngenieroDTO>> listarHistorialesDemeritosYDesgastesEquiposIngenieroListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialDemeritoYDesgasteEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialDemeritoYDesgasteEquipoIngenieroService.listarHistorialesDemeritosYDesgastesEquiposIngenierosPag(pageable, idHistorialDemeritoYDesgasteEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesDemeritosYDesgastesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialDemeritoYDesgasteEquipoIngeniero(@RequestBody HistorialDemeritoYDesgasteEquipoIngenieroDTO historialDemeritoYDesgasteEquipoIngenieroDTO){
        return historialDemeritoYDesgasteEquipoIngenieroService.crearHistorialDemeritoYDesgasteEquipoIngeniero(historialDemeritoYDesgasteEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesDemeritosYDesgastesEquiposIngenieros/{idHistorialDemeritoYDesgasteEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialDemeritoYDesgasteEquipoIngenierobyId(@PathVariable Long idHistorialDemeritoYDesgasteEquipoIngeniero){
        return historialDemeritoYDesgasteEquipoIngenieroService.consultarHistorialDemeritoYDesgasteEquipoIngenieroporId(idHistorialDemeritoYDesgasteEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesDemeritosYDesgastesEquiposIngenieros/numeroRegistro/{numRegHistorialDemeritoYDesgasteEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialDemeritoYDesgasteEquipoIngenieroporNumReg(@PathVariable String numRegHistorialDemeritoYDesgasteEquipoIngeniero) {
        return historialDemeritoYDesgasteEquipoIngenieroService.consultarHistorialDemeritoYDesgasteEquipoIngenieroporNumReg(numRegHistorialDemeritoYDesgasteEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesDemeritosYDesgastesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialDemeritoYDesgasteEquipoIngeniero(@RequestBody HistorialDemeritoYDesgasteEquipoIngenieroDTO historialDemeritoYDesgasteEquipoIngenieroDTO){
        return historialDemeritoYDesgasteEquipoIngenieroService.actualizarHistorialDemeritoYDesgasteEquipoIngeniero(historialDemeritoYDesgasteEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesDemeritosYDesgastesEquiposIngenieros/{idHistorialDemeritoYDesgasteEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialDemeritoYDesgasteEquipoIngeniero(@PathVariable Long idHistorialDemeritoYDesgasteEquipoIngeniero){
        return historialDemeritoYDesgasteEquipoIngenieroService.eliminarHistorialDemeritoYDesgasteEquipoIngeniero(idHistorialDemeritoYDesgasteEquipoIngeniero);
    }
}
