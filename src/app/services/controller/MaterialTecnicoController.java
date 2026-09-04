//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.MaterialTecnicoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.MaterialTecnicoService;
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
public class MaterialTecnicoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private MaterialTecnicoService materialTecnicoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/materialesTecnicos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idMaterialTecnico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo) {
        return new ResponseEntity<>(materialTecnicoService.contarTotalRegistros(idMaterialTecnico, keyword, siglaoAcronimoUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS MATERIALES TECNICOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/materialesTecnicos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<MaterialTecnicoDTO>> listarMaterialesTecnicosLista(
            @RequestParam(required = false) Long idMaterialTecnico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(materialTecnicoService.listarMaterialesTecnicos(idMaterialTecnico, keyword, siglaoAcronimoUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR MATERIALES TECNICOS CON QUERY PARAMS:
    @GetMapping("/materialesTecnicos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<MaterialTecnicoDTO>> listarMaterialesTecnicos(
            @RequestParam(required = false) Long idMaterialTecnico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(materialTecnicoService.listarMaterialesTecnicosPag(pageable, idMaterialTecnico, keyword, siglaoAcronimoUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/materialesTecnicos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearMaterialTecnico(@RequestBody MaterialTecnicoDTO materialTecnicoDTO) {
        System.out.println(materialTecnicoDTO);
        return materialTecnicoService.crearMaterialTecnico(materialTecnicoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/materialesTecnicos/{idMaterialTecnico}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarMaterialTecnicoporId(@PathVariable Long idMaterialTecnico) {
        return materialTecnicoService.consultarMaterialTecnicoporId(idMaterialTecnico);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO INVENTARIO Y NUMERO ACTIVO FIJO (CAMPOS ÚNICOS COMBINADOS):
    @GetMapping("/materialesTecnicos/numero")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPOS ÚNICOS COMBINADOS.
    public RespuestaDTO consultarMaterialTecnicoporNumeroInventarioNumeroActivoFijo(
            @RequestParam(required = false) String numeroInventarioMaterialTecnico,
            @RequestParam(required = false) String numeroActivoFijoMaterialTecnico) {
        return materialTecnicoService.consultarMaterialTecnicoporNumeroInventarioNumeroActivoFijo(numeroInventarioMaterialTecnico, numeroActivoFijoMaterialTecnico);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/materialesTecnicos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarMaterialTecnico(@RequestBody MaterialTecnicoDTO materialTecnicoDTO) {
        return materialTecnicoService.actualizarMaterialTecnico(materialTecnicoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/materialesTecnicos/{idMaterialTecnico}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarMaterialTecnico(@PathVariable Long idMaterialTecnico) {
        return materialTecnicoService.eliminarMaterialTecnico(idMaterialTecnico);
    }
}
