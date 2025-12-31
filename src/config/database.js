const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            autoIndex: true
        });
    } catch (err) {
        console.error('[DB] Error al conectar a MongoDB:', err.message);
        setTimeout(connectDB, 5000);
    }
};

mongoose.connection.on('connecting', () => {
    console.log('[DB] Conectando a MongoDB...');
});

mongoose.connection.on('connected', () => {
    console.log('✅ [DB] Conexión exitosa a MongoDB');
    console.log(`   - Base de datos: ${mongoose.connection.name}`);
    console.log(`   - Host: ${mongoose.connection.host}`);
    console.log(`   - Puerto: ${mongoose.connection.port}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('[DB] Desconectado de MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('[DB] Error de conexión a MongoDB:', err.message);
    if (err.name === 'MongoNetworkError') {
        setTimeout(connectDB, 5000);
    }
});

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('[DB] Conexión a MongoDB cerrada por terminación de la aplicación');
        process.exit(0);
    } catch (err) {
        console.error('[DB] Error al cerrar la conexión a MongoDB:', err);
        process.exit(1);
    }
});

module.exports = connectDB;
