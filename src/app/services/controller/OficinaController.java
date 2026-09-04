//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.OficinaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.OficinaService;
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
public class OficinaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private OficinaService oficinaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/oficinas/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idOficina,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(oficinaService.contarTotalRegistros(idOficina, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/oficinas/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<OficinaDTO>> listarOficinasLista(
            @RequestParam(required = false) Long idOficina,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(oficinaService.listarOficinas(idOficina, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/oficinas/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<OficinaDTO>> listarOficinas(
            @RequestParam(required = false) Long idOficina,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(oficinaService.listarOficinasPag(pageable, idOficina, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/oficinas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearOficina(@RequestBody OficinaDTO oficinaDTO) {
        System.out.println(oficinaDTO);
        return oficinaService.crearOficina(oficinaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/oficinas/{idOficina}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarOficinaporId(@PathVariable Long idOficina) {
        return oficinaService.consultarOficinaporId(idOficina);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE Y SIGLA O ACRÓNIMO DE UNIDAD MILITAR:
    @GetMapping("/oficinas/nombre/{nombreOficina}/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarOficinaporNombreySAUnidadMilitar(@PathVariable String nombreOficina, @PathVariable String siglaoAcronimoUnidadMilitar) {
        return oficinaService.consultarOficinaporNombreySAUnidadMilitar(nombreOficina, siglaoAcronimoUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/oficinas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarOficina(@RequestBody OficinaDTO oficinaDTO) {
        return oficinaService.actualizarOficina(oficinaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/oficinas/{idOficina}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarOficina(@PathVariable Long idOficina) {
        return oficinaService.eliminarOficina(idOficina);
    }
}
