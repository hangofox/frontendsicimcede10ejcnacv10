param([string]$OutputDirectory = $PSScriptRoot)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$bitmap = New-Object System.Drawing.Bitmap 5100,4250
$bitmap.SetResolution(144,144)
$g = [System.Drawing.Graphics]::FromImage($bitmap)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.ColorTranslator]::FromHtml('#F3F6FA'))
function Color([string]$hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }
function Text([string]$value, [float]$x, [float]$y, [float]$size=27, [string]$color='#243449', [bool]$bold=$false) {
  $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
  $font = New-Object System.Drawing.Font 'Segoe UI',$size,$style,([System.Drawing.GraphicsUnit]::Pixel)
  $brush = New-Object System.Drawing.SolidBrush (Color $color)
  $g.DrawString($value,$font,$brush,$x,$y)
  $brush.Dispose(); $font.Dispose()
}
function Rect([float]$x,[float]$y,[float]$w,[float]$h,[string]$fill) {
  $brush=New-Object System.Drawing.SolidBrush (Color $fill)
  $g.FillRectangle($brush,$x,$y,$w,$h); $brush.Dispose()
}
function Table([string]$name,[string]$status,[float]$x,[float]$y,[float]$h,[string]$tone,[string[]]$fields,[string]$foot) {
  if(150 + $fields.Count*44 + 64 -gt $h){throw "Altura insuficiente: $name"}
  Rect $x $y 1440 $h '#FFFFFF'
  Rect $x $y 1440 104 $tone
  Text $name ($x+26) ($y+12) 34 '#FFFFFF' $true
  Text $status ($x+26) ($y+61) 25 '#FFFFFF'
  $row=$y+126
  $font=New-Object System.Drawing.Font 'Segoe UI',29,([System.Drawing.FontStyle]::Regular),([System.Drawing.GraphicsUnit]::Pixel)
  foreach($field in $fields){
    if($g.MeasureString($field,$font).Width -gt 1388){throw "Campo fuera de ancho: $field"}
    Text $field ($x+26) $row 29
    $row+=44
  }
  $font.Dispose()
  Rect $x ($y+$h-64) 1440 64 '#EAF0F5'
  Text $foot ($x+26) ($y+$h-49) 26 '#364F69'
}
function Cardinality([float]$x,[float]$y,[float]$towardX,[float]$towardY,[string]$kind,[string]$tone) {
  # El símbolo se dibuja fuera de la entidad, hacia el interior del conector.
  # En el extremo N, las tres ramas se abren contra la entidad correspondiente.
  $distance=[math]::Sqrt(($towardX-$x)*($towardX-$x)+($towardY-$y)*($towardY-$y))
  $ux=($towardX-$x)/$distance; $uy=($towardY-$y)/$distance
  $vx=-$uy; $vy=$ux
  $pen=New-Object System.Drawing.Pen (Color $tone),3.4
  if($kind -in @('zero-many','one-many')) {
    foreach($side in @(-13,0,13)) {
      $g.DrawLine($pen,[float]($x+$ux*21),[float]($y+$uy*21),[float]($x+$ux*2+$vx*$side),[float]($y+$uy*2+$vy*$side))
    }
    $minimumOffset=34
  } else {
    $g.DrawLine($pen,[float]($x+$ux*10-$vx*12),[float]($y+$uy*10-$vy*12),[float]($x+$ux*10+$vx*12),[float]($y+$uy*10+$vy*12))
    $minimumOffset=28
  }
  $mx=$x+$ux*$minimumOffset; $my=$y+$uy*$minimumOffset
  if($kind -in @('zero-one','zero-many')) {
    $brush=New-Object System.Drawing.SolidBrush (Color '#F3F6FA')
    $g.FillEllipse($brush,[float]($mx-8),[float]($my-8),16,16)
    $g.DrawEllipse($pen,[float]($mx-8),[float]($my-8),16,16)
    $brush.Dispose()
  } else {
    $g.DrawLine($pen,[float]($mx-$vx*12),[float]($my-$vy*12),[float]($mx+$vx*12),[float]($my+$vy*12))
  }
  $pen.Dispose()
}
function Edge([float[]]$coords,[string]$label,[float]$lx,[float]$ly,[string]$tone='#657890',[bool]$optionalParent=$false) {
  $pen=New-Object System.Drawing.Pen (Color $tone),3
  $points=New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
  for($i=0;$i -lt $coords.Length;$i+=2){$points.Add([System.Drawing.PointF]::new($coords[$i],$coords[$i+1]))}
  $g.DrawLines($pen,$points.ToArray())
  $first=$points[0]; $next=$points[1]
  $last=$points[$points.Count-1]; $prev=$points[$points.Count-2]
  $parentKind=if($optionalParent){'zero-one'}else{'one-one'}
  Cardinality $first.X $first.Y $next.X $next.Y $parentKind $tone
  Cardinality $last.X $last.Y $prev.X $prev.Y 'zero-many' $tone
  if($label){Text $label $lx $ly 23 $tone $true}
  $pen.Dispose()
}

# Las propiedades se leen sin modificar las interfaces del proyecto.
# Cada propiedad escalar se representa individualmente; cada DTO es una FK.
$projectRoot = [System.IO.Path]::GetFullPath($OutputDirectory)
while (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'angular.json'))) {
  $parentDirectory = Split-Path $projectRoot -Parent
  if (-not $parentDirectory -or $parentDirectory -eq $projectRoot) { throw 'No se encontró la raíz del proyecto.' }
  $projectRoot = $parentDirectory
}
$mappingRows = New-Object 'System.Collections.Generic.List[string]'
function FieldsFromInterface([string]$relativePath,[string]$entity,[hashtable]$foreignKeys) {
  $source=Get-Content -LiteralPath (Join-Path $projectRoot $relativePath) -Raw -Encoding UTF8
  $body=[regex]::Match($source,'(?s)export interface \w+I\s*\{(.*?)\}').Groups[1].Value
  if(-not $body){throw "No se encontro la interfaz de $entity"}
  $fields=New-Object 'System.Collections.Generic.List[string]'
  foreach($match in [regex]::Matches($body,'(?m)^\s*(\w+)\??\s*:\s*\w+\s*;')) {
    $property=$match.Groups[1].Value
    $prefix='       '
    if($foreignKeys.ContainsKey($property)) {
      $parts=$foreignKeys[$property] -split '\|'
      $name=$parts[0]; $prefix=$parts[1]
    } else {
      if($property.EndsWith('DTO')){throw "Falta relacion: $property"}
      $name=[regex]::Replace($property,'([A-Z]+)([A-Z][a-z])','$1_$2')
      $name=[regex]::Replace($name,'([a-z0-9])([A-Z])','$1_$2').ToLowerInvariant()
      if($property.StartsWith('id')){$prefix='PK  '}
    }
    $fields.Add("$prefix$name")
    $mappingRows.Add("| $entity | $property | $name |")
  }
  return $fields.ToArray()
}
$unit=@(FieldsFromInterface 'src/app/interfaces/panel-control/unidades-militares/unidades-militares.interface.ts' 'UNIDAD_MILITAR' @{})
$cargo=@(FieldsFromInterface 'src/app/interfaces/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.interface.ts' 'CARGO_INTEGRANTE_DOCUMENTO' @{})
$history=@(FieldsFromInterface 'src/app/interfaces/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.interface.ts' 'HISTORIAL_INTEGRANTE_DOCUMENTO' @{
 unidadMilitarDTO='id_unidad_militar|FK  '
 cargoIntegranteDocumentosDTO='id_cargo_integrante_documentos|FK  '
 tipoDocumentoIdentificacionDTO='id_tipo_documento_identificacion|FK* '
})
$request=@(FieldsFromInterface 'src/app/interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.interface.ts' 'SOLICITUD_INFRAESTRUCTURA' @{
 unidadMilitarDTO='id_unidad_militar|FK  '
 tipoSolicitudInfraestructuraDTO='id_tipo_solicitud_infraestructura|FK* '
 infraestructuraDTO='id_infraestructura|FK* '
})
$request+= 'FK  id_linea_mando [nuevo]'
$route=@(
 'PK  id_linea_mando',
 'FK  id_unidad_origen',
 '       version',
 '       nombre',
 '       estado',
 '       vigente_desde',
 '       vigente_hasta [opcional]'
)
$stage=@(
 'PK  id_etapa',
 'FK  id_linea_mando',
 'FK  id_unidad_militar',
 '       orden_etapa',
 '       nombre_etapa'
)
$position=@(
 'PK  id_cargo_etapa',
 'FK  id_etapa',
 'FK  id_cargo_integrante_documentos',
 '       orden_firma',
 '       obligatorio'
)
$member=@(
 'PK  id_integrante_solicitud',
 'FK  id_solicitud_infraestructura',
 'FK  id_cargo_etapa',
 '       grado',
 '       nombres',
 '       primer_apellido',
 '       segundo_apellido',
 '       cargo_texto',
 '       unidad_nombre',
 '       firma_archivo_versionado',
 '       fecha_registro'
)
Rect 0 0 5100 200 '#142D47'
Text 'SICIM | Líneas de mando configurables' 100 30 57 '#FFFFFF' $true
Text 'Diagrama entidad-relación con patas de gallina | Todos los campos del modelo propuesto, uno por fila' 103 111 33 '#D1E2F4'
Text 'PK: clave primaria     FK: clave foránea     FK*: referencia externa detallada al pie' 100 231 29
Cardinality 1800 254 1900 254 'one-one' '#243449'; Text 'Uno (1)' 1860 231 29
Cardinality 2110 254 2210 254 'zero-one' '#243449'; Text 'Cero o uno (0..1)' 2170 231 29
Cardinality 2610 254 2710 254 'zero-many' '#243449'; Text 'Cero o muchos (0..N)' 2670 231 29
Rect 3530 237 28 28 '#28618D'; Text 'Existente' 3570 231 27
Rect 3830 237 28 28 '#167D75'; Text 'Nueva' 3870 231 27
Rect 4120 237 28 28 '#A46023'; Text 'Adaptar o reemplazar' 4160 231 27

# Relaciones del ambito de parametrizacion. Los extremos indican cardinalidad.
Edge @(1540,560,1830,560) '1 : 0..N' 1620 514
Edge @(3270,560,3560,560) '1 : 0..N' 3350 514
Edge @(820,400,820,333,4280,333,4280,400) 'Unidad participante en la etapa' 2210 294
Edge @(1540,820,1640,820,1640,1540,1830,1540) 'Solicitante' 1660 1455 '#28618D'
Edge @(2550,980,2550,1300) 'Version de ruta utilizada' 2580 1120 '#167D75'
Edge @(4280,940,4280,1300) 'Puestos de la etapa' 4310 1120 '#167D75'
Edge @(1540,1460,1730,1460,1730,1180,4040,1180,4040,1300) 'Cargo requerido' 3620 1137 '#8B6CA6'
Edge @(820,1610,820,2500) 'Personas asociadas al cargo' 850 2100 '#8B6CA6'
Edge @(100,710,45,710,45,2710,100,2710) '' 0 0 '#28618D'
Edge @(2550,2320,2550,2500) 'Integrantes de la solicitud' 2580 2390 '#A46023'
Edge @(4280,1790,4280,2380,3400,2380,3400,2770,3270,2770) 'Puesto ocupado en esta version de ruta' 3660 2325 '#167D75'

Table 'UNIDAD_MILITAR' 'Existente | 7 campos de la interfaz' 100 400 540 '#28618D' $unit 'El nivel clasifica la unidad; no determina su ruta.'
Table 'LINEA_MANDO' 'Nueva | 7 campos' 1830 400 580 '#167D75' $route 'FK id_unidad_origen referencia UNIDAD_MILITAR.'
Table 'ETAPA_LINEA_MANDO' 'Nueva | 5 campos' 3560 400 540 '#167D75' $stage 'Etapa 1: unidad solicitante. El backend valida orden y duplicados.'
Table 'CARGO_INTEGRANTE_DOCUMENTO' 'Existente | 2 campos de la interfaz' 100 1300 310 '#28618D' $cargo 'Catálogo de cargos reutilizable en cualquier etapa.'
Table 'SOLICITUD_INFRAESTRUCTURA' 'Adaptar | 17 campos actuales y 1 FK nueva' 1830 1300 1020 '#A46023' $request 'Conservar todos los campos actuales; agregar id_linea_mando.'
Table 'CARGO_ETAPA_LINEA' 'Nueva | 5 campos' 3560 1300 490 '#167D75' $position 'Un registro por puesto de participación de la etapa.'
Table 'HISTORIAL_INTEGRANTE_DOCUMENTO' 'Paramétrica | 17 campos de la interfaz' 100 2500 980 '#28618D' $history 'Sin relación con solicitudes ni con INTEGRANTE_SOLICITUD.'
Table 'INTEGRANTE_SOLICITUD' 'Detalle normalizado | 11 campos' 1830 2500 800 '#A46023' $member 'Datos y firma copiados; sin FK al historial paramétrico.'

Rect 3560 2520 1440 930 '#E4EDF5'
Text 'REFERENCIAS EXTERNAS (FK*)' 3590 2545 34 '#142D47' $true
Text 'Columnas completas incluidas en las tablas del diagrama.' 3590 2600 29
Text 'Sus entidades pertenecen a otros catálogos del sistema:' 3590 2644 29
Text "SOLICITUD_INFRAESTRUCTURA.id_tipo_solicitud_infraestructura`n  referencia TIPOS_SOLICITUDES_INFRAESTRUCTURAS`n  clave id_tipo_solicitud_infraestructura" 3590 2715 27
Text "SOLICITUD_INFRAESTRUCTURA.id_infraestructura`n  referencia INFRAESTRUCTURAS`n  clave id_infraestructura" 3590 2860 27
Text "HISTORIAL_INTEGRANTE_DOCUMENTO.id_tipo_documento_identificacion`n  referencia TIPOS_DOCUMENTOS_IDENTIFICACION`n  clave id_tipo_documento_identificacion" 3590 3005 27
Text 'VALIDACIONES DEL BACKEND E HISTÓRICO' 3590 3170 32 '#142D47' $true
Text "La ruta debe corresponder a la unidad solicitante.`nEl puesto del integrante debe pertenecer a esa ruta.`nLa persona seleccionada debe corresponder a la unidad y cargo.`nCongelar ruta, datos personales y archivo de firma al emitir.`nEvitar vigencias superpuestas para la misma unidad origen." 3590 3220 28

Text 'ALCANCE Y FUENTE DE LOS CAMPOS' 100 3540 33 '#142D47' $true
Text 'Las 4 entidades existentes muestran todas las propiedades de sus interfaces: 43 campos actuales en total; los DTO se representan mediante FK.' 100 3600 29
Text 'Las 4 entidades propuestas desglosan todos sus campos. Los seis datos de cada puesto antiguo se conservan en el detalle normalizado.' 100 3648 29
Text 'Nombres lógicos en snake_case derivados de las interfaces. El nombre físico, tipo Oracle y nulabilidad requieren contrastarse con el DDL real.' 100 3696 29
Text 'Las patas de gallina indican 0..N registros mientras se configura; publicar una ruta exige etapas y puestos completos. No se modificó el sistema.' 100 3744 29
Text 'El backend controla duplicados de versiones por unidad, unidades y órdenes por ruta, órdenes de firma por etapa e integrantes por solicitud y puesto.' 100 3790 29

Rect 100 3840 4900 260 '#FFFFFF'
Text 'EJEMPLOS DE CONFIGURACIÓN | Orden indicado por el usuario' 132 3862 34 '#142D47' $true
Text 'SANIDAD:   Dispensario médico  →  Dirección de Sanidad  →  Comando de Personal  →  Comando' 132 3925 33
Text 'CENAC:      CENAC  →  Comando Logístico  →  Dirección Financiera  →  Comando' 132 3985 33
Text 'Cada unidad es una etapa; sus cargos se parametrizan como filas. Los participantes se guardan por solicitud y puesto.' 132 4043 29 '#364F69'
Text 'Propuesta relacional | 8 entidades del ámbito de líneas de mando | Sin campos agrupados ni omisiones respecto de las interfaces consultadas' 100 4160 28 '#536981'

$mappingHeader=@(
 '# Correspondencia de campos del diagrama',
 '',
 'Cada propiedad de las cuatro interfaces existentes aparece una vez en el diagrama. Los nombres snake_case son lógicos, no nombres físicos confirmados de Oracle.',
 '',
 '| Entidad | Propiedad de la interfaz | Campo lógico del diagrama |',
 '|---|---|---|'
)
$mappingFooter=@(
 '',
 'La solicitud agrega id_linea_mando como nueva FK. Las cuatro entidades propuestas se muestran completas en el PNG.',
 'Se mantienen PK y FK. Los controles de duplicados de versiones, unidades, órdenes y puestos se realizan en el backend, sin restricciones adicionales de unicidad en este modelo.',
 'HISTORIAL_INTEGRANTE_DOCUMENTO es paramétrica: no existe FK desde solicitudes ni desde INTEGRANTE_SOLICITUD hacia ella. Los datos personales y la firma se conservan como copia histórica independiente.',
 'Las referencias FK* pertenecen a catálogos fuera del ámbito de líneas de mando y se identifican explícitamente al pie del diagrama.',
 'No se infieren tipos Oracle ni nulabilidad de las propiedades TypeScript. El DDL de las tablas existentes debe verificarse antes de implementar.'
)
Set-Content -LiteralPath (Join-Path $OutputDirectory 'campos_diagrama_lineas_mando.md') -Value ($mappingHeader + $mappingRows.ToArray() + $mappingFooter) -Encoding UTF8
foreach($file in @('diagrama_er_lineas_mando.png','diagrama_er_lineas_mando_patas_gallina.png')){
 $output=Join-Path $OutputDirectory $file
 $bitmap.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
 Write-Output $output
}
$g.Dispose(); $bitmap.Dispose()
Write-Output "Campos existentes representados: $($mappingRows.Count). Unidad: $($unit.Count); cargos: $($cargo.Count); historial: $($history.Count); solicitud: $($request.Count-1) y 1 FK nueva."
