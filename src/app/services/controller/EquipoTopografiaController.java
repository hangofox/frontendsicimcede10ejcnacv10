//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.EquipoTopografiaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.EquipoTopografiaService;
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
* @Since 21/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class EquipoTopografiaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private EquipoTopografiaService equipoTopografiaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/equiposTopografias/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idEquipoTopografia,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(equipoTopografiaService.contarTotalRegistros(idEquipoTopografia, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS EQUIPOS TOPOGRAFIAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/equiposTopografias/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<EquipoTopografiaDTO>> listarEquiposTopografiasLista(
            @RequestParam(required = false) Long idEquipoTopografia,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(equipoTopografiaService.listarEquiposTopografias(idEquipoTopografia, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR EQUIPOS TOPOGRAFIAS CON QUERY PARAMS:
    @GetMapping("/equiposTopografias/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<EquipoTopografiaDTO>> listarEquiposTopografias(
            @RequestParam(required = false) Long idEquipoTopografia,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(equipoTopografiaService.listarEquiposTopografiasPag(pageable, idEquipoTopografia, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/equiposTopografias")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearEquipoTopografia(@RequestBody EquipoTopografiaDTO equipoTopografiaDTO) {
        System.out.println(equipoTopografiaDTO);
        return equipoTopografiaService.crearEquipoTopografia(equipoTopografiaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/equiposTopografias/{idEquipoTopografia}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarEquipoTopografiaporId(@PathVariable Long idEquipoTopografia) {
        return equipoTopografiaService.consultarEquipoTopografiaporId(idEquipoTopografia);
    }
    
    //LEER CONSULTA DE REGISTRO POR DENOMINACION Y SIGLA O ACRONIMO DE UNIDAD MILITAR:
    @GetMapping("/equiposTopografias/denominacion/{denominacionEquipoTopografia}/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarEquipoTopografiaporDenominacionySiglaoAcronimoUnidadMilitar(@PathVariable String denominacionEquipoTopografia, @PathVariable String siglaoAcronimoUnidadMilitar) {
        return equipoTopografiaService.consultarEquipoTopografiaporDenominacionySiglaoAcronimoUnidadMilitar(denominacionEquipoTopografia, siglaoAcronimoUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/equiposTopografias")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarEquipoTopografia(@RequestBody EquipoTopografiaDTO equipoTopografiaDTO) {
        return equipoTopografiaService.actualizarEquipoTopografia(equipoTopografiaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/equiposTopografias/{idEquipoTopografia}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarEquipoTopografia(@PathVariable Long idEquipoTopografia) {
        return equipoTopografiaService.eliminarEquipoTopografia(idEquipoTopografia);
    }
}
