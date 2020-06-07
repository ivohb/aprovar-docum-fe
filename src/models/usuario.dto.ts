export interface UsuarioDto {
    id : string;
    codigo : string;
    nome : string;
    senha : string;
    email : string;
    cpf : string;
    sexo : string;
    ativo : string;
    imageUrl? : string; //(?) indica campo opcional - não vem do back end
}