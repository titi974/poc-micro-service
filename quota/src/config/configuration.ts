export const configuration = () => {
    return {
        RABBIT: {
            user: process.env.RABBIT_USER || 'admin',
            password: process.env.RABBIT_PWD || 'admin',
            host: process.env.RABBIT_HOST || 'offer',
            url: process.env.RABBIT_URL || 'localhost:5672',
            port: process.env.RABBIT_PORT || '5672',
        },
        PORT: process.env.API_PORT_QUOTA || 3003
    }
}
