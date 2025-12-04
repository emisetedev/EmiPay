Param(
    [string]$ApiUrl = "http://localhost:3002/api",
    [string]$Name = "Teste Usuario",
    [string]$Email = "teste@example.com",
    [string]$Password = "Password123!",
    [string]$CompanyName = "Empresa Teste",
    [string]$Phone = "5511912345678",
    [string]$Document = "12345678909"
)

$body = @{ 
    name = $Name
    email = $Email
    password = $Password
    company_name = $CompanyName
    phone = $Phone
    document = $Document
} | ConvertTo-Json -Depth 5

Write-Host "POST $ApiUrl/auth/register"

try {
    $resp = Invoke-RestMethod -Uri "$ApiUrl/auth/register" -Method Post -Body $body -ContentType 'application/json'
    Write-Host "Response:" -ForegroundColor Green
    $resp | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Request failed:" -ForegroundColor Red
    # Mostra status code se disponível
    if ($_.Exception -and $_.Exception.Response -and $_.Exception.Response.StatusCode) {
        try { Write-Host "Status:" ($_.Exception.Response.StatusCode.Value__) } catch { }
    }

    # Mostrar conteúdo da resposta (pode ser nulo)
    if ($_.Exception -and $_.Exception.Response -and $_.Exception.Response.Content) {
        try {
            $content = $_.Exception.Response.Content
            # Se for JSON, tente converter, senão imprime raw
            try { $parsed = $content | ConvertFrom-Json; $parsed | ConvertTo-Json -Depth 5 } catch { Write-Host $content }
        } catch { Write-Host "Failed to read response content" }
    } else {
        # Caso não haja response content, mostrar a mensagem da exceção
        Write-Host "Error message: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}
