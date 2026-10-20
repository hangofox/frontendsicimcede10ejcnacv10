$ErrorActionPreference = 'Stop'
$configPath = 'D:\workspace-spring-tool-suite-4-4.16.0.RELEASE\backendsicimcede10ejcnacv10\src\main\resources\application.properties'
$properties = @{}
foreach ($line in [IO.File]::ReadAllLines($configPath)) {
    if ($line -match '^\s*(spring\.datasource\.(?:url|username|password))\s*=(.*)$') {
        $properties[$matches[1]] = $matches[2].Trim()
    }
}
$connect = $properties['spring.datasource.url'] -replace '^jdbc:oracle:thin:@', ''
if ($connect -match '^([^:/]+):(\d+):([^:/]+)$') {
    $connect = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=' + $matches[1] + ')(PORT=' + $matches[2] + '))(CONNECT_DATA=(SID=' + $matches[3] + ')))'
}
$dbUser = $properties['spring.datasource.username']
$dbPassword = $properties['spring.datasource.password']
if (!$dbUser -or !$dbPassword -or !$connect -or ($dbUser + $dbPassword + $connect) -match '[\r\n"]|\$\{') {
    throw 'Configuración no compatible con conexión automática; no se han mostrado credenciales.'
}
$script = @"
set echo off
set verify off
set define off
set feedback off
set heading off
set pagesize 0
set linesize 32767
set trimout on
set tab off
whenever oserror exit failure rollback
whenever sqlerror exit failure rollback
connect "$dbUser"/"$dbPassword"@"$connect"
set transaction read only;
select json_object('id' value ID_UNIDAD_MILITAR, 'codigo' value CODIGO_UNIDAD_MILITAR, 'nombre' value NOMBRE_UNIDAD_MILITAR, 'sigla' value SIGLA_O_ACRONIMO_UNIDAD_MILITAR, 'nivel' value NIVEL_UNIDAD_MILITAR returning varchar2(4000)) from TABLA_UNIDADES_MILITARES order by ID_UNIDAD_MILITAR;
rollback;
exit success rollback
"@
$env:ORACLE_HOME = 'C:\App\oracle\product\19.0.0\dbhome_1'
$env:NLS_LANG = 'AMERICAN_AMERICA.AL32UTF8'
$OutputEncoding = New-Object Text.UTF8Encoding($false)
[Console]::OutputEncoding = $OutputEncoding
$raw = ($script | & 'C:\App\oracle\product\19.0.0\dbhome_1\bin\sqlplus.exe' -S -L /nolog 2>&1) -join "`n"
if ($LASTEXITCODE -ne 0 -or $raw -match '(ORA-|SP2-)') {
    $codes = [regex]::Matches($raw, '(?:ORA|SP2)-\d+') | ForEach-Object { $_.Value } | Select-Object -Unique
    throw ('La consulta Oracle falló. Códigos: ' + ($codes -join ', ') + '. Salida omitida para proteger las credenciales.')
}
$rows = @($raw -split '\r?\n' | Where-Object { $_.Trim().StartsWith('{') } | ForEach-Object { $_ | ConvertFrom-Json })
if ($rows.Count -eq 0) { throw 'No se obtuvieron filas JSON; no se generó un inventario vacío.' }
$destination = Join-Path $PSScriptRoot 'unidades-oracle.json'
[IO.File]::WriteAllText($destination, (ConvertTo-Json -InputObject $rows -Depth 4), (New-Object Text.UTF8Encoding($false)))
Write-Output ('Consulta de solo lectura completada. Unidades: ' + $rows.Count)
