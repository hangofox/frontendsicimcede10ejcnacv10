//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialDiagnosticoInicialSeleccMttoEquipIngDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialDiagnosticoInicialSeleccMttoEquipIngService;
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
public class HistorialDiagnosticoInicialSeleccMttoEquipIngController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialDiagnosticoInicialSeleccMttoEquipIngService historialDiagnosticoInicialSeleccMttoEquipIngService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialDiagnosticoInicialSeleccMttoEquipIng,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialDiagnosticoInicialSeleccMttoEquipIngService.contarTotalRegistros(idHistorialDiagnosticoInicialSeleccMttoEquipIng, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES DIAGNÓSTICOS INICIALES SELECC MTTO EQUIP ING SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialDiagnosticoInicialSeleccMttoEquipIngDTO>> listarHistorialesDiagnosticosInicialesSeleccMttoEquipIngLista(
            @RequestParam(required = false) Long idHistorialDiagnosticoInicialSeleccMttoEquipIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialDiagnosticoInicialSeleccMttoEquipIngService.listarHistorialesDiagnosticosInicialesSeleccMttoEquipIng(idHistorialDiagnosticoInicialSeleccMttoEquipIng, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES DIAGNÓSTICOS INICIALES SELECC MTTO EQUIP ING CON QUERY PARAMS:
    @GetMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialDiagnosticoInicialSeleccMttoEquipIngDTO>> listarHistorialesDiagnosticosInicialesSeleccMttoEquipIngListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialDiagnosticoInicialSeleccMttoEquipIng,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialDiagnosticoInicialSeleccMttoEquipIngService.listarHistorialesDiagnosticosInicialesSeleccMttoEquipIngPag(pageable, idHistorialDiagnosticoInicialSeleccMttoEquipIng, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialDiagnosticoInicialSeleccMttoEquipIng(@RequestBody HistorialDiagnosticoInicialSeleccMttoEquipIngDTO historialDiagnosticoInicialSeleccMttoEquipIngDTO){
        System.out.println(historialDiagnosticoInicialSeleccMttoEquipIngDTO);
        return historialDiagnosticoInicialSeleccMttoEquipIngService.crearHistorialDiagnosticoInicialSeleccMttoEquipIng(historialDiagnosticoInicialSeleccMttoEquipIngDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng/{idHistorialDiagnosticoInicialSeleccMttoEquipIng}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialDiagnosticoInicialSeleccMttoEquipIngbyId(@PathVariable Long idHistorialDiagnosticoInicialSeleccMttoEquipIng){
        return historialDiagnosticoInicialSeleccMttoEquipIngService.consultarHistorialDiagnosticoInicialSeleccMttoEquipIngporId(idHistorialDiagnosticoInicialSeleccMttoEquipIng);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialDiagnosticoInicialSeleccMttoEquipIngbyNumReg(@RequestParam(required = false) String numRegHistorialDiagnosticoInicialSeleccMttoEquipIng){
        return historialDiagnosticoInicialSeleccMttoEquipIngService.consultarHistorialDiagnosticoInicialSeleccMttoEquipIngporNumReg(numRegHistorialDiagnosticoInicialSeleccMttoEquipIng);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialDiagnosticoInicialSeleccMttoEquipIng(@RequestBody HistorialDiagnosticoInicialSeleccMttoEquipIngDTO historialDiagnosticoInicialSeleccMttoEquipIngDTO){
        return historialDiagnosticoInicialSeleccMttoEquipIngService.actualizarHistorialDiagnosticoInicialSeleccMttoEquipIng(historialDiagnosticoInicialSeleccMttoEquipIngDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesDiagnosticosInicialesSeleccMttoEquipIng/{idHistorialDiagnosticoInicialSeleccMttoEquipIng}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialDiagnosticoInicialSeleccMttoEquipIng(@PathVariable Long idHistorialDiagnosticoInicialSeleccMttoEquipIng){
        return historialDiagnosticoInicialSeleccMttoEquipIngService.eliminarHistorialDiagnosticoInicialSeleccMttoEquipIng(idHistorialDiagnosticoInicialSeleccMttoEquipIng);
    }
}
