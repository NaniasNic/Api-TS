import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class ControllerUser {
    async createUser(request: Request, response: Response) {
        const { name, email, senha, confirmaSenha } = request.body;

        if(!name) {
            response.status(422).json({ message: "O nome é obrigatório!" });
            return
        }
        if(!email) {
            response.status(422).json({ message: "O email é obrigatório" });
            return
        }
        if(!senha) {
            response.status(422).json({ message: "A senha é obrigatória!" });
            return
        }
        if(!confirmaSenha) {
            response.status(422).json({ message: "Confirmação de senha é obrigatória!" });
            return
        }

        const emailCheck = await prismaClient.user.findFirst({ where: { email: email }});
        if(emailCheck) {
            response.status(422).json({ message: "O email já cadastrado! Por favor, verifique seus dados novamente." });
            return
        }

        try {
            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    senha,
                    confirmaSenha
                }
            })
    
            return response.status(201).json({ message: "Cadastro realizado com sucesso!" });
        } catch (err) {
            response.status(422).json({ message: "Não foi possivel criar o usuário, por favor, tente mais tarde", error: err });
            return
        }
    }

    async allUser(request: Request, response: Response) {
        const user = await prismaClient.user.findMany()

        return response.json({ message: "Estes são os Usuarios encontrados!", user: user });
    }

    async findUser(request: Request, response: Response) {
        const { id } = request.params

        const user = await prismaClient.user.findFirst({
            where: {
                id,
            },
        })

        if(!user) {
            return response.status(404).json({ message: "Usuario não encontrado" })
        } else {
            return response.status(200).json({ message: "Usuario encontrado", user: user });
        }
    }

    async deleteUser(request: Request, response: Response) {
        const { id } = request.params

        const user = await prismaClient.user.delete({
            where: {
                id,
            }
        })

        return response.status(200).json({ message: "Usuario deletado com sucesso!", user: user });
    }
}