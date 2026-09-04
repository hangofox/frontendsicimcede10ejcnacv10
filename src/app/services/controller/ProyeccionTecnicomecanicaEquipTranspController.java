//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionTecnicomecanicaEquipTranspDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionTecnicomecanicaEquipTranspService;
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
public class ProyeccionTecnicomecanicaEquipTranspController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionTecnicomecanicaEquipTranspService proyeccionTecnicomecanicaEquipTranspService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesTecnicomecanicasEquipsTransps/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) String valorSolicitadoProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionTecnicomecanicaEquipTranspService.contarTotalRegistros(idProyeccionTecnicomecanicaEquipTransp, idEquipoIngeniero, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp, valorSolicitadoProyeccionTecnicomecanicaEquipTransp, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS PROYECCIONES TECNICOMECANICAS EQUIPS TRANSPS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesTecnicomecanicasEquipsTransps/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionTecnicomecanicaEquipTranspDTO>> listarProyeccionesTecnicomecanicasEquipsTranspsLista(
            @RequestParam(required = false) Long idProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) String valorSolicitadoProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionTecnicomecanicaEquipTranspService.listarProyeccionesTecnicomecanicasEquipsTransps(idProyeccionTecnicomecanicaEquipTransp, idEquipoIngeniero, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp, valorSolicitadoProyeccionTecnicomecanicaEquipTransp, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES TECNICOMECANICAS EQUIPS TRANSPS CON QUERY PARAMS:
    @GetMapping("/proyeccionesTecnicomecanicasEquipsTransps/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionTecnicomecanicaEquipTranspDTO>> listarProyeccionesTecnicomecanicasEquipsTranspsListaPag(
            @RequestParam(required = false) Long idProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) String valorSolicitadoProyeccionTecnicomecanicaEquipTransp,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionTecnicomecanicaEquipTranspService.listarProyeccionesTecnicomecanicasEquipsTranspsPag(pageable, idProyeccionTecnicomecanicaEquipTransp, idEquipoIngeniero, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp, valorSolicitadoProyeccionTecnicomecanicaEquipTransp, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesTecnicomecanicasEquipsTransps")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/proyeccionesTecnicomecanicasEquipsTransps")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionTecnicomecanicaEquipTransp(@RequestBody ProyeccionTecnicomecanicaEquipTranspDTO proyeccionTecnicomecanicaEquipTranspDTO){
        System.out.println(proyeccionTecnicomecanicaEquipTranspDTO);
        return proyeccionTecnicomecanicaEquipTranspService.crearProyeccionTecnicomecanicaEquipTransp(proyeccionTecnicomecanicaEquipTranspDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesTecnicomecanicasEquipsTransps/{idProyeccionTecnicomecanicaEquipTransp}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionTecnicomecanicaEquipTranspbyId(@PathVariable Long idProyeccionTecnicomecanicaEquipTransp){
        return proyeccionTecnicomecanicaEquipTranspService.consultarProyeccionTecnicomecanicaEquipTranspporId(idProyeccionTecnicomecanicaEquipTransp);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/proyeccionesTecnicomecanicasEquipsTransps")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/proyeccionesTecnicomecanicasEquipsTransps")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionTecnicomecanicaEquipTransp(@RequestBody ProyeccionTecnicomecanicaEquipTranspDTO proyeccionTecnicomecanicaEquipTranspDTO){
        return proyeccionTecnicomecanicaEquipTranspService.actualizarProyeccionTecnicomecanicaEquipTransp(proyeccionTecnicomecanicaEquipTranspDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesTecnicomecanicasEquipsTransps/{idProyeccionTecnicomecanicaEquipTransp}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionTecnicomecanicaEquipTransp(@PathVariable Long idProyeccionTecnicomecanicaEquipTransp){
        return proyeccionTecnicomecanicaEquipTranspService.eliminarProyeccionTecnicomecanicaEquipTransp(idProyeccionTecnicomecanicaEquipTransp);
    }
}
