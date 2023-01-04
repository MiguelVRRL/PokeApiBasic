/*

envConfigurations se encarga de mandar un objeto
el cual en el atributo load de ConfigModule.forRoot
carga los datos dandonle un default si no se especifícan

*/
export const envConfigurations = () => ({
    port: +process.env.PORT || 3001,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,
    mongodb: process.env.MONGODB || 'mongodb://localhost/nest-pokemon',
})