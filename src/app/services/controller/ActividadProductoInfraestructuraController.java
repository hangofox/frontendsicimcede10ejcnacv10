//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ActividadProductoInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ActividadProductoInfraestructuraService;
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
* @Since 25/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ActividadProductoInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ActividadProductoInfraestructuraService actividadProductoInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/actividadesProductosInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idActividadProductoInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCapituloInfraestructura) {
        return new ResponseEntity<>(actividadProductoInfraestructuraService.contarTotalRegistros(idActividadProductoInfraestructura, keyword, nombreCapituloInfraestructura), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/actividadesProductosInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ActividadProductoInfraestructuraDTO>> listarActividadesProductosInfraestructurasLista(
            @RequestParam(required = false) Long idActividadProductoInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCapituloInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(actividadProductoInfraestructuraService.listarActividadesProductosInfraestructuras(idActividadProductoInfraestructura, keyword, nombreCapituloInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/actividadesProductosInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ActividadProductoInfraestructuraDTO>> listarActividadesProductosInfraestructuras(
            @RequestParam(required = false) Long idActividadProductoInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCapituloInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(actividadProductoInfraestructuraService.listarActividadesProductosInfraestructurasPag(pageable, idActividadProductoInfraestructura, keyword, nombreCapituloInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/actividadesProductosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearActividadProductoInfraestructura(@RequestBody ActividadProductoInfraestructuraDTO actividadProductoInfraestructuraDTO) {
        System.out.println(actividadProductoInfraestructuraDTO);
        return actividadProductoInfraestructuraService.crearActividadProductoInfraestructura(actividadProductoInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/actividadesProductosInfraestructuras/{idActividadProductoInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarActividadProductoInfraestructuraporId(@PathVariable Long idActividadProductoInfraestructura) {
        return actividadProductoInfraestructuraService.consultarActividadProductoInfraestructuraporId(idActividadProductoInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE Y NOMBRE DE CAPÍTULO DE INFRAESTRUCTURA:
    @GetMapping("/actividadesProductosInfraestructuras/nombre/{nombreActividadProductoInfraestructura}/capituloProductoInfraestructura/{nombreCapituloInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarActividadProductoInfraestructuraporNombreYNombreCapituloInfraestructura(@PathVariable String nombreActividadProductoInfraestructura, @PathVariable String nombreCapituloInfraestructura) {
        return actividadProductoInfraestructuraService.consultarActividadProductoInfraestructuraporNombreYNombreCapituloInfraestructura(nombreActividadProductoInfraestructura, nombreCapituloInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/actividadesProductosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarActividadProductoInfraestructura(@RequestBody ActividadProductoInfraestructuraDTO actividadProductoInfraestructuraDTO) {
        return actividadProductoInfraestructuraService.actualizarActividadProductoInfraestructura(actividadProductoInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/actividadesProductosInfraestructuras/{idActividadProductoInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarActividadProductoInfraestructura(@PathVariable Long idActividadProductoInfraestructura) {
        return actividadProductoInfraestructuraService.eliminarActividadProductoInfraestructura(idActividadProductoInfraestructura);
    }
}
