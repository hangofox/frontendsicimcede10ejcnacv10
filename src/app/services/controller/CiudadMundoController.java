//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CiudadMundoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CiudadMundoService;
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
* @Since 01/08/2023.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class CiudadMundoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CiudadMundoService ciudadMundoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/ciudadesMundo/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCiudadMundo,
            @RequestParam(required = false) Long idPaisMundo,
            @RequestParam(required = false) Long idDepartamentooEstadoMundo,
            @RequestParam(required = false) String nombrePaisMundo,
            @RequestParam(required = false) String nombreDepartamentooEstadoMundo,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(ciudadMundoService.contarTotalRegistros(idCiudadMundo, idPaisMundo, idDepartamentooEstadoMundo, nombrePaisMundo, nombreDepartamentooEstadoMundo, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS CIUDADES MUNDO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/ciudadesMundo/lista")
    public ResponseEntity<List<CiudadMundoDTO>> listarCiudadesMundoLista(
            @RequestParam(required = false) Long idCiudadMundo,
            @RequestParam(required = false) Long idPaisMundo,
            @RequestParam(required = false) Long idDepartamentooEstadoMundo,
            @RequestParam(required = false) String nombrePaisMundo,
            @RequestParam(required = false) String nombreDepartamentooEstadoMundo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(ciudadMundoService.listarCiudadesMundo(idCiudadMundo, idPaisMundo, idDepartamentooEstadoMundo, nombrePaisMundo, nombreDepartamentooEstadoMundo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR CIUDADES MUNDO CON QUERY PARAMS:
    @GetMapping("/ciudadesMundo/listaPag")
    public ResponseEntity<Slice<CiudadMundoDTO>> listarCiudadesMundo(
            @RequestParam(required = false) Long idCiudadMundo,
            @RequestParam(required = false) Long idPaisMundo,
            @RequestParam(required = false) Long idDepartamentooEstadoMundo,
            @RequestParam(required = false) String nombrePaisMundo,
            @RequestParam(required = false) String nombreDepartamentooEstadoMundo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(ciudadMundoService.listarCiudadesMundoPag(pageable, idCiudadMundo, idPaisMundo, idDepartamentooEstadoMundo, nombrePaisMundo, nombreDepartamentooEstadoMundo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/ciudadesMundo")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/ciudadesMundo")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCDEPaisMundo(@RequestBody CiudadMundoDTO ciudadMundoDTO){
        System.out.println(ciudadMundoDTO);
        return ciudadMundoService.crearCiudadMundo(ciudadMundoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/ciudadesMundo/{idCiudadMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultaCDEPaisMundobyId(@PathVariable Long idCiudadMundo){
        return ciudadMundoService.consultarCiudadMundoporId(idCiudadMundo);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID DENTRO DE PAIS DEL MUNDO Y POR ID DENTRO DE DEPARTAMENTO O ESTADO DEL MUNDO E ID DE CIUDAD DEL MUNDO:
    @GetMapping("/ciudadesMundo/pais/{idPaisMundo}/departamentooestado/{idDepartamentooEstadoMundo}/{idCiudadMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultaCDEPaisMundobyIdPaisMundoeIdDepartamentooEstadoMundoeIdCiudadMundo(@PathVariable long idPaisMundo, @PathVariable long idDepartamentooEstadoMundo, @PathVariable long idCiudadMundo){
        return ciudadMundoService.consultarCiudadMundoporIdPaisMundoeIdDepartamentooEstadoMundoeIdCiudadMundo(idPaisMundo, idDepartamentooEstadoMundo, idCiudadMundo);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE DENTRO DE PAIS DEL MUNDO, POR NOMBRE DENTRO DE DEPARTAMENTO O ESTADO DEL MUNDO Y NOMBRE DE CIUDAD DEL MUNDO:
    @GetMapping("/ciudadesMundo/pais/nombre/{nombrePaisMundo}/departamentooestado/nombre/{nombreDepartamentooEstadoMundo}/nombre/{nombreCiudadMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultaCDEPaisMundobyNombreyNombrePaisMundoyNombreDepartamentooEstadoMundoyNombreCiudadMundo(@PathVariable String nombrePaisMundo, @PathVariable String nombreDepartamentooEstadoMundo, @PathVariable String nombreCiudadMundo){
        return ciudadMundoService.consultarCiudadMundoporNombrePaisMundoyNombreDepartamentooEstadoMundoyNombreCiudadMundo(nombrePaisMundo, nombreDepartamentooEstadoMundo, nombreCiudadMundo);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/ciudadesMundo")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/ciudadesMundo")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCDEPaisMundo(@RequestBody CiudadMundoDTO ciudadMundoDTO){
        return ciudadMundoService.actualizarCiudadMundo(ciudadMundoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/ciudadesMundo/{idCiudadMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCDEPaisMundo(@PathVariable Long idCiudadMundo){
        return ciudadMundoService.eliminarCiudadMundo(idCiudadMundo);
    }
}
