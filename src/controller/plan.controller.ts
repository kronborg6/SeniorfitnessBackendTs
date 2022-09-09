import { Request, response, Response } from "express";
import {sign, verify} from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import {PrismaClient} from '@prisma/client';