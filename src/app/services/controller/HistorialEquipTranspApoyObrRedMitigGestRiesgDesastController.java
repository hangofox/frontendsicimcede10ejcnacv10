//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService;
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
public class HistorialEquipTranspApoyObrRedMitigGestRiesgDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService historialEquipTranspApoyObrRedMitigGestRiesgDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) Long idEquipoIngeniero) {
        return new ResponseEntity<>(historialEquipTranspApoyObrRedMitigGestRiesgDesastService.contarTotalRegistros(idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast, keyword, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, idEquipoIngeniero), HttpStatus.OK);
    }

    //ENDPOINT LISTAR TODOS LOS HISTORIALES EQUIPS TRANSP APOY OBR RED MITIG GEST RIESG DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO>> listarHistorialesEquipsTranspsApoyObrRedMitigGestRiesgDesastLista(
            @RequestParam(required = false) Long idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialEquipTranspApoyObrRedMitigGestRiesgDesastService.listarHistorialesEquipsTranspsApoyObrRedMitigGestRiesgDesast(idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast, keyword, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }

    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES EQUIPS TRANSP APOY OBR RED MITIG GEST RIESG DESAST CON QUERY PARAMS:
    @GetMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO>> listarHistorialesEquipsTranspsApoyObrRedMitigGestRiesgDesastListaPag(
            @RequestParam(required = false) Long idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast,
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
        return new ResponseEntity<>(historialEquipTranspApoyObrRedMitigGestRiesgDesastService.listarHistorialesEquipsTranspsApoyObrRedMitigGestRiesgDesastPag(pageable, idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast, keyword, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialEquipTranspApoyObrRedMitigGestRiesgDesast(@RequestBody HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO){
        System.out.println(historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO);
        return historialEquipTranspApoyObrRedMitigGestRiesgDesastService.crearHistorialEquipTranspApoyObrRedMitigGestRiesgDesast(historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/{idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialEquipTranspApoyObrRedMitigGestRiesgDesastbyId(@PathVariable Long idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast){
        return historialEquipTranspApoyObrRedMitigGestRiesgDesastService.consultarHistorialEquipTranspApoyObrRedMitigGestRiesgDesastporId(idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialEquipTranspApoyObrRedMitigGestRiesgDesastbyNumReg(@RequestParam(required = false) String numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast){
        return historialEquipTranspApoyObrRedMitigGestRiesgDesastService.consultarHistorialEquipTranspApoyObrRedMitigGestRiesgDesastporNumReg(numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialEquipTranspApoyObrRedMitigGestRiesgDesast(@RequestBody HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO){
        return historialEquipTranspApoyObrRedMitigGestRiesgDesastService.actualizarHistorialEquipTranspApoyObrRedMitigGestRiesgDesast(historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/{idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialEquipTranspApoyObrRedMitigGestRiesgDesast(@PathVariable Long idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast){
        return historialEquipTranspApoyObrRedMitigGestRiesgDesastService.eliminarHistorialEquipTranspApoyObrRedMitigGestRiesgDesast(idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast);
    }
}
