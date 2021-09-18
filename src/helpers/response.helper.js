export default async (res, isSuccess, data, message, statusCode = 200) => {
    return res.status(statusCode).send({
        data,
        message,
        isSuccess
    })
};