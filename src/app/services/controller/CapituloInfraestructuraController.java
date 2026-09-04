//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CapituloInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CapituloInfraestructuraService;
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
* @Since 17/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class CapituloInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CapituloInfraestructuraService capituloInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT LISTAR TODOS LOS CAPÍTULOS DE INFRAESTRUCTURA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/capitulosInfraestructuras/lista")
    public ResponseEntity<List<CapituloInfraestructuraDTO>> listarCapitulosInfraestructurasLista(
            @RequestParam(required = false, defaultValue = "idCapituloInfraestructura") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(capituloInfraestructuraService.listarCapitulosInfraestructurasOrdenadosporId(orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/ORDENAR/PAGINAR CAPÍTULOS DE INFRAESTRUCTURA CON QUERY PARAMS:
    @GetMapping("/capitulosInfraestructuras/listaPag")
    public ResponseEntity<Slice<CapituloInfraestructuraDTO>> listarCapitulosInfraestructurasPag(
            @RequestParam(required = false, defaultValue = "idCapituloInfraestructura") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(capituloInfraestructuraService.listarCapitulosInfraestructurasOrdenadosporIdPag(pageable, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/capitulosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/capitulosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCapituloInfraestructura(@RequestBody CapituloInfraestructuraDTO capituloInfraestructuraDTO){
        System.out.println(capituloInfraestructuraDTO);
        return capituloInfraestructuraService.crearCapituloInfraestructura(capituloInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/capitulosInfraestructuras/{idCapituloInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCapituloInfraestructurabyId(@PathVariable Long idCapituloInfraestructura){
        return capituloInfraestructuraService.consultarCapituloInfraestructuraporId(idCapituloInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/capitulosInfraestructuras/nombre/{nombreCapituloInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCapituloInfraestructurabyNombre(@PathVariable String nombreCapituloInfraestructura){
        return capituloInfraestructuraService.consultarCapituloInfraestructuraporNombre(nombreCapituloInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/capitulosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/capitulosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCapituloInfraestructura(@RequestBody CapituloInfraestructuraDTO capituloInfraestructuraDTO){
        return capituloInfraestructuraService.actualizarCapituloInfraestructura(capituloInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/capitulosInfraestructuras/{idCapituloInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCapituloInfraestructura(@PathVariable Long idCapituloInfraestructura){
        return capituloInfraestructuraService.eliminarCapituloInfraestructura(idCapituloInfraestructura);
    }
}
