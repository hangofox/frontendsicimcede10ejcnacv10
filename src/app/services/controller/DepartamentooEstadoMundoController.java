//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DepartamentooEstadoMundoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DepartamentooEstadoMundoService;
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
public class DepartamentooEstadoMundoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DepartamentooEstadoMundoService departamentooEstadoMundoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/departamentosoEstadosMundo/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idPaisMundo,
            @RequestParam(required = false) String nombrePaisMundo,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(departamentooEstadoMundoService.contarTotalRegistros(idPaisMundo, nombrePaisMundo, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS DEPARTAMENTOS O ESTADOS MUNDO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/departamentosoEstadosMundo/lista")
    public ResponseEntity<List<DepartamentooEstadoMundoDTO>> listarDepartamentosoEstadosMundoLista(
            @RequestParam(required = false) Long idPaisMundo,
            @RequestParam(required = false) String nombrePaisMundo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(departamentooEstadoMundoService.listarDepartamentosoEstadosMundo(idPaisMundo, nombrePaisMundo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DEPARTAMENTOS O ESTADOS MUNDO CON QUERY PARAMS:
    @GetMapping("/departamentosoEstadosMundo/listaPag")
    public ResponseEntity<Slice<DepartamentooEstadoMundoDTO>> listarDepartamentosoEstadosMundo(
            @RequestParam(required = false) Long idPaisMundo,
            @RequestParam(required = false) String nombrePaisMundo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(departamentooEstadoMundoService.listarDepartamentosoEstadosMundoPag(pageable, idPaisMundo, nombrePaisMundo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/departamentosoEstadosMundo")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/departamentosoEstadosMundo")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearDEPaisMundo(@RequestBody DepartamentooEstadoMundoDTO departamentooEstadoMundoDTO){
        System.out.println(departamentooEstadoMundoDTO);
        return departamentooEstadoMundoService.crearDepartamentooEstadoMundo(departamentooEstadoMundoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/departamentosoEstadosMundo/{idDepartamentooEstadoMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDEPaisMundobyId(@PathVariable Long idDepartamentooEstadoMundo){
        return departamentooEstadoMundoService.consultarDepartamentooEstadoMundoporId(idDepartamentooEstadoMundo);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID DENTRO DEL PAIS DEL MUNDO:
    @GetMapping("/departamentosoEstadosMundo/pais/{idPaisMundo}/{idDepartamentooEstadoMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDEPaisMundobyIdeIdPaisMundo(@PathVariable long idPaisMundo, @PathVariable long idDepartamentooEstadoMundo){
        return departamentooEstadoMundoService.consultarDepartamentooEstadoMundoporIdeIdPaisMundo(idPaisMundo, idDepartamentooEstadoMundo);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE DENTRO DEL PAIS DEL MUNDO:
    @GetMapping("/departamentosoEstadosMundo/pais/nombre/{nombrePaisMundo}/nombre/{nombreDepartamentooEstadoMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDEPaisMundobyNombreyNombrePaisMundo(@PathVariable String nombrePaisMundo, @PathVariable String nombreDepartamentooEstadoMundo){
        return departamentooEstadoMundoService.consultarDepartamentooEstadoMundoporNombreyNombrePaisMundo(nombrePaisMundo, nombreDepartamentooEstadoMundo);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/departamentosoEstadosMundo")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/departamentosoEstadosMundo")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarDEPaisMundo(@RequestBody DepartamentooEstadoMundoDTO departamentooEstadoMundoDTO){
        return departamentooEstadoMundoService.actualizarDepartamentooEstadoMundo(departamentooEstadoMundoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/departamentosoEstadosMundo/{idDepartamentooEstadoMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarDEPaisMundo(@PathVariable Long idDepartamentooEstadoMundo){
        return departamentooEstadoMundoService.eliminarDepartamentooEstadoMundo(idDepartamentooEstadoMundo);
    }
}
