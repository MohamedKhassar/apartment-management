import { toast } from "react-toastify";

export const generatePass = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-;";
    let result = "";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 8) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
export const copyPass = (password: string | undefined) => {
    if (password) {

        navigator.clipboard.writeText(password);
        toast.success("تم نسخ كلمة المرور", {
            style: {
                fontFamily: "changa"
            }
        })
    }
}