//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RazaCaninoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.RazaCaninoService;
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
* @Since 16/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class RazaCaninoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private RazaCaninoService razaCaninoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT LISTAR TODOS LAS RAZAS CANINOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/razasCaninos/lista")
    public ResponseEntity<List<RazaCaninoDTO>> listarRazasCaninosLista(
            @RequestParam(required = false) Long idRazaCanino,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(razaCaninoService.listarRazasCaninosOrdenadosporId(idRazaCanino, keyword, orderBy, orderMode), HttpStatus.OK);
    }

    //ENDPOINT ÚNICO PARA LISTAR/ORDENAR/PAGINAR RAZAS CANINOS CON QUERY PARAMS:
    @GetMapping("/razasCaninos/listaPag")
    public ResponseEntity<Slice<RazaCaninoDTO>> listarRazasCaninosPag(
            @RequestParam(required = false) Long idRazaCanino,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(razaCaninoService.listarRazasCaninosOrdenadosporIdPag(pageable, idRazaCanino, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/razasCaninos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/razasCaninos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearRazaCanino(@RequestBody RazaCaninoDTO razaCaninoDTO){
        System.out.println(razaCaninoDTO);
        return razaCaninoService.crearRazaCanino(razaCaninoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/razasCaninos/{idRazaCanino}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRazaCaninobyId(@PathVariable Long idRazaCanino){
        return razaCaninoService.consultarRazaCaninoporId(idRazaCanino);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/razasCaninos/nombre/{nombreRazaCanino}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRazaCaninobyNombre(@PathVariable String nombreRazaCanino){
        return razaCaninoService.consultarRazaCaninoporNombre(nombreRazaCanino);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/razasCaninos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/razasCaninos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarRazaCanino(@RequestBody RazaCaninoDTO razaCaninoDTO){
        return razaCaninoService.actualizarRazaCanino(razaCaninoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/razasCaninos/{idRazaCanino}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarRazaCanino(@PathVariable Long idRazaCanino){
        return razaCaninoService.eliminarRazaCanino(idRazaCanino);
    }
}
