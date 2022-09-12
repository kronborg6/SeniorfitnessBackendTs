import { Request, response, Response } from "express";
import {sign, verify} from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();


export const equipment = async (req: Request, res: Response) => {
    try {
        const equipment = await prisma.udstyr.findMany()

        if (!equipment) {
            return res.status(404).send({
                message: 'can\'t find equiment'
            })
        }
        console.log(equipment)
        res.send({
            equipment
        })
    } catch (err) {
        res.status(401).send({
            message: 'Ups'
        })
    }
}

export const addEquipment = async (req: Request, res: Response) => {
    try {
        const {name, clas, maxWeigt, HowMany} = req.body;

        const equipment = await prisma.udstyr.create({
            data: {
                name: name,
                class: clas,
                maxWeigt: maxWeigt,
                HowMany: HowMany
            }
        });

        res.send({
            equipment
        })
    } catch (err) {
        return res.send({
            message: 'faild to add a new Equipment'
        });
    }
}

export const updateEquipment = async (req: Request, res: Response) => {

}

export const deleteEquipment = async (req: Request, res: Response) => {
    const {id} = req.body;
    try {
        await prisma.udstyr.delete({
            where: {
                id: id
            }
        })
        res.status(200).send({
            message: `delete Equipment whit id: ${id}`
        })
    } catch (err) {
        return res.send({
            message: 'faild to delete Equipment'
        })
    }
}