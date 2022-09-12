import { Request, response, Response } from "express";
import {sign, verify} from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const newLogin = async (req: Request, res: Response) => {
    const {passwordb, email} = req.body;
    try {
        console.log("gggggg")

        const user = await prisma.userInfo.findUnique({ 
            where: {
                email: email
            },
            include: {
                role: true
            }
        });
        if (!user) {
            return res.status(400).send({
                message: 'Invalid credentials'
            });
        }
        if (!await bcryptjs.compare(passwordb, user.password)) {
            return res.status(400).send({
                message: 'Invalid credentials'
            })
        }
        // Check the plain password aginst the stored hash password in the db if it a match
        //its send a bearer token and a user back

        const {password, ...data} = user;

        const token = sign({id: user.id}, "refresh_secret", {expiresIn: '1d'})

        res.status(200).send({
            token,
            data
        })

        } catch (err) {
            // console.log(err)
            res.status(400).send({
                message: 'Login faild'
            })
        }
    
}


export const register = async (req: Request, res: Response) => {
    const {email, password, fristname, lastname} = req.body;

    try {
        // console.log("lort op l")

        const user = await prisma.userInfo.create({
            data: {
                email: email,
                fristName: fristname,
                lastName: lastname,
                password: await bcryptjs.hash(password, 12),
                role: {
                    connectOrCreate: {
                        where: {
                            id: 1
                        },
                        create: {
                            id: 1,
                            name: 'User'
                        },
                    },
                },
            }
        });
        res.status(200).send({
            user
        })
    } catch (err) {
        // console.dir(err)
        res.status(404).send({
            message: 'i just dont give a fuck'
        })
    }
};

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        console.log("login")
        const user = await prisma.userInfo.findUnique({
            where: {
                email: email
            }
        });
        
        if (!user) {
            return res.status(400).send({
                message: 'Invalid credentials'
            });
    }

    if (!await bcryptjs.compare(password, user.password)) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }
    
    const refreshToken = sign({
        id: user.id
    }, "refresh_secret", {expiresIn: '1w'});
    
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    const expired_at = new Date();
    expired_at.setDate(expired_at.getDate() + 7);
    
    await prisma.token.create({
        data: {
            userinfoId: user.id,
            token: refreshToken,
            expiredAt: expired_at
        }
    });
    
    const token = sign({
        id: user.id
    }, 'access_secret', {expiresIn: '30s'});
    
    res.send({
        token
    })
    } catch (err) {
        // console.dir(err)
    }
};

export const authenticatedUser = async (req: Request, res: Response) => {
    try {
        // console.log("oliver")
        const accessToken = req.header('Authorization')?.split(" ")[1] || "";
        

        console.log('AccessToken ' + accessToken)

        const payload: any = verify(accessToken, 'access_secret');
        console.log('user payload ' + payload)

        if (!payload) {
            console.log("Token lort")
            return res.status(401).send({
                message: 'unauthenticated Payload'
            });
        }

        const user = await prisma.userInfo.findUnique({
            where: {
                id: payload.id
            }
        });
        // console.log(user)
        if (!user) {
            return res.status(401).send({
                message: 'unauthenticated User'
            })
        }

        const {password, ...data} = user;
        // const {...data} = user;
        console.log(data)

        res.status(200).send({data});
        console.log("refresh v2")
    } catch (err) {
        // console.log(err)
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        console.log('refresh token ' + refreshToken)
        const payload: any = verify(refreshToken, "refresh_secret");



        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const dateNow = new Date();
        dateNow.setDate(dateNow.getDate());

        // console.log(payload.id)

        const dbToken = await prisma.token.findFirst({
            where: {
                id: payload.id,
                expiredAt: {
                    gt: dateNow
                }
            }
        });
        // console.log(dbToken)

        if (!dbToken) {
            return res.status(401).send({
                message: 'Skyd Mig'
            });
        }
        
        const token = sign({
            id: payload.id
        }, 'access_secret', {expiresIn: '30s'});

        res.send({
            token
        })
    } catch (err) {
        // console.log(err)
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken'];


        await prisma.token.deleteMany({
            where: {
              token: refreshToken,
            },
          })

          res.cookie('refreshToken', '', {maxAge: 0});

    // console.log("logout")

          res.send({
            message: 'success'
          })

    } catch (err) {
        // console.log(err)
    }
};

export const deleteAllTokens = async (req: Request, res: Response) => {

    await prisma.token.deleteMany({})
    res.status(200).send({
        message: "Kronborg er gud"
    })
}