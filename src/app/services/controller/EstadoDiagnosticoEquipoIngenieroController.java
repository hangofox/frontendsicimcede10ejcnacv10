//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.EstadoDiagnosticoEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.EstadoDiagnosticoEquipoIngenieroService;
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
* @Since 20/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class EstadoDiagnosticoEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private EstadoDiagnosticoEquipoIngenieroService estadoDiagnosticoEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT LISTAR TODOS LOS ESTADOS DIAGNÓSTICOS EQUIPOS INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/estadosDiagnosticosEquiposIngenieros/lista")
    public ResponseEntity<List<EstadoDiagnosticoEquipoIngenieroDTO>> listarEstadosDiagnosticosEquiposIngenierosLista(
            @RequestParam(required = false) Long idEstadoDiagnosticoEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(estadoDiagnosticoEquipoIngenieroService.listarEstadosDiagnosticosEquiposIngenieros(idEstadoDiagnosticoEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR ESTADOS DIAGNÓSTICOS EQUIPOS INGENIEROS CON QUERY PARAMS:
    @GetMapping("/estadosDiagnosticosEquiposIngenieros")
    public ResponseEntity<Slice<EstadoDiagnosticoEquipoIngenieroDTO>> listarEstadosDiagnosticosEquiposIngenieros(
            @RequestParam(required = false) Long idEstadoDiagnosticoEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(estadoDiagnosticoEquipoIngenieroService.listarEstadosDiagnosticosEquiposIngenierosPag(pageable, idEstadoDiagnosticoEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/estadosDiagnosticosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/estadosDiagnosticosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearEstadoDiagnosticoEquipoIngeniero(@RequestBody EstadoDiagnosticoEquipoIngenieroDTO estadoDiagnosticoEquipoIngenieroDTO){
        System.out.println(estadoDiagnosticoEquipoIngenieroDTO);
        return estadoDiagnosticoEquipoIngenieroService.crearEstadoDiagnosticoEquipoIngeniero(estadoDiagnosticoEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/estadosDiagnosticosEquiposIngenieros/{idEstadoDiagnosticoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarEstadoDiagnosticoEquipoIngenierobyId(@PathVariable Long idEstadoDiagnosticoEquipoIngeniero){
        return estadoDiagnosticoEquipoIngenieroService.consultarEstadoDiagnosticoEquipoIngenieroporId(idEstadoDiagnosticoEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/estadosDiagnosticosEquiposIngenieros/nombre/{nombreEstadoDiagnosticoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarEstadoDiagnosticoEquipoIngenierobyNombre(@PathVariable String nombreEstadoDiagnosticoEquipoIngeniero){
        return estadoDiagnosticoEquipoIngenieroService.consultarEstadoDiagnosticoEquipoIngenieroporNombre(nombreEstadoDiagnosticoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/estadosDiagnosticosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/estadosDiagnosticosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarEstadoDiagnosticoEquipoIngeniero(@RequestBody EstadoDiagnosticoEquipoIngenieroDTO estadoDiagnosticoEquipoIngenieroDTO){
        return estadoDiagnosticoEquipoIngenieroService.actualizarEstadoDiagnosticoEquipoIngeniero(estadoDiagnosticoEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/estadosDiagnosticosEquiposIngenieros/{idEstadoDiagnosticoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarEstadoDiagnosticoEquipoIngeniero(@PathVariable Long idEstadoDiagnosticoEquipoIngeniero){
        return estadoDiagnosticoEquipoIngenieroService.eliminarEstadoDiagnosticoEquipoIngeniero(idEstadoDiagnosticoEquipoIngeniero);
    }
}
