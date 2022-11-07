import { User } from "../entities/User";
import { sendEmail } from "../utils/mail";
import { userRepository } from "../repositories/UserRepository";
import IUserServices, { IUserLogin, IUserSaveRequest } from "./IUserServices";

import "dotenv/config";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

class UserServices implements IUserServices {
    private jwtPass = process.env.JWT_PASS as string;

    async save({ fullname, email, password, company, role }: IUserSaveRequest): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({
            fullname,
            email,
            password: hashedPassword,
            company,
            role
        });
        await userRepository.save(newUser);
        sendEmail(newUser.uuid, newUser.email, newUser.fullname);
        return newUser;
    }

    async checkEmail(email: string): Promise<User | undefined> {
        const user = await userRepository.findOneBy({ email });
        if (user) {
            return user;
        } else {
            return undefined;
        }
    }

    async activateAccount(uuid: string): Promise<User | null> {
        let user = await userRepository.createQueryBuilder("user")
            .where("user.uuid = :uuid", { uuid: uuid })
            .getOne();

        if (user?.confirmed) {
            return user;
        } else {
            user = await userRepository.createQueryBuilder("user")
                .where("user.uuid = :uuid", { uuid: uuid })
                .getOne();

            await userRepository.createQueryBuilder()
                .update(User)
                .set({ confirmed: true })
                .where("uuid = :uuid", { uuid: uuid })
                .execute();

            return user;
        }
    }

    async login(email: string, password: string): Promise<IUserLogin | null> {
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            return null;
        }

        const verifyPass = await bcrypt.compare(password, user.password);
        if (!verifyPass) {
            return null;
        }

        const token = jwt.sign({ id: user.id }, this.jwtPass, { expiresIn: '8h' });

        const { password: _, ...userLogin } = user;
        return {
            user: userLogin,
            token: token
        }
    }

}

const userServices: UserServices = new UserServices();
export default userServices;