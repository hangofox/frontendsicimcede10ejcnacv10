//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.QuimicoPiscinaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.QuimicoPiscinaService;
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
public class QuimicoPiscinaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private QuimicoPiscinaService quimicoPiscinaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/quimicosPiscinas/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idQuimicoPiscina,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(quimicoPiscinaService.contarTotalRegistros(idQuimicoPiscina, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS QUIMICOS PISCINAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/quimicosPiscinas/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<QuimicoPiscinaDTO>> listarQuimicosPiscinasLista(
            @RequestParam(required = false) Long idQuimicoPiscina,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(quimicoPiscinaService.listarQuimicosPiscinas(idQuimicoPiscina, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR QUIMICOS PISCINAS CON QUERY PARAMS:
    @GetMapping("/quimicosPiscinas/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<QuimicoPiscinaDTO>> listarQuimicosPiscinasListaPag(
            @RequestParam(required = false) Long idQuimicoPiscina,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(quimicoPiscinaService.listarQuimicosPiscinasPag(pageable, idQuimicoPiscina, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/quimicosPiscinas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/quimicosPiscinas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearQuimicoPiscina(@RequestBody QuimicoPiscinaDTO quimicoPiscinaDTO){
        System.out.println(quimicoPiscinaDTO);
        return quimicoPiscinaService.crearQuimicoPiscina(quimicoPiscinaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/quimicosPiscinas/{idQuimicoPiscina}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarQuimicoPiscinabyId(@PathVariable Long idQuimicoPiscina){
        return quimicoPiscinaService.consultarQuimicoPiscinaporId(idQuimicoPiscina);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/quimicosPiscinas/nombre/{nombreQuimicoPiscina}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NOMBRE.
    public RespuestaDTO consultarQuimicoPiscinabyNombre(@PathVariable String nombreQuimicoPiscina){
        return quimicoPiscinaService.consultarQuimicoPiscinaporNombre(nombreQuimicoPiscina);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/quimicosPiscinas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/quimicosPiscinas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarQuimicoPiscina(@RequestBody QuimicoPiscinaDTO quimicoPiscinaDTO){
        return quimicoPiscinaService.actualizarQuimicoPiscina(quimicoPiscinaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/quimicosPiscinas/{idQuimicoPiscina}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarQuimicoPiscina(@PathVariable Long idQuimicoPiscina){
        return quimicoPiscinaService.eliminarQuimicoPiscina(idQuimicoPiscina);
    }
}
