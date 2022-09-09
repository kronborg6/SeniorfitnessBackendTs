import { Router } from "express";
import {equipment, addEquipment, updateEquipment, deleteEquipment} from '../controller/fitnessudstyr.controler';

export const eRouter = (router: Router) => {
    router.get('/equipment', equipment);
    router.post('/addequipment', addEquipment);
    router.post('/deleteequipment', deleteEquipment);
    router.post('/updateequipment', updateEquipment);
}