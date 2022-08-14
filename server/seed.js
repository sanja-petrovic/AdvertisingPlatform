import Advertisement from "./model/Advertisement.js";
import User from "./model/User.js";
import bcrypt from "bcrypt";
const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
}
const seedUsers = [
    {
        username: "rosesarerosie",
        password: await generatePassword("rose"),
        registrationDate: new Date(),
        phone: "8572985487"
    },
    {
        username: "jennierubyjane",
        password: await generatePassword("jennie"),
        registrationDate: new Date(),
        phone: "4328953298"
    },
    {
        username: "lalalalisa_m",
        password: await generatePassword("lisa"),
        registrationDate: new Date(),
        phone: "3249329849"
    },
    {
        username: "sooyaaa__",
        password: await generatePassword("jisoo"),
        registrationDate: new Date(),
        phone: "2384728950"
    },
    {
        username: "smallcat",
        password: await generatePassword("cat"),
        registrationDate: new Date(),
        phone: "1234567890"
    },
    {
        username: "taylor",
        password: await generatePassword("taylor"),
        registrationDate: new Date(),
        phone: "1987654321"
    },
    {
        username: "violet",
        password: await generatePassword("violet"),
        registrationDate: new Date(),
        phone: "1111111111"
    },
    {
        username: "alex",
        password: await generatePassword("alex"),
        registrationDate: new Date(),
        phone: "37264237892"
    },
    {
        username: "strawberry",
        password: await generatePassword("strawberry"),
        registrationDate: new Date(),
        phone: "75218359203"
    },
    {
        username: "scarlet",
        password: await generatePassword("scarlet"),
        registrationDate: new Date(),
        phone: "543593583939"
    }
]

const seedAdvertisements = [

]

const seedDb = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
    await Advertisement.deleteMany({});
}

export default seedDb;