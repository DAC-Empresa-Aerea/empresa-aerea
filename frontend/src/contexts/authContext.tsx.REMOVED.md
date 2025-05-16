# Remoção de contexto duplicado

O arquivo `authContext.tsx` está redundante e não é utilizado pelo fluxo de login. Toda a lógica de autenticação está centralizada em `loginContext.tsx`. Portanto, este arquivo será removido para evitar confusão e possíveis bugs futuros.
