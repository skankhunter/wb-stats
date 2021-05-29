export const required = (message?: string) => ({
   required: true,
   message: message || "Поле обязательно",
});
