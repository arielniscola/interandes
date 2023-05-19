import { User } from "../db";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (user: any) => {
  const { username, password, repeatPassword, mailaddress } = user;

  if (!username || !password || !repeatPassword || !mailaddress)
    throw new Error("Data required missing");
  user.password = await encryptPassword(user.password);
  if (password !== repeatPassword) throw new Error("Passwords don't match");
  if (!password && !mailaddress && !username) throw new Error("Required data");
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!emailRegex.test(mailaddress)) throw new Error("Email isn't valid");
  console.log(user);

  const userCreated = await User.create(user);

  if (!userCreated) throw new Error("Error in DB");

  return userCreated;
};

export const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password", "isActive"],
    },
  });

  if (!users) throw new Error("Not found");

  return users;
};

export const getUserID = async (id: any) => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password", "isActive"],
    },
  });

  if (!user) throw new Error("Not found");
  return user;
};

export const updateUser = async (user: IUser) => {
  const userUpdated = await User.update(
    {
      username: user.username,
      mailaddress: user.mailaddress,
      phonenumber: user.phonenumber,
      company: user.company,
      role: user.role,
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  if (!userUpdated) throw "Error at update";
  return userUpdated;
};

export const signin = async (email: string, password: string) => {
  const userFind = (await User.findOne({
    where: { mailaddress: email },
    attributes: {
      exclude: ["isActive", "deleted", "phonenumber"],
    },
  })) as unknown as IUser;

  if (!userFind) throw new Error("Datos Incorrectos");

  const validPass = await validatePassword(password, userFind.password);
  if (!validPass) throw new Error("Password Incorrect");
  const token = jwt.sign({ id: userFind.id }, "cirilla456852", {
    expiresIn: 60 * 60 * 24, //expira en un dia
  });
  userFind.password = null;
  //res.header("auth-token", token).json(userFind);
  return { token: token, user: userFind };
};

const validatePassword = async (password: string, passwordDB: string) => {
  return await bcrypt.compare(password, passwordDB);
};

const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
