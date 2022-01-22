# pchart

## Database Migrations

To use `dotnet-ef` for your migrations please add the following flags to your command (values assume you are executing from repository root)

- `--project src\dotnet\PChart.Infrastructure` (optional if in this folder)
- `--startup-project src\dotnet\PChart.ElectronCgiConnect`
- `--output-dir Persistence\Migrations`

For example, to add a new migration from the root folder:

 `dotnet ef migrations add "SampleMigration" --project src\dotnet\PChart.Infrastructure --startup-project src\dotnet\PChart.ElectronCgiConnect --output-dir Persistence\Migrations`

To remove last migration:

`dotnet ef migrations remove --project src\dotnet\PChart.Infrastructure --startup-project src\dotnet\PChart.ElectronCgiConnect`
