//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.SuministroDemeritoYDesgasteEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.SuministroDemeritoYDesgasteEquipoIngenieroService;
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
public class SuministroDemeritoYDesgasteEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private SuministroDemeritoYDesgasteEquipoIngenieroService suministroDemeritoYDesgasteEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/suministrosDemeritosYDesgastesEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idSuministroDemeritoYDesgasteEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialDemeritoYDesgasteEquipoIngeniero) {
        return new ResponseEntity<>(suministroDemeritoYDesgasteEquipoIngenieroService.contarTotalRegistros(idSuministroDemeritoYDesgasteEquipoIngeniero, keyword, idHistorialDemeritoYDesgasteEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS SUMINISTROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/suministrosDemeritosYDesgastesEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<SuministroDemeritoYDesgasteEquipoIngenieroDTO>> listarSuministrosDemeritosYDesgastesEquiposIngenieroLista(
            @RequestParam(required = false) Long idSuministroDemeritoYDesgasteEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialDemeritoYDesgasteEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(suministroDemeritoYDesgasteEquipoIngenieroService.listarSuministrosDemeritosYDesgastesEquiposIngenieros(idSuministroDemeritoYDesgasteEquipoIngeniero, keyword, idHistorialDemeritoYDesgasteEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR SUMINISTROS CON QUERY PARAMS:
    @GetMapping("/suministrosDemeritosYDesgastesEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<SuministroDemeritoYDesgasteEquipoIngenieroDTO>> listarSuministrosDemeritosYDesgastesEquiposIngenieroListaPag(
            @RequestParam(required = false) Long idSuministroDemeritoYDesgasteEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialDemeritoYDesgasteEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(suministroDemeritoYDesgasteEquipoIngenieroService.listarSuministrosDemeritosYDesgastesEquiposIngenierosPag(pageable, idSuministroDemeritoYDesgasteEquipoIngeniero, keyword, idHistorialDemeritoYDesgasteEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/suministrosDemeritosYDesgastesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearSuministroDemeritoYDesgasteEquipoIngeniero(@RequestBody SuministroDemeritoYDesgasteEquipoIngenieroDTO suministroDemeritoYDesgasteEquipoIngenieroDTO){
        return suministroDemeritoYDesgasteEquipoIngenieroService.crearSuministroDemeritoYDesgasteEquipoIngeniero(suministroDemeritoYDesgasteEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/suministrosDemeritosYDesgastesEquiposIngenieros/{idSuministroDemeritoYDesgasteEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarSuministroDemeritoYDesgasteEquipoIngenierobyId(@PathVariable Long idSuministroDemeritoYDesgasteEquipoIngeniero){
        return suministroDemeritoYDesgasteEquipoIngenieroService.consultarSuministroDemeritoYDesgasteEquipoIngenieroporId(idSuministroDemeritoYDesgasteEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/suministrosDemeritosYDesgastesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarSuministroDemeritoYDesgasteEquipoIngeniero(@RequestBody SuministroDemeritoYDesgasteEquipoIngenieroDTO suministroDemeritoYDesgasteEquipoIngenieroDTO){
        return suministroDemeritoYDesgasteEquipoIngenieroService.actualizarSuministroDemeritoYDesgasteEquipoIngeniero(suministroDemeritoYDesgasteEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/suministrosDemeritosYDesgastesEquiposIngenieros/{idSuministroDemeritoYDesgasteEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarSuministroDemeritoYDesgasteEquipoIngeniero(@PathVariable Long idSuministroDemeritoYDesgasteEquipoIngeniero){
        return suministroDemeritoYDesgasteEquipoIngenieroService.eliminarSuministroDemeritoYDesgasteEquipoIngeniero(idSuministroDemeritoYDesgasteEquipoIngeniero);
    }
}
