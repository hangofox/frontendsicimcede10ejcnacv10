//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionSoatLineaBlancaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionSoatLineaBlancaService;
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
* @Since 08/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ProyeccionSoatLineaBlancaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionSoatLineaBlancaService proyeccionSoatLineaBlancaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesSoatsLineasBlancas/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionSoatLineaBlanca,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionSoatLineaBlancaService.contarTotalRegistros(idProyeccionSoatLineaBlanca, idEquipoIngeniero, valorSolicitadoProyeccionPlanAnualAdqCdoIng, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS PROYECCIONES SOATS LINEAS BLANCAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesSoatsLineasBlancas/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionSoatLineaBlancaDTO>> listarProyeccionesSoatsLineasBlancasLista(
            @RequestParam(required = false) Long idProyeccionSoatLineaBlanca,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionSoatLineaBlancaService.listarProyeccionesSoatsLineasBlancas(idProyeccionSoatLineaBlanca, idEquipoIngeniero, valorSolicitadoProyeccionPlanAnualAdqCdoIng, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES SOATS LINEAS BLANCAS CON QUERY PARAMS:
    @GetMapping("/proyeccionesSoatsLineasBlancas/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionSoatLineaBlancaDTO>> listarProyeccionesSoatsLineasBlancasListaPag(
            @RequestParam(required = false) Long idProyeccionSoatLineaBlanca,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionSoatLineaBlancaService.listarProyeccionesSoatsLineasBlancasPag(pageable, idProyeccionSoatLineaBlanca, idEquipoIngeniero, valorSolicitadoProyeccionPlanAnualAdqCdoIng, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesSoatsLineasBlancas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionSoatLineaBlanca(@RequestBody ProyeccionSoatLineaBlancaDTO proyeccionSoatLineaBlancaDTO){
        System.out.println(proyeccionSoatLineaBlancaDTO);
        return proyeccionSoatLineaBlancaService.crearProyeccionSoatLineaBlanca(proyeccionSoatLineaBlancaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesSoatsLineasBlancas/{idProyeccionSoatLineaBlanca}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionSoatLineaBlancabyId(@PathVariable Long idProyeccionSoatLineaBlanca){
        return proyeccionSoatLineaBlancaService.consultarProyeccionSoatLineaBlancaporId(idProyeccionSoatLineaBlanca);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesSoatsLineasBlancas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionSoatLineaBlanca(@RequestBody ProyeccionSoatLineaBlancaDTO proyeccionSoatLineaBlancaDTO){
        return proyeccionSoatLineaBlancaService.actualizarProyeccionSoatLineaBlanca(proyeccionSoatLineaBlancaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesSoatsLineasBlancas/{idProyeccionSoatLineaBlanca}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionSoatLineaBlanca(@PathVariable Long idProyeccionSoatLineaBlanca){
        return proyeccionSoatLineaBlancaService.eliminarProyeccionSoatLineaBlanca(idProyeccionSoatLineaBlanca);
    }
}
