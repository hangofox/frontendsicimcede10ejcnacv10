//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.UnidadMilitarDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.UnidadMilitarService;
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
public class UnidadMilitarController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private UnidadMilitarService unidadMilitarService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/unidadesMilitares/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idUnidadMilitar,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(unidadMilitarService.contarTotalRegistros(idUnidadMilitar, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/unidadesMilitares/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<UnidadMilitarDTO>> listarUnidadesMilitaresLista(
            @RequestParam(required = false) Long idUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(unidadMilitarService.listarUnidadesMilitares(idUnidadMilitar, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/unidadesMilitares/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<UnidadMilitarDTO>> listarUnidadesMilitares(
            @RequestParam(required = false) Long idUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(unidadMilitarService.listarUnidadesMilitaresPag(pageable, idUnidadMilitar, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/unidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearUnidadMilitar(@RequestBody UnidadMilitarDTO unidadMilitarDTO){
        System.out.println(unidadMilitarDTO);
        return unidadMilitarService.crearUnidadMilitar(unidadMilitarDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/unidadesMilitares/{idUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarUnidadMilitarporId(@PathVariable Long idUnidadMilitar){
        return unidadMilitarService.consultarUnidadMilitarporId(idUnidadMilitar);
    }
    
    //LEER CONSULTA DE REGISTRO POR CÓDIGO:
    @GetMapping("/unidadesMilitares/codigo/{codigoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CÓDIGO.
    public RespuestaDTO consultarUnidadMilitarporCodigo(@PathVariable String codigoUnidadMilitar){
        return unidadMilitarService.consultarUnidadMilitarporCodigo(codigoUnidadMilitar);
    }
    
    //LEER CONSULTA DE REGISTRO POR SIGLA O ACRÓNIMO:
    @GetMapping("/unidadesMilitares/siglaoAcronimo/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarUnidadMilitarporSiglaoAcronimo(@PathVariable String siglaoAcronimoUnidadMilitar){
        return unidadMilitarService.consultarUnidadMilitarporSiglaoAcronimo(siglaoAcronimoUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/unidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarUnidadMilitar(@RequestBody UnidadMilitarDTO unidadMilitarDTO){
        return unidadMilitarService.actualizarUnidadMilitar(unidadMilitarDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/unidadesMilitares/{idUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarUnidadMilitar(@PathVariable Long idUnidadMilitar){
        return unidadMilitarService.eliminarUnidadMilitar(idUnidadMilitar);
    }
}
