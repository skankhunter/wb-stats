export function getFormValues<T>(data: T): T {
   const result = {};

   for (const prop in data) {
      if (typeof data[prop] !== "undefined") {
         //@ts-ignore
         result[prop] = data[prop];
      }
   }
   //@ts-ignore
   return result;
}
