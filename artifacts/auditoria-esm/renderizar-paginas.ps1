param([int[]]$Pages = @(4, 15, 16, 17))
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfDocument,Windows.Data.Pdf,ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.Streams.InMemoryRandomAccessStream,Windows.Storage.Streams,ContentType=WindowsRuntime] | Out-Null
$awaitMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
} | Select-Object -First 1
function Await-Result($Operation, $ResultType) {
    $pendingTask = $awaitMethod.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
    $pendingTask.Wait()
    $pendingTask.Result
}
$pdfFile = Await-Result ([Windows.Storage.StorageFile]::GetFileFromPathAsync((Join-Path $PSScriptRoot 'directores-esm-2022.pdf'))) ([Windows.Storage.StorageFile])
$pdf = Await-Result ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($pdfFile)) ([Windows.Data.Pdf.PdfDocument])
foreach ($pageNumber in $Pages) {
    $page = $pdf.GetPage($pageNumber - 1)
    $memoryStream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
    $options = New-Object Windows.Data.Pdf.PdfPageRenderOptions
    $options.DestinationWidth = 2200
    $actionMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
        $_.Name -eq 'AsTask' -and -not $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction'
    } | Select-Object -First 1
    $renderTask = $actionMethod.Invoke($null, @($page.RenderToStreamAsync($memoryStream, $options)))
    $renderTask.Wait()
    $reader = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($memoryStream)
    $outputFile = [System.IO.File]::Create((Join-Path $PSScriptRoot "pagina-$pageNumber.png"))
    $reader.CopyTo($outputFile)
    $outputFile.Dispose()
    $reader.Dispose()
    $memoryStream.Dispose()
    $page.Dispose()
    Write-Output "Renderizada pagina $pageNumber"
}
