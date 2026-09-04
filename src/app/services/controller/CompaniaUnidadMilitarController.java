//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CompaniaUnidadMilitarDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CompaniaUnidadMilitarService;
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
* @Since 24/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class CompaniaUnidadMilitarController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CompaniaUnidadMilitarService companiaUnidadMilitarService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/companiasUnidadesMilitares/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCompaniaUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(companiaUnidadMilitarService.contarTotalRegistros(idCompaniaUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/companiasUnidadesMilitares/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<CompaniaUnidadMilitarDTO>> listarCompaniasUnidadesMilitaresLista(
            @RequestParam(required = false) Long idCompaniaUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(companiaUnidadMilitarService.listarCompaniasUnidadesMilitares(idCompaniaUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/companiasUnidadesMilitares/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<CompaniaUnidadMilitarDTO>> listarCompaniasUnidadesMilitares(
            @RequestParam(required = false) Long idCompaniaUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(companiaUnidadMilitarService.listarCompaniasUnidadesMilitaresPag(pageable, idCompaniaUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/companiasUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCompaniaUnidadMilitar(@RequestBody CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO) {
        System.out.println(companiaUnidadMilitarDTO);
        return companiaUnidadMilitarService.crearCompaniaUnidadMilitar(companiaUnidadMilitarDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/companiasUnidadesMilitares/{idCompaniaUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCompaniaUnidadMilitarporId(@PathVariable Long idCompaniaUnidadMilitar) {
        return companiaUnidadMilitarService.consultarCompaniaUnidadMilitarporId(idCompaniaUnidadMilitar);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE Y SIGLA O ACRÓNIMO DE UNIDAD MILITAR:
    @GetMapping("/companiasUnidadesMilitares/nombre/{nombreCompaniaUnidadMilitar}/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCompaniaUnidadMilitarporNombreySAUnidadMilitar(@PathVariable String nombreCompaniaUnidadMilitar, @PathVariable String siglaoAcronimoUnidadMilitar) {
        return companiaUnidadMilitarService.consultarCompaniaUnidadMilitarporNombreySAUnidadMilitar(nombreCompaniaUnidadMilitar, siglaoAcronimoUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/companiasUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCompaniaUnidadMilitar(@RequestBody CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO) {
        return companiaUnidadMilitarService.actualizarCompaniaUnidadMilitar(companiaUnidadMilitarDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/companiasUnidadesMilitares/{idCompaniaUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCompaniaUnidadMilitar(@PathVariable Long idCompaniaUnidadMilitar) {
        return companiaUnidadMilitarService.eliminarCompaniaUnidadMilitar(idCompaniaUnidadMilitar);
    }
}
