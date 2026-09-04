//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.PaisMundoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.PaisMundoService;
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
public class PaisMundoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private PaisMundoService paisMundoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/paisesMundo/total")
    public ResponseEntity<Long> contarTotalRegistros() {
        Long totalPaisesMundo = paisMundoService.contarTotalRegistros();
        return new ResponseEntity<>(totalPaisesMundo, HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS PAISES MUNDO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/paisesMundo/lista")
    public ResponseEntity<List<PaisMundoDTO>> listarPaisesMundoLista(
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(paisMundoService.listarPaisesMundoOrdenadosporId(orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PAISES MUNDO CON QUERY PARAMS:
    @GetMapping("/paisesMundo/listaPag")
    public ResponseEntity<Slice<PaisMundoDTO>> listarPaisesMundo(
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(paisMundoService.listarPaisesMundoOrdenadosporIdPag(pageable, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/paisesMundo")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/paisesMundo")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearPaisMundo(@RequestBody PaisMundoDTO paisMundoDTO){
        System.out.println(paisMundoDTO);
        return paisMundoService.crearPaisMundo(paisMundoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/paisesMundo/{idPaisMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarPaisMundoporId(@PathVariable Long idPaisMundo){
        return paisMundoService.consultarPaisMundoporId(idPaisMundo);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/paisesMundo/nombre/{nombrePaisMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarPaisMundoporNombre(@PathVariable String nombrePaisMundo){
        return paisMundoService.consultarPaisMundoporNombre(nombrePaisMundo);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/paisesMundo")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/paisesMundo")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarPaisMundo(@RequestBody PaisMundoDTO paisMundoDTO){
        return paisMundoService.actualizarPaisMundo(paisMundoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/paisesMundo/{idPaisMundo}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarPaisMundo(@PathVariable Long idPaisMundo){
        return paisMundoService.eliminarPaisMundo(idPaisMundo);
    }
}
