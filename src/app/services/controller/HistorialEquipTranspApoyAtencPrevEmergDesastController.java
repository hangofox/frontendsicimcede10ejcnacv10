//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialEquipTranspApoyAtencPrevEmergDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialEquipTranspApoyAtencPrevEmergDesastService;
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
public class HistorialEquipTranspApoyAtencPrevEmergDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialEquipTranspApoyAtencPrevEmergDesastService historialEquipTranspApoyAtencPrevEmergDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialEquipTranspApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) Long idEquipoIngeniero) {
        return new ResponseEntity<>(historialEquipTranspApoyAtencPrevEmergDesastService.contarTotalRegistros(idHistorialEquipTranspApoyAtencPrevEmergDesast, keyword, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, idEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES EQUIPS TRANSP APOY ATENC PREV EMERG DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialEquipTranspApoyAtencPrevEmergDesastDTO>> listarHistorialesEquipsTranspsApoyAtencPrevEmergDesastLista(
            @RequestParam(required = false) Long idHistorialEquipTranspApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialEquipTranspApoyAtencPrevEmergDesastService.listarHistorialesEquipsTranspsApoyAtencPrevEmergDesast(idHistorialEquipTranspApoyAtencPrevEmergDesast, keyword, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES EQUIPS TRANSP APOY ATENC PREV EMERG DESAST CON QUERY PARAMS:
    @GetMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialEquipTranspApoyAtencPrevEmergDesastDTO>> listarHistorialesEquipsTranspsApoyAtencPrevEmergDesastListaPag(
            @RequestParam(required = false) Long idHistorialEquipTranspApoyAtencPrevEmergDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialEquipTranspApoyAtencPrevEmergDesastService.listarHistorialesEquipsTranspsApoyAtencPrevEmergDesastPag(pageable, idHistorialEquipTranspApoyAtencPrevEmergDesast, keyword, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialEquipTranspApoyAtencPrevEmergDesast(@RequestBody HistorialEquipTranspApoyAtencPrevEmergDesastDTO historialEquipTranspApoyAtencPrevEmergDesastDTO){
        System.out.println(historialEquipTranspApoyAtencPrevEmergDesastDTO);
        return historialEquipTranspApoyAtencPrevEmergDesastService.crearHistorialEquipTranspApoyAtencPrevEmergDesast(historialEquipTranspApoyAtencPrevEmergDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast/{idHistorialEquipTranspApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialEquipTranspApoyAtencPrevEmergDesastbyId(@PathVariable Long idHistorialEquipTranspApoyAtencPrevEmergDesast){
        return historialEquipTranspApoyAtencPrevEmergDesastService.consultarHistorialEquipTranspApoyAtencPrevEmergDesastporId(idHistorialEquipTranspApoyAtencPrevEmergDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialEquipTranspApoyAtencPrevEmergDesastbyNumReg(@RequestParam(required = false) String numRegHistorialEquipTranspApoyAtencPrevEmergDesast){
        return historialEquipTranspApoyAtencPrevEmergDesastService.consultarHistorialEquipTranspApoyAtencPrevEmergDesastporNumReg(numRegHistorialEquipTranspApoyAtencPrevEmergDesast);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialEquipTranspApoyAtencPrevEmergDesast(@RequestBody HistorialEquipTranspApoyAtencPrevEmergDesastDTO historialEquipTranspApoyAtencPrevEmergDesastDTO){
        return historialEquipTranspApoyAtencPrevEmergDesastService.actualizarHistorialEquipTranspApoyAtencPrevEmergDesast(historialEquipTranspApoyAtencPrevEmergDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesEquipsTranspsApoyAtencPrevEmergDesast/{idHistorialEquipTranspApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialEquipTranspApoyAtencPrevEmergDesast(@PathVariable Long idHistorialEquipTranspApoyAtencPrevEmergDesast){
        return historialEquipTranspApoyAtencPrevEmergDesastService.eliminarHistorialEquipTranspApoyAtencPrevEmergDesast(idHistorialEquipTranspApoyAtencPrevEmergDesast);
    }
}
