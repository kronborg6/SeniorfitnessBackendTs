import { Request, Response } from "express";
import {PrismaClient} from '@prisma/client';
import { resolveAny } from "dns";


const prisma = new PrismaClient();

export const allUser = async (req: Request, res: Response) => {
    try {

        const user = await prisma.userInfo.findMany({
        });

        res.send({
            user
        })
        if (!user) {
            return res.send({
                message: 'can\'t find user\'s'
            })
        }
    } catch (err) {

    }
}

export const userPlan = async (req: Request, res: Response) => {
    const {email, planId} = req.body;

    try {

        const updatePlan = await prisma.userInfo.update({
            where: {
                email: email
            },
            data: {
                plan: {
                    connect: {
                        id: planId
                    },
                },
            },
        });

        if (!updatePlan) {
            return res.status(201).send({
                message: 'sorry we faild you :-('
            });
        };
        res.status(200).send({
            updatePlan
        })
    } catch (err) {
        return res.send({
            message: 'it faild i sorry'
        })
    }
}