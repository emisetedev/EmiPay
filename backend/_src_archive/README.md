Arquivos arquivados: `backend/src/`

Motivo: o projeto foi unificado para usar Sequelize + SQLite a partir dos arquivos em `backend/models`, `backend/controllers` e `backend/routes`.

O diretório `backend/src` contém código legada que usa `sqlite3` diretamente e pode causar confusão. Deixei os arquivos originais aqui para referência. Recomenda-se revisar/baixar o que for necessário e, quando estiver seguro, remover `backend/src`.

Se preferir que eu realmente mova os arquivos fisicamente, posso copiar todos arquivos de `backend/src` para `_src_archive` e removê-los de `backend/src` — confirme se deseja remoção completa.
