import { TipoUsuario } from "src/enums/tipo-usuario";
import { Usuario } from "src/models/usuario.model";
import * as isValidCpf from '@brazilian-utils/is-valid-cpf'

export class UsuarioUtils {
    validarUsuario(usuario : Usuario) : boolean {
        if(!usuario.nome || !this.validarTipoUsuario(usuario.tipo) || !this.validarCpf(usuario.cpf)) return false
        return true
    }

    validarTipoUsuario(tipoUsuario : string) : boolean {
        if(!tipoUsuario || (tipoUsuario && tipoUsuario !== TipoUsuario.ADMIN) && (tipoUsuario && tipoUsuario !== TipoUsuario.NORMAL)) return false;
        return true;
    }

    validarCpf(cpfUsuario : string) : boolean{
        if(!cpfUsuario || !isValidCpf.isValidCpf(cpfUsuario)) return false;
        return true;
    }

    static formatarUsuario(usuario : any) : Usuario {
        return {
            cpf : usuario.cpf,
            nome : usuario.nome,
            tipo : usuario.tipo
          }
    }
}